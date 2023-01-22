<template>
  <w-app block>  
    <nav class="mainNavBar">
      <div>
        <router-link to="/register" class="navBar">Register</router-link>
        <router-link to="/logIn" class="navBar">Log In</router-link>
        <router-link to="/home" class="navBar">Home</router-link>
        <router-view />
      </div>
    </nav>
  </w-app>
</template>

<script>
</script>

<style>
#app {
  font-family: 'Product Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 15px;
}

.navBar {
  margin-right: 20px;
  text-decoration: none;
  font-weight: 600;
}

.mainNavBar {
  /* text-align: left; */
}
</style>
