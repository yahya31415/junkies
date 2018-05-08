<template>
  <div>
    <div class="appbar">
      <section class="toolbar">
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
      <section class="title">
        <h1>Cafemoto</h1>
      </section>
      <section class="subtitle">
        <span>Lorem ipsum porem foo bar.</span>
      </section>
    </div>

    <div class="favorites">
      <p>Favourites</p>
      <div>
        <div class="itemCard" v-for="i in [1,2,3,4,5,6]" :key="i">
          <img class="itemImg" src="../assets/img/burger.jpg" alt="">
          <div class="itemFooter">
            <h5>Add to cart</h5>
            <img class="heart" src="../assets/img/heart-white.svg" alt="" height="24px" width="24px">
          </div>
        </div>
        <div class="fav-spacing"></div>
      </div>
    </div>

    <div class="itemList">
      <div id="item">
        <div v-for="(cat, j) in category" :key="j">
          <h1 style="margin-bottom:0;">{{cat}}</h1>
          <div v-for="(subcat, i) in subCategory[cat]" :key="i">
            <h2 style="margin: 8px 0">{{subcat.subCategory}}</h2>

            <div v-if="subcat.showVeg">
              <div v-for="(item,m) in items" :key="m">
                <div class="itemContainer" v-if="item.isVeg && item.subCategory === subcat.subCategory">
                  <img src="../assets/img/veg.png" alt="vegICon" width="18px" height="18px">
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
                    <button class="removeBtn" @click="updateMyCart(item,'remove')">
                      <b>-</b>
                    </button>

                    <button class="addBtn" @click="updateMyCart(item,'add')">
                      <b>+</b>
                    </button>
                  </div>
                </div>
              </div>

            </div>
            <div v-if="subcat.showNonVeg">
            <div v-for="(item,n) in items" :key="n">
              <div class="itemContainer" v-if="!item.isVeg && item.subCategory === subcat.subCategory">
                <img src="../assets/img/nonVeg.png" alt="nonVegICon" width="18px" height="18px">
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
                  <button class="removeBtn" v-on:click="updateMyCart(item,'remove')">
                    <b>-</b>
                  </button>
                  <button class="addBtn"  v-on:click="updateMyCart(item,'add')">
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
  import Users from '../models/Users';

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
    updateMyCart: function (item,operation) {
      
      window.firebase.auth().onAuthStateChanged(function(firestoreUser) {
        if (firestoreUser) {
          console.log(firestoreUser.uid)

          const users = new Users(firestoreUser.uid)

          if(operation === 'add') {
            item.qty++
          } else {
            if(item.qty != 0){
              item.qty--
            }
          }

          users.getUser(window.firebase.firestore).then( (data) => {
            console.log(data)

            if('cartId' in data) {
              console.log('cart id available')

              const cart = new OrderItem()
              cart.updateCartById(window.firebase.firestore, data.cartId,item)

            }else{
              console.log('cart id unavailable')
              const cart = new OrderItem()
              cart.updateCart(window.firebase.firestore,item)
            }
          })

         } else {
          this.$router.replace('/login')           
         }
      });
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

        new Users("tejas1234").saveCartId(window.firebase.firestore,ref)
        // customer.saveCartId(window.firebase.firestore,ref)

      })
    })
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
            map['showVeg'] = true

            map['showNonVeg'] = true

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
.appbar {
  width: auto;
  height: 236px;
  background-color: #ff8f00;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  padding-top: 56px;
  background-image: url('../assets/bg3.png');
}
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
.title {
  height: 80px;
  padding-bottom: 8px;
  padding-left: 72px;
  box-sizing: border-box;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.5);
  text-shadow: 0px 0px 16px rgba(0,0,0,0.2);
}
.subtitle {
  height: 72px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  padding-left: 73px;
  box-sizing: border-box;
  text-shadow: 0px 0px 16px rgba(0,0,0,0.2);
}

.favorites {
  background: rgba(0, 0, 0, 0.07);
}
.favorites > p {
  text-transform: uppercase;
  font-size: 12px;
  margin: 0;
  padding: 16px;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.5);
}
.favorites > div {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 0 16px 16px 16px;
}
.fav-spacing {
  width: 16px;
  flex: 0 0 auto;
}
.itemCard {
  display: block;
  height: 210px;
  width: 150px;
  flex: 0 0 auto;
  margin: 0 8px 0 0;
  background-color: #f5f5f5;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.itemCard:hover {
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.4);
  transition: all 0.2s;
}

.itemImg {
  width: 100%;
  height: 160px;
  object-position: center;
  object-fit: cover;
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

.itemList {
  text-align: left;
  padding-left: 16px;
  padding-bottom: 40px;
}

#item {
  margin-bottom: 8px;
}

#item h1 {
  font-size: 24px;
}

#item h2 {
  font-size: 16px;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.5);
  padding: 24px 0 2px 0;
}

#item h3 {
  font-size: 16px;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.5);
}

.itemDetails {
   margin: 0 8px;
   flex: auto;
   text-align: left;
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
  margin: 8px;
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
  background-color: #ff8f00;
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
  border: none;
}

.itemContainer {
  margin-bottom: 16px;
  padding: 8px;
  display: flex;
  justify-content: space-between;
}
</style>
