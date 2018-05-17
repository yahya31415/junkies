<template>
  <div id="app">
    <header class="mdc-top-app-bar mdc-top-app-bar--fixed">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <a href="#" class="material-icons mdc-top-app-bar__navigation-icon">menu</a>
        </section>
        <section class="mdc-top-app-bar__section">
          <span class="mdc-top-app-bar__title"><img src="./assets/logo.png" height="24" alt=""></span>
        </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
          <router-link to="/cart" class="material-icons mdc-top-app-bar__action-item" aria-label="Cart" alt="Cart">shopping_cart</router-link>
          <!-- <router-link to="/profile" class="material-icons mdc-top-app-bar__action-item" aria-label="Profile" alt="Profile">account_circle</router-link>
          <a href="#" @click="signOut" class="material-icons mdc-top-app-bar__action-item" aria-label="Sign Out" alt="Sign Out">exit_to_app</a> -->
        </section>
      </div>
    </header>
    <main>
      <router-view :addToCart="addToCart" :removeFromCart="removeFromCart" :subtotal="subtotal" :delivery="delivery" :packaging="packaging" :total="total" :getItemTotal="getItemTotal"></router-view>
    </main>
  </div>
</template>

<script>
import FoodItems from './models/FoodItems';
export default {
  name: 'app',
  methods: {
    getItemTotal (id) {
      for (var i=0; i<this.foodItems.length; i++) {
        if (this.foodItems[i].id === id) {
          return this.foodItems[i].price * this.cart[id]
        }
      }
    },
    goToCart () {

    },
    signOut () {
      window.firebase.auth().signOut()
    },
    addToCart (id) {
      if (this.cart.hasOwnProperty(id)) this.$set(this.cart, id, this.cart[id] + 1)
      else this.$set(this.cart, id, 1)
    },
    removeFromCart (id) {
      if (this.cart.hasOwnProperty(id) && this.cart[id] > 1) this.$set(this.cart, id, this.cart[id] - 1)
      else if (this.cart.hasOwnProperty(id) && this.cart[id] === 1) this.$delete(this.cart, id)
    },
    itemCounter: function (id, operation) {
      if (operation === 'add') {
        this.cart[id] = this.cart[id] + 1;
      } else {
        if (this.cart[id] != 1) {
          this.cart[id] = this.cart[id] - 1;
        } else {
          var cart = Object.assign({}, this.cart)
          delete cart[id]
          this.cart = cart
        }
      }
    }
  },
  computed: {
    subtotal () {
      var _total = 0
      for (var i in this.cart) {
        _total += this.getItemTotal(i)
      }
      return _total
    },
    delivery () {
      return 50
    },
    packaging () {
      return 20
    },
    total () {
      return this.subtotal + this.delivery + this.packaging
    }
  },
  mounted () {
    window.mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('.mdc-top-app-bar'));

    // get Food Items
    let _getFoodItems = new FoodItems(window.firebase.firestore)
    _getFoodItems.then(foodItems => {
      this.foodItems = foodItems
    })
  }
}
</script>

<style>
html,body {
  margin: 0;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
  overflow-x: hidden;
}
:root {
    --mdc-theme-primary: #ff8f00;
    --mdc-theme-secondary: #000;
    --mdc-theme-background: #fff;
    --mdc-theme-surface: #fff;
    --mdc-theme-on-primary: rgba(0,0,0,0.5);
    --mdc-theme-on-secondary: #fff;
    --mdc-theme-on-surface: #000;
    --mdc-theme-text-primary-on-background: rgba(0,0,0,.87);
    --mdc-theme-text-secondary-on-background: rgba(0,0,0,.54);
    --mdc-theme-text-hint-on-background: rgba(0,0,0,.38);
    --mdc-theme-text-disabled-on-background: rgba(0,0,0,.38);
    --mdc-theme-text-icon-on-background: rgba(0,0,0,.38);
    --mdc-theme-text-primary-on-light: rgba(0,0,0,.87);
    --mdc-theme-text-secondary-on-light: rgba(0,0,0,.54);
    --mdc-theme-text-hint-on-light: rgba(0,0,0,.38);
    --mdc-theme-text-disabled-on-light: rgba(0,0,0,.38);
    --mdc-theme-text-icon-on-light: rgba(0,0,0,.38);
    --mdc-theme-text-primary-on-dark: #fff;
    --mdc-theme-text-secondary-on-dark: hsla(0,0%,100%,.7);
    --mdc-theme-text-hint-on-dark: hsla(0,0%,100%,.5);
    --mdc-theme-text-disabled-on-dark: hsla(0,0%,100%,.5);
    --mdc-theme-text-icon-on-dark: hsla(0,0%,100%,.5);
}
.mdc-top-app-bar__title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0;
  width: 100%;
}
.mdc-top-app-bar {
  background-image: url('./assets/bg3.png');
  z-index: 100;
}
.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__track-container {
    background-color: rgba(0,0,0,.1);
}
main {
  padding-top: 56px;
}
</style>
