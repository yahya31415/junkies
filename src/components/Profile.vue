<template>
  <div id="profile">
    <section class="name">
      <span class="label mdc-typography--body2">Full Name</span>
      <span class="value mdc-typography--headline5">{{ userProfile.displayName }}</span>
    </section>
    <section class="phone">
      <span class="label mdc-typography--body2">Phone Number</span>
      <span class="value mdc-typography--headline5">{{ userProfile.phoneNumber }}</span>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
section {
  padding: 16px;
}
section span {
  display: block;
  padding: 4px;
}
</style>
