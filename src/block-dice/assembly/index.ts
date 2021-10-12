import { context, Context, ContractPromiseBatch, logging, RNG, u128 } from "near-sdk-core";
import { FEE, GameID, Profile } from "../utils";
import { Game, GameStatus, Player, ClaimedWin, GameReturnData } from "./model";
import { games, players, profiles } from "./storage";

export function createNewGame(): GameID {
  verifyGameFee(Context.attachedDeposit);
  const game = new Game();
  const gameId = game.id;

  //   increments the players count
  game.addNewPlayer();

  logging.log("Game: " + gameId + " created");

  //   sets storage data for new game
  games.push(game);

  assert(addGameToProfile(gameId), "Game id already added to profile");
  addToPlayersList(gameId);

  return gameId;
}

export function joinGame(gameId: GameID): string {
  verifyGameId(gameId);
  verifyGameFee(Context.attachedDeposit);
  for (let index = 0; index < games.length; index++) {
    if (games[index].id == gameId) {
      const game: Game = games[index];
      assert(game.canJoinGame(), "Cannot join, this game have already ended!");

      game.addNewPlayer();
      assert(addGameToProfile(gameId), "Game id already added to profile");
      addToPlayersList(game.id);

      games.replace(index, game);
    }
  }

  return "You have joined game: " + gameId;
}

export function rollDice(gameId: GameID): Array<u32> {
  let roll1: u32;
  let roll2: u32;
  const sender = Context.sender;
  verifyGameId(gameId);

  for (let index = 0; index < games.length; index++) {
    if (games[index].id == gameId) {
      const game: Game = games[index];
      if ((game.status = GameStatus.Created)) {
        game.status = GameStatus.Active;
        game.started = Context.blockTimestamp;
        game.ended = Context.blockTimestamp + 1800000;
      } else {
        const gameIsStillOn = game.ended > Context.blockTimestamp;

        if (!gameIsStillOn) {
          game.status = GameStatus.Completed;
        }
        assert(gameIsStillOn, "This game has ended!");
      }
      games.replace(index, game);
    }
  }

  const gamePlayers = players.get(gameId) as Player[];

  const dice1 = new RNG<u32>(1, 5);
  const dice2 = new RNG<u32>(1, 5);
  roll1 = dice1.next() + 1;
  roll2 = dice2.next() + 1;

  for (let index = 0; index < gamePlayers.length; index++) {
    if (sender == gamePlayers[index].playerId) {
      const player = gamePlayers[index];
      assert(player.timeRolled <= 0, "You have already rolled");
      player.timeRolled = Context.blockTimestamp;
      player.roll1 = roll1;
      player.roll2 = roll2;

      // assign the mutated player to the game players array
      gamePlayers[index] = player;
      players.set(gameId, gamePlayers);
    }
  }

  return [roll1, roll2];
}

export function getWinners(gameId: GameID): Array<string> {
  verifyGameId(gameId);

  const gamePlayers = players.get(gameId) as Player[];
  const winners: string[] = [];
  let maxScore = 0;

  for (let index = 0; index < gamePlayers.length; index++) {
    const diceCount = gamePlayers[index].sumDiceRoll();
    if (diceCount > maxScore) {
      maxScore = diceCount;
    }
  }

  for (let index = 0; index < gamePlayers.length; index++) {
    const player = gamePlayers[index];
    const diceCount = gamePlayers[index].sumDiceRoll();
    if (diceCount == maxScore) {
      winners.push(player.playerId);
    }
  }

  return winners;
}

export function claimWinnings(gameId: GameID) {
  const sender = Context.sender;
  let pool: u128 = u128.Zero;

  verifyGameId(gameId);
  const winners = getWinners(gameId);
  const gamePlayers = players.get(gameId) as Player[];

  for (let index = 0; index < games.length; index++) {
    if (games[index].id == gameId) {
      pool = games[index].pool;
    }
  }

  assert(winners.includes(sender), "You did not win for this game :(");

  for (let index = 0; index < gamePlayers.length; index++) {
    if (gamePlayers[index].playerId === sender) {
      const player = gamePlayers[index];
      assert(player.claimedWin !== ClaimedWin.Claimed, "You have already claimed prize!");
      const prize = u128.div(pool, u128.from(winners.length));

      const transfer_win = ContractPromiseBatch.create(sender);
      transfer_win.transfer(prize);
      player.claimedWin = ClaimedWin.Claimed;
      gamePlayers[index] = player;

      players.set(gameId, gamePlayers);
    }
  }
}

/**
 *
 * GETTER Functions
 */

export function getGameDetails(gameId: GameID): Game[] {
  verifyGameId(gameId);
  let result: Game[] = [];
  //   const gamePlayers = players.get(gameId) as Player[];

  for (let index = 0; index < games.length; index++) {
    if (games[index].id == gameId) {
      result.push(games[index]);
    }
  }

  return result;
}

export function getPlayersDetails(gameId: GameID): Player[] {
  verifyGameId(gameId);

  const getGamePlayers = players.get(gameId) as Player[];

  return getGamePlayers;
}

/**
 *
 * @param page
 * @returns GameReturnData
 * For additional information check
 * @function getGameType
 */

export function getActiveGames(page: u32): GameReturnData {
  return getGameType(page, GameStatus.Active);
}

export function getCompletedGames(page: u32): GameReturnData {
  return getGameType(page, GameStatus.Completed);
}

export function getCreatedGames(page: u32): GameReturnData {
  return getGameType(page, GameStatus.Created);
}

/**
 *
 * HELPER FUNCTIONS FOR MAIN DAPP
 */

//Verify that deposit attached is equal to or greater than the fee
function verifyGameFee(deposit: u128): void {
  assert(deposit >= FEE, "You need to have at least 0.5 NEAR tokens to continue");
}

/**
 * @param gameId
 * updates the game id with
 */

function addGameToProfile(gameId: GameID): bool {
  const sender = context.sender;
  let profile: Profile = [];
  if (profiles.contains(sender)) {
    profile = profiles.get(sender) as Profile;

    // Prevents adding the same game ID more than once
    return !profile.includes(gameId);
  }
  profile.push(gameId);

  //   set to storage
  profiles.set(sender, profile);

  return true;
}

/**
 * @param gameId
 * Adds a new player to a game
 */

function addToPlayersList(gameId: GameID): void {
  const player = new Player(gameId);
  let newPlayers: Player[] = [];
  if (players.contains(gameId)) {
    newPlayers = players.get(gameId) as Player[];
  }

  newPlayers.push(player);

  //   set to storage
  players.set(gameId, newPlayers);
}

/**
 *
 * @param gameId
 * checks if game ID exist
 * panics if game ID does not exist
 */

function verifyGameId(gameId: GameID) {
  assert(players.contains(gameId), "This game ID does not exist");
}

export function getGameType(_page: u32, type: GameStatus): GameReturnData {
  const gameType: Game[] = [];
  const data: Game[] = [];

  for (let index = 0; index < games.length; index++) {
    if (games[index].status == type) {
      gameType.push(games[index]);
    }
  }

  //   Pagination for active games
  const page = _page;
  const startIndex = 8 * page;
  const total = gameType.length;
  const maxPage: u32 = NativeMath.ceil(total / page + 1);
  const nextPage = page + 1;

  assert(startIndex < gameType.length, "Data request out of bounds!");

  const endIndex = min(gameType.length, startIndex + 8);

  for (let index = startIndex; index < endIndex; index++) {
    data.push(gameType[index]);
  }

  const result = new GameReturnData(data, total, data.length, maxPage, page + 1, nextPage);

  return result;
}
