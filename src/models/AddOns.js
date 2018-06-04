// // @flow

export default class AddOns {
    itemId: String
    id: String
    name: String
    price: number

    getAddOns(firestore: Object) {
        return firestore()
          .collection('FoodAddOns')
          .get()
          .then(collectionSnapshot =>
            collectionSnapshot.docs.map(doc => Object.assign({}, doc.data(), {id: doc.id}))
          );
      }
}