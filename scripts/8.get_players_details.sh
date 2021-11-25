#!/usr/bin/env bash

near view $CONTRACT getPlayersDetails --account_id $OWNER '{"gameId": ""}'

exit 0