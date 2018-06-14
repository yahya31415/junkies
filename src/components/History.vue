<template>
    <div class="container">

        <div v-for="(order,i) in orders" :key="i" class="row mdc-card" @click="openDetails(order.id)">
            <!-- <div class="col1"> -->
                <span class="mdc-typography--subtitle2">{{GetFormattedDate(order.timestamp)}} </span>
                <span class="items mdc-typography--subtitle1">{{order.itemName.toString().toUpperCase()}} </span>
                <span class="mdc-typography--caption"> {{order.address}} </span>
                <span class="mdc-typography--caption">{{order.isCOD ? "COD Payment" : "Online Payment"}} </span>
                <span class="total mdc-typography--subtitle2">&#8377; {{order.total}}</span>
                <span class="total mdc-typography--subtitle2">{{order.delivered ? 'Delivered' : 'Pending'}}</span>

                <router-link :to="'/order_progress/'+order.id" class="mdc-button mdc-button--flat">Track Order</router-link>
            <!-- </div> -->
            <!-- <div class="col2">Delivered</div> -->
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'OrderHistory',
  data() {
    return {
      orders: null
    }
  },
  methods: {
    GetFormattedDate: function (timetstamp) {
      var month = timetstamp.getMonth() + 1
      var day = timetstamp.getDate()
      var year = timetstamp.getFullYear()
      return day + "/" + month + "/" + year;
    },
    openDetails: function(id){
        console.log(id)
        // this.$router.replace('/order_progress/'+ id)
    }
  },
  computed: mapState(['foodItems']),
  mounted() {
    window.firebase.auth().onAuthStateChanged(function (user) {
      if (user) {

        window.firebase.firestore()
          .collection('Confirmed Orders')
          .where("phone", "==", user.phoneNumber)
          .get()
          .then(function (collectionSnapshot) {
            this.orders = collectionSnapshot.docs.map(doc => Object.assign({}, doc.data(), {
              id: doc.id
            }))
            // console.log(Object.keys(this.orders[0].items))

            let i = 0

            while (i < this.orders.length) {
              let itemKeys = Object.keys(this.orders[i].items)
              let itemList = []

              this.foodItems.forEach(item => {
                itemKeys.forEach(key => {
                  if (item.id === key) itemList.push(item.name)
                })
              })
              this.orders[i].itemName = itemList
              i++
            }

          }.bind(this))
      } else {
        // No user is signed in.
      }
    }.bind(this))
  }
}
</script>

<style scoped>
.container {
  overflow-y: auto;
}

.row {
  margin: 8px;
  font-family: 'Open Sans', sans-serif !important;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: white;
  color: #757575;
  padding: 16px;
}

span {
    margin: 2px;
}

.items {
  font-weight: 800;
  color: #212121 !important;
}

.total {
  color: #0097a7;
}

.col2 {
  width: auto;
  padding: 8px;
  color: #0097a7;
}

</style>
