#!/usr/bin/env bash

near view $CONTRACT getPlayersDetails --account_id $SIGNER '{"gameId": ""}'

exit 0