import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/Register";
import Login from "../views/LogIn"
import AddTask from "../views/AddTask"

const routes = [
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/addTask",
        name: "AddTask",
        component: AddTask,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;