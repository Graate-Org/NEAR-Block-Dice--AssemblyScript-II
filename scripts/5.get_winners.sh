#!/usr/bin/env bash

near call $CONTRACT getWinners --account_id $OWNER '{"gameId": ""}'

exit 0