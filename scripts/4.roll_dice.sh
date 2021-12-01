#!/usr/bin/env bash

near call $CONTRACT rollDice --account_id $PLAYER '{"gameId": "BD-2083393479"}' 

exit 0