import Vue from 'vue';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App';
import router from './router';

import Vuelidate from "vuelidate";

Vue.use(Vuelidate);


library.add(faPlusCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)
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


