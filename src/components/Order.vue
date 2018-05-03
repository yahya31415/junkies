<template>
  <div>
    <div class="section1">
      <div class="itemCard">
        <img class="itemImg" src="../assets/img/burger.jpg" alt="">
        <div class="itemFooter">
          <h5>Add to cart</h5>
          <img class="heart" src="../assets/img/heart-white.svg" alt="" height="24px" width="24px">
        </div>
      </div>
      <div class="itemCard">
        <img class="itemImg" src="../assets/img/burger.jpg" alt="">
        <div class="itemFooter">
          <h5>Add to cart</h5>
          <img class="heart" src="../assets/img/heart-white.svg" alt="" height="24px" width="24px">
        </div>
      </div>
      <div class="itemCard">
        <img class="itemImg" src="../assets/img/burger.jpg" alt="">
        <div class="itemFooter">
          <h5>Add to cart</h5>
          <img class="heart" src="../assets/img/heart-white.svg" alt="" height="24px" width="24px">
        </div>
      </div>
      <div class="itemCard">
        <img class="itemImg" src="../assets/img/burger.jpg" alt="">
        <div class="itemFooter">
          <h5>Add to cart</h5>
          <img class="heart" src="../assets/img/heart-white.svg" alt="" height="24px" width="24px">
        </div>
      </div>
      <div class="itemCard">
        <img class="itemImg" src="../assets/img/burger.jpg" alt="">
        <div class="itemFooter">
          <h5>Add to cart</h5>
          <img class="heart" src="../assets/img/heart-white.svg" alt="" height="24px" width="24px">
        </div>
      </div>
      <div class="itemCard">
        <img class="itemImg" src="../assets/img/burger.jpg" alt="">
        <div class="itemFooter">
          <h5>Add to cart</h5>
          <img class="heart" src="../assets/img/heart-white.svg" alt="" height="24px" width="24px">
        </div>
      </div>      
      <h1>Cafemoto</h1>
      <div style="display: flex; justify-content: end;">
        <button class="half-out-button" @click="showCart()"> 
          <img style="height: 35px; padding:8px;" src="../assets/img/cart.svg" alt="">
        </button>
      </div>
    </div>

    <div class="itemList">
      <div id="item">
        <div v-for="(cat, j) in category" :key="j">
          <h1 style="margin-bottom:0;">{{cat}}</h1>
          <div v-for="(subcat, i) in subCategory[cat]" :key="i">
            <h2 style="margin: 8px 0">{{subcat.subCategory}}</h2>

            <h3 v-if="subcat.veg" @click="changeView(subcat,'veg')">Veg ></h3>
            <div v-if="subcat.showVeg">
              <div v-for="(item,m) in items" :key="m">
                <div class="itemContainer" v-if="item.isVeg && item.subCategory === subcat.subCategory">
                  <img src="../assets/img/veg.png" alt="vegICon" width="18px" height="18px" style="position:absolute;display:inline-block;">
                  <div class="itemDetails">
                    <h4>{{item.name}}</h4>
                    <h5>{{item.price}} &#8377;</h5>
                    <p>{{item.description}}</p>
                  </div>

                  <div class="quantity">
                    <div>
                      <button class="itemQty">
                        <b>{{item.qty}}</b>
                      </button>
                    </div>
                    <button class="removeBtn" @click="removeFromCart(item)">
                      <b>-</b>
                    </button>

                    <button class="addBtn" @click="addToCart(item)">
                      <b>+</b>
                    </button>
                  </div>
                </div>
              </div>

            </div>
            <h3 v-if="subcat.nonVeg"  v-on:click="changeView(subcat,'nonVeg')">Non - Veg ></h3>
            <div v-if="subcat.showNonVeg">
            <div v-for="(item,n) in items" :key="n">
              <div class="itemContainer" v-if="!item.isVeg && item.subCategory === subcat.subCategory">
                <img src="../assets/img/nonVeg.png" alt="nonVegICon" width="18px" height="18px" style="position:absolute;display: inline-block;">
                <div class="itemDetails">
                  <h4>{{item.name}}</h4>
                  <h5>{{item.price}} &#8377;</h5>
                  <p>{{item.description}}</p>
                </div>

                <div class="quantity">
                  <div>
                    <button class="itemQty">
                      <b>{{item.qty}}</b>
                    </button>
                  </div>
                  <button class="removeBtn" v-on:click="removeFromCart(item)">
                    <b>-</b>
                  </button>
                  <button class="addBtn"  v-on:click="addToCart(item)">
                    <b>+</b>
                  </button>
                </div>
              </div>
            </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import FoodItem from '../models/FoodItem';
  import OrderItem from '../models/OrderItem';

