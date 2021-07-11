import Vue from 'vue';
import App from './App.vue';
import UILibDemo from '../../';
import UILibDemoButton from '../../lib/button';
import '../../lib/style/index.css';
import router from './router';
import store from './store';
import esm from '../../lib/index.esm.js';
import esmbutton from '../../es/button.js';

Vue.config.productionTip = false;

console.log(UILibDemo, UILibDemoButton, esm, esmbutton);
Vue.use(UILibDemo);

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
