// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex'
import App from './App';
import router from './router';
import createPersistedState from "vuex-persistedstate";
import createLogger from 'vuex/dist/logger'

import mutations from './lib/mutations'
import actions from './lib/actions'
import plugins from './lib/plugins'
import getters from './lib/getters'

Vue.use(Vuex);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    open: false,
    foodItems: [],
    cart: {},
    user: null,
    userProfile: {}
  },
  getters: getters(),
  mutations: mutations(Vue),
  actions: actions(),
  plugins: [plugins().init(window.firebase), createPersistedState(), createLogger()]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  template: '<App/>',
  components: {
    App
  }
});
