<template>
  <v-row justify="center">
    <v-dialog
      persistent
      v-model="open"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"> New Room </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              label="Name"
              required
              v-model="name"
            ></v-text-field>
            <v-row>
            
              <v-col cols="4">
                <v-text-field
              label="priority"
              required
              v-model="priority"
              type="number"
            ></v-text-field>
              </v-col>
         <v-col cols="4">
                <v-text-field
              label="floor"
              required
              v-model="floor"
              type="number"
            ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close()"
            :disabled="isLoading"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="create()"
            :loading="isLoading"
          >
          Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

import {  createRoom} from "../../api"
import pick from "lodash/pick";
export default {
  props:["organization"],
  data :()=>({
    open: true,
    name : "",
    floor : 3,
    priority : 0,
    isLoading : false,
  }),
  components:{
  },
  created(){
  },
  computed:{
  },
  methods:{
    close(){
      this.$emit("close");
    },
    create(){
      this.isLoading = true;
      const form = pick(this,["name","floor","priority","organization"])
      console.log(form);
      createRoom(form)
        .then(this.close)
        .then(()=> alert("Room Created"))
        .catch(alert);
    },
  }
}
</script>