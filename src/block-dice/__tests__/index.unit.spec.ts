import { VMContext } from "near-mock-vm";
import { u128 } from "near-sdk-core";
import { createNewGame, getPlayersDetails, joinGame, rollDice } from "../assembly";
import { GameStatus, Player } from "../assembly/model";
import { games, players, profiles } from "../assembly/storage";
import { FEE } from "../utils";

const creator = "melvin.testnet";
const player = "fortune.testnet";
const player2 = "yemi.testnet";
let testGameId: string;

describe("Checks for creating account", () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(FEE);
    VMContext.setCurrent_account_id(creator);
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
    VMContext.setCurrent_account_id(creator);
    testGameId = createNewGame();
  });

  it("allows a new user join a game", () => {
    VMContext.setCurrent_account_id(player);
    joinGame(testGameId);
    const gamePlayers = players.get(testGameId) as Player[];
    expect(gamePlayers.length).toStrictEqual(
      2,
      "Expect players to be atleast 2, the creator and the player that just joined"
    );
  });

  it("can't when join when fee is zero", () => {
    VMContext.setCurrent_account_id(player2);
    VMContext.setAttached_deposit(u128.Zero);

    function joinAGame(): void {
      joinGame(testGameId);
    }
    expect(joinAGame).toThrow("expect to only be able to join active or created game");
  });

  it("can't when join when completed", () => {
    VMContext.setCurrent_account_id(player2);
    const completedGame = games[0];
    completedGame.status = GameStatus.Completed;

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
    VMContext.setCurrent_account_id(creator);
    testGameId = createNewGame();
  });

  it("rolls the dice", () => {
    const dices = rollDice(testGameId);
    const player = getPlayersDetails(testGameId)[0]
    expect(dices[0]).toStrictEqual(player.roll1, "Expect dice at index '0' to equal players roll1");
    expect(dices[1]).toStrictEqual(player.roll2, "Expect dice at index '0' to equal players roll2");
  });

  it("can't roll the dice twice", () => {
    rollDice(testGameId);
    function rollsAgain (): void {
        rollDice(testGameId)
    }
    expect(rollsAgain).toThrow("Expect to throw on rolling dice a second time");
  });
});


describe("Claiming winning", ()=>{})