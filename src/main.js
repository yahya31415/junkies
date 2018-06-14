// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex'
import App from './App';
import router from './router';
import createPersistedState from "vuex-persistedstate";
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);
Vue.config.productionTip = false;

window.firebase.firestore()
  .collection('FoodItems')
  .orderBy('order')
  .orderBy('isVeg')
  .onSnapshot(collectionSnapshot => {
    let items = collectionSnapshot.docs.map(doc =>
      Object.assign({}, doc.data(), {
        id: doc.id
      })
    )
    const store = new Vuex.Store({
      state: {
        foodItems: items,
        cart: {},
        user: null,
        userProfile: {}
      },
      mutations: {
        setUser(state, payload) {
          state.user = payload.user
          state.userProfile = payload.userProfile
        },
        addToCart(state, payload) {
          if (state.cart.hasOwnProperty(payload.item)) {
            state.cart = {
              ...state.cart,
              [payload.item]: state.cart[payload.item] + 1
            }
          }
          else state.cart = {
            ...state.cart,
            [payload.item]: 1
          }
        },
        removeFromCart(state, payload) {
          if (state.cart.hasOwnProperty(payload.item) && state.cart[payload.item] > 1) {
            state.cart = {
              ...state.cart,
              [payload.item]: state.cart[payload.item] - 1
            }
          } else if (state.cart[payload.item] === 1) {
            Vue.delete(state.cart, payload.item)
            // delete state.cart[payload.item]
          }
        }

      },
      actions: {
        getUser({commit}) {
          window.firebase.auth().onAuthStateChanged(user => {
            commit('setUser', {
              user: user ? user.uid : null,
              userProfile: user ? {
                displayName: user.displayName,
                phoneNumber: user.phoneNumber
              } : {
                displayName: '',
                phoneNumber: ''
              }
            })
          })
        }
      },
      plugins: [createPersistedState(), createLogger()]
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
  });
