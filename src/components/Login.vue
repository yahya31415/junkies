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
      <span v-if="!codeSent">&nbsp; +91 &nbsp;&nbsp;</span>
      <input id="phone" type="text" v-model="phoneNumber" :placeholder="!codeSent ? 'Phone Number' : 'Verification Code'">
    </div>
    <div id="sign-in-button"></div>
    <div class="numpad" v-if="!waiting">
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
        <span class="ripple" @click="login">
          <i class="material-icons">
            chevron_right
          </i>
        </span>
      </div>
    </div>
    <!-- <div id="firebaseui-auth-container"></div> -->
  </div>
</template>


<script>
export default {
 data: function () {
    return {
      phoneNumber: "",
      confirmationResult: null,
      recaptchaVerifier: null,
      mainmsg: 'Enter your phone number',
      submsg: 'We will send a verification code to your phone',
      codeSent: false,
      waiting: false
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
      if (this.codeSent) {
        this.waiting = true
        this.confirmationResult.confirm(this.phoneNumber).then(function () {
          this.$router.replace('/cart')
        }.bind(this)).catch(function (error) {
          alert(error)
          this.waiting = false
        });
        return
      }
      window.firebase.auth().signInWithPhoneNumber("+91"+this.phoneNumber, this.recaptchaVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          this.confirmationResult = confirmationResult;
          this.phoneNumber = ""
          this.codeSent = true
          this.mainmsg = 'Enter the verification code'
        }.bind(this)).catch(function (error) {
          // Error; SMS not sent
          // ...
          console.log(error)
        })
    }
  },
  mounted: function () {
    this.recaptchaVerifier = new window.firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      // 'callback': function(response) {
      //   // reCAPTCHA solved, allow signInWithPhoneNumber.
      //   onSignInSubmit();
      // }
    })
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
  height: 80px;
  background-color: var(--mdc-theme-primary);
  padding-top: 18px;
  padding-bottom: 18px;
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

