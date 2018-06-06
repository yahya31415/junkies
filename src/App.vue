<template>
  <div id="app" v-if="!denied">
    <aside class="mdc-drawer mdc-drawer--persistent mdc-typography mdc-elevation--z10">
      <nav class="mdc-drawer__drawer">
        <header class="mdc-drawer__header">
          <div class="mdc-drawer__header-content">
            <img src="/static/img/icons/android-chrome-512x512.png" alt="" height="160">
          </div>
        </header>
        <nav id="icon-with-text-demo" class="mdc-drawer__content mdc-list">
          <router-link :class="'mdc-list-item' + ($route.path === '/' ? ' mdc-list-item--activated' : '')" to="/">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">shopping_cart</i>Order
          </router-link>
          <router-link v-if="user" :class="'mdc-list-item' + ($route.path === '/history' ? ' mdc-list-item--activated' : '')" to="/history">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">history</i>History
          </router-link>
          <router-link v-if="user" :class="'mdc-list-item' + ($route.path === '/profile' ? ' mdc-list-item--activated' : '')" to="/profile">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">person</i>Profile
          </router-link>
          <a v-if="user" @click="signOut" :class="'mdc-list-item'" href="#">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">exit_to_app</i>Sign Out
          </a>
          <router-link v-if="!user" :class="'mdc-list-item' + ($route.path === '/login' ? ' mdc-list-item--activated' : '')" to="/login">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">person</i>Login
          </router-link>
        </nav>
      </nav>
    </aside>
    <div>
      <header class="mdc-top-app-bar mdc-top-app-bar--fixed">
        <div class="mdc-top-app-bar__row">
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <a href="#" class="material-icons mdc-top-app-bar__navigation-icon menu">menu</a>
          </section>
          <section class="mdc-top-app-bar__section">
            <span class="mdc-top-app-bar__title">
              <router-link to="/" style="display: inline-flex;">
                <img src="./assets/logo2.png" height="28" alt="">
              </router-link>
            </span>
          </section>
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
            <span v-if="Object.keys(cart).length > 0">{{ Object.keys(cart).length }}</span>
            <router-link to="/cart" class="material-icons mdc-top-app-bar__action-item" aria-label="Cart" alt="Cart" :style="Object.keys(cart).length > 0 ? 'color: rgba(255,255,255,0.7)' : 'color: rgba(0, 0, 0,0.7)'">shopping_cart</router-link>
            <!-- <router-link to="/profile" class="material-icons mdc-top-app-bar__action-item" aria-label="Profile" alt="Profile">account_circle</router-link>
            <a href="#" @click="signOut" class="material-icons mdc-top-app-bar__action-item" aria-label="Sign Out" alt="Sign Out">exit_to_app</a> -->
          </section>
        </div>
      </header>
      <main>
        <router-view :addToCart="addToCart" :removeFromCart="removeFromCart" :subtotal="subtotal" :delivery="delivery" :packaging="packaging" :total="total" :getItemTotal="getItemTotal"></router-view>
      </main>
    </div>
  </div>
  <div id="app" v-else style="display: flex; justify-content:center; align-items: center; flex-direction: column; background: #efefef;">
    <i class="material-icons" style="font-size: 240px; color: rgba(0,0,0,0.54)">error</i>
    <h1 class="mdc-typography mdc-typography--headline2">Sorry!</h1>
    <p class="mdc-typography mdc-typography--headline6">Currently not delivering to your location</p>
  </div>
</template>

<script>
import FoodItems from './models/FoodItems';
export default {
  name: 'app',
  data () {
    return {
      denied: false
    }
  },
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
  created () {
    window.navigator.geolocation.getCurrentPosition(position => {
      var service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [{lat: position.coords.latitude, lng: position.coords.longitude}],
          destinations: [{lat:  12.937008, lng: 77.614657}],
          travelMode: 'DRIVING',
          // transitOptions: TransitOptions,
          // drivingOptions: DrivingOptions,
          // unitSystem: UnitSystem,
          // avoidHighways: Boolean,
          // avoidTolls: Boolean,
        }, callback.bind(this));

      function callback(response) {
        // See Parsing the Results for
        // the basics of a callback function.
        if (response.rows[0].elements[0].distance.value > 5000) {
          this.denied = true
        }
      }
    })
  },
  mounted () {
    window.mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('.mdc-top-app-bar'));

    let drawer = new window.mdc.drawer.MDCPersistentDrawer(document.querySelector('.mdc-drawer--persistent'));
    document.querySelector('.menu').addEventListener('click', () => drawer.open = !drawer.open);

    // get Food Items
    let _getFoodItems = new FoodItems(window.firebase.firestore, foodItems => {
      this.foodItems = foodItems
    })
    console.log(_getFoodItems)

    window.firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user.uid : null;
      this.userProfile = {displayName: user.displayName, phoneNumber: user.phoneNumber}
    })

    document.querySelector('#app').style.minHeight = window.innerHeight + 'px'

    this.$router.afterEach(() => {
      drawer.open = false
    })
  }
}
</script>

<style>
html,body {
  margin: 0;
  font-family: 'Open Sans', sans-serif !important;
  width: 100%;
  overflow-x: hidden;
}
:root {
    --mdc-theme-primary: #0097A7;
    --mdc-theme-secondary: #fff;
    --mdc-theme-background: #fff;
    --mdc-theme-surface: #0097A7;
    --mdc-theme-on-primary: #fff;
    --mdc-theme-on-secondary: #0097A7;
    --mdc-theme-on-surface: #000;
    --mdc-theme-text-primary-on-background: rgba(0,0,0,.54);
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
.mdc-top-app-bar__section--align-end > span {
  background: #fff;
  color: var(--mdc-theme-primary);
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
}
main {
  padding-top: 56px;
  width: 100%;
}
#app {
  display: flex;
}
#app > div {
  width: 100%;
}
.mdc-drawer header {
  height: 180px;
}
.mdc-drawer header > div {
  flex-direction: column;
  align-items: center !important;
}
</style>
