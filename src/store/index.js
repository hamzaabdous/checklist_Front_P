import Vue from "vue";
import Vuex from "vuex";

import usersModule from "./models/userModule";
import departementModule from "./models/departementModule";
import functionModule from "./models/functionModule";
import profilegroupModule from "./models/profilegroupModule";
import damageTypeModule from "./models/damageTypeModule";
import damageModule from "./models/damageModule";
import equipmentModule from "./models/equipmentModule";
import commentModule from "./models/commentModule";

import VuexPersist from "vuex-persist";
Vue.use(Vuex);
 const vuexLocalStorage = new VuexPersist({
  key: "checklistCach",
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
  reducer: (state) => ({
    usersModule: state.usersModule,
  }),
  filter: mutation => (true),
}); 
let store = null;
export default function () {
  store = new Vuex.Store({
    modules: {
      usersModule,
      departementModule,
      functionModule,
      profilegroupModule,
      damageTypeModule,
      damageModule,
      equipmentModule,
      commentModule,
    },
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    plugins: [vuexLocalStorage.plugin],
  });
  return store;
}
export { store };
