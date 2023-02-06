<template>
 <div class="mainDiv">
    <div v-if="isAuthenticated" class="header">
      <h1>Tasks</h1>
      <div v-if="isAuthenticated" class="sortingBtns">
        <w-button
        class="ma1"
        bg-color="success"
        @click.prevent="() => {
          tasks.sort(sortByName)
        }"
        >
        <svg-icon
          class="mr1"
          color="primary"
          type="mdi"
          :path="mdiSortAlphabeticalAscending"
          size="20"
          >
        </svg-icon>     
        </w-button>
        <w-button
        class="ma1"
        bg-color="success"
        @click.prevent="() => {
          tasks.sort(sortByName).reverse()
        }"
        >
        <svg-icon
          class="mr1"
          color="primary"
          type="mdi"
          :path="path"
          size="20"
          >
          
        </svg-icon>  
        </w-button>
      </div>
      <TaskComponent class="task"
        @remove="deleteTask"
        :task="elem" 
        v-for="elem in tasks"
        :key="elem.id"
      />
    </div>
    <div v-else class="logInWarn">
      You need to log in!
      <div>

      </div>
    </div>
   </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiSortAlphabeticalAscending , mdiSortAlphabeticalDescending     } from '@mdi/js';
import TaskComponent from "../components/Task.vue"
import utils, { globalRequestParameters, sortByName } from "../utils";

export default {
  name:"HomePage",
  components: {
    TaskComponent,
    SvgIcon
  },
  data() {
    return {
      path: 
      mdiSortAlphabeticalDescending,      
      mdiSortAlphabeticalAscending
    };
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

h1{
  /* margin-top: 30px; */
  margin-bottom: 10px;
  padding-top: 15px;
  color: #2c3e50;
}

.logInWarn {
  font-weight: bold;
  font-size: 36px;
  /* margin-top: 70px; */
  animation: color_change 1.5s infinite alternate;
  background-color:  rgba(248, 248, 248, 0.925);
  padding: 25px;
  border-radius: 5px;
}
@keyframes color_change {
 from { color: rgb(40, 40, 43); }
 to { color: green; }
}

.sortingBtns {
  /* background-color: rgba(248, 248, 248, 0.925); */
  /* padding: 25px; */
}

.mainDiv {
  background-color: rgba(248, 248, 248, 0.164);
  backdrop-filter: blur(5px);
  filter: drop-shadow(0 0 0.75rem rgb(255, 255, 255));
  padding:35px;
  border-radius: 10px;
  margin-top: 30px;
  width: 40%;
}

.header {
  background-color: rgba(255, 255, 255, 0.658);
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 5px;
  /* margin-top: 30px; */
}
.task {
  padding-top: 10px;
}
.ma1 {
  padding: 12px;
}

@media only screen and (max-width: 900px) {
  .mainDiv {
    width: 85%;
  }
}

</style>
