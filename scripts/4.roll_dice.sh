#!/usr/bin/env bash

near call $CONTRACT rollDice --account_id $PLAYER '{"gameId": "BD-3940652996"}' 

exit 0