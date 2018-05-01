// // @flow

export default class OrderItem {
    items: [];
    total: number;
    shippingCharge: number;
    tax: number;
    location: string;
    address: string;
    customer: string;
    paymentMethod: string;
    rating: number;
  
    // setName(name: string) {
    //   this.name = name;
    // }
  
    // toJSON = (): Object => ({
    //   name: this.name,
    //   cost: this.cost,
    //   description: this.description,
    //   isVeg: this.isVeg,
    //   category: this.category,
    //   subCategory: this.subCategory
    // });
  
    // saveToDb(firestore: Object) {
    //   firestore()
    //     .collection('FoodItems')
    //     .add(this.toJSON());
    // }
  
    // getItems(firestore: Object) {
    //   return firestore()
    //     .collection('FoodItems')
    //     .orderBy("category")
    //     .orderBy("subCategory")
    //     .orderBy("isVeg")
    //     .get()
    //     .then(collectionSnapshot =>
    //       collectionSnapshot.docs.map(doc => doc.data())
    //     );
    // }
  }
  