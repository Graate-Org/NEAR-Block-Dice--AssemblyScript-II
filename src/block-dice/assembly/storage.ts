import { PersistentMap, PersistentVector } from "near-sdk-core";
import { AccountID, GameID, Profile } from "../utils";
import { Game, Player } from "./model";

export const profiles = new PersistentMap<AccountID, Profile>("profiles");
export const games = new PersistentVector<Game>("games");
export const players = new PersistentMap<GameID, Player[]>("players");
