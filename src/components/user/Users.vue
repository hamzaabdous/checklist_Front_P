<template>
  <div style="padding: 5px; padding-top: 2%">
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="loading"
      sort-by="item.id"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#002f6c"
                class="mb-2 btn white--text"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left> mdi-account-multiple-plus </v-icon>
                Add
              </v-btn>
            </template>
            <v-card>
              <v-toolbar dark color="primary">
                <v-toolbar-title
                  >Add user to Equimpent Profile !</v-toolbar-title
                >
              </v-toolbar>
              <v-card-title class="text-h5">Add User</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-col class="d-flex" cols="12" sm="12">
                        <v-select
                          :items="usersSelect"
                          item-text="username"
                          item-value="id"
                          v-model="UserToProfile.user_id"
                          label="users"
                        ></v-select>
                      </v-col>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="" @click="close(item)"> Cancel </v-btn>
                <v-btn depressed color="primary" @click="save(editedItem)">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogModifier" max-width="1000px">
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.username"
                        label="username"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.lastName"
                        label="lastName"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.firstName"
                        label="firstName"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.update_date"
                        label="update date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.phone_number"
                        label="phone number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="" @click="closemodifier(item)">
                  Cancel
                </v-btn>
                <v-btn depressed color="primary" @click="save(editedItem)">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-toolbar dark color="error">
                <v-toolbar-title
                  >Delete User from Equipment Profile
                </v-toolbar-title>
              </v-toolbar>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this user from this Equipment
                Profile ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="" @click="closeDelete">Cancel</v-btn>
                <v-btn depressed color="error" @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          color="#f45"
          class="m-2 btn white--text"
          @click="deleteItem(item)"
        >
          <v-icon medium @click="deleteItem(item)"> mdi-delete </v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize()"> Reset </v-btn>
      </template>
    </v-data-table>
    <LoadingPage v-if="LoadingPage == true" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { defineAsyncComponent } from "vue";
import swal from "sweetalert";
//import LoadingPage from "../LoadingPage.vue";
const LoadingPage = defineAsyncComponent(() => import("../LoadingPage.vue"));
export default {
  components: {
    LoadingPage,
  },
  data: () => ({
    dialog: false,
    LoadingPage: false,
    dialogDelete: false,
    dialogModifier: false,
    search: "",
    headers: [
      { text: "Username", value: "username", align: "start", sortable: true },
      { text: "LastName", value: "lastName", sortable: true },
      { text: "FirstName", value: "firstName", sortable: true },
      { text: "Email", value: "email", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    users: [],
    usersSelect: [],
    usersFiltreByGRP: [],
    UserToProfile: {
      user_id: null,
      profile_group_id: null,
    },

    profile_groupe_id: "",
    editedIndex: -1,
    editedItem: {
      id: "",
      created_date: "",
      email: "",
      password: "",
      phoneNumber: "",
      update_date: "",
      username: "",
      function: {
        id: null,
      },
      firstName: "",
      lastName: "",
    },
    defaultItem: {
      id: "",
      created_date: "",
      email: "",
      password: "",
      phoneNumber: "",
      update_date: "",
      username: "",
      function: {
        id: null,
      },
      firstName: "",
      lastName: "",
    },
  }),
  mounted() {
    document.title = "Checklist";

    this.initialize();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["getUsers", "getProfileGroupUsers"]),
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      this.UserToProfile.profile_group_id = parseFloat(
        localStorage.getItem("id")
      );
      this.getProfileGroupUsersAction(localStorage.getItem("id")).then(() => {
        this.users = [...this.getProfileGroupUsers];
        console.log("this.users", this.users);
      });
      this.setUsersAction(localStorage.getItem("id")).then(() => {
        this.usersSelect = this.getUsers.filter((user) => {
          var exist = this.users.filter((user2) => {
            return user.id == user2.id;
          });
          return exist.length == 0;
        });

        console.log("this.users", this.usersSelect);
      });
    },
    ...mapActions([
      "setUsersAction",
      "editUserAction",
      "deleteUserFromProfileGroupAction",
      "getProfileGroupUsersAction",
      "addUserToProfileGroupAction",
    ]),

    editItem(item) {
      this.editedIndex = this.users.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      this.dialogModifier = true;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.UserToProfile.user_id = item.id;
      this.UserToProfile.profile_group_id = localStorage.getItem("id");
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      //console.log("UserToProfile",this.UserToProfile);
      this.deleteUserFromProfileGroupAction(this.UserToProfile).then(() => {
        this.users = this.users.filter((e) => {
          if (e.id == this.UserToProfile.user_id) {
            console.log("Us", e);
            this.usersSelect.push(e);
          }
          return e.id != this.UserToProfile.user_id;
        });
      });
      this.LoadingPage = true;

      setTimeout(() => {
        this.LoadingPage = false;
        swal("Good job!", "success", "success");
      }, 2000);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
    },
    closemodifier() {
      this.dialogModifier = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    usersSelectchange() {},
    save() {
      console.log("this.UserToProfile", this.UserToProfile);
      this.addUserToProfileGroupAction(this.UserToProfile)
        .then(() => {
          this.users.push(
            this.usersSelect.filter((e) => {
              return e.id == this.UserToProfile.user_id;
            })[0]
          );
          this.usersSelect = this.usersSelect.filter((e) => {
            return e.id != this.UserToProfile.user_id;
          });
          this.LoadingPage = true;

          setTimeout(() => {
            this.LoadingPage = false;
            swal("Good job!", "success", "success");
          }, 2000);
        })
        .catch(() => {
          swal("Error", "", "error");
        });

      this.close();
    },
  },
};
</script>
