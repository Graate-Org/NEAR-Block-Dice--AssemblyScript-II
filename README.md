# Block-Dice

This repository includes a complete Smart Contract for a dice game built on the NEAR blockchain. This is a second sample that corrects a leak in the initial sample. 

- The error in the initial smart contract is that you can see what other players rolled before a game has ended, this gives those joining late an edge as they can make a decision based on what other players rolled. We are correcting this by only revealing a players roll if a game has ended.


For additional informtion on the smart contract methods view [here](src/block-dice/)

```

It's a simple contract demonstrating how to build a dic game on the NEAR blockchain using assembly script:
- Why you should avoid leaks and have data restrictions on your smart contracts 
- How to implement random number generation and id checks on the NEAR block chain


## Usage

### Getting started

1. clone this repo to a local folder
2. run `yarn`
3. run `yarn test:unit`

### Top-level `yarn` commands

- run `yarn test` to run all tests
  - (!) be sure to run `yarn build:release` at least once before:
    - run `yarn test:unit` to run only unit tests
    - run `yarn test:simulate` to run only simulation tests
- run `yarn build` to quickly verify build status
- run `yarn clean` to clean up build folder

### Other documentation

- Sample contract and test documentation
  - see `/src/block-dice/README` for contract interface
  - see `/src/block-dice/__tests__/README` for Sample unit testing details
```