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
      <!-- <button class="half-out-button"> Half out! </button> -->
    </div>

    <div class="itemList">
      <div id="item">
        <div v-for="(cat, j) in category" :key="j">
          <h1 style="margin-bottom:0;">{{cat}}</h1>
          <div v-for="(subcat, i) in subCategory[cat]" :key="i">
            <h2 style="margin: 8px 0">{{subcat}}</h2>

            <h3 @click.native="myFunction(component.id)">Veg ></h3>
            <div v-for="(item,m) in items" :key="m">
              <div class="itemContainer" v-if="item.isVeg && item.subCategory === subcat">
                 <img src="../assets/img/veg.png" alt="vegICon" width="18px" height="18px" style="position:absolute;display:inline-block;">
               <div class="itemDetails">
                  <h4>{{item.name}}</h4>
                  <h5>{{item.price}}  &#8377;</h5>
                  <p>{{item.description}}</p>
                </div>

                <div class="quantity">
                  <div>
                      <button class="itemQty"><b>1</b></button>
                  </div>
                  <button class="removeBtn"><b>-</b></button>
                  
                  <button class="addBtn"><b>+</b></button>
                </div>
              </div>

            </div>
            <h3>Non - Veg ></h3>
            <div v-for="(item,n) in items" :key="n">
              <div class="itemContainer" v-if="!item.isVeg && item.subCategory === subcat">
                 <img src="../assets/img/nonVeg.png" alt="nonVegICon" width="18px" height="18px" style="position:absolute;display: inline-block;">
              <div class="itemDetails">
                  <h4>{{item.name}}</h4>
                  <h5>{{item.price}}  &#8377;</h5>
                  <p>{{item.description}}</p>
                </div>

                <div class="quantity">
                   <div>
                      <button class="itemQty"><b>1</b></button>
                  </div>
                  <button class="removeBtn"><b>-</b></button>
                  <button class="addBtn"><b>+</b></button>
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
    // checkForItem: function (subcat, type) {
    //   this.items.forEach( item => {
    //     if(item.subCategory === subcat) {
    //       if(type === 'veg') {
    //         if(item.isVeg) {
    //           return true;
    //         }
    //       }
    //       else if(type === 'nonVeg') {
    //         if(!item.isVeg) {
    //           return true;
    //         }
    //       }
    //     }
    //   })
    //   return false
    // }
  },
  mounted() {
    var foodItem = new FoodItem();
    foodItem.getItems(window.firebase.firestore).then(function (itemsList) {
      this.items = itemsList
    //   console.log(itemsList)

      this.items.forEach(item => {
        
        if (this.category.indexOf(item.category) == -1) {
          this.category.push(item.category)
        }
      })

      this.category.forEach(cat => {
          let subCatList = []
          let newSubCatList = []
          this.items.forEach(item => {
              if(cat === item.category) {
                  subCatList.push(item.subCategory)
              }
          })

          subCatList.forEach( i => {
          if(newSubCatList.indexOf(i) == -1) {
            newSubCatList.push(i)
          }
          })

          this.subCategory[cat] = newSubCatList
      });
    //   console.log(this.subCategory);
    }.bind(this))
  }
};

</script>

<style scoped>
.section1 {
  /* position: relative; */
  width: auto;
  height: 380px;
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
  position: absolute;
  bottom: 0;
  right: 5%;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  margin-bottom: -35px;
  background-color: #f5f5f5;
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
  margin-bottom: 8px;
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
