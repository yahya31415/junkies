<template>
  <div>
      <section class="toolbar">
        <div class="left">
          <!-- <i class="material-icons">arrow back</i> -->
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
  </div>
</template>

<script>
export default {
  name: 'cart',
  data: function () {
    return {
      items: []
    };
  },
  props: ['id']
}
</script>

<style scoped>
.toolbar {
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
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
</style>