#!/usr/bin/env bash

near call $CONTRACT getCompletedGames --account_id $OWNER

exit 0