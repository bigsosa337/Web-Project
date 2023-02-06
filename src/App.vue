<template>
  <w-app align-center>  
    <nav class="mainNavBar">
      <div id="navBarr">
        <router-link v-if="!isAuthenticated" to="/register" class="navBar">Register</router-link>
        <router-link v-if="!isAuthenticated" to="/logIn" class="navBar">Log In</router-link>
        <router-link to="/" class="navBar">Home</router-link>
        <router-link v-if="isAuthenticated" to="/addTask" class="navBar">Add Task</router-link>
        <w-button v-if="isAuthenticated"
         @click="logout()"
         class="ma1"
         bg-color="error"
         >
         <svg-icon
          class="mr1"
          color="primary"
          type="mdi"
          :path="path"
          size="18"
          ></svg-icon>
         Log Out</w-button>
      </div>
    </nav>
    <router-view
      class="router-view"
      v-slot="{ Component }"
    >
    <Transition name="page-opacity" mode="out-in" >
      <component  :is="Component" />
    </Transition>
    </router-view>
  </w-app>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLogoutVariant } from '@mdi/js';
export default {
  components: {
    SvgIcon
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  data() {
    return {
      path: mdiLogoutVariant
    }
  },
  methods: {
    logout() {
      console.log("Try logout");
      this.$store.commit("SET_AUTH", false);
      window.localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style>

.page-opacity-enter-active,
.page-opacity-leave-active {
  transition:300ms ease all;
}

.page-opacity-enter-from,
.page-opacity-leave-to {
  opacity: 0;
}

#app {
  font-family: 'Product Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  padding-top: 50px;
  /* background-color:  rgba(248, 248, 248, 0.925); */
   background-image: url(https://cdn.dribbble.com/users/189564/screenshots/17328144/media/c7e1c291b755b8440789d7b7d828526d.png);
}

.navBar {
  margin-right: 25px;
  text-decoration: none;
  font-weight: 600;
  color: #2c3e50;
  /* background-color: rgba(255, 255, 255, 0.925) ; */
  /* padding: 15px;
  border-radius: 3px; */
}

.navBar:hover{
  color: rgb(34, 199, 144);
}

#navBarr {
  /* text-align: left; */
  background-color: rgba(255, 255, 255, 0.925);
  padding: 15px;
  border-radius: 3px;
  overflow: hidden;
  color: blue;
  padding-left:65px;
  padding-right:65px;
}
#navBarr .navBar:active {
}

.router-link-active.router-link-exact-active.navBar {
  /* border-bottom: 2px solid rgb(19, 126, 90); */
 color: rgb(5, 146, 99);
 border-bottom: 3px solid rgb(34, 199, 144);
 padding-bottom: 4px;
}
a:active {
  border-bottom: blue;
}
</style>
