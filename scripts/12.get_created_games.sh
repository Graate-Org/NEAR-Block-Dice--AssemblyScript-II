#!/usr/bin/env bash

near call $CONTRACT getCreatedGames --account_id $OWNER

exit 0