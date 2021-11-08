![Near, Inc. logo](https://near.org/wp-content/themes/near-19/assets/img/logo.svg?t=1553011311)

# Design

### Interface
## Core Methods

```ts
function createNewGame
```
- "Change" function (ie. a function that alters contract state)
- Creates a new game and returns the unique id for that game

```ts
function joinGame
```
- "Change" function (ie. a function that alters contract state)
- Recieves a game's unique id as parameter
- Allows the account initiating the contract call tp join the game with id passed in

```ts
function rollDice
```
- "Change" function (ie. a function that alters contract state)
- Recieves a game's unique id as parameter
- Allows the account initiating the contract call to roll dice for the game 
- Once the first dice is rolled in a game, it becomes active
- Each active game lasts for 30 minutes on being active 

```ts
function claimWinnings
```
- "Change" function (ie. a function that alters contract state)
- Recieves a game's unique id as parameter
- Allows the account initiating the contract call to claim winning for the game 
- Panics if account has already claimed winnings or is not a winner
- Returns true if winnings was successfully claimed 

## Game Reporting Methods

```ts
function getGameDetails
```
- "View" function (ie. a function that does not alters contract state)
- Recieves a game's unique id as parameter
- Returns details of the game id passed in

```ts
function getCreatedGames
```
- "View" function (ie. a function that does not alters contract state)
- Recieves a page number starting from 0
- Returns max(8) created gamems based on page number passed in

```ts
function getActiveGames
```
- "View" function (ie. a function that does not alters contract state)
- Recieves a page number starting from 0
- Returns max(8) activa gamems based on page number passed in

```ts
function getCompletedGames
```
- "View" function (ie. a function that does not alters contract state)
- Recieves a page number starting from 0
- Returns max(8) completed gamems based on page number passed in

## Player Reporting Methods

```ts
function getWinners
```
- "View" function (ie. a function that does not alters contract state)
- Recieves a game's unique id as parameter
- Returns an array with the account id of the winners for the game id passed in

```ts
function getPlayersDetails
```
- "View" function (ie. a function that does not alters contract state)
- Recieves a game's unique id as parameter
- Returns details of the players for the game id passed in

```ts
function getProfileDetails
```
- "View" function (ie. a function that does not alters contract state)
- Returns details of the profile of the user calling the contract
