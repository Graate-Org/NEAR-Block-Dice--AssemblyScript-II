![Near, Inc. logo](https://near.org/wp-content/themes/near-19/assets/img/logo.svg?t=1553011311)

## Design

### Interface

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
function getWinners
```
- "View" function
- Recieves a game's unique id as parameter
- Returns an array with the account id of the winners for the game id passed in

```ts
function claimWinnings
```
- "Change" function (ie. a function that alters contract state)
- Recieves a game's unique id as parameter
- Allows the account initiating the contract call to claim winning for the game 
- Panics if account has already claimed winnings or is not a winner
- Returns true if winnings was successfully claimed


```ts
function getGameDetails
```
- "View" function
- Recieves a game's unique id as parameter
- Returns details of the game id passed in


```ts
function getPlayersDetails
```
- "View" function
- Recieves a game's unique id as parameter
- Returns details of the players for the game id passed in


```ts
function getProfileDetails
```
- "View" function
- Returns details of the profile of the user calling the contract



```ts
function getActiveGames
```
- "Change" function
- Returns active games

```ts
function getCompletedGames
```
- "Change" function
- Returns completed games

```ts
function getCreatedGames
```
- "Change" function
- Returns created games

