import pkg from '../package.json'
import Box from './box'
import Button from './button'

// import directive from '../src/directive';
// import filters from '../src/filters';
// import plugins from '../src/plugins';

const install = function (Vue, opts = {}) {
    Vue.component(Box.name, Box)
    Vue.component(Button.name, Button)

    Vue.prototype.$UILIBDEMO = {
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
    version: pkg.version,
    author: pkg.author.name,
    install,
    Box,
    Button
}
