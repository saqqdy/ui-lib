###
# @Description:
# @Author: saqqdy
# @LastEditors: saqqdy
# @Date: 2021-07-12 09:33:06
# @LastEditTime: 2021-07-14 09:43:13
###
#!/bin/sh

# 生成文档
npx jsdoc2md packages/**/*{.js,.vue} > API.md

echo '\033[32mbuild docs complate!\033[0m'
