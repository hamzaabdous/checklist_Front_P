import CustomizedAxios from "../../plugins/axios";

const profilegroupModule = {
  state: {
    profilegroups: [],
    ProfileGroupUsers: [],
    ProfileGroupsByCounters: [],
    ProfileGroupsByCounter: {
      id: null,
      name: "",
      equipmentsCount: null,
      functionalEquipmnet: null,
      damagedCount: null,
      confirmedCount: null,
      closedCount: null,
      nonFunctionalEquipmnet:null,
    },
  },
  mutations: {
    SET_PROFILEDROUPS(state, profilegroups) {
      state.profilegroups = profilegroups;
    },
    SET_ProfileGroupUsers(state, ProfileGroupUsers) {
      state.ProfileGroupUsers = ProfileGroupUsers;
    },
    SET_ProfileGroupsByCounters(state, ProfileGroupsByCounters) {
      state.ProfileGroupsByCounters = ProfileGroupsByCounters;
    },
    SET_ProfileGroupsByCounter(state, ProfileGroupsByCounter) {
      state.ProfileGroupsByCounter.id = ProfileGroupsByCounter.id;
      state.ProfileGroupsByCounter.name = ProfileGroupsByCounter.name;
      state.ProfileGroupsByCounter.equipmentsCount = ProfileGroupsByCounter.equipmentsCount;
      state.ProfileGroupsByCounter.functionalEquipmnet = ProfileGroupsByCounter.functionalEquipmnet;
      state.ProfileGroupsByCounter.damagedCount = ProfileGroupsByCounter.damagedCount;
      state.ProfileGroupsByCounter.confirmedCount = ProfileGroupsByCounter.confirmedCount;
      state.ProfileGroupsByCounter.closedCount = ProfileGroupsByCounter.closedCount;
      state.ProfileGroupsByCounter.nonFunctionalEquipmnet = ProfileGroupsByCounter.nonFunctionalEquipmnet;

    },
    ADD_PROFILEDROUP(state, profilegroups) {
      state.profilegroups.push(profilegroups);
    },
    DELETE_PROFILEDROUP(state, id) {
      state.profilegroups = state.profilegroups.filter((c) => c.id != id);
    },
    EDIT_PROFILEDROUP(state, profilegroups) {
      state.profilegroups = state.profilegroups.map((c) => {
        if (c.id == profilegroups.id) return profilegroups;
        return c;
      });
    },
  },
  actions: {
    setPROFILEDROUPSAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("profilegroup/")
          .then((response) => {
            commit("SET_PROFILEDROUPS", response.data.payload);
            console.log("set profilegroups ");
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    getProfileGroupUsersAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("profilegroup/getProfileGroupUsers/" + id)
          .then((response) => {
            commit("SET_ProfileGroupUsers", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    getProfileGroupsByCountersAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("profilegroup/getProfileGroupsByCounters")
          .then((response) => {
            commit("SET_ProfileGroupsByCounters", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    getProfileGroupsByCountersITAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("profilegroup/getProfileGroupsByCountersIT")
          .then((response) => {
            commit("SET_ProfileGroupsByCounters", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    getProfileGroupsByCountersTECAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("profilegroup/getProfileGroupsByCountersTEC")
          .then((response) => {
            commit("SET_ProfileGroupsByCounters", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    getProfileGroupsByCounterAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("profilegroup/getProfileGroupsByCounter/" + id)
          .then((response) => {
            commit("SET_ProfileGroupsByCounter", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    getProfileGroupsByCounterITAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("profilegroup/getProfileGroupsByCounterIT/" + id)
          .then((response) => {
            commit("SET_ProfileGroupsByCounter", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    getProfileGroupsByCounterTECAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("profilegroup/getProfileGroupsByCounterTEC/" + id)
          .then((response) => {
            commit("SET_ProfileGroupsByCounter", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    addPROFILEDROUPAction({ commit }, profilegroup) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("profilegroup/create", {
          name: profilegroup.name,
          department_id: profilegroup.department_id,
        })
          .then((response) => {
            commit("ADD_PROFILEDROUP", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addUserToProfileGroupAction({ commit }, UserToProfileGroup) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("profilegroup/addUserToProfileGroup", {
          user_id: UserToProfileGroup.user_id,
          profile_group_id: UserToProfileGroup.profile_group_id,
        })
          .then((response) => {
            //commit("ADD_PROFILEDROUP", response.data.payload);
            console.log(response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deletePROFILEDROUPAction({ commit }, profilegroup) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("profilegroup/delete", {
          id: profilegroup.id,
        })
          .then((response) => {
            commit("DELETE_PROFILEDROUP", profilegroup.id);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteUserFromProfileGroupAction({ commit }, profilegroup) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("profilegroup/deleteUserFromProfileGroup", {
          profile_group_id: profilegroup.profile_group_id,
          user_id: profilegroup.user_id,
        })
          .then((response) => {
            console.log("res",response.data.payload);
           // commit("DELETE_PROFILEDROUP", profilegroup.id);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editPROFILEDROUPAction({ commit }, profilegroup) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("profilegroup/update", {
          id: profilegroup.id,
          name: profilegroup.name,
          department_id: profilegroup.department_id,
        })
          .then((response) => {
            commit("EDIT_PROFILEDROUP", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getprofilegroups: (state) => {
      return state.profilegroups;
    },
    getProfileGroupUsers: (state) => {
      return state.ProfileGroupUsers;
    },
    getProfileGroupsByCounters: (state) => {
      return state.ProfileGroupsByCounters;
    },
    getProfileGroupsByCounter: (state) => {
      return state.ProfileGroupsByCounter;
    },
  },
};
export default profilegroupModule;
