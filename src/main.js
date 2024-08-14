/* eslint-disable no-alert */
import Vue from 'vue';
import loader from 'vue-ui-preloader';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(loader);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
