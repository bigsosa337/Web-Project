<template>
  <div class="addTaskClass">
    <w-form @submit.prevent="addTask()">
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
    data() {
        return {
            status: "notStartedYet",
            name: "",
        };
    },
    methods: {
        addTask() {
            let requestParameters = {...utils.globalRequestParameters};
            let token = window.localStorage.getItem("token");
            requestParameters.headers.Authorization = "Bearer " + token;
            requestParameters.method = "POST";

            let data = {};
            data.name = this.name;
            data.status = this.status;
            console.log(data);

            requestParameters.body = JSON.stringify(data);

            fetch(utils.url + "tasks", requestParameters)
                .then((res) => res.json())
                .then((res) => {
                    debugger
                    console.log(utils.url)
                    console.log(res.message)
                    if(
                        res.message === "Decode error!" ||
                        res.message === "Token expired!"
                    ) {
                        console.log("You don't have permission!")
                    } else {
                        data.id = res.id;
                        this.$store.dispatch("addTask", data);
                        this.$router.push("/")
                    }
                })
        }
    }
}
</script>

<style>

</style>