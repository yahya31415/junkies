export default (Vue) => {
  return {
    setItems(state, items) {
      state.foodItems = items
    },
    setUser(state, payload) {
      state.user = payload.user
      state.userProfile = payload.userProfile
    },
    addToCart(state, id) {
      if (state.cart.hasOwnProperty(id)) {
        state.cart = {
          ...state.cart,
          [id]: state.cart[id] + 1
        }
      } else state.cart = {
        ...state.cart,
        [id]: 1
      }
    },
    removeFromCart(state, id) {
      if (state.cart.hasOwnProperty(id) && state.cart[id] > 1) {
        state.cart = {
          ...state.cart,
          [id]: state.cart[id] - 1
        }
      } else if (state.cart[id] === 1) {
        Vue.delete(state.cart, id)
      }
    },
    clearCart(state) {
      state.cart = {}
    },
    open(state, isOpen) {
      state.open = isOpen
    },
    signOut() {
      window.firebase.auth().signOut()
    },
  }
}