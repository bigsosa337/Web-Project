<template>
  <div class="mainDiv">
    <div class="mainContainer">
      <h1>Edit Task</h1>
      <w-form @submit.prevent="editTask()">
      <div class="addInput">
          <w-input 
              label="Add Task"
              v-model="name"
              type="text"
              class="mb4"
              id="mailInputRegister"
            />
      </div>
      <div class="selectContainer">
          <select v-model="status">
              <option value="Not Started Yet">Not Started Yet</option>
              <option value="Done">Done</option>
              <option value="In Progress">In Progress</option>
          </select>
      </div>
      <button type="submit" class="submitBtn">Add Task</button>
      </w-form>
    </div>
  </div>
</template>

<script>
import utils from "../utils"

export default {
  data () {
    return {
      status:false,
      name: "",
    }
  },

  methods: {
    editTask() {
      let requestParameters = {...utils.globalRequestParameters};
      let token = window.localStorage.getItem("token");
      requestParameters.headers.Authorization = "Bearer " + token;
      requestParameters.method = "PUT";

      if (this.name === "") return;
      let data = {};
      data.name = this.name;
      data.status = this.status;
      requestParameters.body = JSON.stringify(data);


      fetch(utils.url + "tasks/" + this.$route.params.id, requestParameters)
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          if (
            res.message === "Decoding error!" ||
            res.message === "Token Expired!"
          ) {
            console.log("you don't have permission ")
          } else {
            data.id = res.id;
            console.log("OK")
            let tasks = fetch(
              utils.url + "tasks",
              utils.requestParameters
            );
            this.$store.dispatch("fetchTasks", tasks);
            this.$router.push("/")
          }
        })
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.mainDiv {
    background-color: rgba(248, 248, 248, 0.164);
    backdrop-filter: blur(5px);
    filter: drop-shadow(0 0 0.75rem rgb(255, 255, 255));
    padding:35px;
    border-radius: 10px;
    margin-top: 30px;
    width: 35%;
    /* color: white; */
}
h1 {
  margin-bottom: 10px;
  /* color:white; */
}
.mainContainer {
    background-color: rgba(255, 255, 255, 0.658);
    padding: 25px;
    border-radius: 5px;
}
select {
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    z-index: 1;
    padding: 3px;
    outline: none;
    border-radius: 5px;
}
select::after {
    grid-area: select;
}
.selectContainer {
    padding: 20px;
    display: grid;
    align-items: center;
    position: relative;
    cursor: pointer;
    line-height: 1.1;

}

.submitBtn {
    height: 25px;
    width:100px;
    background-color: rgb(5, 146, 99);
    color: aliceblue;
    border: none;
    border-radius: 3px;
}
.submitBtn:hover {
    cursor:pointer;
    background-color:  rgb(34, 199, 144);
    border: 1px;
    color: rgb(255, 255, 255);
    transition-duration: 350ms;
}

@media only screen and (max-width: 900px) {
  .mainDiv {
    width: 85%;
  }
}
</style>
