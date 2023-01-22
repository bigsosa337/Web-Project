<template>
 <div id="mainDiv">
    <h1>Register</h1>
    <form @submit.prevent="register()">
      <div>
        <label for="inputMailLabel" class="registerLabel">Type in your mail</label>
        <div class="inputMailText">
          <input 
            v-model="email"
            type="text"
            class="mailInput"
            id="mailInputRegister"
          />
        </div>
      </div>
      <div>
        <label for="inputPassLabel" class="registerLabel">Type in your password</label>
        <div class="inputPassText">
          <input 
            v-model="password"
            type="password"
            class="mailInput"
            id="passInputRegister"
          />
        </div>
      </div>
      <div>
        <w-button type="submit" class="submitBtn">Register</w-button>
      </div>
    </form>
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
</style>
