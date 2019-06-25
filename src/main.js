import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';

import Vuelidate from "vuelidate";

Vue.use(Vuelidate);

//Установка false отключает предупреждение о работе в режиме разработки при запуске Vue.
Vue.config.productionTip = false

const keys = require('./config/clientConfigs');

const api = axios.create({ baseURL: keys.baseURL })

Object.defineProperty(Vue.prototype, '$http', {
  get() {
    return api
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});


