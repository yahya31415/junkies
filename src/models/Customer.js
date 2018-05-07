// // @flow

export default class Customer {
  id: String
  name: String
  phone: String
  address: []
  cartId: String

  constructor(id: String) {
    this.id = id;
  }
  setName(name: String) {
    this.name = name;
  }

  setPhone(phone: String) {
    this.phone = phone;
  }

  setCartId(cartId: String) {
    this.cartId = cartId;
  }

  saveCartId(firestore: Object, cartId: String) {
    firestore()
      .collection("Users1").doc(this.id).set({
        cartId: cartId
      })
      .then(function () {
        console.log("cart id added!");
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  getCustomer(firestore: Object) {
    return firestore()
      .collection('Users1')
      .doc(this.id)
      .get()
      .then(collectionSnapshot =>
        collectionSnapshot.docs.map(doc => doc.data())
      );
  }
}
