#!/bin/sh
# shellcheck disable=SC2046
watchman watch-del $(pwd) > /dev/null 2>&1
watchman watch-project $(pwd) > /dev/null 2>&1
