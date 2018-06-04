<template>
    <div id="location">
      <div id="appbar"></div>  
      <div id="map-container">
        <div id="map"></div>
      <div class="mdc-slider mdc-slider--discrete mdc-slider--display-markers" tabindex="0" role="slider"
        aria-valuemin="1" aria-valuemax="4" aria-valuenow="4" aria-label="Checkout" aria-disabled>
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
    <div>
      <div class="state"> <input type="checkbox" id="payment" disabled> <h3>Payment received</h3></div>
      <div class="state"> <input type="checkbox" id="confirmed" disabled> <h3>Order Confirmed</h3></div>
      <div class="state"> <input type="checkbox" id="kitchen" disabled> <h3>In the kitchen</h3></div>
      <div class="state"> <input type="checkbox" id="ontheway" disabled> <h3>On the way </h3></div>   
      <div class="state"> <input type="checkbox" id="delivered" disabled> <h3>Delivered </h3></div>   
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
      location: null,
      latitude: 0.0,
      longitude: 0.0
    }
  },
  mounted() {
    // console.log(this.$route.params.id)
    window.firebase.firestore()
      .collection('Confirmed Orders')
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        //  console.log(doc.data())
        let state = null;

        if(doc.data().razorpayResponse != undefined){
          if(doc.data().razorpayResponse.razorpay_payment_id != undefined){
             document.getElementById("payment").checked = true;
             state = "payment"
          } 
        }
        if(doc.data().confirmed != undefined){
             document.getElementById("confirmed").checked = true;
             document.getElementById("kitchen").checked = true; 
             state = "kitchen"           
        }
       
        if(doc.data().dispatched != undefined){
             document.getElementById("ontheway").checked = true;
             state = "ontheway"
        }
        if(doc.data().delivered != undefined){
             document.getElementById("delivered").checked = true;
             state = "delivered"
        }

        document.getElementById(state).style.color = 'black'
        
        if(state === "ontheway"){
           window.firebase.firestore()
            .collection("drivers").doc(doc.data().driver)
            .onSnapshot(function(driver) {
              this.location = driver.data().location.lat
              this.location = driver.data().location.lat
                // console.log("Current data: ", doc.data());
          });
        }
    window.setTimeout(() => {
      window.navigator.geolocation.getCurrentPosition(position => {
        this.location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
          },
          zoom: 17
        });
        this.marker = new window.google.maps.Marker({
          position: {
           lat: this.latitude,
           lng: this.longitude
          },
          map: this.map,
           icon: {
            url: '/static/icon/blue-dot.png',
            scaledSize: new window.google.maps.Size(80, 80),
            anchor: new window.google.maps.Point(40, 40)
          }
        });
        this.clMarker = new window.google.maps.Marker({
          position: {
           lat: parseFloat(doc.data().lat),
           lng: parseFloat(doc.data().lng)
          },
          map: this.map,
          icon: {
            url: '/static/icon/blue-dot.png',
            scaledSize: new window.google.maps.Size(80, 80),
            anchor: new window.google.maps.Point(40, 40)
          }
        });
        // window.google.maps.event.addListener(this.map, 'drag', () => {
        //   this.location = this.map.getCenter()
        //   this.marker.setPosition(this.map.getCenter()) // set marker position to map center
        //   // updatePosition(this.getCenter().lat(), this.getCenter().lng()); // update position display
        // });
      })
      // window.navigator.geolocation.watchPosition(() =>{
      //   this.marker.setPosition({
      //     lat: this.latitude,
      //     lng: this.longitude
      //   })
      // })
    }, 1000)
  })
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
  margin:8px;
}
input[type="checkbox" ] {
    margin: 16px 8px;
}
</style>
