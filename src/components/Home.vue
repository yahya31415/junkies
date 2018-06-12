<template>
  <div id="home">

    <!-- menu shortcut -->
    <button class="mdc-button mdc-button--raised mdc-elevation--z12 menu-button">Menu</button>
    <div class="mdc-menu mdc-elevation--z16" tabindex="-1">
      <ul class="mdc-menu__items mdc-list" role="menu" aria-hidden="true">
        <span v-for="(subcategories, category) in items" :key="category">
          <li class="mdc-list-item" role="menuitem" tabindex="0" @click="goto(category)" style="color: var(--mdc-theme-primary);">
            {{ category }}
          </li>
          <li class="mdc-list-item" role="menuitem" tabindex="0"  v-for="(items, subcategory) in subcategories" :key="subcategory" @click="goto(subcategory)" style="color: #000;">
            {{ subcategory }}
          </li>
        </span>
      </ul>
    </div>

    <!-- App bar -->
    <div class="appbar mdc-elevation--z4">
      <div class="title">
        <img src="../assets/junk-06.png" alt="logo" width="360">
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
      <div v-for="(subcategories, category) in items" :key="category" :id="category.replace(' ', '_')">
        <span class="mdc-typography--headline4 food-category">{{category}}</span>
        <div v-for="(items, subcategory) in subcategories" :key="subcategory" :id="subcategory.replace(' ', '_')">
          <span class="mdc-typography--headline6 food-subcategory">{{subcategory}}</span>
          <div v-for="(item, i) in items" :key="i" v-if="item.inStock" class="foodItem mdc-card" :veg="item.isVeg">
            <div>
              <span class="mdc-typography--subtitle1 food-name" style="font-family: 'Open Sans', sans-serif !important;">{{item.name}}</span>
              <span class="mdc-typography--caption food-desc" style="font-family: 'Open Sans', sans-serif !important;">{{item.description}}</span>
              <span class="mdc-typography--subtitle2 food-price" style="font-family: 'Open Sans', sans-serif !important;">&#8377; {{item.price}}</span>
            </div>
            <div>
              <div class="lcart-modifier">
                <div v-if="cart[item.id] > 0" class="lcart-qty mdc-typography--headline6 mdc-theme--primary">{{ cart[item.id] }}</div>
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
  computed: {
    items () {
      let _items = {}
      this.foodItems.forEach(item => {
        if (_items[item.category] === undefined) _items[item.category] = {[item.subcategory]: [item]}
        else if (_items[item.category][item.subcategory] === undefined) _items[item.category][item.subcategory] = [item]
        else _items[item.category][item.subcategory].push(item)
      })
      return _items
    }
  },
  methods: {
    goto (id) {
      window.scroll({
        top: document.querySelector('#' + id.replace(' ', '_')).offsetTop - 60,
        left: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted () {
      // Instantiation
      var menuEl = document.querySelector('.mdc-menu');
      var menu = new window.mdc.menu.MDCMenu(menuEl);
      var menuButtonEl = document.querySelector('.menu-button');

      // Toggle menu open
      menuButtonEl.addEventListener('click', function() {
        menu.open = !menu.open;
      });

      // Listen for selected item
      menuEl.addEventListener('MDCMenu:selected', function(evt) {
        var detail = evt.detail;
        console.log(detail)
      });

      // Set Anchor Corner to Bottom End
      // menu.setAnchorCorner(window.mdc.menu.Corner.TOP_END);

      // Turn off menu open animations
      menu.quickOpen = true;
  }
};

</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Arvo:700');
.menu-button {
  position: fixed;
  bottom: 16px;
  width: 100px;
  height: 48px;
  left: calc(50% - 50px);
  border-radius: 24px;
  font-weight: 800;
  font-family: 'Open Sans', sans-serif;
  background: var(--mdc-theme-primary);
}
.mdc-menu {
  position: fixed;
  bottom: 72px;
  left: calc(50% - 85px);
  box-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12);
  color: #000;
  max-height: 300px;
  overflow-y: auto;
  border-radius: 6px;
}
.appbar {
  width: auto;
  height: 160px;
  background: linear-gradient(#e06926,#ea3624);
}
.title {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 8px;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.9);
}
.title h4 {
  margin: 0;
    text-align: center;
    width: 100%;
  font-family: 'Arvo', serif;
  font-weight: 700;
  font-size: 40px;
}
.subtitle {
  height: 72px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  box-sizing: border-box;
}

.subtitle span {
  font-family: 'Open Sans', sans-serif !important;
  display: block;
  width: 100%;
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
  background: #fff;
  border-left: solid 8px #FF5252;
  color: #000;
}
.foodItem[veg] {
  border-left: solid 8px #69F0AE;
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
.lcart-qty {
  border-radius: 24px;
  height: 48px;
  width: 48px;
  background: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
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
  border: solid 2px rgba(0, 0, 0, 0.5);
  color: rgba(0, 0, 0, 0.5);
  border-radius: 100%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
}
.lcart-modifier button:last-child {
  color: #000;
  border: solid 2px rgba(0, 0, 0, 1);
}
.lcart-modifier i {
  font-size: 16px;
  font-weight: bold;
}
</style>
