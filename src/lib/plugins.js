export default () => {
  return {
    init: (firebase) => {
      return (store) => {
        firebase.firestore().collection('config').doc('delivery')
          .onSnapshot(snapshot => {
            store.commit('open', snapshot.data().open)
          })
        firebase.auth().onAuthStateChanged(user => {
          store.commit('setUser', {
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
        firebase.firestore()
          .collection('FoodItems')
          .orderBy('order')
          .orderBy('isVeg')
          .onSnapshot(collectionSnapshot => {
            let items = collectionSnapshot.docs.map(doc =>
              Object.assign({}, doc.data(), {
                id: doc.id
              })
            )
            store.commit('setItems', items)
          })
      }
    }
  }
}