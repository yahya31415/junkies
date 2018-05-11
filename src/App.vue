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
          <a href="#" @click="goToCart" class="material-icons mdc-top-app-bar__action-item" aria-label="Cart" alt="Cart">shopping_cart</a>
          <!-- <router-link to="/profile" class="material-icons mdc-top-app-bar__action-item" aria-label="Profile" alt="Profile">account_circle</router-link>
          <a href="#" @click="signOut" class="material-icons mdc-top-app-bar__action-item" aria-label="Sign Out" alt="Sign Out">exit_to_app</a> -->
        </section>
      </div>
    </header>
    <main>
      <router-view :foodItems="foodItems"></router-view>
    </main>
  </div>
</template>

<script>
import FoodItems from './models/FoodItems';
export default {
  name: 'app',
  data () {
    return {
      foodItems: []
    }
  },
  methods: {
    goToCart () {

    },
    signOut () {
      window.firebase.auth().signOut()
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
    --mdc-theme-secondary: #018786;
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
}
main {
  padding-top: 56px;
}
</style>
