import CustomizedAxios  from "../../plugins/axios";
import AxiosSendEmail  from "../../plugins/sendEmailAxios";

const damageTypeModule = {
  state: {
    damages: [],
    DamageTypeByEquipmentID: [],
    getEquipmentDamagesMergedWithDamageTypes: [],
    foremanIntervention: [],
  },
  mutations: {
    DAMAGE(state, damages) {
      state.damages = damages;
      console.log("cccc", state.damages);
    },
    ADD_DAMAGE(state, damage) {
      state.damages.push(damage);
    },
    ADD_DAMAGES(state, damages) {
      state.damages.push(damages);
    },
    DELETE_DAMAGE(state, id) {
      state.damages = state.damages.filter((c) => c.id != id);
    },
    EDIT_DAMAGE(state, damage) {
      state.damages = state.damages.map((c) => {
        if (c.id == damage.id) return damage;
        return c;
      });
    },
    FindDamageTypeByEquipmentID(state, damages) {
      state.DamageTypeByEquipmentID = damages;
    },
    getEquipmentDamagesMergedWithDamageTypes(state, damages) {
      state.getEquipmentDamagesMergedWithDamageTypes = damages;
    },
    sendDamagePhotosStoragePath(state, damage) {
      state.damages = state.damages.map((c) => {
        if (c.id == damage.id) {
          c.photos = damage.photos;
          c.description = damage.description;
        }
        return c;
      });
    },
  },
  actions: {
    setDAMAGEAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("damages/")
          .then((response) => {
            commit("DAMAGE", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    declareDamageAction({ commit }, damagesList) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damages/declareDamage", {
          damages: damagesList,
        })
          .then((response) => {
            console.log("res add ", response);
            commit("ADD_DAMAGES", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    confirmDamageAction({ commit }, damage) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damages/confirmDamage", {
          id: damage.id,
          confirmedBy_id: damage.confirmedBy_id,
          resolveDescription: damage.resolveDescription,
        })
          .then((response) => {
            console.log("res confirmDamage ", response.data.payload);

            commit("EDIT_DAMAGE", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    closeDamageAction({ commit }, damage) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damages/closeDamage", {
          id: damage.id,
          closedBy_id: damage.closedBy_id,
        })
          .then((response) => {
            console.log("res closeDamage ", response.data.payload);
            commit("EDIT_DAMAGE", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    revertDamageAction({ commit }, damage) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damages/revertDamage", {
          id: damage.id,
          rejectedBy_id: damage.rejectedBy_id,
          rejectedDescription: damage.rejectedDescription,
        })
          .then((response) => {
            console.log("res revertDamage ", response.data.payload);
            commit("EDIT_DAMAGE", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addDAMAGESAction({ commit }, damages) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damages/addList", damages)
          .then((response) => {
            commit("ADD_DAMAGES", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteDAMAGEAction({ commit }, damage) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damages/delete/", damage)
          .then((response) => {
            commit("DELETE_DAMAGE", damage.id);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editDAMAGEAction({ commit }, damage) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damages/update", {
          created_date: damage.created_date,
          updateDate: damage.updateDate,
          name: damage.name,
          department: {
            id: damage.department.id,
          },
          profileGroup: {
            id: damage.profileGroup.id,
          },
        })
          .then((response) => {
            commit("EDIT_DAMAGE", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    FindDamageTypeByEquipmentIDAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("damages/getDamagesByEquipments/" + id)
          .then((response) => {
            commit("FindDamageTypeByEquipmentID", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    FindDamageTypeByEquipmentIDRapportAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("damages/getDamagesByEquipmentsRapport/" + id)
          .then((response) => {
            // commit("FindDamageTypeByEquipmentID", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    FindDamageTypeByEquipmentID_ITAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("damages/getDamagesByEquipmentsIT/" + id)
          .then((response) => {
            commit("FindDamageTypeByEquipmentID", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    FindDamageTypeByEquipmentID_TECAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("damages/getDamagesByEquipmentsTEC/" + id)
          .then((response) => {
            commit("FindDamageTypeByEquipmentID", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getEquipmentDamagesMergedWithDamageTypesAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get(
          "damages/getEquipmentDamagesMergedWithDamageTypes/" + id
        )
          .then((response) => {
            commit(
              "getEquipmentDamagesMergedWithDamageTypes",
              response.data.payload
            );
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    sendDamagePhotosStoragePathAction({ commit }, formData) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damages/foremanIntervention", formData)
          .then((response) => {
            commit("sendDamagePhotosStoragePath", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            console.log("error", error);
            reject(error);
          });
      });
    },
    presenceChecksAction({ commit }, presenceCheck) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/presence_checks/create", presenceCheck)
          .then((response) => {
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    SendEmailAction({ commit }, Data) {
      return new Promise((resolve, reject) => {
        AxiosSendEmail.post("http://localhost:8082/api", Data)
          .then((response) => {
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getdamage: (state) => {
      return state.damages;
    },
    getDamageTypeByEquipmentID: (state) => {
      return state.DamageTypeByEquipmentID;
    },
    getEquipmentDamagesMergedWithDamageTypes: (state) => {
      return state.getEquipmentDamagesMergedWithDamageTypes;
    },
    sendDamagePhotosStoragePath: (state) => {
      return state.foremanIntervention;
    },
  },
};
export default damageTypeModule;
