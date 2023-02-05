<template>
  <div class="addTaskClass">
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
    <div class="statusTask">
        <select v-model="status">
            <option value="notStartedYet">Not Started Yet</option>
            <option value="done">Done</option>
            <option value="inProgress">In Progress</option>
        </select>
    </div>
    <button type="submit" class="submitBtn">Add Task</button>
    </w-form>
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
