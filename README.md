# Sample

This repository includes a complete project structure for AssemblyScript contracts targeting the NEAR platform.


```
There are 2 "styles" of implementing AssemblyScript NEAR contracts: 
- the contract interface can either be a collection of exported functions 
- or the contract interface can be the methods of a an exported class

We call the second style "Singleton" because there is only one instance of the class which is serialized to the blockchain storage.  Rust contracts written for NEAR do this by default with the contract struct.

```

The example here is very basic.  It's a simple contract demonstrating the following concepts:
- a single contract
- the difference between `view` vs. `change` methods
- basic contract storage


## Usage

### Getting started

1. clone this repo to a local folder
2. run `yarn`
3. run `yarn test`

### Top-level `yarn` commands

- run `yarn test` to run all tests
  - (!) be sure to run `yarn build:release` at least once before:
    - run `yarn test:unit` to run only unit tests
    - run `yarn test:simulate` to run only simulation tests
- run `yarn build` to quickly verify build status
- run `yarn clean` to clean up build folder

### Other documentation

- Sample contract and test documentation
  - see `/src/sample/README` for contract interface
  - see `/src/sample/__tests__/README` for Sample unit testing details