#!/usr/bin/env bash

near call $CONTRACT getWinnings --account_id $OWNER '{"gameId": ""}'

exit 0