#!/usr/bin/env bash

near view $CONTRACT getProfileDetails --account_id $OWNER '{"account": "akinyemi.testnet"}'

exit 0