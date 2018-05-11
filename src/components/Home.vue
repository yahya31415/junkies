<template>
  <div id="home">

    <!-- App bar -->
    <div class="appbar mdc-elevation--z4">
      <div class="title">
        <h4 class="mdc-typography--headline4">Cafemoto</h4>
      </div>
      <div class="subtitle">
        <span class="mdc-typography--headline6">Midnight online store</span>
      </div>
    </div>

    <!-- Favourites -->
    <div class="favorites" v-if="false">
      <p>Favourites</p>
      <div>
        <div class="itemCard" v-for="i in [1,2,3,4,5,6]" :key="i">
          <img class="itemImg" src="../assets/img/burger.jpg" alt="">
          <div class="itemFooter">
            <h5>Add to cart</h5>
            <img class="heart" src="../assets/img/heart-white.svg" alt="" height="24px" width="24px">
          </div>
        </div>
        <div class="fav-spacing"></div>
      </div>
    </div>

    <div class="foodItems">
      <div v-for="(subcategories, category) in items" :key="category">
        <span class="mdc-typography--headline4 food-category">{{category}}</span>
        <div v-for="(items, subcategory) in subcategories" :key="subcategory">
          <span class="mdc-typography--overline food-subcategory">{{subcategory}}</span>
          <div v-for="(item, i) in items" :key="i" class="foodItem mdc-card" :veg="item.isVeg">
            <div>
              <span class="mdc-typography--subtitle1 food-name">{{item.name}}</span>
              <span class="mdc-typography--caption food-desc">{{item.description}}</span>
              <span class="mdc-typography--subtitle2 food-price">&#8377; {{item.price}}</span>
            </div>
            <div>
              <div class="cart-modifier">
                <div class="cart-qty mdc-typography--headline4">{{ cart[item.id] }}</div>
                <div>
                  <button><i class="material-icons" @click="addToCart(item.id)">add</i></button>
                  <button><i class="material-icons" @click="removeFromCart(item.id)">remove</i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="itemList">
      <div id="item">
        <div v-for="(cat, j) in category" :key="j">

          <div v-for="(subcat, i) in subcategory[cat]" :key="i">
            <h2 style="margin: 8px 0" class="mdc-typography--headline6">{{subcat.subcategory}}</h2>

            <div v-if="subcat.showVeg">
              <div v-for="(item,m) in items" :key="m">
                <div class="itemContainer" v-if="item.isVeg && item.subcategory === subcat.subcategory">
                  <img src="../assets/img/veg.png" alt="vegICon" width="18px" height="18px">
                  <div class="itemDetails">
                    <h4 class="mdc-typography--headline6">{{item.name}}</h4>
                    <h5>&#8377;{{item.price}}</h5>
                    <p>{{item.description}}</p>
                  </div>

                  <div class="quantity">
                    <div>
                      <button class="itemQty">
                        <b>{{item.qty}}</b>
                      </button>
                    </div>
                    <button class="removeBtn" @click="updateMyCart(item,'remove')">
                      <b>-</b>
                    </button>

                    <button class="addBtn" @click="updateMyCart(item,'add')">
                      <b>+</b>
                    </button>
                  </div>
                </div>
              </div>

            </div>
            <div v-if="subcat.showNonVeg">
            <div v-for="(item,n) in items" :key="n">
              <div class="itemContainer" v-if="!item.isVeg && item.subcategory === subcat.subcategory">
                <img src="../assets/img/nonVeg.png" alt="nonVegICon" width="18px" height="18px">
                <div class="itemDetails">
                  <h4 class="mdc-typography--headline4">{{item.name}}</h4>
                  <h5>&#8377;{{item.price}}</h5>
                  <p>{{item.description}}</p>
                </div>

                <div class="quantity">
                  <div>
                    <button class="itemQty">
                      <b>{{item.qty}}</b>
                    </button>
                  </div>
                  <button class="removeBtn" v-on:click="updateMyCart(item,'remove')">
                    <b>-</b>
                  </button>
                  <button class="addBtn"  v-on:click="updateMyCart(item,'add')">
                    <b>+</b>
                  </button>
                </div>
              </div>
            </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
  import CartItem from '../models/CartItems';
  import Users from '../models/Users';

