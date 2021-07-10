dir=$(ls -l ./packages | awk '/^d/ {print $NF}')
# directive=$(ls -l ./src/directive | awk '/^d/ {print $NF}')
# filters=$(ls -l ./src/filters | awk '/^d/ {print $NF}')
# plugins=$(ls -l ./src/plugins | awk '/^d/ {print $NF}')
touch packages/index.js
echo "import '../src/css/theme.less';" >packages/index.js

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

    echo "import $first$second from './$m';" >>packages/index.js
done

echo "
import directive from '../src/directive';
import filters from '../src/filters';
import plugins from '../src/plugins';

const install = function (Vue, opts = {}) {" >>packages/index.js

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

    # -a=与 -o=或 && ||
    if [ ! -f "./packages/$m/$m.js" ]; then
        echo "Vue.component($first$second.name, $first$second);" >>packages/index.js
    fi
done

echo "
Vue.prototype.\$UILIBDEMO = {
    size: opts.size || '',
    zIndex: opts.zIndex || 5000,
};" >>packages/index.js

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

    if [ -f "./packages/$m/$m.js" ]; then
        fileName="$m.js"
        # echo "Vue.prototype.\$$result = (...args) => $first$second.apply(Vue.prototype, [Vue, ...args]);" >>packages/index.js
        echo "Vue.prototype.\$$result = Vue.\$$result = $first$second;" >>packages/index.js
    fi
done

echo "
Vue.use(directive);
Vue.use(filters);
Vue.use(plugins);
};" >>packages/index.js
echo "
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default {
	install," >>packages/index.js

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

    echo "$first$second," >>packages/index.js
done

echo "}" >>packages/index.js
npx prettier --write packages/index.js
