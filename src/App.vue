<template>
  <w-app block>  
    <nav>
      <router-link to="/register" class="navBar">Register</router-link>
      <router-link to="/logIn" class="navBar">Log In</router-link>
      <router-link to="/home" class="navBar">Home</router-link>
      <router-view />
    </nav>
  </w-app>
</template>

<script>
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.navBar {
  margin: 15px;
  text-decoration: none;
}
</style>
