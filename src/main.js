import Vue from 'vue';
import axios from 'axios';
import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faPlusCircle,
  faListUl,
  faFilter,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome';
import App from './App';
import router from './router';

import Vuelidate from "vuelidate";

Vue.use(Vuelidate);


library.add(faPlusCircle, faListUl, faFilter, faEdit, faTrash);

Vue.component('font-awesome-icon', FontAwesomeIcon);

//Set up false turn off  warning about work in production mode when we launch volume.
Vue.config.productionTip = false

const keys = require('./config/clientConfigs');

const api = axios.create({
  baseURL: keys.baseURLProduction
})

// if (keys.baseURL) {
//   console.log("You are now using this Url " + keys.baseURL);
// } else {
//   console.log("You are now using this Url " + keys.baseURLProduction);
// }


Object.defineProperty(Vue.prototype, '$http', {
  get() {
    return api
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {

  },
  router,
  render: h => h(App)
});