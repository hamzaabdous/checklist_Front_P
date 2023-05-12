import CustomizedAxios from "../../plugins/axios";

const equipmentModule = {
  state: {
    equipments: [],
    EquipmentsByCounters: [],
    EquipmentsByCounter: {
      id: null,
      nameEquipment: "",
      damagedCount: null,
      confirmedCount: null,
      closedCount: null,
    },
  },
  mutations: {
    SET_EQUIPMENTS(state, equipments) {
      state.equipments = equipments;
    },
    ADD_EQUIPMENT(state, EQUIPMENT) {
      state.equipments.push(EQUIPMENT);
    },
    DELETE_EQUIPMENT(state, id) {
      state.equipments = state.equipments.filter((c) => c.id != id);
    },
    EDIT_EQUIPMENT(state, EQUIPMENT) {
      console.log("EQUIPMENT", EQUIPMENT);
      state.equipments = state.equipments.map((c) => {
        if (c.id == EQUIPMENT.id) return EQUIPMENT;
        return c;
      });
    },
    SET_EquipmentsByCounters(state, EquipmentsByCounters) {
      state.EquipmentsByCounters = EquipmentsByCounters;
    },
    SET_EquipmentsByCounter(state, EquipmentsByCounter) {
      state.EquipmentsByCounter.id = EquipmentsByCounter.id;
      state.EquipmentsByCounter.nameEquipment =
        EquipmentsByCounter.nameEquipment;
      state.EquipmentsByCounter.damagedCount = EquipmentsByCounter.damagedCount;
      state.EquipmentsByCounter.confirmedCount =
        EquipmentsByCounter.confirmedCount;
      state.EquipmentsByCounter.closedCount = EquipmentsByCounter.closedCount;
    },
  },
  actions: {
    setequipmentsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("equipments/")
          .then((response) => {
            commit("SET_EQUIPMENTS", response.data.payload);
            console.log("set EQUIPMENT 1");
            resolve(response.data.payload);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    setequipmentsByIDAction({ commit },id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("equipments/"+id)
          .then((response) => {
            commit("SET_EQUIPMENTS", response.data.payload);
            console.log("set EQUIPMENT 1");
            resolve(response.data.payload);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    getEquipmentsByCountersAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("equipments/getEquipmentsByCounters/" + id)
          .then((response) => {
            commit("SET_EquipmentsByCounters", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    getEquipmentsByCountersITAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("equipments/getEquipmentsByCountersIT/" + id)
          .then((response) => {
            commit("SET_EquipmentsByCounters", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    getEquipmentsByCountersTECAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("equipments/getEquipmentsByCountersTEC/" + id)
          .then((response) => {
            commit("SET_EquipmentsByCounters", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    getEquipmentsByCounterAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("equipments/getEquipmentsByCounter/" + id)
          .then((response) => {
            commit("SET_EquipmentsByCounter", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    getEquipmentsByCounterITAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("equipments/getEquipmentsByCounterIT/" + id)
          .then((response) => {
            commit("SET_EquipmentsByCounter", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    getEquipmentsByCounterTECAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("equipments/getEquipmentsByCounterTEC/" + id)
          .then((response) => {
            commit("SET_EquipmentsByCounter", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    addEQUIPMENTAction({ commit }, EQUIPMENT) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("equipments/create", {
          name: EQUIPMENT.name,
          profile_group_id: EQUIPMENT.profile_group_id,
        })
          .then((response) => {
            console.log("res add ", response);
            commit("ADD_EQUIPMENT", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteEQUIPMENTAction({ commit }, EQUIPMENT) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("equipments/delete", {
          id: EQUIPMENT.id,
        })
          .then((response) => {
            commit("DELETE_EQUIPMENT", EQUIPMENT.id);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editEQUIPMENTAction({ commit }, EQUIPMENT) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("equipments/update", {
          id: EQUIPMENT.id,
          name: EQUIPMENT.name,
          profile_group_id: EQUIPMENT.profile_group_id,
        })
          .then((response) => {
            commit("EDIT_EQUIPMENT", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getequipments: (state) => {
      return state.equipments;
    },
    getEquipmentsByCounters: (state) => {
      return state.EquipmentsByCounters;
    },
    getEquipmentsByCounter: (state) => {
      return state.EquipmentsByCounter;
    },
  },
};
export default equipmentModule;
