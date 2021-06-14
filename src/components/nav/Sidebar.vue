<template>
  <v-navigation-drawer
    class="pt-2 sidebar"
    style="border:none !important"
    v-model="drawer"
    :mini-variant.sync="mini"
    app
    dark
    color="grey darken-4"
    fixed
    floating
    permanent
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>
      <v-list-item-title> {{ user.username}} </v-list-item-title>
    </v-list-item>

    <v-list dense>
      <router-link :to="item.to" v-for="item in items" :key="item.title">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapState } from "vuex";

export default {
  props: ["mini"],
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home-city", to: "/workers/new" },
        { title: "My Account", icon: "mdi-account", to: "/workers/new" },
        {
          title: "Workers",
          icon: "mdi-account-group-outline",
          to: "/workers/new",
        },
        {
          title: "Organization",
          icon: "mdi-office-building",
          to: "/organization",
        },
        {
          title: "About",
          icon: "mdi-information",
          to: "/organization",
        },
        {
          title:"Contact",
          icon: "mdi-account-box",
          to : "/",
        }
      ],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style>
.sidebar a {
  text-decoration: none;
}
</style>
