import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        viexVariable: 'HelloWorld'
    },
    getters: {
        myVariable(state){
            return state.viexVariable + ' modified'
        }
    },

    methods: {
        getFromChild(msg){
            alert(msg);
        }
    },

    computed:{
        ...mapGetters[],
    },


    mutations: {
        increment(state){
            return state;
        }
    },

    actions: {
        
    }

})