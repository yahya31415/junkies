<template>
  <div id="checkout" v-if="user">

    <div id="location" v-if="showLocationDialog">
      <div id="appbar"></div>
      <div id="map-container">
        <div id="map"></div>
      </div>
      <div id="address-container">
        <div class='mdc-card'>
          <div class="mdc-text-field mdc-text-field--textarea mdc-text-field--upgraded">
            <textarea id="textarea" v-model="address" class="mdc-text-field__input" rows="3" cols="40"></textarea>
            <label for="textarea" class="mdc-floating-label mdc-floating-label--float-above">Address</label>
          </div>
        </div>
      </div>
      <button class='mdc-button mdc-button--raised' @click="showLocationDialog = false">Use this location</button>
    </div>

    <div class="mdc-slider mdc-slider--discrete mdc-slider--display-markers" tabindex="0" role="slider"
        aria-valuemin="1" aria-valuemax="4" aria-valuenow="3"
        aria-label="Checkout" aria-disabled>
      <div class="mdc-slider__track-container">
        <div class="mdc-slider__track"></div>
        <div class="mdc-slider__track-marker-container"></div>
      </div>
      <div class="mdc-slider__thumb-container">
        <div class="mdc-slider__pin">
          <span class="mdc-slider__pin-value-marker"></span>
        </div>
        <svg class="mdc-slider__thumb" width="21" height="21">
          <circle cx="10.5" cy="10.5" r="7.875"></circle>
        </svg>
        <div class="mdc-slider__focus-ring"></div>
      </div>
    </div>

    <h2 class="mdc-typography--headline6">Checkout</h2>

    <div class="mdc-card d-flex">
      <span>Cash to be paid</span>
      <span>&#8377; {{ total }}</span>
    </div>

    <div class="mdc-card d-flex">
      <span>Location</span>
      <button class="mdc-button" @click="showLocationDialog = true">{{ address.length > 0 && location !== null ? address : 'Pick from map' }}</button>
    </div>

    <button id="pay_button" class="mdc-button mdc-button--raised" @click="pay">PAY</button>

  </div>
  <div v-else>
    <Login />
  </div>
</template>

<script>
import Login from './Login'

  export default {
    components: {Login},
    data () {
      return {
        showLocationDialog: false,
        map: null,
        marker: null,
        clMarker: null,
        location: null,
        address: '',
        geocoder: null,
        rzp: null
      }
    },
    props: ['total'],
    methods: {
      pay () {
        // Razorpay
        var options = {
            "key": "rzp_test_2HNo9r0SKKUfUC",
            "amount": this.total * 100, // 2000 paise = INR 20
            "name": "Cafemoto",
            "description": "Midnight Online Store",
            "image": "/static/logo.png",
            "handler": function (response){
                window.firebase.firestore().collection("Confirmed Orders").add({
                  phone: window.firebase.auth().currentUser.phoneNumber,
                  location: this.location,
                  address: this.address,
                  items: this.cart,
                  total: this.total,
                  razorpayResponse: response
                }).then(() => {
                  this.$router.replace('/order_progress')
                })
            }.bind(this),
            "theme": {
                "color": "#ff8f00"
            }
        };
        this.rzp = new window.Razorpay(options);
        this.rzp.open()
      }
    },
    watch: {
      showLocationDialog () {
        if (this.showLocationDialog) {
          window.setTimeout(() => {
            window.navigator.geolocation.getCurrentPosition(position => {
              this.location = {lat: position.coords.latitude, lng: position.coords.longitude}
              this.map = new window.google.maps.Map(document.getElementById('map'), {
                center: {lat: position.coords.latitude, lng: position.coords.longitude},
                zoom: 17
              });
              this.marker = new window.google.maps.Marker({
                position: {lat: position.coords.latitude, lng: position.coords.longitude},
                map: this.map
              });
              this.clMarker = new window.google.maps.Marker({
                position: {lat: position.coords.latitude, lng: position.coords.longitude},
                map: this.map,
                icon: {
                  url: '/static/icon/blue-dot.png',
                  scaledSize: new window.google.maps.Size(80,80),
                  anchor: new window.google.maps.Point(40,40)
                }
              });
              this.geocoder = new window.google.maps.Geocoder();
              this.geocoder.geocode({location: {lat: position.coords.latitude, lng: position.coords.longitude}}, (result) => {
                this.address = result[0].formatted_address
              })
              window.google.maps.event.addListener(this.map, 'drag', () => {
                this.location = this.map.getCenter()
                this.marker.setPosition(this.map.getCenter()) // set marker position to map center
                // updatePosition(this.getCenter().lat(), this.getCenter().lng()); // update position display
              });
            })
            window.navigator.geolocation.watchPosition(position => {
              this.clMarker.setPosition({lat: position.coords.latitude, lng: position.coords.longitude})
            })
          }, 1000)
        } else {
          this.map = null
        }
      }
    },
    mounted () {
      const slider = window.mdc.slider.MDCSlider.attachTo(document.querySelector('.mdc-slider'));
      slider.listen('MDCSlider:change', () => console.log(`Value changed to ${slider.value}`));

      var height = window.innerHeight
      document.querySelector('#checkout').style.minHeight = height + 'px'

    },
  }
</script>

<style>
#checkout {
  background: #efefef;
  position: relative;
  z-index: 0;
  padding-bottom: 40px;
}
#checkout h2 {
  margin: 0 16px;
}
.d-flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.mdc-card {
  margin: 16px;
  padding: 16px;
  border-radius: 6px;
}
#location {
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #efefef;
  z-index: 99;
  overflow-y: auto;
}
#appbar {
  width: 100;
  height: 160px;
  background-color: var(--mdc-theme-primary);
  background-image: url('../assets/bg3.png');
}
#map {
  width: 100%;
  height: 100%;
}
#map-container {
  width: 90%;
  padding: 8px;
  height: 360px;
  margin: auto;
  background: #fff;
  position: relative;
  top: -150px;
  border-radius: 6px;
}
#address-container {
  position: relative;
  top: -150px;
}

#location button {
  width: 80%;
  margin: auto;
  position: relative;
  top: -120px;
  display: block;
  color: #fff;
}

#pay_button {
  margin: 32px 16px;
  width: calc(100% - 32px);
  box-sizing: border-box;
  display: block;
  color: #fff;
}
</style>