<template>
  <div>
    <section class="toolbar">
      <router-link to="/">
        <i class="material-icons">keyboard_backspace</i>
      </router-link>
      <div class="left">
        <img src="../assets/logo.png" height="40" alt="">
      </div>
      <div class="right">
        <router-link to="/cart">
          <i class="material-icons">shopping_cart</i>
        </router-link>
        <router-link to="/profile">
          <i class="material-icons">account_circle</i>
        </router-link>
        <a>
          <i class="material-icons">exit_to_app</i>
        </a>
      </div>
    </section>

    <div v-if="showDialog" id="dialog">
      <div class="dialogContainer">
        <div class="dialogItem">
          <img v-if="itemAddOns.isVeg" src="../assets/img/veg.png" alt="veg" width="18px" height="18px">
          <img v-if="!itemAddOns.isVeg" src="../assets/img/nonVeg.png" alt="non-veg" width="18px" height="18px">
          <div>
            <h5>{{itemAddOns.name}}</h5>
            <span>&#8377;{{itemAddOns.price}}</span>
          </div>
        </div>
        <div>
          <h5 style="margin:0;padding:16px 32px;">Add Ons</h5>

          <div v-for="(addOn,i) in itemAddOns.addOns" :key="i">
            <div class="addOn">
              <img v-if="addOn.isVeg" src="../assets/img/veg.png" alt="veg" width="16px" height="16px"> &nbsp;
              <img v-if="!addOn.isVeg" src="../assets/img/nonVeg.png" alt="veg" width="16px" height="16px"> &nbsp;
              <input @click="addOnChecked(addOn.name)" type="checkbox" name="addOns" id="addOnCheck">
              <span>{{addOn.name}} &#8377;{{addOn.price}}</span>
            </div>
          </div>
        </div>
        <hr>
        <div class="dialogFooter">
          <span>Item total &#8377;{{itemAddOns.total}}</span>
          <h5 @click="updateItem()">UPDATE ITEM</h5>
        </div>
      </div>
    </div>
    <div class="orderList">
      <div class="item" v-for="(item,i) in items" :key="i">
        <img v-if="item.isVeg" src="../assets/img/veg.png" alt="vegICon" width="18px" height="18px">
        <img v-if="!item.isVeg" src="../assets/img/nonVeg.png" alt="vegICon" width="18px" height="18px">
        <div class="decription">
          <h4>{{item.name}}</h4>
          <p>{{item.description}}</p>
          <div @click="dialog()" class="cutomize">
            <h5 @click="getAddOns(item)">CUSTOMIZE </h5>
            <i class="material-icons">keyboard_arrow_down</i>
          </div>
        </div>
        <div class="quantity">
          <span class="removeItem" @click="itemCounter(item,'remove')">-</span>
          <span class="qty">{{item.qty}}</span>
          <span class="addItem" @click="itemCounter(item,'add')">+</span>
        </div>
        <h5 class="price">&#8377;{{ item.total}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import CartItems from '../models/CartItems'
import FoodItems from '../models/FoodItems'
import Users from '../models/Users'
import AddOns from '../models/AddOns'

export default {
  name: 'cart',
  data: function () {
    return {
      items: [],
      itemAddOns: {},
      showDialog: false
    };
  },
  methods: {
    itemCounter: function (item, operation) {
      if (operation === 'add') {
        item.qty++;
        item.total += item.price
      } else {
        if (item.qty != 0) {
          item.qty--;
          item.total -= item.price
        }
      }
    },
    dialog: function () {
      this.showDialog = !this.showDialog
    },
    updateItem: function (id) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id == id) {
          this.items[i].total = this.itemAddOns.total
          this.items.addOns = this.itemAddOns.addOns
        }
      }
      this.dialog()

    },
    getAddOns: function (item) {
      for (let i = 0; i < item.addOns; i++) {
        item.addOns[i].isChecked = false
      }
      item.total = item.total
      this.itemAddOns = item
      console.log(this.itemAddOns)
    },
    addOnChecked: function (name) {

      for (let i = 0; i < this.itemAddOns.addOns.length; i++) {

        if (this.itemAddOns.addOns[i].name == name) {
          this.itemAddOns.addOns[i].isChecked = !this.itemAddOns.addOns[i].isChecked

          if (this.itemAddOns.addOns[i].isChecked) {
            this.itemAddOns.total += this.itemAddOns.addOns[i].price
            console.log('if')
            console.log(this.itemAddOns)
          } else {
            console.log('else')
            this.itemAddOns.total -= this.itemAddOns.addOns[i].price
            console.log(this.itemAddOns)
          }
        }
      }
    }
  },
  mounted() {
    var list = []
    window.firebase.auth().onAuthStateChanged(function (firestoreUser) {
      if (firestoreUser) {
        const users = new Users(firestoreUser.uid)
        users.getUser(window.firebase.firestore).then((data) => {

          if ('cartId' in data) {
            new CartItems().getCartById(window.firebase.firestore, data.cartId).then(cartData => {

              new FoodItems().getItems(window.firebase.firestore).then(foodData => {

                foodData.forEach(foodItem => {

                  cartData['items'].forEach(cartItem => {

                    if (foodItem.id == cartItem.id) {
                      foodItem.qty = cartItem.quantity
                      foodItem.total = foodItem.price
                      list.push(foodItem)
                    }
                  })
                })

                new AddOns().getAddOns(window.firebase.firestore).then(itemAddOns => {

                  for (let i = 0; i < list.length; i++) {
                    itemAddOns.forEach(addOn => {

                      if (list[i].id == addOn.itemId) {
                        list[i].addOns = addOn.items
                      }
                    })
                  }
                })
              })
            })
          } else {
            console.log('cart is empty')
          }
        })
      } else {
        this.$router.replace('/login')
      }
      this.items = list
      console.log(this.items)
    }.bind(this))
  }
}
</script>

