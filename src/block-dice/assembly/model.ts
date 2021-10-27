import { context, RNG, u128 } from "near-sdk-as";
import { AccountID, FEE, GameID, Timestamp } from "../utils";
import { players } from "./storage";

export enum GameStatus {
  Created = 0,
  Active,
  Completed,
}

export enum ClaimedWin {
  No = 0,
  Claimed,
}

@nearBindgen
export class Game {
  id: GameID;
  players: u32;
  prize: u128;
  started: Timestamp;
  ended: Timestamp;
  createdBy: string;
  createdAt: Timestamp;
  status: GameStatus;
  pool: u128;

  constructor() {
    this.createdBy = context.sender;
    this.players = 0;
    this.createdAt = context.blockTimestamp;
    this.status = GameStatus.Created;
    this.id = this.generateGameId();
  }

  //   Static method
  static getGameRules(): string {
    return "You need to create or join a game with a 0.02 NEAR fee \n A game starts when the first player rolls \n Each game lasts 30 minutes";
  }

  addNewPlayer(): void {
    this.players += 1;
    this.prize = u128.add(this.prize, FEE);
  }

  /**
   * Generates a new id and checks if ID already exists
   * if ID exists a new ID will be generated by calling the function again
   * @returns Game ID
   */
  private generateGameId(): GameID {
    const roll = new RNG<u32>(1, u32.MAX_VALUE);
    const id = "BD-" + roll.next().toString();
    if (players.contains(id)) {
      this.generateGameId();
    }

    return id;
  }

  gameNotCompleted(): bool {
    if (this.status !== GameStatus.Completed) {
      if (this.status === GameStatus.Active && this.ended >= context.blockTimestamp) {
        return true;
      }
      return true;
    }
    return false;
  }

  canRollInGame(): bool {
    if (this.status !== GameStatus.Completed) {
      if (this.status === GameStatus.Active && this.ended >= context.blockTimestamp) {
        return true;
      }
      return true;
    }
    return false;
  }
}

@nearBindgen
export class Player {
  roll1: u32;
  roll2: u32;
  timeJoined: Timestamp;
  timeRolled: Timestamp;
  claimedWin: ClaimedWin;
  constructor(public gameId: GameID, public playerId: AccountID) {
    this.timeJoined = context.blockTimestamp;
    this.claimedWin = ClaimedWin.No;
  }

  sumDiceRoll(): u32 {
    return this.roll1 + this.roll2;
  }
}
@nearBindgen
export class GameReturnData {
  constructor(public data: Game[], public total: u32) {}
}
