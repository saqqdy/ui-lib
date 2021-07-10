#!bin/sh
# function getdir() {
#     for element in $(ls $1); do
#         dir_or_file=$1"/"$element
#         if [ -d $dir_or_file ]; then
#             getdir $dir_or_file
#         else
#             console $dir_or_file
#         fi
#     done
# }
# function console() {
#     node bin/eslint-modules.js $1
# }
# touch module.json
# getdir "./packages/alert"
touch module.json
node bin/eslint-modules.js $*
npx prettier --write module.json