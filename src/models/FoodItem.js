// // @flow

import { saveToFirebase, getItemsList } from '../controllers/db'

export default class FoodItem {
    name: string;
    price: number;
    description: string;
    isVeg: boolean;
    category: string;
    subCategory: string;

    setName (name: string) {
      this.name = name
    }

    setPrice (price: number) {
      this.price = price
    }

    setDescription (description: string) {
      this.description = description
    }

    setIsVeg (isVeg: boolean) {
      this.isVeg = isVeg
    }

    setCategory (category: string) {
      this.category = category
    }

    setSubCategory (subCategory: string) {
      this.subCategory = subCategory
    }

    toJSON = (): Object => ({
      name: this.name,
      cost: this.cost,
      description: this.description,
      isVeg: this.isVeg,
      category: this.category,
      subCategory: this.subCategory
    })

    saveToDb (firestore: Object) {
      saveToFirebase(firestore, 'FoodItems', this.toJSON())
    }

    getItems () {
      getItemsList()
    }
}
