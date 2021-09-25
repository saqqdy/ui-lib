import Vue from 'vue'
import App from './App.vue'
import '../../lib/style/index.css'
import router from './router'
import store from './store'
import esm from '../../lib/index.esm.js'
import esmbutton from '../../es/button.js'
import UILib from '../../'
import UILibButton from '../../lib/button'

Vue.config.productionTip = false

console.log(UILib, UILibButton, esm, esmbutton)
Vue.use(UILib)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
