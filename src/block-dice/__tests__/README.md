## Unit tests

Unit tests can be run from the top level folder using the following command:

```
yarn test:unit
```

### Tests for Contract in `index.unit.spec.ts`


```
[Describe]: Contacts

 [Success]: ✔ verifies if contacts if added from addContactDetails() call
 [Success]: ✔ calls getContacts() and fetches contacts
 [Success]: ✔ deletes contact by calling deleteContact()

    [File]: src/sample/__tests__/index.unit.spec.ts
  [Groups]: 2 pass, 2 total
  [Result]: ✔ PASS
[Snapshot]: 0 total, 0 added, 0 removed, 0 different
 [Summary]: 3 pass,  0 fail, 3 total
    [Time]: 14.242ms

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  [Result]: ✔ PASS
   [Files]: 1 total
  [Groups]: 2 count, 2 pass
   [Tests]: 3 pass, 0 fail, 3 total
    [Time]: 13186.017ms
✨  Done in 14.13s.
```