export default {
  name: 'item',
  data: function () {
    return {
      items: [],
      category: [],
      subCategory: {}
    };
  },
  methods: {
    addToCart: function (item) {
      item.qty++
        this.updateMe()
    },
    removeFromCart: function (item) {
      if (item.qty > 0) {
        item.qty--
      }
      this.updateMe()
    },
    changeView: function (subcat, k) {
      if (k === 'veg') {
        subcat.showVeg = !subcat.showVeg
      } else {
        subcat.showNonVeg = !subcat.showNonVeg
      }
      this.updateMe()
    },
    showCart: function () {
      // let address = null

      var cart = new OrderItem(this.items, "Tejaram Sutar")
      
      navigator.geolocation.getCurrentPosition(function (location) {
        cart.latitude = location.coords.latitude
        cart.longitude = location.coords.longitude

        cart.saveToDb(window.firebase.firestore).then(function(ref) {
        console.log(' ref ' + ref)
      })
      })
      
      // let latlng = new google.maps.LatLng(lat, lng);
      // let geocoder = geocoder = new google.maps.Geocoder();
      // geocoder.geocode({ 'latLng': latlng }, function (results, status) {
      //      if (status == google.maps.GeocoderStatus.OK) {
      //          if (results[1]) {
      //              alert("Location: " + results[1].formatted_address);
      //         }
      //      }
      //  })
    },
    updateMe: function () {
      this.$forceUpdate()
    }
  },
  mounted() {
    var foodItem = new FoodItem();
    foodItem.getItems(window.firebase.firestore).then(function (itemsList) {
      this.items = itemsList
      // console.log(this.items)

      this.items.forEach(item => {
        item.qty = 0
        if (this.category.indexOf(item.category) == -1) {
          this.category.push(item.category)
        }
      })

      this.category.forEach(cat => {
        let subCatList = []
        let newSubCatList = []
        let myData = []

        this.items.forEach(item => {
          if (cat === item.category) {
            subCatList.push(item.subCategory)
          }
        })

        subCatList.forEach(i => {
          let map = {}

          if (newSubCatList.indexOf(i) == -1) {
            newSubCatList.push(i)

            map['subCategory'] = i

            this.items.forEach(mItem => {
              if (mItem.subCategory === i) {

                if (mItem.isVeg) {
                  map['veg'] = true
                } else {
                  map['nonVeg'] = true
                }
              }
            })
            map['showVeg'] = false

            map['showNonVeg'] = false

            // console.log(map)
            myData.push(map)
          }
        })

        this.subCategory[cat] = myData
        // console.log(myData)
      })

      // console.log(this.subCategory);
    }.bind(this))
  }
};

</script>


<style scoped>
.section1 {
  width: auto;
  height: 430px;
  background-color: #ff8f00;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 60px;
}

.itemCard {
  display: inline-block;
  height: 210px;
  width: 150px;
  margin: 50px 20px;
  background-color: #f5f5f5;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.itemCard:hover {
  box-shadow: 0 16px 24px 0 rgba(0, 0, 0, 0.3);
  transform: scale(1.1);
  transition: ease-in-out;
}

.itemImg {
  width: 100%;
  height: 160px;
  object-position: center;
  overflow: hidden;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.itemCard h5 {
  margin: 0;
  padding-right: 10px;
  padding-top: 3px;
  text-align: left;
}

.itemFooter {
  display: flex;
  width: 100%;
  padding-top: 10px;
  justify-content: center;
}

.section1 h1 {
  margin: 0;
  text-align: left;
  opacity: 0.7;
}

.section1::-webkit-scrollbar-thumb:hover {
  background: #fff3e0;
}

.section1::-webkit-scrollbar-thumb:active {
  background: linear-gradient(left, #babdbe, #babdbe);
}

.section1::-webkit-scrollbar {
  height: 8px;
  background-color: #f5f5f5;
}

.heart:active {
  background-image: url(../assets/img/heart-red.svg);
}

.half-out-button {
  bottom: 0;
  right: 5%;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  margin-bottom: 5px;
  background-color: #f5f5f5;
  margin-left: 85%;
}

.itemList {
  text-align: left;
  padding-left: 30px;
  padding-bottom: 40px;
}

#item {
  margin-bottom: 8px;
}

#item h2 {
  font-weight: bolder;
  opacity: 0.85;
  margin-bottom: 10px;
}

#item h3 {
  font-weight: bold;
  opacity: 0.6;
  margin: 0;
  margin-bottom: 16px;
}

.itemDetails {
   display:inline-block;
   margin-right: 16px;
   margin-left: 24px;
   width: 55%;
}

.itemDetails h4 {
  margin-bottom:5px; 
  margin-top: 0;
  font-size: 16px;
}

.itemDetails h5 {
  margin:0;
  color: #43A047;
}

.itemDetails p {
  margin-top: 5px; 
  font-size: 14px;
}

.quantity {
  width: 40%;
  display: inline-block; 
  position: absolute;
  margin-top: 10px;
  padding-right: 16px;
}

.addBtn {
  height: 24px;
  width: 24px;
  margin-left: 4px;
}

.removeBtn {
  height: 24px;
  width: 24px;
}

.itemQty {
  height: 42px;
  width: 42px;
  background-color: #FBC02D;
  color: white;
  margin-left: 8px;
}

.addBtn, .removeBtn {
  background-color: #263238;
  color: white;
}

.removeBtn, .addBtn, .itemQty {  
  border-radius: 50%;
  text-align: center;
}

.itemContainer {
  margin-bottom: 16px;
}
</style>
