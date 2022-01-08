#!/usr/bin/env bash

near call $CONTRACT rollDice --account_id $PLAYER '{"gameId": "BD-951970429"}' 

exit 0