<template>
  <div id="app" v-if="open && !denied">
    <aside class="mdc-drawer mdc-drawer--persistent mdc-typography mdc-elevation--z10">
      <nav class="mdc-drawer__drawer">
        <header class="mdc-drawer__header">
          <div class="mdc-drawer__header-content">
            <img src="./assets/junkie-02.png" alt="" height="160">
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
                <img src="./assets/junk-03.png" height="28" alt="">
              </router-link>
            </span>
          </section>
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
            <span v-if="Object.keys(cart).length > 0">{{ Object.keys(cart).length }}</span>
            <router-link :disabled="!(Object.keys(cart).length > 0)" to="/cart" class="material-icons mdc-top-app-bar__action-item" aria-label="Cart" alt="Cart" :style="Object.keys(cart).length > 0 ? 'color: rgba(255,255,255,0.7)' : 'color: rgba(0, 0, 0,0.7)'">shopping_cart</router-link>
          </section>
        </div>
      </header>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
  <div id="app2" v-else-if="!open" style="display: flex; justify-content:center; align-items: center; flex-direction: column; background: #efefef;">
    <i class="material-icons" style="font-size: 240px; color: rgba(0,0,0,0.54)">error</i>
    <h1 class="mdc-typography mdc-typography--headline2">Closed Now</h1>
    <p class="mdc-typography mdc-typography--headline6">Opens from 7pm to 5am</p>
  </div>
  <div id="app3" v-else style="display: flex; justify-content:center; align-items: center; flex-direction: column; background: #efefef;">
    <i class="material-icons" style="font-size: 115px; color: rgba(0,0,0,0.54)">not_listed_location</i>
    <h1 class="mdc-typography mdc-typography--headline3">Not Available</h1>
    <p class="mdc-typography mdc-typography--headline6" style="text-align: center;">We are currently not delivering to your location</p>
    <div id="map"></div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'app',
    data() {
      return {
        denied: true,
        map: null,
        clMarker: null
      }
    },
    methods: {
      ...mapMutations(['signOut'])
    },
    computed: {
      ...mapState(['user', 'cart', 'open'])
    },
    created() {
      window.navigator.geolocation.getCurrentPosition(position => {
        var service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
          origins: [{
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }],
          destinations: [{
            lat: 12.937008,
            lng: 77.614657
          }],
          travelMode: 'DRIVING',
        }, callback.bind(this));

        function callback(response) {
          // See Parsing the Results for
          // the basics of a callback function.
          if (response.rows[0].elements[0].status === 'ZERO_RESULTS') {
            this.map = new window.google.maps.Map(document.getElementById('map'), {
              center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              zoom: 14
            });
            this.clMarker = new window.google.maps.Marker({
              position: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              map: this.map,
              icon: {
                url: '/static/icon/blue-dot.png',
                scaledSize: new window.google.maps.Size(80, 80),
                anchor: new window.google.maps.Point(40, 40)
              }
            });
            return
          }
          if (response.rows[0].elements[0].distance.value < 10000) {
            this.denied = false
          } else {
            this.map = new window.google.maps.Map(document.getElementById('map'), {
              center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              zoom: 14
            });
            this.clMarker = new window.google.maps.Marker({
              position: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              map: this.map,
              icon: {
                url: '/static/icon/blue-dot.png',
                scaledSize: new window.google.maps.Size(80, 80),
                anchor: new window.google.maps.Point(40, 40)
              }
            });
          }
        }
      })
    },
    watch: {
      denied() {
        if (!this.denied) {
          window.setTimeout(() => {
            window.mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('.mdc-top-app-bar'));
            let drawer = new window.mdc.drawer.MDCPersistentDrawer(document.querySelector('.mdc-drawer--persistent'));
            document.querySelector('.menu').addEventListener('click', () => drawer.open = !drawer.open);
            document.querySelector('#app').style.minHeight = window.innerHeight + 'px'
            this.$router.afterEach(() => {
              drawer.open = false
            })
          }, 1000)
        }
      }
    }
  }
</script>

<style>
  html,
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif !important;
    width: 100%;
    overflow-x: hidden;
  }

  :root {
    --mdc-theme-primary: #ea3624;
    --mdc-theme-secondary: #fff;
    --mdc-theme-background: #fff;
    --mdc-theme-surface: #ea3624;
    --mdc-theme-on-primary: #fff;
    --mdc-theme-on-secondary: #ea3624;
    --mdc-theme-on-surface: #000;
    --mdc-theme-text-primary-on-background: rgba(0, 0, 0, .54);
    --mdc-theme-text-secondary-on-background: rgba(0, 0, 0, .54);
    --mdc-theme-text-hint-on-background: rgba(0, 0, 0, .38);
    --mdc-theme-text-disabled-on-background: rgba(0, 0, 0, .38);
    --mdc-theme-text-icon-on-background: rgba(0, 0, 0, .38);
    --mdc-theme-text-primary-on-light: rgba(0, 0, 0, .87);
    --mdc-theme-text-secondary-on-light: rgba(0, 0, 0, .54);
    --mdc-theme-text-hint-on-light: rgba(0, 0, 0, .38);
    --mdc-theme-text-disabled-on-light: rgba(0, 0, 0, .38);
    --mdc-theme-text-icon-on-light: rgba(0, 0, 0, .38);
    --mdc-theme-text-primary-on-dark: #fff;
    --mdc-theme-text-secondary-on-dark: hsla(0, 0%, 100%, .7);
    --mdc-theme-text-hint-on-dark: hsla(0, 0%, 100%, .5);
    --mdc-theme-text-disabled-on-dark: hsla(0, 0%, 100%, .5);
    --mdc-theme-text-icon-on-dark: hsla(0, 0%, 100%, .5);
  }

  .mdc-top-app-bar__title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 0;
    width: 100%;
  }

  .mdc-top-app-bar {
    background: linear-gradient(#ea3624, #e06926);
    z-index: 100;
  }

  .mdc-slider:not(.mdc-slider--disabled) .mdc-slider__track-container {
    background-color: rgba(0, 0, 0, .1);
  }

  .mdc-top-app-bar__section--align-end>span {
    background: #fff;
    color: #ea3624;
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

  #app2,
  #app3 {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px;
  }

  #app3 #map {
    height: 160px;
    width: 320px;
    margin: 56px 0;
  }

  #app>div {
    width: 100%;
  }

  .mdc-drawer {
    z-index: 1000;
  }

  .mdc-drawer header {
    height: 180px;
  }

  .mdc-drawer header>div {
    flex-direction: column;
    align-items: center !important;
  }
  a[disabled] {
    pointer-events:none;
    opacity:0.6;
  }
</style>
