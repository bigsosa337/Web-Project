import { createStore } from "vuex";

export default createStore({ 
    state: {
        todos:[],
        isAuthenticated: localStorage.getItem("token") ? true : false,
    },
    getters: {
        tasks: (state) => {
            return state.tasks;
        },
    },
    mutations: {
        SET_AUTH: (state, status) => {
            state.isAuthenticated = status;
        },
        SET_TASKS: (state, tasks) => {
            state.tasks = tasks;
        },
        ADD_TASK: (state, task) => {
            state.tasks.push(task);
        },
        DELETE_TASK: (state, task) => {
            let index = state.tasks.indexOf(task);
            state.tasks.splice(index, 1);
        }
    },
    actions: {
        login: ({ commit }, payload) => {
            commit("SET_AUTH", payload);
        },
        fetchTasks: ({ commit }, payload) => {
            commit("SET_TASKS", payload);
        },
        addTask: ({ commit }, payload) => {
            commit("ADD_TASK", payload)
        },
        deleteTask: ({ commit }, payload) => {
            commit("DELETE_TASK", payload);
        },
    },
    modules: {},
})