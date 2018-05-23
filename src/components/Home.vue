<template>
  <div id="home">

    <!-- App bar -->
    <div class="appbar mdc-elevation--z4">
      <div class="title">
        <h4 class="mdc-typography--headline4">junkies</h4>
      </div>
      <div class="subtitle">
        <span class="mdc-typography--headline6">midnight online store</span>
      </div>
    </div>

    <!-- Favourites -->
    <div class="favorites" v-if="false">
      <p>Favourites</p>
      <div>
        <div class="itemCard" v-for="i in [1,2,3,4,5,6]" :key="i">
          <img class="itemImg" src="../assets/img/burger.jpg" alt="">
          <div class="itemFooter">
            <h5>Add to lcart</h5>
            <img class="heart" src="../assets/img/heart-white.svg" alt="" height="24px" width="24px">
          </div>
        </div>
        <div class="fav-spacing"></div>
      </div>
    </div>

    <div class="lfoodItems">
      <div v-for="(subcategories, category) in items" :key="category">
        <span class="mdc-typography--headline4 food-category">{{category}}</span>
        <div v-for="(items, subcategory) in subcategories" :key="subcategory">
          <span class="mdc-typography--headline6 food-subcategory">{{subcategory}}</span>
          <div v-for="(item, i) in items" :key="i" class="foodItem mdc-card" :veg="item.isVeg">
            <div>
              <span class="mdc-typography--subtitle1 food-name" style="font-family: 'Open Sans', sans-serif !important;">{{item.name}}</span>
              <span class="mdc-typography--caption food-desc" style="font-family: 'Open Sans', sans-serif !important;">{{item.description}}</span>
              <span class="mdc-typography--subtitle2 food-price" style="font-family: 'Open Sans', sans-serif !important;">&#8377; {{item.price}}</span>
            </div>
            <div>
              <div class="lcart-modifier">
                <div class="lcart-qty mdc-typography--headline4 mdc-theme--secondary">{{ cart[item.id] }}</div>
                <div>
                  <button><i class="material-icons" @click="removeFromCart(item.id)">remove</i></button>
                  <button><i class="material-icons" @click="addToCart(item.id)">add</i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'item',
  props: ['addToCart', 'removeFromCart'],
  data: function () {
    return {
      items: {}
    };
  },
  watch: {
    lfoodItems () {
      let _items = {}
      this.foodItems.forEach(item => {
        if (_items[item.category] === undefined) _items[item.category] = {[item.subcategory]: [item]}
        else if (_items[item.category][item.subcategory] === undefined) _items[item.category][item.subcategory] = [item]
        else _items[item.category][item.subcategory].push(item)
      })
      this.items = _items
    }
  },
  mounted () {
    let _items = {}
      this.foodItems.forEach(item => {
        if (_items[item.category] === undefined) _items[item.category] = {[item.subcategory]: [item]}
        else if (_items[item.category][item.subcategory] === undefined) _items[item.category][item.subcategory] = [item]
        else _items[item.category][item.subcategory].push(item)
      })
      this.items = _items
  }
};

</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Arvo:700');
.appbar {
  width: auto;
  height: 160px;
  background-color: var(--mdc-theme-primary);
  background-image: url('../assets/bg3.png');
}
.title {
  height: 80px;
  display: flex;
  align-items: flex-end;
  padding-left: 72px;
  padding-bottom: 8px;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.7);
}
.title h4 {
  margin: 0;
  font-family: 'Arvo', serif;
  font-weight: 700;
}
.subtitle {
  height: 72px;
  color: rgba(255, 255, 255, 0.7);
  padding-left: 76px;
  box-sizing: border-box;
}

.subtitle span {
  font-family: 'Open Sans', sans-serif !important;
}

#home {
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

.heart:active {
  background-image: url(../assets/img/heart-red.svg);
}

.lfoodItems {
  padding-top: 8px;
}
.lfoodItems > div {
  padding: 8px 0;
}
.lfoodItems > div > div {
  padding: 16px 0;
}
.food-category {
  padding-left: 16px;
  font-family: 'Open Sans', sans-serif !important;
}
.food-subcategory {
  padding-left: 20px;
  font-weight: 800;
  font-family: 'Open Sans', sans-serif !important;
}
.lfoodItems > div > div > div span {
  display: block;
}
.foodItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 12px 16px;
  padding: 12px 16px;
  border-radius: 6px;
  background: #FF5252;
  color: #000;
}
.foodItem[veg] {
  background: #69F0AE;
}
.food-name {
  text-transform: uppercase;
  font-weight: 800;
  padding-bottom: 12px;
}
.foodItem > div:first-child {
  padding-right: 16px;
}
.food-price {
  padding-top: 12px;
  font-weight: 900;
}
.lcart-modifier {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
.lcart-modifier > div:last-child {
  display: flex;
}
.lcart-modifier button {
  background: none;
  border: solid 2px rgba(255, 255, 255, 0.5);
  color: rgba(255, 255, 255, 0.5);
  border-radius: 100%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
}
.lcart-modifier button:last-child {
  color: #fff;
  border: solid 2px rgba(255, 255, 255, 1);
}
.lcart-modifier i {
  font-size: 16px;
  font-weight: bold;
}
</style>
