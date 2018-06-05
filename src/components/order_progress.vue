<template>
  <div id="location" v-if="order">
    <div id="appbar"></div>
    <div id="map-container" class="mdc-elevation--z6">
      <div id="map"></div>
      <div>
        <div class="state">
          <i class="material-icons mdc-theme--primary">done</i>
          <div>
            <h3>{{ order.isCOD ? 'Order Received' : 'Payment Received' }}</h3>
            <p>Order received. Waiting for confirmation</p>
          </div>
        </div>
        <div class="state">
          <i class="material-icons mdc-theme--primary" v-if="order.confirmed">done</i>
          <i class="material-icons" v-else style="opacity: 0.4">done_outline</i>
          <div :style="!order.confirmed ? 'opacity: 0.4' : 'opacity: 1'">
            <h3>In the kitchen</h3>
            <p v-if="order.confirmed">Will be delivered {{ remTime }}</p>
          </div>
        </div>
        <div class="state">
          <i class="material-icons mdc-theme--primary" v-if="order.dispatched">done</i>
          <i class="material-icons" v-else style="opacity: 0.4">done_outline</i>
          <div :style="!order.dispatched ? 'opacity: 0.4' : 'opacity: 1'">
            <h3>On the way </h3>
            <div class="dispatched" v-if="order.dispatched">
              <p>
                <span v-if="driver != null">
                  Order will be delivered by
                  <b @click="callDriver()" class="mdc-theme--primary">{{driver.displayName}}</b>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="state">
          <i class="material-icons mdc-theme--primary" v-if="order.delivered">done</i>
          <i class="material-icons" v-else style="opacity: 0.4">done_outline</i>
          <div :style="!order.delivered ? 'opacity: 0.4' : 'opacity: 1'">
            <h3>Delivered </h3>
            <p v-if="order.delivered">Order is successfully delivered</p>
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
        driversLocation: null,
        dr: null
      }
    },
    methods: {
      callDriver: function () {
        window.open("tel:" + this.driver.phoneNumber)
      }
    },
    computed: {
      remTime () {
        return window.moment(this.order.timestamp).add(45, 'minutes').fromNow()
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
              zoom: 15
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

                  if (this.marker) this.marker.setMap(null)
                  this.marker = new window.google.maps.Marker({
                    position: {
                      lat: this.driver.location.lat,
                      lng: this.driver.location.lng
                    },
                    map: this.map,
                    icon: {
                      url: '/static/icon/scooter.png',
                      scaledSize: new window.google.maps.Size(40, 40),
                      anchor: new window.google.maps.Point(20, 20)
                    }
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
                        this.dr = new window.google.maps.DirectionsRenderer({
                          map: this.map,
                          directions: response,
                          suppressMarkers: true
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
    margin-bottom: 24px;
  }

  #map-container {
    width: 90%;
    padding: 8px;
    height: 240px;
    margin: auto;
    background: #fff;
    position: relative;
    top: -150px;
    border-radius: 6px;
  }

  .state {
    display: flex;
    align-items: center;
    margin: 16px 0;
  }

  .state h3 {
    color: #616161;
    margin: 0px 8px;
  }

  .state p {
    color: #969696;
    margin: 0 8px 16px 8px;
  }

  .state i {
    width: 50px;
    height: 50px;
    margin: 8px 16px;
    flex: 0 0 50px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ccc;
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
