<template>
  <div>
    <h1> Organizations </h1>
    <v-simple-table >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">
                Name
              </th>
              <th class="text-center">
                Owner
              </th>
              <th class="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(org,ind) in organizations"
              :key="ind"
            >
              <td> <router-link :to="'/organization/detail?id='+decodeURIComponent(org.id)" >
                {{ org.name }}
                </router-link> </td>
              <td>{{ user.username }}</td>
              <td>    
                <v-btn
                    @click="deleteOrganization(org.id)"
                    icon
                    color="red"
                  >
                <v-icon>mdi-delete-sweep</v-icon>
              </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
    </v-simple-table>

        <br>
        <br>
    <h1> New Organization </h1>
    <div id="add-org-form">
        <v-text-field
          v-model="newOrganiationName"
          label="Organization"
          required
        ></v-text-field>
      <v-btn @click="newOrganization()" style="transform:translateY(1rem)">
      Create
      </v-btn>
    </div>
  </div>
</template>

<script>

import {createOrgnaization,getOrganizations} from "../api"

import {mapState} from "vuex";

export default {
  data : () => ({
    organizations : [],
    newOrganiationName: "",
    isLoading: false,
  }),
  created(){
    this.getOrganizations();
  },
  computed:{
    ...mapState(["user"])
  },
  methods:{
    getOrganizations(){
      getOrganizations()
        .then(orgs => this.organizations = orgs);
    },
    newOrganization() {
      this.isLoading=true
      const data = {
        name : this.newOrganiationName,
        owner : this.user.id,
      }
      console.log(data);
      createOrgnaization(data)
        .then(() => alert("Organization Created!"))
        .then(()=> this.getOrganizations())
        .catch(()=> alert("Can not create organization"))
        .finally(()=> {
          this.isLoading = false;
        });
    },
    deleteOrganization(){
    }
  }

}
</script>



<style>
#add-org-form {
  width:40%;
  margin-left: 30%;
  text-align: center;
  display: grid;
  grid-template-columns: 70% auto;
  grid-column-gap: 1rem;
}


</style>