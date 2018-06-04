<template>
  <div id="location" v-if="order">
    <div id="appbar"></div>
    <div id="map-container">
      <div id="map"></div>
      <div class="mdc-slider mdc-slider--discrete mdc-slider--display-markers" tabindex="0" role="slider" aria-valuemin="1" aria-valuemax="4"
        aria-valuenow="4" aria-label="Checkout" aria-disabled>
        <div class="mdc-slider__track-container">
          <div class="mdc-slider__track"></div>
          <div class="mdc-slider__track-marker-container"></div>
        </div>
        <div class="mdc-slider__thumb-container">
          <div class="mdc-slider__pin">
            <span class="mdc-slider__pin-value-marker"></span>
          </div>
          <!-- <svg class="mdc-slider__thumb" width="21" height="21">
            <circle cx="10.5" cy="10.5" r="7.875"></circle>
          </svg> -->
          <div class="mdc-slider__focus-ring"></div>
        </div>
      </div>
      <div>
        <div class="state">
          <input type="checkbox" id="payment" disabled :checked="true">
          <div>
          <h3>{{ order.isCOD ? 'Order Received' : 'Payment Received' }}</h3>
          <p>Order is received and waiting for confirmation</p>
          </div>
        </div>
        <div class="state">
          <input type="checkbox" id="kitchen" disabled :checked="order.confirmed">
          <div>
          <h3>In the kitchen</h3>
          <p>Order is confirmed</p>
          </div>
        </div>
        <div class="state">
          <input type="checkbox" id="ontheway" disabled :checked="order.dispatched">
          <div>
          <h3>On the way </h3>
          <div class="dispatched">
          <p>Your order is dispatched <br>
          <span v-if="driver != null">
          Order will be delivered by <b>{{driver.displayName}}</b>
          </span>
           </p>
          <i class="material-icons" @click="callDriver()">call</i>
          </div>
          </div>
        </div>
        <div class="state">
          <input type="checkbox" id="delivered" disabled :checked="order.delivered">
          <div>
          <h3>Delivered </h3>
          <p>Order is successfully delivered</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'order_progress',
    props: ['id'],
    data() {
      return {
        map: null,
        marker: null,
        clMarker: null,
        order: null,
        driver: null,
        driversLocation: null
      }
    },
    methods: {
      callDriver: function(){
        window.open("tel:" + this.driver.phoneNumber)
      }
    },
    mounted() {
      window.firebase.firestore()
        .collection('Confirmed Orders')
        .doc(this.$route.params.id)
        .onSnapshot(function (doc) {

          this.order = Object.assign({}, doc.data(), {
            id: doc.id
          })

          window.setTimeout(() => {

            this.map = new window.google.maps.Map(document.getElementById('map'), {
              center: {
                lat: this.order.location.lat,
                lng: this.order.location.lng
              },
              zoom: 17
            });

            this.clMarker = new window.google.maps.Marker({
              position: {
                lat: this.order.location.lat,
                lng: this.order.location.lng
              },
              map: this.map,
              icon: {
                url: '/static/icon/blue-dot.png',
                scaledSize: new window.google.maps.Size(80, 80),
                anchor: new window.google.maps.Point(40, 40)
              }
            });

            if (this.order.dispatched) {
              window.firebase.firestore()
                .collection("drivers").doc(this.order.driver)
                .onSnapshot((driver) => {
                  this.driver = driver.data()

                  this.marker = new window.google.maps.Marker({
                    position: {
                      lat: this.driver.location.lat,
                      lng: this.driver.location.lng
                    },
                    map: this.map
                    // icon: {
                    //   url: '/static/icon/blue-dot.png',
                    //   scaledSize: new window.google.maps.Size(80, 80),
                    //   anchor: new window.google.maps.Point(40, 40)
                    // }
                  });

                  var directionsService = new window.google.maps.DirectionsService();
                  var directionsRequest = {
                    origin: this.driver.location,
                    destination: this.order.location,
                    travelMode: window.google.maps.DirectionsTravelMode.DRIVING,
                    unitSystem: window.google.maps.UnitSystem.METRIC
                  };

                  directionsService.route(
                    directionsRequest,
                    (response, status) => {
                      console.log(response)
                      if (status == window.google.maps.DirectionsStatus.OK) {
                        new window.google.maps.DirectionsRenderer({
                          map: this.map,
                          directions: response
                        });
                      }

                    }
                  );
                })

            }
            // }

          }, 1000)
        }.bind(this))
    }
  }

</script>

<style>
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

  .state {
    display: flex;
  }

  .state h3 {
    color: #616161;
    margin: 0px 8px;
  }

  .state p {
    color: #969696;
    margin: 0 8px 16px 8px;
  }

  input[type="checkbox"] {
    margin: 16px 8px;
  }

  .dispatched {
    display: flex;
  }

  .dispatched p {
    width: auto;
  }

  .dispatched i {
    height: 40px;
    padding: 8px;
  }

</style>
