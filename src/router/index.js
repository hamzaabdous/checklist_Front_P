import Vue from "vue";
import VueRouter from "vue-router";
import Users from "../components/user/Users.vue";
import Departments from "../components/department/Departments.vue";
import DamageType from "../components/damage_Type/DamageType.vue";
import Damage from "../components/damage/Damage.vue";
import DamageForeman from "../components/damage/DamageForeman.vue";

import profile_groupe from "../components/profile_group/profile_groupe.vue";
import ViewEquipement from "../components/ViewEquipement.vue";
import userGestion from "../components/user/userGestion.vue";
import technique from "../components/technique/technique.vue";
import techniqueView from "../components/technique/techniqueView.vue";
import techniqueEquipment from "../components/technique/techniqueEquipment.vue";
import Dashboard from "../components/dashboard/Dashboard.vue";
import Rapport from "../components/rapport/rapport.vue";
import Login from "../View/Login.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/Login",
    name: "Login",
    component: Login,
    params: true,

  },
  {
    path: "/DamageForeman",
    name: "DamageForeman",
    component: DamageForeman,
    params: true,

  },
  {
    path: "/Rapport",
    name: "Rapport",
    component: Rapport,
    params: true,

  },
  {
    path: "/user",
    name: "user",
    component: Users,
    params: true,

  },
  {
    path: "/technique",
    name: "technique",
    component: technique,
    params: true,

  },
  {
    path: "/techniqueView",
    name: "techniqueView",
    component: techniqueView,
    params: true,


  },
  {
    path: "/techniqueEquipment",
    name: "techniqueEquipment",
    component: techniqueEquipment,
    params: true,

  
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard,
    params: true,

 
  },
  {
    path: "/userGestion",
    name: "userGestion",
    component: userGestion,
    params: true,


  },
  {
    path: "/departement",
    name: "Departement",
    component: Departments,
    params: true,

  },
  {
    path: "/damageType",
    name: "Damage Type",
    component: DamageType,
    params: true,

   
  },
  {
    path: "/Damage",
    name: "Damage",
    component: Damage,
    params: true,

   
  },
  {
    path: "/profile_groupe",
    name: "profile_groupe",
    component: profile_groupe,
    params: true,
  },
  {
    path: "/ViewEquipement",
    name: "ViewEquipement",
    component: ViewEquipement,
    params: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
