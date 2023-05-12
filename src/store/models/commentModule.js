import CustomizedAxios from "../../plugins/axios";

const commentModule = {
  state: {
    comments: [],
  },
  mutations: {
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    ADD_COMMENT(state, COMMENT) {
      state.comments.push(COMMENT);
    },
    DELETE_COMMENT(state, id) {
      state.comments = state.comments.filter((c) => c.id != id);
    },
    EDIT_COMMENT(state, COMMENT) {
      console.log("COMMENT", COMMENT);
      state.comments = state.comments.map((c) => {
        if (c.id == COMMENT.id) return COMMENT;
        return c;
      });
    },
    add_PHOTO_INTO_COMMENT(state, PHOTO) {
      console.log("COMMENT", PHOTO);
      state.comments = state.comments.map((c) => {
        if (c.id == PHOTO.comment_id) return PHOTO;
        return c;
      });
    },
  },
  actions: {
    setCOMMENTSAction({ commit },id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("comments/"+id)
          .then((response) => {
            commit("SET_COMMENTS", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addCOMMENTAction({ commit }, COMMENT) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("comments/create",COMMENT
        )
          .then((response) => {
            commit("ADD_COMMENT", response.data);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addPhotoIntoCOMMENTAction({ commit }, PHOTO) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("comments/addPhotos",PHOTO
        )
          .then((response) => {
           // commit("ADD_PHOTO", response.data);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteCOMMENTAction({ commit }, COMMENT) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("comments/delete",COMMENT)
          .then((response) => {
            commit("DELETE_COMMENT", COMMENT.id);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deletePhotoAction({ commit }, PHOTO) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("comments/deletePhoto",PHOTO)
          .then((response) => {
            //commit("DELETE_COMMENT", PHOTO.id);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editCOMMENTAction({ commit }, COMMENT) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("comments/update", COMMENT ,
        )
          .then((response) => {
            commit("EDIT_COMMENT", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getcomments: (state) => {
      return state.comments;
    },
  },
};
export default commentModule;
