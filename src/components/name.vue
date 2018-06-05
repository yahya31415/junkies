<template>
  <div>
    <div class="appbar mdc-elevation--z4">
      <!-- <section class="toolbar">
        <div class="left">
          <i class="material-icons">keyboard_backspace</i>
        </div>
        <div class="right">
          <a href="#" @click="login">
            <i class="material-icons nextBtn">navigate_next</i>
          </a>
        </div>
      </section> -->
      <section class="title">
        <h5>{{ mainmsg }}</h5>
      </section>
      <section class="subtitle">
        <span>{{ submsg }}</span>
      </section>
    </div>

    <div class="userInput">
      <!-- <img v-if="!codeSent" src="../assets/img/india.png" alt="flag" width="24px"> -->
      <span>Full Name: </span>
      <input id="phone" type="text" v-model="name">
    </div>
    <button class="mdc-button mdc-button--raised" id="sign-in-button" @click="login">Done</button>

    <!-- <div id="firebaseui-auth-container"></div> -->
  </div>
</template>


<script>
export default {
 data: function () {
    return {
      name: '',
      mainmsg: 'Enter your full name',
      submsg: 'What would you like us to call you?',
    }
  },
  methods: {
    getNumber: function(n) {
      this.phoneNumber += n
    },
    backspace: function() {
      this.phoneNumber = this.phoneNumber.substring(0,this.phoneNumber.length-1)
      var phone = document.getElementById('phone')
      phone.value = this.phoneNumber
    },
    login () {
      window.firebase.auth().currentUser.updateProfile({displayName: this.name})
      .then(() => this.$router.replace('/cart'))
    }
  },
  mounted: function () {
    window.firebase.auth().onAuthStateChanged(function (user) {
      if (user && user.displayName) this.$router.replace('/cart')
      else {
        // var ui = new window.firebaseui.auth.AuthUI(window.firebase.auth())
        // ui.start('#firebaseui-auth-container', {
        //   signInOptions: [
        //     {
        //       provider: window.firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        //       defaultCoundivy: 'IN'
        //     },
        //   ],
        //   recaptchaParameters: {
        //       size: 'invisible'
        //   }
        //   // Other config options...
        // })
      }
    }.bind(this))
  }
}
</script>

<style scoped>
.appbar {
  width: auto;
  height: 80px;
  background-color: var(--mdc-theme-primary);
  padding-top: 18px;
  padding-bottom: 18px;
  background-image: url('../assets/bg3.png');
}

.mdc-button {
  margin: 72px auto;
  display: block;
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
.nextBtn {
  color: rgba(0, 0, 0, 1) !important;
  border-radius: 50%;
  padding: 4px !important;
  opacity: 0.8;
}
.title {
  height: 40px;
  padding-bottom: 8px;
  padding-left: 16px;
  box-sizing: border-box;
  font-size: 24px;
  color: #fff;
}
.title h5 {
  margin: 8px 0;
}
.subtitle {
  height: 72px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  padding-left: 16px;
  box-sizing: border-box;
}
.numpad div {
  display: flex;
  width: auto;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
}
.numpad {
  width: 100%;
  position: fixed;
  bottom: 0;
}

.numpad span{
  width: 50%;
  text-align: center;
  padding: 16px;
  font-weight: 800;
  font-size: 1.2em;
  opacity: 0.7;
}
.ripple{
	position: relative;
	overflow:hidden;
}
.ripple:hover:before{
	animation: ripple 1s ease;
}
.ripple:before{
	content:"";
	position:absolute; top:0; left:0;
	width:100%; height:100%;
  background-color:#FFE0B2;
  border-radius:50%;
	transform:scale(0);
}

@keyframes ripple{
	from{transform:scale(0); opacity:1;}
	to{transform:scale(3);opacity:0;}
}

.userInput {
  display: flex;
  justify-content: center;
  margin-top:32px;
  font-size: 18px;
  vertical-align: auto;
}

#phone {
  padding: 4px;
  font-size: 18px;
  border-top: transparent !important;
  border-left: transparent !important;
  border-right: transparent !important;
  border-bottom: 1px solid !important;
}
</style>

