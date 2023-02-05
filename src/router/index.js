import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/Register";
import Login from "../views/LogIn"
import AddTask from "../views/AddTask"
import HomePage from "../views/HomePage"
import EditTask from "../views/EditTask"
// import store from "../store/"

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
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
    },
    {
        path: "/edit/:id",
        name: "EditTask",
        component: EditTask,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});


//navigation guard -- avoiding infinite reload and
//making sure user is authenticated
// router.beforeEach((to, from, next) => {
//     if (to.name === "Register" || to.name === "Login" || to.name === "Home") {
//       next();
//     } else if (to.name !== "Login" && !store.state.isAuthenticated) {
//       next({ name: "Login" });
//     } else {
//       next();
//     }
//   });
  

export default router;