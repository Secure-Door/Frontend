<template>
    <div class="login-wrapper grey darken-3">
      <v-card width="500px" class="px-4 py-5">
        <form>
        
        <v-text-field
          v-model="username"
          label="Username"
          required
          :disabled ="isLoading"
        ></v-text-field>
        <v-text-field
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPass ? 'text' : 'password'"
            name="password"
            label="Password"
            v-model="password"
            error
            @click:append="showPass = !showPass"
          ></v-text-field>
        <div class="text-right">
           <v-btn
          class="mr-4"
          :loading="isLoading"
          @click="login"
        >
          LOGIN
        </v-btn>
        </div>
      </form>
      </v-card>
    </div>
</template>

<script>

import {login} from "../api"
import {pick} from "lodash"
import {mapMutations} from "vuex"
export default {
  data:()=>({
    showPass:false,
    username : "",
    password: "",
    isLoading : false,
  }),

  methods:{
    ...mapMutations(["setUser","setUserToken"]),
    login(){
      this.isLoading = true;
      console.log("Hello")
      login(pick(this,["username","password"]))
      .then(data => {
        this.setUser(data.user);
        this.setUserToken(data.token)
      })
      .catch(() => alert("Login failed"))
      .finally(()=> this.isLoading =false)
      ;
    }
  }
}

</script>

<style>
  .login-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

  }

</style>
