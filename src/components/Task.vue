<template>
 <div class="containerTodo">
    <div v-if="isAuthenticated" class="body">
      <h5 class="task">Task: {{ task.name }}</h5>
      <h5 class="task">Status: {{ task.status }}</h5>
      <div class="buttonsEditDel">
        <w-button
          v-if="isAuthenticated"
          @click="
            () => {
              handleNoteShow = !handleNoteShow;
            }
          "
          class="ma1"
        >
          See Notes
        </w-button>
        <w-button
          v-if="isAuthenticated"
          @click="() => (handleNoteSearch = !handleNoteSearch)"
          class="ma1"
        >
          Add note
        </w-button>

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
      <div v-if="handleNoteSearch" class="noteContainer">
        <w-input 
          v-model="noteName"
          type="text"
          class="mb4"        
        />
        <w-button
          v-if="isAuthenticated"
          @click="addNote"
          class="ma1"
        >Done</w-button>
      </div>
      <div class="noteBtns">
        <div v-if="handleNoteShow && this.notes.length > 0" class="innternotebtn" >
          <div class="s"
          v-for="note in this.notes" :key="note.id">
            <div class="noteName">Notes: {{ note.name }} </div>
            <w-button
                v-if="isAuthenticated"
                @click="deleteNote(note)"
                class="ma1"
              >
                Delete Note
              </w-button>
          </div>
        </div>
        <div v-else-if="handleNoteShow" >No notes added</div>
      </div>
    </div>
 </div>
</template>

<script>
import utils, { globalRequestParameters } from "../utils.js";
export default {
  name: "TaskComponent",
  props: {
    task: Object,
  },
  data()  {
    return { 
    handleNoteSearch: false,
    handleNoteShow: false,
    noteName: "",
    notes: [],
    }
  },
  beforeMount() {
    this.getNotes();
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    edit() {
      this.$emit("edit", this.task);
      this.$router.push("/edit/" + this.task.id);
    },
    remove() {
      this.$emit("remove", this.task)
    },
    addNote() {
      let requestParameters = {...utils.globalRequestParameters};
      let token = window.localStorage.getItem("token");
      requestParameters.headers.Authorization = "Bearer " + token;
      requestParameters.method = "POST";

      let data = {};
      data.name = this.noteName;
      requestParameters.body = JSON.stringify(data);

      fetch(utils.url + "tasks/note/" + this.task.id, requestParameters);
      this.notes.push(data);
      this.handleNoteSearch = !this.handleNoteSearch;
      this.noteName = "";
    },
    async deleteNote(note) {
      let requestParameters = {...utils.globalRequestParameters};
      let token = window.localStorage.getItem("token");
      requestParameters.headers.Authorization = "Bearer " + token;
      requestParameters.method = "DELETE";

      await fetch(
        utils.url + "tasks/note/" + this.task.id + "/" + note.id,
        requestParameters
      );
      this.notes.splice(this.notes.indexOf(note), 1);
    },
    async getNotes() {
      var data = [];
      await fetch(
        utils.url + "tasks/note/" + this.task.id,
        globalRequestParameters
      )
        .then((res) => res.json())
        .then((content) => data.push(content));

      data = data[0];

      if (this.notes.length == 0) {
        for (const obj of data) {
          this.notes.push(obj);
        }
      }
    },
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
