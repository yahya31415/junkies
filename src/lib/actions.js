export default () => {
  return {
    cod({
        commit,
        state,
        getters
      }, {
        firebase,
        location,
        address,
        cb
      }) {
      firebase.firestore().collection("Confirmed Orders").add({
        user: firebase.auth().currentUser.uid,
        name: firebase.auth().currentUser.displayName,
        phone: firebase.auth().currentUser.phoneNumber,
        location: location,
        address: address,
        items: state.cart,
        total: getters.total,
        timestamp: new Date(),
        razorpayResponse: null,
        isCOD: true
      }).then((doc) => {
        commit('clearCart')
        cb(doc)
      })
    }
  }
}