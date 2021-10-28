import { u128 } from "near-sdk-core";

export type Timestamp = u64;

export type AccountID = string;

export type GameID = string;

export type Profile = string[];

export const FEE = u128.from("500000000000000000000000");
