<template>
  <div >
    <div class="appbar">
      <section class="toolbar">
        <div class="left">
            <i class="material-icons">keyboard_backspace</i>
        </div>
        <div class="right">
          <router-link to="/cart">
          <i class="material-icons">navigate_next</i>
          </router-link>
        </div>
      </section>
      <section class="title">
        <h5>Enter your phone number</h5>
      </section>
      <section class="subtitle">
        <span>Use the number on this phone. </span>
      </section>
    </div>
<div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
export default {
  mounted: function () {
    window.firebase.auth().onAuthStateChanged(function (user) {
      if (user) this.$router.replace('/')
      else {
        var ui = new window.firebaseui.auth.AuthUI(window.firebase.auth())
        ui.start('#firebaseui-auth-container', {
          signInOptions: [
            {
              provider: window.firebase.auth.PhoneAuthProvider.PROVIDER_ID,
              defaultCountry: 'IN'
            },
          ],
          recaptchaParameters: {
              size: 'invisible'
          }
          // Other config options...
        })
      }
    }.bind(this))
  }
}
</script>

<style scoped>
.appbar {
  width: auto;
  height: 140px;
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
  height: 40px;
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

</style>

