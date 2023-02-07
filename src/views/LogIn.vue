<template>
 <div class="bigDiv" id="mainDiv">
  <h1>Log In</h1>
  <w-form @submit.prevent="login()" class="logForm" id="logiForm">
      <div>
        <div class="inputMailText">
          <w-input 
            label="Type in your email"
            v-model="email"
            type="text"
            class="mb4"
            id="mailInputRegister"
            :validators="[validators.required]"
            title
            outline
          />
        </div>
      </div>
      <div>
        <div class="inputPassText">
          <w-input 
            label="Give it a strong password"
            v-model="password"
            type="password"
            class="mb4"
            id="passInputRegister"
            :validators="[validators.required]"
            tile
            outline
          />
        </div>
      </div>
      <div>
      <w-button type="submit" class="ma1" id="submitBtn" >Log In</w-button>
      </div>
      <div class="mesaj" id="msj">
        {{ mesaj }}
      </div>
    </w-form>

 </div>
</template>

<script>
import utils from "../utils"

export default {
  name: 'LogIn',
  data() {
    return {
      email: "",
      password: "",
      mesaj: "",
      valid: null,
      validators: {
      required: value => !!value || 'This field is required'
     }
    };
  },
  methods: {
    login() {
      console.log(`You are trying to Log In with:${this.email}`);
      //log utils
      let data = {
        email: this.email,
        password: this.password,
      };

      let requestParameters = utils.globalRequestParameters;
      requestParameters.method = "POST";
      requestParameters.body = JSON.stringify(data);

      fetch(utils.url + "login", requestParameters).then((res) => {
        res.json().then((res) => {
          this.mesaj = res.message;
          if (res.token) {
            localStorage.setItem("token", res.token);
            this.$store.dispatch("login", true)
            this.$router.push({
            path: "/",
            reload: true
          })
          }
          //After log in redirect user to home page
          
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mainDiv {
  background-color: rgba(248, 248, 248, 0.925);
  padding:25px;
  border-radius: 5px;
  margin-top: 30px;
}
/* .bigDiv{
  margin-top: 30px;
} */
h1 {
  margin-bottom: 10px;
}
.mb4 {
  width:300px;
  /* height:40px; */
}

#regisForm {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
#submitBtn {
  height: 25px;
  width:100px;
  background-color: rgb(5, 146, 99);
  color: aliceblue;
  border: none;
  border-radius: 3px;
}

#submitBtn:hover {
  cursor:pointer;
  background-color:  rgb(34, 199, 144);
  border: 1px;
  color: rgb(255, 255, 255);
  transition-duration: 350ms;
}
.mesaj {
  padding-top: 15px;
  color: orangered;
}
</style>
