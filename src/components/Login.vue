<template>
  <div>
    <div class="appbar">
      <section class="toolbar">
        <div class="left">
          <i class="material-icons">keyboard_backspace</i>
        </div>
        <div class="right">
          <router-link to="/">
            <i class="material-icons nextBtn">navigate_next</i>
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

    <div class="userInput">
      <img src="../assets/img/india.png" alt="flag" width="24px"> &nbsp; +91 &nbsp;&nbsp;
      <input id="phone" type="text" name="phoneNumber" placeholder="Phone Number">
    </div>
    <div class="numpad">
      <div>
        <span class="ripple" @click="getNumber('1')">1</span>
        <span class="ripple" @click="getNumber('2')">2</span>
        <span class="ripple" @click="getNumber('3')">3</span>
      </div>
      <div>
        <span class="ripple" @click="getNumber('4')">4</span>
        <span class="ripple" @click="getNumber('5')">5</span>
        <span class="ripple" @click="getNumber('6')">6</span>
      </div>
      <div>
        <span class="ripple" @click="getNumber('7')">7</span>
        <span class="ripple" @click="getNumber('8')">8</span>
        <span class="ripple" @click="getNumber('9')">9</span>
      </div>
      <div>
        <span class="ripple" @click="backspace()">
          <i class="material-icons">
            backspace
          </i>
        </span>
        <span class="ripple" @click="getNumber('0')">0</span>
        <span class="ripple"></span>
      </div>
    </div>
    <!-- <div id="firebaseui-auth-container"></div> -->
  </div>
</template>


<script>
export default {
 data: function () {
    return {
    phoneNumber: ""
    }
  },
  methods: {
    getNumber: function(n) {
      this.phoneNumber += n
      var phone = document.getElementById('phone')
      phone.value = this.phoneNumber
    },
    backspace: function() {
      this.phoneNumber = this.phoneNumber.substring(0,this.phoneNumber.length-1)
      var phone = document.getElementById('phone')
      phone.value = this.phoneNumber
    }
  },
  mounted: function () {
    window.firebase.auth().onAuthStateChanged(function (user) {
      if (user) this.$router.replace('/')
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
  height: 110px;
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
.nextBtn {
  background: rgb(240, 240, 240);
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
  color: rgba(0, 0, 0, 0.5);
  text-shadow: 0px 0px 16px rgba(0,0,0,0.2);
}
.title h5 {
  margin: 8px 0;
}
.subtitle {
  height: 72px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  padding-left: 16px;
  box-sizing: border-box;
  text-shadow: 0px 0px 16px rgba(0,0,0,0.2);
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

