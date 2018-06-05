<template>
  <div id="cart">

    <div class="mdc-slider mdc-slider--discrete mdc-slider--display-markers" tabindex="0" role="slider"
        aria-valuemin="1" aria-valuemax="4" aria-valuenow="2"
        aria-label="Cart" aria-disabled>
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

    <h2 class="mdc-typography--headline4">Cart</h2>

    <!-- <section class="toolbar">
      <router-link to="/">
        <i class="material-icons">keyboard_backspace</i>
      </router-link>
      <div class="left">
        <img src="../assets/logo.png" height="40" alt="">
      </div>
      <div class="right">
        <router-link to="/lcart">
          <i class="material-icons">shopping_lcart</i>
        </router-link>
        <router-link to="/profile">
          <i class="material-icons">account_circle</i>
        </router-link>
        <a>
          <i class="material-icons">exit_to_app</i>
        </a>
      </div>
    </section> -->

    <!-- <div v-if="showDialog" id="dialog">
      <div class="dialogContainer">
        <div class="dialogItem">
          <img v-if="itemAddOns.isVeg" src="../assets/img/veg.png" alt="veg" width="18px" height="18px">
          <img v-if="!itemAddOns.isVeg" src="../assets/img/nonVeg.png" alt="non-veg" width="18px" height="18px">
          <div>
            <h5>{{itemAddOns.name}}</h5>
            <span>&#8377;{{itemAddOns.price}}</span>
          </div>
        </div>
        <div>
          <h5 style="margin:0;padding:16px 32px;">Add Ons</h5>

          <div v-for="(addOn,i) in itemAddOns.addOns" :key="i">
            <div class="addOn">
              <img v-if="addOn.isVeg" src="../assets/img/veg.png" alt="veg" width="16px" height="16px"> &nbsp;
              <img v-if="!addOn.isVeg" src="../assets/img/nonVeg.png" alt="veg" width="16px" height="16px"> &nbsp;
              <input @click="addOnChecked(addOn.name)" type="checkbox" name="addOns" id="addOnCheck">
              <span>{{addOn.name}} &#8377;{{addOn.price}}</span>
            </div>
          </div>
        </div>
        <hr>
        <div class="dialogFooter">
          <span>Item total &#8377;{{itemAddOns.total}}</span>
          <h5 @click="updateItem()">UPDATE ITEM</h5>
        </div>
      </div>
    </div> -->

    <div class="orderList">
      <div class="item mdc-card" v-for="(size,id) in cart" :key="id" :veg="getItem(id).isVeg">

        <div>
              <span class="mdc-typography--subtitle1 food-name" style="font-family: 'Open Sans', sans-serif !important;">{{getItem(id).name}}</span>
              <!-- <span class="mdc-typography--caption food-desc" style="font-family: 'Open Sans', sans-serif !important;">{{getItem(id).description}}</span> -->
              <span class="mdc-typography--subtitle2 food-price" style="font-family: 'Open Sans', sans-serif !important;">&#8377; {{getItem(id).price}} x {{ size }} = {{ getItem(id).price * size }}</span>
            </div>
            <div>
              <div class="lcart-modifier">
                <div v-if="size > 0" class="lcart-qty mdc-typography--headline6 mdc-theme--primary">{{ size }}</div>
                <div>
                  <button><i class="material-icons" @click="removeFromCart(id)">remove</i></button>
                  <button><i class="material-icons" @click="addToCart(id)">add</i></button>
                </div>
              </div>
            </div>

        <!-- <img v-if="getItem(id).isVeg" src="../assets/img/veg.png" alt="vegICon" width="18px" height="18px">
        <img v-if="!getItem(id).isVeg" src="../assets/img/nonVeg.png" alt="vegICon" width="18px" height="18px">
        <div class="decription">
          <h4 class="mdc-typography--subtitle1">{{getItem(id).name}}</h4>
          <p class="mdc-typography--caption">{{getItem(id).description}}</p>
          <div @click="dialog()" class="cutomize">
            <h5 @click="getAddOns(getItem(id))">CUSTOMIZE </h5>
            <i class="material-icons">keyboard_arrow_down</i>
          </div> 
        </div>
        <div class="quantity">
          <span class="removeItem" @click="removeFromCart(id)">-</span>
          <span class="qty">{{size}}</span>
          <span class="addItem" @click="addToCart(id)">+</span>
        </div>
        <h5 class="price">&#8377;{{ getItemTotal(id)}}</h5> -->
      </div>
    </div>
    <hr />
    <div class="total-row-1"><span class="mdc-typography--body2">Subtotal</span><span class="mdc-typography--button">&#8377; {{ subtotal }}</span></div>
    <div class="total-row-1"><span class="mdc-typography--body2">Delivery Charges</span><span class="mdc-typography--button">&#8377; {{ delivery }}</span></div>
    <div class="total-row-1"><span class="mdc-typography--body2">Packaging Charges</span><span class="mdc-typography--button">&#8377; {{ packaging }}</span></div>
    <hr />
    <div class="total-row-1"><span class="mdc-typography--body1">Total</span><span class="mdc-typography--button">&#8377; {{ total }}</span></div>

    <div class="checkout-button">
      <router-link to="/checkout" class="mdc-button mdc-button--raised">Checkout</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'lcart',
  props: ['subtotal', 'delivery', 'packaging', 'total', 'getItemTotal', 'addToCart', 'removeFromCart'],
  data: function () {
    return {
      items: [],
      itemAddOns: {},
      showDialog: false
    };
  },
  mounted () {
    const slider = window.mdc.slider.MDCSlider.attachTo(document.querySelector('.mdc-slider'));
    slider.listen('MDCSlider:change', () => console.log(`Value changed to ${slider.value}`));
  },

  methods: {
    getItem (id) {
      for (var i=0; i<this.foodItems.length; i++) {
        if (this.foodItems[i].id === id) {
          return this.foodItems[i]
        }
      }
    },
    dialog: function () {
      this.showDialog = !this.showDialog
    },
    updateItem: function (id) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id == id) {
          this.items[i].total = this.itemAddOns.total
          this.items.addOns = this.itemAddOns.addOns
        }
      }
      this.dialog()

    },
    getAddOns: function (item) {
      for (let i = 0; i < item.addOns; i++) {
        item.addOns[i].isChecked = false
      }
      item.total = item.total
      this.itemAddOns = item
      console.log(this.itemAddOns)
    },
    addOnChecked: function (name) {

      for (let i = 0; i < this.itemAddOns.addOns.length; i++) {

        if (this.itemAddOns.addOns[i].name == name) {
          this.itemAddOns.addOns[i].isChecked = !this.itemAddOns.addOns[i].isChecked

          if (this.itemAddOns.addOns[i].isChecked) {
            this.itemAddOns.total += this.itemAddOns.addOns[i].price
            console.log('if')
            console.log(this.itemAddOns)
          } else {
            console.log('else')
            this.itemAddOns.total -= this.itemAddOns.addOns[i].price
            console.log(this.itemAddOns)
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.orderList {
  padding: 0 0px 0px 0px;
}
#cart {
  background: #efefef;
  position: relative;
  z-index: 0;
  padding-bottom: 60px;
}
#cart h2 {
  margin: 0 16px;
  font-family: 'Open Sans', sans-serif !important;
}
.item {
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

.item[veg] {
  border-left: solid 8px #69F0AE;
}
.item > div > span {
  display: block;
}
.food-name {
  text-transform: uppercase;
  font-weight: 800;
  padding-bottom: 12px;
}
.item > div:first-child {
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

.decription p {
  font-size: 13px;
  font-family: 'Open Sans', sans-serif !important;
  word-break: break-word;
  margin: 0;
  padding-bottom: 4px;
  color: #616161;
}

.decription h5,
h4 {
  margin: 0;
  padding-bottom: 16px;
  color: #616161;
  line-height: 18px;
  font-family: 'Open Sans', sans-serif !important;
}

.decription {
  width: 100%;
  margin: 0px 8px;
}

.decription i {
  margin-top: -3px;
}

.decription p {
  margin-bottom: 2px;
}

.quantity span {
  padding: 4px 8px;
  font-size: 16px;
}

.quantity {
  display: flex;
  border: solid grey 1px;
  height: fit-content;
  flex-wrap: space-between;
  margin: 0 8px;
  font-weight: 600;
}

.price {
  margin: 4px 8px;
  font-size: 14px;
  text-align: right;
  color: #616161;
  width: 30px;
}

.addItem,
.qty {
  color: #43A047;
}

.qty {
  width: 20px;
  text-align: center
}

.cutomize {
  display: flex;
}

.cutomize h6 {
  padding-top: 4px;
}

#dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.54);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialogContainer {
  background-color: white;
  width: 90%;
  height: auto;
  padding-bottom: 8px;
}

.addOn {
  display: flex;
  flex-wrap: space-between;
}

.dialogItem {
  background-color: #e0e0e0;
  display: flex;
  flex-wrap: space-between;
  padding: 12px 8px 8px 8px;
}

.dialogItem h5,
.dialogItem span {
  margin-top: 0;
  margin-bottom: 8px;
  padding: 0 16px
}

.addOn {
  display: flex;
  flex-wrap: space-between;
  padding: 8px;
}

.addOn img {
  margin-top: 4px;
}

.addOn span {
  padding-left: 8px;
  margin-top: 4px;
}

.total-row-1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 16px;
}

hr {
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
}

#addOnCheck {
  -webkit-appearance: none;
  background-color: #fafafa;
  border: 1px solid #cacece;
  padding: 8px;
  position: relative;
  padding: -8px -5px;
}

#addOnCheck:active,
#addOnCheck:checked:active {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 3px rgba(0, 0, 0, 0.1);
}

#addOnCheck:checked {
  background-color: #f57c00;
  border: 1px solid #ff8f00;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05), inset 15px 10px -12px rgba(255, 255, 255, 0.1);
  color: white;
}

#addOnCheck:checked:after {
  content: '\2714';
  font-size: 12px;
  position: absolute;
  top: 0px;
  left: 3px;
  color: white;
}

.dialogFooter {
  width: auto;
  display: flex;
  margin: 8px;
  padding: 8px 16px;
  background-color: #f57c00;
  color: white;
}

.dialogFooter span {
  font-size: 16px !important;
  text-align: left;
  width: 50%;
}

.dialogFooter h5 {
  margin: 0;
  width: 50%;
  flex-wrap: wrap;
  text-align: right;
  letter-spacing: 0.8px;
}

.checkout-button a {
  width: 80%;
  margin: 24px auto;
  display: block;
  color: #fff;
  text-align: center;
    line-height: 36px;
}
.mdc-slider__track {
  background-color: var(--mdc-theme-primary) !important;
}
#cart div {
  font-family: 'Open Sans', sans-serif !important;
  font-weight: 800;
}
</style>