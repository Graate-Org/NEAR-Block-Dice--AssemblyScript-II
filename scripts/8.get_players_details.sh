#!/usr/bin/env bash

near view $CONTRACT getPlayersDetails --account_id $SIGNER '{"gameId": "BD-951970429"}'

exit 0