## Deploying contract through your terminal

The `deploy.sh` file within the scripts folder demonstrates a simple way of deploying a smart contract to the testnet.

```sh
[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable"
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable"
```
The above commands searches the environment variables for `$CONTRACT` and `$OWNER` variables.

```sh
echo "deleting $CONTRACT and setting $OWNER as beneficiary"
echo
near delete $CONTRACT $OWNER
```
These commands deletes the two environment variable , `$CONTRACT` and `$OWNER` if any is found in the codebase, resolving the conflict of having two set of `$CONTRACT` and `$OWNER` variables.

```sh
echo --------------------------------------------
echo
echo "cleaning up the /neardev folder"
echo
rm -rf ./neardev
```
The above shell commands deletes the `./neardev` folder. This folder contains details about the smart contract once deploy, expample is the `CONTRACT_NAME` found in the `dev-account.env` file. This way we can always generate a new `./neardev` folder on every deploy.

```sh
echo --------------------------------------------
echo
echo "rebuilding the contract (release build)"
echo
yarn build:release
```
These commands compiles/builds the AssemlyScript code down to WebAssembly code. This action generates a file with `.wasm` extension that contains the WebAssembly code.

```sh
echo --------------------------------------------
echo
echo "redeploying the contract"
echo
near dev-deploy ../build/release/block-dice.wasm
```
These commands deploys/redeploys the resulting WebAssembly file from the previous action, `yarn build:release`. This file is deployed to the Near blockchain.

```sh
echo --------------------------------------------
echo run the following commands
echo
echo 'export CONTRACT=__new_contract_account_id__'
echo
echo
```

These final commands prompts the developer to export the exported interfaces, making it available for consumption on the local machine.