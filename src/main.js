import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import VueSocketIO from 'vue-socket.io';
import 'u-reset.css';

Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://127.0.0.1:7001',
  options: { query: {username: sessionStorage.getItem('token') || ''} }
}))

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
