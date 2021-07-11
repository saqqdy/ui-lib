argvs=($*)
m=${argvs[0]}
if [[ $m != '' ]]; then
    if [[ -d packages/$m ]]; then
        echo '文件夹已存在，是否覆盖？(请输入数字)'
        echo "\033[33;1m1. 覆盖 \033[0m"
        echo "\033[33;1m2. 取消 \033[0m"

        read parameter

        if [[ $parameter == '2' ]]; then
            exit 0
        fi
    fi

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

    mkdir packages/$m
    touch packages/$m/$m.vue
    touch packages/$m/index.js

    echo '
    import '$first$second' from "'./$m.vue'";

    /* istanbul ignore next */
    '$first$second'.install = function (Vue) {
        Vue.component('$first$second'.name, '$first$second');
    };

    export default '$first$second';' >packages/$m/index.js

    echo '
    <template>
        <div>
            <!-- div -->
        </div>
    </template>

    <script>
    export default {
        name: "Wl'$first$second'",
        data: () => ({
            //
        }),
        created() {
            //
        },
        methods: {
            //
        }
    }
    </script>' >packages/$m/$m.vue

    npx prettier --write packages/$m/index.js
    npx prettier --write packages/$m/$m.vue
fi
npx prettier --write components.json
sh script/build-entry.sh
