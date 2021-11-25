#!/usr/bin/env bash

near call $CONTRACT joinGame --account_id $PLAYER '{"gameId": "BD-2796285225"}' --amount 0.5

exit 0