#!/usr/bin/env bash

near call $CONTRACT getWinners --account_id $OWNER '{"gameId": "BD-1048959492"}'

exit 0