<template>
 <div class="mainDiv">
    <div v-if="isAuthenticated">
      <span>Tasks</span>
      <div v-if="isAuthenticated" class="sortingBtns">
        <w-button
        class="ma1"
        bg-color="success"
        @click.prevent="() => {
          tasks.sort(sortByName)
        }"
        >Ascendent</w-button>
        <w-button
        class="ma1"
        bg-color="success"
        @click.prevent="() => {
          tasks.sort(sortByName).reverse()
        }"
        >Descendent</w-button>
      </div>
      <TaskComponent
        @remove="deleteTask"
        :task="elem" 
        v-for="elem in tasks"
        :key="elem.id"
      />
    </div>
    <div v-else>You need to log in</div>
   </div>
</template>

<script>
import TaskComponent from "../components/Task.vue"
import utils, { globalRequestParameters, sortByName } from "../utils";

export default {
  name:"HomePage",
  components: {
    TaskComponent,
  },
  data() {
    return {};
  },
  created() {
    let url = utils.url;
    if (!this.tasks.length) {
      fetch(url + "tasks", globalRequestParameters).then((res) =>
      res.json().then((res) => {
        this.$store.dispatch("fetchTasks", res);
      })
    );
  }
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  methods: {
    deleteTask(task) {
      console.log("Delete this item: ", task);
      this.$store.dispatch("deleteTask", task);
      let requestParameters = {...utils.globalRequestParameters};
      let token = window.localStorage.getItem("token");
      requestParameters.headers.Authorization = "Bearer " + token;
      requestParameters.method  = "DELETE";
      console.log(utils.url)
      console.log(task.id)
      fetch(utils.url + "tasks/" + task.id, requestParameters);
    },
    sortByName,
  },
};
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
