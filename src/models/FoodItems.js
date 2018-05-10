// // @flow

export default class FoodItem {
  name: string;
  price: number;
  description: string;
  isVeg: boolean;
  category: string;
  subcategory: string;

  setName(name: string) {
    this.name = name;
  }

  setPrice(price: number) {
    this.price = price;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setIsVeg(isVeg: boolean) {
    this.isVeg = isVeg;
  }

  setCategory(category: string) {
    this.category = category;
  }

  setsubcategory(subcategory: string) {
    this.subcategory = subcategory;
  }

  toJSON = (): Object => ({
    name: this.name,
    cost: this.cost,
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

  getItems(firestore: Object) {
    return firestore()
      .collection('FoodItems')
      .orderBy("order")
      .get()
      .then(collectionSnapshot =>
        collectionSnapshot.docs.map(doc => Object.assign({}, doc.data(), {id: doc.id}))
      );
  }
}
