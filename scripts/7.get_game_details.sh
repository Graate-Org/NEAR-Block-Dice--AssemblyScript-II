#!/usr/bin/env bash

near view $CONTRACT getGameDetails --account_id $OWNER '{"gameId": ""}'

exit 0