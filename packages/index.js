import { version } from '../package.json'
import Box from './box'
import Button from './button'
import DesignList from './design-list'

// import directive from '../src/directive';
// import filters from '../src/filters';
// import plugins from '../src/plugins';

const install = function (Vue, opts = {}) {
    Vue.component(Box.name, Box)
    Vue.component(Button.name, Button)
    Vue.component(DesignList.name, DesignList)

    Vue.prototype.$UILIB = {
        size: opts.size || '',
        zIndex: opts.zIndex || 5000
    }
    Vue.prototype.$box = Vue.$box = Box

    // Vue.use(directive);
    // Vue.use(filters);
    // Vue.use(plugins);
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    version,
    install,
    Box,
    Button,
    DesignList
}
