import Vue from 'vue';
import Vuex from 'vuex';

import presents from './modules/presents';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    presents,
  },
  strict: debug,
});

export default store;
