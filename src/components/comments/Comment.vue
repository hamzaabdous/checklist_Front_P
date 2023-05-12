<template>
  <div
    class="containerComment"
    :style="[
      status == 'resolve'
        ? { 'background-color': '#febd8ca6' }
        : status == 'description'
        ? { 'background-color': '#97D2EC' }
        : { 'background-color': 'rgba(255, 84, 68, 0.705)' },
    ]"
  >
    <v-dialog
      v-model="dialogimageShow"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialogimageShow = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title>Picture </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn class="mr-2 white--text" color="teal">
          <v-icon medium class="mr-2">mdi-folder-image</v-icon>
          <a
            class="downloadpicture"
            :href="`http://127.0.0.1:8000/storage/cdn/damagePhotos/${PhotoShow.filename}`"
            download
            target="_blank"
          >
            download picture</a
          >
        </v-btn>
        <v-btn
          @click="deletePhoto()"
          v-if="userActive_id == user_id"
          class="mr-2 white--text"
          color="red"
        >
          <v-icon medium class="mr-2">mdi-delete</v-icon>
          <a class="downloadpicture"> Delete picture</a>
        </v-btn>
      </v-toolbar>
      <v-card>
        <div class="p-100">
          <v-img
            :lazy-src="`http://127.0.0.1:8000/storage/cdn/damagePhotos/${PhotoShow.filename}`"
            max-height="90%"
            max-width="100%"
            :src="`http://127.0.0.1:8000/storage/cdn/damagePhotos/${PhotoShow.filename}`"
          ></v-img>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogAddPhoto" max-width="700px">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialogAddPhoto = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items> </v-toolbar-items>
        </v-toolbar>

        <v-card-title class="text-h5"> Photo : </v-card-title>
        <v-col cols="12" md="12">
          <v-file-input
            label="Pictures"
            v-model="photo.photos"
            filled
            multiple
            prepend-icon="mdi-camera"
          ></v-file-input>
        </v-col>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="" @click="dialogAddPhoto = false">
            Close
          </v-btn>
          <v-btn depressed color="primary" @click="addPhoto()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="600px">
      <v-card>
        <v-toolbar dark color="error">
          <v-toolbar-title>Warning !</v-toolbar-title>
        </v-toolbar>
        <v-card-title class="text-h5"
          >Are you sure you want to delete this Comment ?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="" @click="dialogDelete = false">Cancel</v-btn>
          <v-btn depressed color="error" @click="removeComment()">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12" md="12" class="d-inline-flex">
        <v-row>
          <v-col cols="9"
            ><span class="mr-auto">
              <span class="white--text text-h6"> {{ username }} </span>
              <v-chip
                class="white--text cursor text-uppercase"
                :color="getColor(status)"
              >
                {{ status }}
              </v-chip>
              <span class="white--text text--lighten-2">
                {{ created_at }}
              </span>
              :
            </span></v-col
          >
          <v-col cols="3"
            ><span class="commentAction" v-if="userActive_id == user_id">
              <v-icon @click="dialogDelete = true" class="pa-2"
                >mdi-chat-remove-outline</v-icon
              >
              <v-icon @click="editeComment()" class="pa-2"
                >mdi-chat-processing</v-icon
              >
              <v-icon @click="saveComment()" v-if="disableicon"
                >mdi-check-bold</v-icon
              >
            </span></v-col
          >
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-textarea
              :disabled="disableTextArea"
              solo
              name="input-7-4"
              label="Description"
              :value="comment"
              v-model="commentObject.comment"
              class="withC"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <div>
              <h3>
                Photos :
                <h5
                  style="
                    display: inline-block;
                    color: gray;
                    font-style: italic;
                    font-weight: 500;
                  "
                  v-if="commentPhotos.length == 0"
                >
                  (Empty)
                </h5>
              </h3>

              <div class="actions">
                <v-icon
                  @click="dialogAddPhoto = true"
                  class="pa-2"
                  v-if="disableicon"
                  >mdi-plus</v-icon
                >
              </div>
              <v-row class="photosComment" v-if="commentPhotos.length != 0">
                <template>
                  <v-row>
                    <v-col
                      v-for="item in commentPhotos"
                      :key="item.id"
                      class="d-flex child-flex"
                      cols="2"
                    >
                      <v-img
                        max-height="150"
                        max-width="200"
                        :src="`http://127.0.0.1:8000/storage/cdn/damagePhotos/${item.filename}`"
                        aspect-ratio="1"
                        class="grey lighten-2 imageRadius"
                        @click="showImage(item)"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-col>
                  </v-row>
                </template>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <LoadingPage v-if="LoadingPage == true" />
  </div>
