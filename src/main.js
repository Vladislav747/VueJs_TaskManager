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

// Метод Object.defineProperty() определяет новое или изменяет существующее свойство непосредственно на объекте, возвращая этот объект.
// Vue.prototype - Объект на котором применяется, $http - новое свойство
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


