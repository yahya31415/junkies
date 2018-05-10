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
    
    <div class="orderList">
      <div class="item" v-for="(item,i) in items" :key="i">
        <img v-if="item.isVeg" src="../assets/img/veg.png" alt="vegICon" width="18px" height="18px">
        <img v-if="!item.isVeg" src="../assets/img/nonVeg.png" alt="vegICon" width="18px" height="18px">
        <div class="decription">
          <h4>{{item.name}}</h4>
          <p>{{item.description}}</p>
          <div class="cutomize">
          <h5>CUSTOMIZE </h5>
            <i class="material-icons">keyboard_arrow_down</i>
          </div>
        </div>    
        <div class="quantity">
          <span class="removeItem" @click="itemCounter(item,'remove')">-</span>
          <span class="qty">{{item.qty}}</span>
          <span class="addItem" @click="itemCounter(item,'add')">+</span>
        </div>
         <h5 class="price">&#8377;{{item.qty * item.price}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import CartItems from '../models/CartItems'
import FoodItems from '../models/FoodItems'
import Users from '../models/Users'
export default {
  name: 'cart',
  data: function () {
    return {
      items: []
    };
  },
  methods: {
    itemCounter: function(item,operation) {
      if(operation === 'add') {
        item.qty++;
      }else{
        if(item.qty != 0) {
          item.qty--;
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
                      list.push(foodItem)
                    }
                  })
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
  opacity: 0.7;
}
.decription h5, h4 {
  margin: 0;
  padding-bottom: 4px;
  opacity: 0.7;  
}
.decription {
  width: 100%;
  margin: 0px 8px;
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
  opacity: 0.7;
  width: 30px;
}
.addItem, .qty {
  color: #43A047;
}
.qty {
  /* width: 25px; */
  width: 20px;  
  text-align: center
}
.cutomize {
  display: flex;
}
.cutomize h6{
  padding-top: 4px;
}
</style>