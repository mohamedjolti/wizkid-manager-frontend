<template>
  <div id="app" data-app>
    <v-app-bar elevation="4">
      <router-link v-if="!getIsAuth" class="link" to="/login"
        >Login to use all features</router-link
      >
    </v-app-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import {  mapGetters } from "vuex";

export default {
  computed:{
   ...mapGetters(["getIsAuth"]),
  },
  name: "App",
  components: {},
};
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
</style>
