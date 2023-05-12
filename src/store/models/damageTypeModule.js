import CustomizedAxios from "../../plugins/axios";

const damageTypeModule = {
  state: {
    damageTypes: [],
    ByProfile_group_id: [],
    ByProfileGroupAndAndDepartmentAndEquipmentIN: [],
  },
  mutations: {
    SET_DAMAGETYPS(state, damageTypes) {
      state.damageTypes = damageTypes;
    },
    SET_DAMAGETYPSByProfile_group_id(state, damageTypes) {
      state.ByProfile_group_id = damageTypes;
    },
    SET_ByProfileGroupAndAndDepartmentAndEquipmentIN(state, damageTypes) {
      state.ByProfileGroupAndAndDepartmentAndEquipmentIN = damageTypes;
    },
    ADD_DAMAGETYPE(state, damageTypes) {
      state.damageTypes.push(damageTypes);
    },
    DELETE_DAMAGETYPE(state, id) {
      state.damageTypes = state.damageTypes.filter((c) => c.id != id);
    },
    EDIT_DAMAGETYPE(state, damageTypes) {
      state.damageTypes = state.damageTypes.map((c) => {
        if (c.id == damageTypes.id) return damageTypes;
        return c;
      });
    },
  },
  actions: {
    setDAMAGETYPESAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("damage_types/")
          .then((response) => {
            commit("SET_DAMAGETYPS", response.data.payload);
            console.log("set damageTypes ");
            resolve(response.data.payload);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    setDAMAGETYPESByProfile_group_idAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damage_types/getByProfile_group_id/" + id)
          .then((response) => {
            commit("SET_DAMAGETYPSByProfile_group_id", response.data);
            resolve(response.data.payload);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    setByProfileGroupAndAndDepartmentAndEquipmentINAction(
      { commit },
      id,
      id2,
      id3
    ) {
      console.log(id, id2, id3);
      return new Promise((resolve, reject) => {
        CustomizedAxios.post(
          `damage_types/getAllByProfileGroupAndAndDepartmentAndEquipmentIN/${id}/${id2}/${id3}`
        )
          .then((response) => {
            commit(
              "SET_ByProfileGroupAndAndDepartmentAndEquipmentIN",
              response.data
            );
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    addDAMAGETYPEAction({ commit }, damageType) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damage_types/create", {
          name: damageType.name,
          profile_group_id: damageType.profile_group_id,
          department_id: damageType.department_id,
        })
          .then((response) => {
            console.log("res add ", response);
            commit("ADD_DAMAGETYPE", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteDAMAGETYPEAction({ commit }, damageType) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damage_types/delete", {
          id: damageType.id,
        })
          .then((response) => {
            commit("DELETE_DAMAGETYPE", damageType.id);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editDAMAGETYPEAction({ commit }, damageType) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damage_types/update", {
          id: damageType.id,
          name: damageType.name,
          profile_group_id: damageType.profile_group_id,
          department_id: damageType.department_id,
        })
          .then((response) => {
            commit("EDIT_DAMAGETYPE", response.data);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getdamageTypes: (state) => {
      return state.damageTypes;
    },
    getdamageTypesByProfile_group_id: (state) => {
      return state.ByProfile_group_id;
    },
    getAllByProfileGroupAndAndDepartmentAndEquipmentIN: (state) => {
      return state.ByProfileGroupAndAndDepartmentAndEquipmentIN;
    },
  },
};
export default damageTypeModule;
