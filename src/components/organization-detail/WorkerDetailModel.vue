<template>
  <v-row justify="center">
    <v-dialog
      v-model="open"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"> {{ newWorker ? 'Create' : 'Update' }} Worker </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              label="Name"
              required
              v-model="name"
            ></v-text-field>
            <v-text-field
              label="Email"
              required
              v-model="email"
            >
            </v-text-field>
            <v-row>
              <v-col cols="10">
                
              <v-text-field
              label="NFC Tag"
              required
              v-model="nfc_tag"
              disabled
            ></v-text-field>
              </v-col>
              <v-col cols="2">
                 <v-btn
      class="mx-2"
      fab
      text
      dark
      color="indigo"
      style="transform:translateY(.6rem)"
      @click="updateNFCTag()"
    >
      <v-icon dark>
        mdi-refresh
      </v-icon>
    </v-btn>
              </v-col>
            </v-row>
             <v-row>
               <v-col v-for="room in rooms" :key="room.id" cols="3">
             <v-checkbox
              v-model="permissions[room.id]"
              :label="room.name"
              color="indigo"
              hide-details
            ></v-checkbox>
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
            @click="!newWorker ? update(): create()"
            :loading="isLoading"
          >
           {{ newWorker ?  'Create' : 'Update' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { pick } from 'lodash';

import { updateWorker, createWorker,getNFCTag} from "../../api"

export default {
  props:["worker","rooms","organization"],
  data :()=>({
    id : "",
    email : "",
    name : "",
    permissions : {},
    newWorker : false,
    nfc_tag : "",
    isLoading : false,
  }),
  components:{
  },
  created(){
    this.newWorker = this.worker === true;
    console.log("isNewUser",this.newWorker)
    this.permissions = Object.fromEntries(this.rooms 
      .map(e=> [e.id,this.newWorker? false:this.worker?.permissions.includes(e.id)]))
    if(!this.newWorker){
      ["email","name","nfc_tag","id"].forEach(k => this[k] = this.worker[k]);
    }
    this.updateNFCTag();
  },
  computed:{
    open(){
      return this.worker != null;
    }
  },
  methods:{
    updateNFCTag(){
      this.isLoading = true;
      return getNFCTag().then(tag => this.nfc_tag = decodeURIComponent(tag)).then(() => this.isLoading = false);
    },
    close(){
      this.$emit("close");
    },
    create(){
      this.isLoading = true;
      const form = this.getForm();
      createWorker(form)
        .then(this.close)
        .then(()=> alert("Worker Created"))
        .catch(alert);
    },
    update(){
      this.isLoading = true;
      const form = {...this.getForm()};
      console.log("Form",form);
      updateWorker(form,this.id)
        .then(this.close)
        .then(()=> alert("Worker Updated"))
        .catch(alert);
    },
    getForm(){
      let form =  pick(this,["email","name","nfc_tag","permissions","organization"]);
      form.permissions = Object.entries(form.permissions).filter(([,v])=> v).map((([k])=>Number(k)))
      console.log(form.permissions);
      console.log(form);
      return form;
    }
  }
}
</script>