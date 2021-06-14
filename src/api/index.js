import axios from "axios";
import store from "../store";

const NFC_ADDRESS = "http://NFC-Hub:80"
const SERVER_ADDRES = "http://192.168.1.6:8000"

const url = (path) => `${SERVER_ADDRES}/${path}`;

const getHeaders = () =>  ({ 'Authorization' : `Token ${store.state.userToken}` })
const config = () => ({headers:getHeaders()})

export const login = (data) => axios.post(url("managers/login"), data).then(res => res.data);

export const getNFCTag = () =>fetch(NFC_ADDRESS).then(r => r.text());

export const createOrgnaization =  (data) => axios.post(url("organizations/"),data, config()).then(res => res.data);

export const deleteOrganization = (id) => axios.delete(url(`organizations/${id}/`),config()).then(res => res.data);

export const getOrganizations = () => axios.get(url("organizations/"),config()).then(res=>res.data);

export const getOrganization =  (id) => axios.get(url(`organizations/${id}/`),config()).then(res=> res.data)

export const createRoom =  (form) => axios.post(url("rooms/"),form,config()).then(res => res.data);



export  const getRoom = async id => (
  {
    "id": id,
    "name": "Salon",
    "floor": 1,
    "priority": 1,
    "organization": 4
  });


export const getRoomsOfOrganization = (orgId) => axios.get(url("rooms/list_rooms/"),{...config(), params: {
  organization_id : orgId
} } ).then(res => res.data)


export const deleteRoom = (roomId) => axios.delete(url(`rooms/${roomId}/`),config()).then(res => res.data);

export const getWorkerOfOrganization = (orgId) => axios.get(url(`workers/with_organization_id/`),{...config(),params:{
  organization_id : orgId
}}).then(res => res.data);

export const createWorker = (form) => 
  axios.post(url(`workers/`),form,config())
      .then(res => res.data);

export const updateWorker = (form,id) => 
  axios.put(url(`workers/${id}/`),form,config())
    . then(res => res.data);
  
export const deleteWorker = async (id) => new Promise(resolve => setTimeout(resolve, 1000)).then(()=> console.log("Worker deleted",id))

export const getWorker = async (id) => (
  {
    id,
    name:"Ahmet",
    nfcTag: "12368asd45",
    email: "ahmet@namil.com",
    organization: "id-of-org",
    permissions: ["room-id-1"]
   }
);



