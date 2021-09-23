###
# @Description:
# @Author: saqqdy
# @LastEditors: saqqdy
# @Date: 2021-07-12 09:33:06
# @LastEditTime: 2021-07-14 09:38:08
###
#!/bin/sh

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
