<template>
  <v-app>
    <login v-if="!userToken" />
    <v-main v-else>
      <sidebar :mini="miniSidebar"></sidebar>
      <app-bar @nav-toggle="miniSidebar = !miniSidebar"></app-bar>
        <v-container style="padding-top:25vh; text-align:center"> 
          <div style="width:1000px; display:inline-block">
            <Loading v-if="isLoading" />
              <router-view v-else />
          </div>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "./components/nav/Sidebar";
import AppBar from "./components/nav/Appbar";
import Loading from "./components/Loading";
import Login from "./views/Login.vue"
import {mapState} from "vuex";

export default {
  data: () => ({
    miniSidebar: false,
  }),
  components: {
    Sidebar,
    AppBar,
    Loading,
    Login,
  },
  computed: {
    ...mapState(["isLoading","userToken","user"])
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
