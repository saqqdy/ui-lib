#!/bin/sh
#created by saqqdy on 2020/07/09

argvs=($*)
argv=${argvs[0]}
if [ $argv == "--deploy" ]; then
    git tag | grep "." | xargs git tag -d
fi
ver=$(node ./bin/push.js $*)
let "errors |= $?"
if [ $errors == '0' ] && [ $argv == "--deploy" ]; then
    echo "\033[32mv${ver}发版已完成!\033[0m"
else
    echo $ver
fi
