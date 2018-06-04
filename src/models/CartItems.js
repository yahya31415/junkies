// // @flow

export default class OrderItem {
  id: String = ""
  items: []
  total: number = 0
  shippingCharge: number = 0
  tax: number = 0
  latitude: Number = 0.0
  longitude: Number = 0.0
  address: string = ""
  customer: string
  paymentMethod: string = ""
  rating: number = 0
  list: []
  userId: String

  setId(id: String) {
    this.id = id
  }

  // constructor(id: String) {
  //   this.id = id
  //   this.getItemList()
  // }

  toJSON = (): Object => ({
    items: this.list,
    customer: this.customer,
    latitude: this.latitude,
    longitude: this.longitude,
    address: this.address,
    rating: this.rating,
    total: this.total,
    tax: this.tax,
    shippingCharge: this.shippingCharge,
    paymentMethod: this.paymentMethod
  })

  getItemList() {
    let itemList = []
    this.items.forEach(item => {
      if (item.qty > 0) {
        let data = {}
        data['id'] = item.id
        data['quantity'] = item.qty
        itemList.push(data)
        this.total += item.price * item.qty
      }
    })
    this.list = itemList
  }

  // saveToDb(firestore: Object) {
  //   return firestore()
  //      .collection('FoodOrders')
  //      .add(this.toJSON())
  //      .then(docRef => this.id = docRef.id)
  //      .catch(function (error) {
  //        console.error("Error adding document: ", error);
  //      })
  //  }

  updateCartById(firestore: Object, id: String, item: Object) {
    let dataAdded = false

    this.getCartById(firestore: Object, id: String).then(data => {
      for (let i = 0; i < data.items.length; i++) {
        if (data.items[i].id == item.id) {
          if(item.qty > 0){
          data.items[i].quantity = item.qty
          }else {
            data.items.splice(i, 1);
          }
          firestore().collection("FoodOrders").doc(id).set(data)
          dataAdded = true
        }
      }

      if(!dataAdded) {
        if(item.qty > 0){
        data.items.push({id: item.id, quantity: item.qty})
        firestore().collection("FoodOrders").doc(id).set(data)
        }
      }
    })
  }

  updateCart(firestore: Object, item: Object) {
    return firestore()
      .collection('FoodOrders')
      .add(item)
      .then(docRef => this.id = docRef.id)
      .catch(function (error) {
        console.error("Error adding document: ", error);
      })
  }

  getCartById(firestore: Object, cartId: String) {
    return firestore()
      .collection('FoodOrders')
      .doc(cartId)
      .get()
      .then(doc => doc.data())
  }
}
