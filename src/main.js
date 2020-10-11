import Vue from 'vue';
import Vuelidate from 'vuelidate';
import axios from 'axios';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faPlusCircle,
    faListUl,
    faFilter,
    faEdit,
    faTrash,
    faPalette,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App';
import router from './router';
import globalData from './globalFunctions';

Vue.use(Vuelidate);
library.add(faPlusCircle, faListUl, faFilter, faEdit, faTrash, faPalette);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const api = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
});

Object.defineProperty(Vue.prototype, '$http', {
    get() {
        return api;
    },
});

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    components: {},
    data: globalData,
    router,
    render: h => h(App),
});
