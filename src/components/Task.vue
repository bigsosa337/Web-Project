<template>
 <div class="containerTodo">
    <div v-if="isAuthenticated" class="body">
      <h5 class="task">Task: {{ task.name }}</h5>
      <h5 class="task">Status: {{ task.status }}</h5>
      <div class="buttonsEditDel">
        <button
          v-if="isAuthenticated"
          @click="edit"
          class="editBtn"
        >
          Edit
        </button>
        <button
          v-if="isAuthenticated"
          @click="remove"
          class="delBtn"
        >
          Remove
        </button>
      </div>
    </div>
 </div>
</template>

<script>
import { objectExpression } from "@babel/types";
import utils, { globalRequestParameters } from "../utils.js";
export default {
  name: 'Task',
  props: {
    task: Object,
  },
  data() {
    
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    edit() {
      this.$emit("edit", this.student);
      this.$router.push("/edit/" + this.task.id);
    },
    remove() {
      this.$emit("remove", this.task)
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
