<template>
<div>
    <div>
    <new-room v-if="newRoomModal" :organization="org.id" @close="onCloseNewRoom" /> 
    <worker-detail v-if="selectedWorker" :organization="org.id" :worker="selectedWorker" :rooms="rooms" @close="onCloseNewWorker"  />
    <v-card
    class="org-info-card"
    outlined
    elevation="2"
  >
      <div>
        <div class="title">
          Name
        </div>
        <div class="content">
          {{org.name}}
        </div>
      </div>

      <div class="text-center">
        <div class="title">
         Owner
        </div>
        <div class="content">
          {{org.owner}}
        </div>
      </div>

      <div class="text-right">
        <div class="title">
          Name
        </div>
        <div class="content">
         
        </div>
      </div>

  </v-card>
  <div>
    <br>
    <br>
    <h2> Workers </h2>

    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">
            #
          </th>
          <th class="text-center">
            Name
          </th>
           <th class="text-center">
             Email
          </th>
          <th class="text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(worker,index) in workers"
          :key="index"
        >
          <td>{{index+1 }}</td>
          <td>{{ worker.name }}</td>
          <td>{{ worker.email }}</td>
          <td> 
              <v-btn
                    @click="editWorker(index)"
                    icon
                    color="green"
                  >
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>

                </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <br>
  <v-btn block  @click="selectedWorker = true">
      <v-icon> mdi-plus </v-icon>
      New Worker
  </v-btn>

 <br>
    <br>
    <h2> Rooms </h2>

   <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">
            #
          </th>
            <th class="text-center">
           id
          </th>
          <th class="text-center">
            Name
          </th>
          <th class="text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(room,index) in rooms"
          :key="index"
        >
          <td>{{index+1 }}</td>
          <td>{{room.id }}</td>
          <td>{{ room.name }}</td>
          <td> 
              <v-btn
                    @click="deleteRoom(room.id)"
                    icon
                    color="green"
                  >
                <v-icon>mdi-delete-sweep</v-icon>
              </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

    <v-btn block  @click="newRoomModal = true">
      <v-icon> mdi-plus </v-icon>
      New Room
  </v-btn>
  </div>

  </div>
</div>
</template>

<script>
import {mapMutations} from "vuex"
import {getOrganization,  getRoomsOfOrganization, getWorkerOfOrganization,deleteRoom} from "../api"
import WorkerDetail from "../components/organization-detail/WorkerDetailModel";
import NewRoom from "../components/organization-detail/NewRoomModal.vue";

export default {
  data:()=>({
    org: {},
    workers : [],
    selectedWorker: null,
    openNewWorker : true,
    newRoomModal : false,
    rooms : [],
  }),
  created(){
    const id = this.$route.query.id;
    getOrganization(id)
      .then(org => {
        this.org = org;
        return this.getWorkers();
      })
      .then(()=> this.getRooms(this.org.id))
      .catch(alert);
  },
  components :{
    WorkerDetail,
    NewRoom,
  },
  methods:{
    getWorkers(){
      return getWorkerOfOrganization(this.org.id).then(workers => this.workers = workers).then(()=> console.log(this.workers)).catch(alert);
    },
    getRooms() {
      return getRoomsOfOrganization(this.org.id).then(rooms => this.rooms = rooms).catch(alert);
    },
    onCloseNewWorker(){
      this.selectedWorker = null;
      this.getWorkers();
    },
    onCloseNewRoom(){
      this.newRoomModal = false;
      this.getRooms();
    },
    deleteRoom(ind){
      deleteRoom(ind)
      .then(()=> console.log("Room Deleted"))
      .then(()=> this.getRooms())
      .catch(alert);
    },
    editWorker(i){
      this.selectedWorker = this.workers[i]; 
    },
    ...mapMutations(["setLoading"])
  }
}
</script>



<style>

.org-info-card {
  padding: 3rem 4rem;
  display: flex !important;
  justify-content: space-between;
  text-align: left;
}

.org-info-card > div{
  width: auto;
}


.org-info-card  .title  {
  font-size: .8rem !important;
  font-weight: 300;
  transform: translateY(.5rem);

}

.org-info-card  .content  {
  font-size: 1.8rem;
  transform: translateY(-.5rem);
}


</style>