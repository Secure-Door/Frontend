import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import NewWorker from "../views/NewWorker.vue";
import Organization from "../views/Organization.vue";
import OrganizationDetail from "../views/OrganizationDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/workers/new",
    name: "New Worker",
    component: NewWorker,
  },
  {
    path: "/organization",
    name: "Organization",
    component: Organization,
  },
  {
    path: "/organization/detail",
    name: "OrganizationDetail",
    component: OrganizationDetail,
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
