import Vuelidate from 'vuelidate';

import Vue from 'vue';
import App from './App.vue';
import '@/assets/styles/tailwind.css';
import '@/assets/styles/custom.css';
import router from './router/router';
import store from './store/index';
import './index.css';

Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  validations: {},
  router,
  store,
  render: h => h(App),
}).$mount('#app');
