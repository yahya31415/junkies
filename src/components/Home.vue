<template>
  <div>
      <order> </order>
  </div>
</template>

<script>
import order from './Order.vue'

export default {
  name: 'Home',
  data () {
      return {
          message: 'Home'
      }
  },
  components: {
      order
  }
}
</script>
