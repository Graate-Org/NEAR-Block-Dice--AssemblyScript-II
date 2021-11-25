#!/usr/bin/env bash

near call $CONTRACT rollDice --account_id $PLAYER '{"gameId": ""}' 

exit 0