</template>
<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import swal from "sweetalert";
//import LoadingPage from "../LoadingPage.vue";
const LoadingPage = defineAsyncComponent(() => import("../LoadingPage.vue"));
export default {
  name: "comment",
  components: {
    LoadingPage,
  },
  props: [
    "username",
    "damage_id",
    "user_id",
    "comment_id",
    "status",
    "comment",
    "photos",
    "refreshComments",
    "comment_id",
    "editeCommentParent",
    "created_at",
  ],
  data() {
    return {
      commentPhotos: [],
      LoadingPage: false,
      disableTextArea: true,
      disableicon: false,
      dialogimageShow: false,
      dialogAddPhoto: false,
      dialogDelete: false,

      usernameDATA: "",
      descriptionEdite: "",
      PhotoShow: {
        id: null,
        filename: "",
        comment_id: null,
        user_id: null,
        created_at: "",
        updated_at: "",
      },
      photo: {
        comment_id: null,
        photos: [],
      },
      photoDelete: {
        id: null,
        comment_id: null,
      },

      commentObject: {
        id: null,
        damage_id: null,
        user_id: null,
        comment: "",
        status: "",
        photos: [],
      },
      fonction: "",
      userDepartment: "",
      userActive_id: null,
      commentSheck: "",
    };
  },
  mounted() {
    this.fonction = this.getUserActive.fonction.name;
    this.userActive_id = this.getUserActive.id;
    this.userDepartment = this.getUserActive.fonction.department.name;

    this.commentObject.id = this.comment_id;
    this.commentSheck = this.comment;

    this.commentObject.comment = this.comment;
    this.commentObject.user_id = this.user_id;
    this.commentObject.damage_id = this.damage_id;

    this.photo.comment_id = this.comment_id;
    this.commentPhotos = [...this.photos];
  },
  computed: {
    ...mapGetters(["getUserActive"]),
  },
  methods: {
    getColor(status) {
      var color = "";
      if (status == "description") color = "primary";
      else if (status == "reject") color = "#f54";
      else if (status == "resolve") color = "#FF8F56";

      return color;
    },
    ...mapActions([
      "addCOMMENTAction",
      "getEquipmentsByCounterAction",
      "deleteCOMMENTAction",
      "editCOMMENTAction",
      "addPhotoIntoCOMMENTAction",
      "deletePhotoAction",
    ]),

    removeComment() {
      this.commentObject.id = this.comment_id;
      this.deleteCOMMENTAction(this.commentObject).then((resolve) => {
        this.refreshComments(this.comment_id);
        this.LoadingPage = true;

        setTimeout(() => {
          this.LoadingPage = false;
          swal("Good job!", "success", "success");
        }, 2000);
      });
    },
    editeComment() {
      this.disableTextArea = false;
      this.disableicon = true;
    },
    saveComment() {
      if (this.commentSheck == this.commentObject.comment) {
        this.disableTextArea = true;
        this.disableicon = false;
      } else {
        this.editCOMMENTAction(this.commentObject).then((resolve) => {
          this.editeComment(this.commentObject);
          this.disableTextArea = true;
          this.disableicon = false;
          this.commentSheck = this.commentObject.comment;

          this.LoadingPage = true;
          setTimeout(() => {
            this.LoadingPage = false;
            swal("Good job!", "success", "success");
          }, 2000);
        });
      }
    },
    addPhoto() {
      var formData = new FormData();
      formData.append("comment_id", parseFloat(this.photo.comment_id));

      this.photo.photos.map((item) => {
        formData.append("photos[]", item);
      });

      this.addPhotoIntoCOMMENTAction(formData).then((resolve) => {
        this.commentPhotos = [];

        resolve.map((item) => {
          this.commentPhotos.push(item);
        });
        this.LoadingPage = true;

        setTimeout(() => {
          this.LoadingPage = false;
          swal("Good job!", "success", "success");
        }, 2000);
        this.dialogAddPhoto = false;
      });
    },
    showImage(item) {
      console.log("image click", item);
      this.PhotoShow = item;
      this.dialogimageShow = true;
    },
    deleteComment() {},
    deletePhoto() {
      this.photoDelete.id = this.PhotoShow.id;
      this.photoDelete.comment_id = this.PhotoShow.comment_id;
      this.deletePhotoAction(this.photoDelete).then((resolve) => {
        this.commentPhotos = [];

        resolve.map((item) => {
          this.commentPhotos.push(item);
        });
        this.LoadingPage = true;

        setTimeout(() => {
          this.LoadingPage = false;
          swal("Good job!", "success", "success");
        }, 2000);
        this.dialogimageShow = false;
      });
    },
    sendImage() {
      this.photo.foreman_id = this.getUserActive.id;

      var formData = new FormData();
      formData.append("id", parseFloat(this.photo.id));
      formData.append("description", this.photo.description);

      this.photo.photos.map((item) => {
        formData.append("photos[]", item);
      });
      formData.append(
        "foreman_id",
        parseFloat(parseFloat(this.photo.foreman_id))
      );

      console.log("this.photo", this.photo);
      this.sendDamagePhotosStoragePathAction(formData)
        .then((resolve) => {
          this.LoadingPage = true;

          setTimeout(() => {
            this.LoadingPage = false;
            swal("Good job!", "success", "success");
          }, 2000);
        })
        .catch(() => {
          swal("Error", "", "error");
        });

      this.dialogimage = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.containerComment {
  margin-bottom: 10px;
  margin-top: 4px;
  border: 1.5px solid #000000d4;
  border-radius: 8px;
  border: solid 1px black;
  max-width: 45rem;
  margin: 0 auto;
  padding: 10px;
}
.test {
  max-width: 36rem;
}
.withC {
  max-width: 46rem;
  .v-text-field__slot {
    color: black !important;
    font-weight: 700 !important;
  }
}
.actions {
  float: right;
}
.photosComment {
  margin: 0px;
  padding: 5px;
  max-width: 45rem;
  min-height: 20px;
  border-radius: 5px;
  background: #284066e6;
  h5 {
    color: #fff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }
}
</style>
