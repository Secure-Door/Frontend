<template>
  <v-app-bar color="grey darken-4" absolute dark>
    <v-app-bar-nav-icon @click="$emit('nav-toggle')"></v-app-bar-nav-icon>

    <v-toolbar-title>NFC App Admin Panel</v-toolbar-title>

    <v-spacer></v-spacer>


   

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>
