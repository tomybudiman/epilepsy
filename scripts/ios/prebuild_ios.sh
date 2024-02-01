#!/bin/sh
APP_VERSION=$(cat ./package.json | jq -r '.version' | cut -d- -f1)
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $APP_VERSION" "ios/app/Info.plist"
