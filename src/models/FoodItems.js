// // @flow

class FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  isVeg: boolean;
  category: string;
  subcategory: string;

  toJSON = (): Object => ({
    id: this.id,
    name: this.name,
    price: this.price,
    description: this.description,
    isVeg: this.isVeg,
    category: this.category,
    subcategory: this.subcategory
  });

  saveToDb(firestore: Object) {
    firestore()
      .collection('FoodItems')
      .add(this.toJSON());
  }

}

export default class FoodItems {
  constructor(firestore: Object) {
    return firestore()
      .collection('FoodItems')
      .orderBy('order')
      .get()
      .then(collectionSnapshot =>
        collectionSnapshot.docs.map(doc =>
          Object.assign({}, doc.data(), { id: doc.id })
        )
      ).then(items => items.map(item => {
          var fi = new FoodItem()
          fi.id = item.id
          fi.name = item.name
          fi.price = item.price
          fi.description = item.description
          fi.isVeg = item.isVeg
          fi.category = item.category
          fi.subcategory = item.subcategory
          return fi
        })
      );
  }
}
