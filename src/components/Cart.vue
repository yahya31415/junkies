<template>
  <div id="cart">

    <!-- progress indicator -->
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

    <div class="orderList">
      <div class="item" v-for="(size,id) in cart" :key="id" :veg="getItem(id).isVeg">
        <div>
              <span class="mdc-typography--subtitle1 food-name">{{getItem(id).name}}</span>
              <span class="mdc-typography--subtitle2 food-price">&#8377; {{getItem(id).price}} x {{ size }} = {{ getItem(id).price * size }}</span>
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
      </div>
    </div>
    <div class="total-row-1"><span class="mdc-typography--body2">Subtotal</span><span class="mdc-typography--button">&#8377; {{ subtotal }}</span></div>
    <div class="total-row-1"><span class="mdc-typography--body2">Delivery Charges</span><span class="mdc-typography--button">&#8377; {{ delivery }}</span></div>
    <div class="total-row-1"><span class="mdc-typography--body2">Packaging Charges</span><span class="mdc-typography--button">&#8377; {{ packaging }}</span></div>
    <div class="total-row-1"><span class="mdc-typography--body1">Total</span><span class="mdc-typography--button">&#8377; {{ total }}</span></div>

    <div class="checkout-button">
      <router-link to="/checkout" class="mdc-button mdc-button--raised">Checkout</router-link>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex'

export default {
  name: 'lcart',
  data: function () {
    return {
      showDialog: false
    };
  },
  mounted () {
    const slider = window.mdc.slider.MDCSlider.attachTo(document.querySelector('.mdc-slider'));
    slider.listen('MDCSlider:change', () => console.log(`Value changed to ${slider.value}`));
    document.querySelector('#cart').style.minHeight = window.innerHeight + 'px'
  },
  computed: {
    ...mapState(['cart', 'foodItems']),
    ...mapGetters(['subtotal', 'delivery', 'packaging', 'total', 'getItemTotal'])
  },
  methods: {
    ...mapMutations(['addToCart', 'removeFromCart']),
    getItem (id) {
      for (var i=0; i<this.foodItems.length; i++) {
        if (this.foodItems[i].id === id) {
          return this.foodItems[i]
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
  margin: 0 16px 32px 16px;
  font-family: 'Open Sans', sans-serif !important;
}
.item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 12px 20px 16px 20px;
  padding-bottom: 16px;
  color: rgba(0, 0, 0, 0.74);
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}

/* .item[veg] {
  border-left: solid 8px #69F0AE;
} */
.item > div > span {
  display: block;
}
.food-name {
  text-transform: uppercase;
  font-weight: 800;
  padding-bottom: 2px;
  font-family: 'Open Sans', sans-serif !important;
}
.item > div:first-child {
  padding-right: 16px;
}
.food-price {
  padding-top: 0px;
  font-weight: 400;
  font-family: 'Open Sans', sans-serif !important;
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
  margin: 0 22px;
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
  width: calc(100% - 44px);
  margin: 24px 22px;
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