export default {
  name: 'item',
  props: ['foodItems'],
  data: function () {
    return {
      items: {},
      cart: {}
    };
  },
  methods: {
    updateMyCart: function (item,operation) {
      if(operation === 'add') {
        item.qty++
      } else {
        if(item.qty != 0){
          item.qty--
        }
      }
    },
    changeView: function (subcat, k) {
      if (k === 'veg') {
        subcat.showVeg = !subcat.showVeg
      } else {
        subcat.showNonVeg = !subcat.showNonVeg
      }
      this.updateMe()
    },
    showCart: function () {

      var cart = new CartItem(this.items, "Tejaram Sutar")

      navigator.geolocation.getCurrentPosition(function (location) {
        cart.latitude = location.coords.latitude
        cart.longitude = location.coords.longitude

        cart.saveToDb(window.firebase.firestore).then(function(ref) {
        console.log(' ref ' + ref)

        new Users("tejas1234").saveCartId(window.firebase.firestore,ref)
        // customer.saveCartId(window.firebase.firestore,ref)

      })
    })
    },
    addToCart (id) {
      if (this.cart.hasOwnProperty(id)) this.$set(this.cart, id, this.cart[id] + 1)
      else this.$set(this.cart, id, 1)
    },
    removeFromCart (id) {
      if (this.cart.hasOwnProperty(id) && this.cart[id] > 1) this.$set(this.cart, id, this.cart[id] - 1)
      else if (this.cart.hasOwnProperty(id) && this.cart[id] === 1) this.$delete(this.cart, id)
    }
  },
  watch: {
    foodItems () {
      let _items = {}
      this.foodItems.forEach(item => {
        if (_items[item.category] === undefined) _items[item.category] = {[item.subcategory]: [item]}
        else if (_items[item.category][item.subcategory] === undefined) _items[item.category][item.subcategory] = [item]
        else _items[item.category][item.subcategory].push(item)
      })
      this.items = _items
    }
  },
  mounted() {


    // var foodItem = new FoodItem();
    // foodItem.getItems(window.firebase.firestore).then(function (itemsList) {
    //   this.items = itemsList
    //   // console.log(this.items)

    //   this.items.forEach(item => {
    //     item.qty = 0
    //     if (this.category.indexOf(item.category) == -1) {
    //       this.category.push(item.category)
    //     }
    //   })

    //   this.category.forEach(cat => {
    //     let subCatList = []
    //     let newSubCatList = []
    //     let myData = []

    //     this.items.forEach(item => {
    //       if (cat === item.category) {
    //         subCatList.push(item.subcategory)
    //       }
    //     })

    //     subCatList.forEach(i => {
    //       let map = {}

    //       if (newSubCatList.indexOf(i) == -1) {
    //         newSubCatList.push(i)

    //         map['subcategory'] = i

    //         this.items.forEach(mItem => {
    //           if (mItem.subcategory === i) {

    //             if (mItem.isVeg) {
    //               map['veg'] = true
    //             } else {
    //               map['nonVeg'] = true
    //             }
    //           }
    //         })
    //         map['showVeg'] = true

    //         map['showNonVeg'] = true

    //         // console.log(map)
    //         myData.push(map)
    //       }
    //     })

    //     this.subcategory[cat] = myData
    //     // console.log(myData)
    //   })

    //   // console.log(this.subcategory);
    // }.bind(this))
  }
};

</script>


<style scoped>
.appbar {
  width: auto;
  height: 160px;
  background-color: #ff8f00;
  background-image: url('../assets/bg3.png');
}
.title {
  height: 80px;
  display: flex;
  align-items: flex-end;
  padding-left: 72px;
  padding-bottom: 8px;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.5);
}
.title h4 {
  margin: 0;
}
.subtitle {
  height: 72px;
  color: rgba(0, 0, 0, 0.5);
  padding-left: 76px;
  box-sizing: border-box;
}

#home {
  background: rgba(0, 0, 0, 0.07);
}
.favorites > p {
  text-transform: uppercase;
  font-size: 12px;
  margin: 0;
  padding: 16px;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.5);
}
.favorites > div {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 0 16px 16px 16px;
}
.fav-spacing {
  width: 16px;
  flex: 0 0 auto;
}
.itemCard {
  display: block;
  height: 210px;
  width: 150px;
  flex: 0 0 auto;
  margin: 0 8px 0 0;
  background-color: #f5f5f5;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.itemCard:hover {
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.4);
  transition: all 0.2s;
}

.itemImg {
  width: 100%;
  height: 160px;
  object-position: center;
  object-fit: cover;
  overflow: hidden;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.itemCard h5 {
  margin: 0;
  padding-right: 10px;
  padding-top: 3px;
  text-align: left;
}

.itemFooter {
  display: flex;
  width: 100%;
  padding-top: 10px;
  justify-content: center;
}

.heart:active {
  background-image: url(../assets/img/heart-red.svg);
}

.foodItems {
  padding-top: 16px;
}
.foodItems > div {
  padding: 16px 0;
}
.foodItems > div > div {
  padding: 16px 0;
}
.food-category {
  padding-left: 16px;
}
.food-subcategory {
  padding-left: 16px;
  font-weight: bold;
}
.foodItems > div > div > div span {
  display: block;
}
.foodItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 12px 16px;
  padding: 12px 16px;
  border-radius: 6px;
}
.foodItem[veg] {
  border-left: solid 8px green;
}
.foodItem > div:first-child {
  padding-right: 16px;
}
.food-price {
  padding-top: 12px;
  font-weight: 900;
}
.cart-modifier {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
.cart-modifier > div:last-child {
  display: flex;
}
.cart-modifier button {
  background: none;
  border: solid 2px #000;
  border-radius: 100%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
}
.cart-modifier i {
  font-size: 16px;
  font-weight: bold;
}
</style>
