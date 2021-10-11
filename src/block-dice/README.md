![Near, Inc. logo](https://near.org/wp-content/themes/near-19/assets/img/logo.svg?t=1553011311)

## Design

### Interface

```ts
export function getContacts(accountId: string): Contact[] | null 
```
- "View" function (ie. a function that does NOT alter contract state)
- Takes account id as a parameters
- Returns all the contact linked to the account or null if there is no contact

```ts
export function addContactDetails(_phone: string, _name: string): void {
```

- "Change" function (ie. a function that alters contract state)
- Takes two parameters, a phone number as a string and a name for the phone number


```ts
export function deleteContact(contactIndex: i32): void {```

- "Change" function (ie. a function that alters contract state)
- Takes two parameters, a phone number as a string and a name for the phone number

