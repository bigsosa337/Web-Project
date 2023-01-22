<template>
 <div id="mainDiv">
    <h1>Register</h1>
    <w-form @submit.prevent="register()" class="regForm" id="regisForm">
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
      <w-button type="submit" class="ma1" id="submitBtn" >Register</w-button>
      </div>
    </w-form>
 </div>
</template>

<script>
import utils from "../utils.js";

export default {
  name: 'RegisterComponent',
  props: {
    msg: String
  },
  data() {
    return {
      email: "",
      password: "",
      mesaj: "",
      valid: null,
      validators: {
      required: value => !!value || 'This field is required'
     }
    }
  },
  methods: {
    register() {
      console.log(`You are trying to register with:${this.email}`);
      //log utils
      let data = {
        email: this.email,
        password: this.password,
      };

      let requestParameters = utils.globalRequestParameters;
      requestParameters.method = "POST";
      requestParameters.body = JSON.stringify(data);

      fetch(utils.url + "user", requestParameters).then((res) => {
        res.text().then((res) => (this.mesaj = res))
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mainDiv{
  margin-top: 30px;
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


</style>
