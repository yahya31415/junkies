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

  constructor(items: Array, customer: string) {
    this.items = items
    this.customer = customer
    this.getItemList()
  }

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

  saveToDb(firestore: Object) {
   return firestore()
      .collection('FoodOrders')
      .add(this.toJSON())
      .then(docRef => this.id = docRef.id)
      .catch(function (error) {
        console.error("Error adding document: ", error);
      })
  }

  // GetAddress() {
  //     var latlng = new google.maps.LatLng(lat, lng);
  //     var geocoder = geocoder = new google.maps.Geocoder();
  //     geocoder.geocode({ 'latLng': latlng }, function (results, status) {
  //         if (status == google.maps.GeocoderStatus.OK) {
  //             if (results[1]) {
  //                 alert("Location: " + results[1].formatted_address);
  //             }
  //         }
  //     });
  // }

  getOrder(firestore: Object, id: String) {
    return firestore()
      .collection('FoodOrders')
      .doc(id)
      .get()
      .then(collectionSnapshot =>
        collectionSnapshot.docs.map(doc => doc.data())
      );
  }
}
