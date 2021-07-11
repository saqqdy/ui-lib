dir=$(ls -l ./packages | awk '/^d/ {print $NF}')
# plugins=$(ls -l ./src/plugins | awk '/^d/ {print $NF}')
echo '{' >components.json
for m in $dir; do

    arr=($(echo $m | tr '-' ' '))
    result=''
    for var in ${arr[@]}; do
        firstLetter=$(echo ${var:0:1} | awk '{print toupper($0)}')
        otherLetter=${var:1}
        result=$result$firstLetter$otherLetter
    done

    firstResult=$(echo ${result:0:1} | tr '[A-Z]' '[a-z]')
    result=$firstResult${result:1}

    first=$(echo $result | cut -c1 | tr [a-z] [A-Z])
    second=$(echo $result | cut -c2-)

    if [ $m != "utils" ] && [ $m != "style" ]; then
        touch packages/$m/index.js
        if [ -f "./packages/$m/$m.vue" ]; then
            fileName="$m.vue"
        elif [ -f "./packages/$m/index.vue" ]; then
            fileName="index.vue"
        else
            echo "在 \033[32mpackages/$m\033[0m 目录下没有找到可用的入口文件，请按照规范写代码"
            exit 1
        fi

        echo '
        import '$first$second' from "'./$fileName'";' >packages/$m/index.js
        if [ -f "./packages/$m/$m.js" ]; then
            echo 'import '$first$second'Plugin from "'./$m.js'";' >>packages/$m/index.js
        fi
        echo '

        /* istanbul ignore next */
        '$first$second'.install = function (Vue) {
            Vue.component('$first$second'.name, '$first$second');' >>packages/$m/index.js
        if [ -f "./packages/$m/$m.js" ]; then
            echo 'Vue.prototype.$'$m' = Vue.$'$m' = '$first$second'Plugin;' >>packages/$m/index.js
        fi
        echo '
        };

        export default '$first$second';' >>packages/$m/index.js
        npx prettier --write packages/$m/index.js

        echo '"'$m'": "packages/'$m'/index.js",' >>components.json
    fi

done
echo '}' >>components.json
npx prettier --write components.json
