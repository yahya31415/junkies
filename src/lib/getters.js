export default () => {
  return {
    getItemTotal(state) {
      return (id) => {
        for (var i = 0; i < state.foodItems.length; i++) {
          if (state.foodItems[i].id === id) {
            return state.foodItems[i].price * state.cart[id]
          }
        }
      }
    },
    subtotal(state, getters) {
      var _total = 0
      for (var i in state.cart) {
        _total += getters.getItemTotal(i)
      }
      return _total
    },
    delivery() {
      return 50
    },
    packaging() {
      return 20
    },
    total(state, getters) {
      return getters.subtotal + getters.delivery + getters.packaging
    }
  }
}