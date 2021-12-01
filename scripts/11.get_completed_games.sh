#!/usr/bin/env bash

near call $CONTRACT getCompletedGames --account_id $PLAYER

exit 0