<style scoped>
.toolbar {
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  padding-left: 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ff8f00;
  background-image: url('../assets/bg3.png');
  z-index: 1000;
}

.toolbar i {
  padding: 10px;
  color: rgba(0, 0, 0, 0.5);
}

.toolbar img {
  height: 26px;
  padding: 10px 16px;
}

.orderList {
  margin-top: 56px;
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
}

.decription p {
  font-size: 13px;
  word-break: break-word;
  margin: 0;
  padding-bottom: 4px;
  color: #616161;
}

.decription h5,
h4 {
  margin: 0;
  padding-bottom: 4px;
  color: #616161
}

.decription {
  width: 100%;
  margin: 0px 8px;
}

.decription i {
  margin-top: -3px;
}

.decription p {
  font-size: 16px;
  margin-bottom: 2px;
}

.quantity span {
  padding: 4px 8px;
  font-size: 16px;
}

.quantity {
  display: flex;
  border: solid grey 1px;
  height: fit-content;
  flex-wrap: space-between;
  margin: 0 8px;
  font-weight: 600;
}

.price {
  margin: 4px 8px;
  font-size: 14px;
  text-align: right;
  color: #616161;
  width: 30px;
}

.addItem,
.qty {
  color: #43A047;
}

.qty {
  width: 20px;
  text-align: center
}

.cutomize {
  display: flex;
}

.cutomize h6 {
  padding-top: 4px;
}

#dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.54);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialogContainer {
  background-color: white;
  width: 90%;
  height: auto;
  padding-bottom: 8px;
}

.addOn {
  display: flex;
  flex-wrap: space-between;
}

.dialogItem {
  background-color: #e0e0e0;
  display: flex;
  flex-wrap: space-between;
  padding: 12px 8px 8px 8px;
}

.dialogItem h5,
.dialogItem span {
  margin-top: 0;
  margin-bottom: 8px;
  padding: 0 16px
}

.addOn {
  display: flex;
  flex-wrap: space-between;
  padding: 8px;
}

.addOn img {
  margin-top: 4px;
}

.addOn span {
  padding-left: 8px;
  margin-top: 4px;
}

span {
  font-size: 13px;
}

hr {
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
}

#addOnCheck {
  -webkit-appearance: none;
  background-color: #fafafa;
  border: 1px solid #cacece;
  padding: 8px;
  position: relative;
  padding: -8px -5px;
}

#addOnCheck:active,
#addOnCheck:checked:active {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 3px rgba(0, 0, 0, 0.1);
}

#addOnCheck:checked {
  background-color: #f57c00;
  border: 1px solid #ff8f00;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05), inset 15px 10px -12px rgba(255, 255, 255, 0.1);
  color: white;
}

#addOnCheck:checked:after {
  content: '\2714';
  font-size: 12px;
  position: absolute;
  top: 0px;
  left: 3px;
  color: white;
}

.dialogFooter {
  width: auto;
  display: flex;
  margin: 8px;
  padding: 8px 16px;
  background-color: #f57c00;
  color: white;
}

.dialogFooter span {
  font-size: 16px !important;
  text-align: left;
  width: 50%;
}

.dialogFooter h5 {
  margin: 0;
  width: 50%;
  flex-wrap: wrap;
  text-align: right;
  letter-spacing: 0.8px;
}
</style>