#!/usr/bin/env bash

near call $CONTRACT getActiveGames --account_id $OWNER

exit 0