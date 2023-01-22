import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/Register";
import Login from "../views/LogIn"

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
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;