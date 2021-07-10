import Vue from 'vue';
import App from './App.vue';
import UILibDemo from '../../';
// import UILibDemoButton from '../../lib/button';
import '../../lib/style/index.css';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

console.log(UILibDemo);
Vue.use(UILibDemo);

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
