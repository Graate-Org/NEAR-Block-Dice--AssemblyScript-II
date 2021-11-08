import { VMContext } from "near-mock-vm";
import { context, u128 } from "near-sdk-core";
import { claimWinnings, createNewGame, getPlayersDetails, getWinners, joinGame, rollDice } from "../assembly";
import { GameStatus, Player, games, players, profiles } from "../assembly/model";
import { FEE } from "../utils";

const creator = "melvin.testnet";
const player = "fortune.testnet";
const player2 = "yemi.testnet";
let testGameId: string;

describe("Checks for creating account", () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(FEE);
    VMContext.setSigner_account_id(creator);
  });

  it("creates a new game", () => {
    const gameId = createNewGame();

    expect(games.length).toBeGreaterThan(0, "A new game is expected to be added to the array");

    expect(games[0].id).toStrictEqual(gameId, "The game id at index 0 is expected to match");
  });

  it("creates throws when fee is not attached", () => {
    VMContext.setAttached_deposit(u128.Zero);
    function createGameWithZeroDeposit(): void {
      createNewGame();
    }

    expect(createGameWithZeroDeposit).toThrow(
      "Attached deposit is expected to be equal to: " + FEE.toString() + " Yocto"
    );
  });
});

describe("Checks for joining a game", () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(FEE);
    VMContext.setSigner_account_id(creator);
    testGameId = createNewGame();
  });

  it("allows a new user join a game", () => {
    VMContext.setSigner_account_id(player);
    joinGame(testGameId);
    const gamePlayers = players.get(testGameId) as Player[];
    expect(gamePlayers.length).toStrictEqual(
      2,
      "Expect players to be atleast 2, the creator and the player that just joined"
    );

    expect(gamePlayers[1].playerId).toStrictEqual(player, "The playerId joined should match " + player);
  });

  it("can't when join when fee is zero", () => {
    VMContext.setSigner_account_id(player2);
    VMContext.setAttached_deposit(u128.Zero);

    function joinAGame(): void {
      joinGame(testGameId);
    }
    expect(joinAGame).toThrow("expect to only be able to join active or created game");
  });

  it("can't when join when completed", () => {
    VMContext.setSigner_account_id(player2);
    const completedGame = games[0];
    completedGame.status = GameStatus.COMPLETED;

    games.replace(0, completedGame);

    function joinAGame(): void {
      joinGame(testGameId);
    }
    expect(joinAGame).toThrow("expect to only be able to join active or created game");
  });
});

describe("Rolling dice", () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(FEE);
    VMContext.setSigner_account_id(creator);
    testGameId = createNewGame();
  });

  it("rolls the dice", () => {
    const dices = rollDice(testGameId);
    const player = players.get(testGameId) as Player[];
    expect(dices[0]).toStrictEqual(player[0].roll1, "Expect dice at index '0' to equal players roll1");
    expect(dices[1]).toStrictEqual(player[0].roll2, "Expect dice at index '0' to equal players roll2");
  });

  it("Doesn't return rolls if game has not ended", () => {
    rollDice(testGameId);
    const player = getPlayersDetails(testGameId);
    
    expect(player[0].roll1).toStrictEqual(0, "Expect dice at index '0' to equal null because game is not completed");
    expect(player[0].roll2).toStrictEqual(0, "Expect dice at index '0' to equal null because game is not completed");
  });

  it("can't roll the dice twice", () => {
    rollDice(testGameId);
    function rollsAgain(): void {
      rollDice(testGameId);
    }
    expect(rollsAgain).toThrow("Expect to throw on rolling dice a second time");
  });
});

describe("Claiming winning error catch", () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(FEE);
    VMContext.setSigner_account_id(creator);
    testGameId = createNewGame();
    rollDice(testGameId);
  });

  it("verifies if game has ended before win is claimed", () => {
    function claimBeforeEnd(): void {
      claimWinnings(testGameId);
    }
    expect(claimBeforeEnd).toThrow("Game is expected to end before claiming winning");
  });
});

describe("Claiming winning", () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(FEE);
    VMContext.setSigner_account_id(creator);
    testGameId = createNewGame();
    rollDice(testGameId);
    const endedGame = games[0];
    endedGame.ended = context.blockTimestamp;
    games.replace(0, endedGame);
  });

  it("claims win if among winners", () => {
    expect(claimWinnings(testGameId)).toBeTruthy("Winnings is claimed if it is truthy");
  });

  it("verifies winners", () => {
    expect(getWinners(testGameId)).toStrictEqual([creator], "expect to verify accurate winners");
  });

  it("cant claims win if not among winners", () => {
    VMContext.setSigner_account_id(player2);
    function claim(): void {
      claimWinnings(testGameId);
    }
    expect(claim).toThrow("expect only winners to claim winning");
  });

  it("cannot claim winnings twice", () => {
    claimWinnings(testGameId);
    function claimAgain(): void {
      claimWinnings(creator);
    }
    expect(claimAgain).toThrow("expect winnings to be claimed only once");
  });
});
