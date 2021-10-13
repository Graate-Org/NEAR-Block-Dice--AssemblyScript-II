## Unit tests

Unit tests can be run from the top level folder using the following command:

```
yarn test:unit
```

### Tests for Contract in `index.unit.spec.ts`


```
[Describe]: Checks for creating account

 [Success]: ✔ creates a new game
 [Success]: ✔ creates throws when fee is not attached

[Describe]: Checks for joining a game

 [Success]: ✔ allows a new user join a game
 [Success]: ✔ can't when join when fee is zero
 [Success]: ✔ can't when join when completed

[Describe]: Rolling dice

 [Success]: ✔ rolls the dice
 [Success]: ✔ can't roll the dice twice

[Describe]: Claiming winning error catch

 [Success]: ✔ verifies if game has ended before win is claimed

[Describe]: Claiming winning

 [Success]: ✔ claims win if among winners
 [Success]: ✔ verifies winners
 [Success]: ✔ cant claims win if not among winners
 [Success]: ✔ cannot claim winnings twice

    [File]: src/block-dice/__tests__/index.unit.spec.ts
  [Groups]: 6 pass, 6 total
  [Result]: ✔ PASS
[Snapshot]: 0 total, 0 added, 0 removed, 0 different
 [Summary]: 12 pass,  0 fail, 12 total
    [Time]: 270.067ms

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  [Result]: ✔ PASS
   [Files]: 1 total
  [Groups]: 6 count, 6 pass
   [Tests]: 12 pass, 0 fail, 12 total
    [Time]: 16716.679ms
✨  Done in 18.13s.
```
