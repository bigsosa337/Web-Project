<template>
 <div class="containerTodo">
    <div v-if="isAuthenticated" class="body">
      <h3 class="task" id="name" >Task: {{ task.name }}</h3>
      <h3 class="task" id="status" >Status: {{ task.status }}</h3>
      <div class="buttonsEditDel">
        <w-button
          v-if="isAuthenticated"
          @click="
            () => {
              handleNoteShow = !handleNoteShow;
            }
          "
          class="ma1"
          id="seeNotes"
          bg-color="info"
        >
          See Notes
        </w-button>
        <w-button
          v-if="isAuthenticated"
          @click="() => (handleNoteSearch = !handleNoteSearch)"
          class="ma1"
          id="addNote"
          bg-color="info"
        >
          Add note
        </w-button>

        <w-button
          v-if="isAuthenticated"
          @click="edit"
          class="ma1"
          id="edit"
          bg-color="warning"
        >
          Edit Task
        </w-button>

        <w-button
          v-if="isAuthenticated"
          @click="remove"
          class="ma1"
          id="remove"
          bg-color="error"
        >
          Remove Task
        </w-button>
      </div>
      <div v-if="handleNoteSearch" class="noteContainer">
        <w-input 
          v-model="noteName"
          type="text"
          class="mb4"     
          id="addnoteInput"   
        />
        <w-button
          v-if="isAuthenticated"
          @click="addNote"
          class="ma1"
        >Add</w-button>
      </div>
      <div class="noteBtns">
        <div v-if="handleNoteShow && this.notes.length > 0" class="innternotebtn" >
          <div class="s"
          v-for="note in this.notes" :key="note.id">
            <div class="noteName">{{ note.name }} </div>
            <w-button
                v-if="isAuthenticated"
                @click="deleteNote(note)"
                class="ma1"
                bg-color="error"
                icon="wi-cross"
              >
                Delete Note
              </w-button>
          </div>
        </div>
        <div v-else-if="handleNoteShow" class="noNoteWarn">No notes added</div>
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
.containterToDo  {
  padding-top: 25px;
}
#name {
  border-top: 1.5px solid rgba(39, 38, 38, 0.295);
  padding-top: 10px;
}

#status {
  padding-bottom: 5px;
}
.noNoteWarn {
  padding-top: 10px;
  font-weight: bolder;
  color: rgba(51, 51, 51, 0.568);
}
.noteContainer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.noteName {
  padding: 5px;
  padding-top: 10px;
  font-weight: bolder;
  font-size: 14px;
}
.noteBtns {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ma1 {
}
#addnoteInput {
  width: 50%;
  
}
</style>
