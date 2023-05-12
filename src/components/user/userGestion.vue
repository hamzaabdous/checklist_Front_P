<template>
  <div style="padding: 50px; padding-top: 8%">
    <v-data-table
      :headers="headers"
      :items="users"
      sort-by="item.id"
      class="elevation-1"
      :search="search"
      :loading="loading"
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

          <v-dialog v-model="dialog" max-width="700px">
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
              <div class="mr-2">
                <v-btn color="blue" outlined rounded @click="showDialogeExel()">
                  <v-icon large color="blue"> mdi-attachment-plus </v-icon>
                </v-btn>
              </div>
            </template>
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="close(item)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>ADD USER</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items> </v-toolbar-items>
              </v-toolbar>
              <v-card-title class="text-h5 grey--text text--darken-3">
                User Profile :
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.firstName"
                      label="First Name"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.lastName"
                      label="Last Name"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.username"
                      label="Username"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.password"
                      label="Password"
                      outlined
                      type="password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.phoneNumber"
                      label="Phone Number"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="6" md="6">
                    <v-select
                      :items="departments"
                      item-text="name"
                      item-value="id"
                      v-model="departmentID"
                      label="Department"
                      outlined
                      @change="departmentChange"
                    ></v-select>
                  </v-col>
                  <v-col cols="6" md="6">
                    <v-select
                      :items="fonctions"
                      item-text="name"
                      item-value="id"
                      v-model="editedItem.fonction_id"
                      label="Function"
                      outlined
                      :disabled="departmentID == '' || departmentID == null"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="" @click="dialog = false">
                  Close
                </v-btn>
                <v-btn depressed color="primary" @click="save()"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogediteUserToProfilegroup" max-width="600px">
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialogediteUserToProfilegroup = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Profile Group</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items> </v-toolbar-items>
              </v-toolbar>
              <v-container>
                <v-row>
                  <div style="padding: 22px; padding-top: 4%">
                    <v-data-table
                      :headers="headersProfilegroup"
                      :items="profilegroupsActive"
                      :search="searchprofilegroupsActive"
                      sort-by="item.id"
                      class="elevation-1"
                    >
                      <template v-slot:top>
                        <v-dialog
                          v-model="dialogprofilgroupToUser"
                          max-width="700px"
                        >
                          <v-card>
                            <v-toolbar dark color="error">
                              <v-toolbar-title>Warning !</v-toolbar-title>
                            </v-toolbar>
                            <v-card-title class="text-h5"
                              >Are you sure you want to delete this
                              user?</v-card-title
                            >
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                depressed
                                color=""
                                @click="dialogprofilgroupToUser = false"
                                >Cancel</v-btn
                              >
                              <v-btn
                                depressed
                                color="error"
                                @click="deleteUserFromProfileGroup"
                                >OK</v-btn
                              >
                              <v-spacer></v-spacer>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-dialog
                          v-model="dialogAddprofilgroupToUser"
                          max-width="800px"
                        >
                          <v-card>
                            <v-toolbar dark color="primary">
                              <v-toolbar-title
                                >Add Profilegroup
                              </v-toolbar-title>
                            </v-toolbar>
                            <v-container>
                              <v-row justify="center">
                                <v-col cols="8" md="8">
                                  <v-select
                                    :items="profilegroupsFiltre"
                                    item-text="name"
                                    item-value="id"
                                    v-model="UserToProfile.profile_group_id"
                                    label="profilegroup"
                                    outlined
                                  ></v-select>
                                </v-col>
                              </v-row>
                            </v-container>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color=""
                                @click="dialogAddprofilgroupToUser = false"
                                >Cancel</v-btn
                              >
                              <v-btn
                                color="primary"
                                @click="AddUserFromProfileGroup"
                                >Add</v-btn
                              >
                              <v-spacer></v-spacer>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-toolbar flat>
                          <v-text-field
                            v-model="searchprofilegroupsActive"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                          ></v-text-field>
                          <v-spacer></v-spacer>
                          <template>
                            <v-btn
                              @click="dialogAddprofilgroupToUser = true"
                              color="#002f6c"
                              class="mb-2 btn white--text"
                            >
                              <v-icon left> mdi-account-multiple-plus </v-icon>
                              Add
                            </v-btn>
                          </template>
                        </v-toolbar>
                      </template>
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-btn
                          color="red"
                          class="mr-2 btn white--text"
                          @click="opendialogDelete(item)"
                        >
                          <v-icon medium class="mr-2"> mdi-delete </v-icon>
                        </v-btn>
                      </template>
                      <template v-slot:no-data>
                        <v-btn color="primary" @click="initialize()">
                          Reset
                        </v-btn>
                      </template>
                    </v-data-table>
                  </div>
                </v-row>
              </v-container>
              <v-container> </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogModifier" max-width="700px">
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="closemodifier">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Modify USER</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items> </v-toolbar-items>
              </v-toolbar>
              <v-card-title class="text-h5 grey--text text--darken-3">
                User Profile :
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.firstName"
                      label="First Name"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.lastName"
                      label="Last Name"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.username"
                      label="Username"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.phoneNumber"
                      label="Phone Number"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="6" md="6">
                    <v-select
                      :items="departments"
                      item-text="name"
                      item-value="id"
                      v-model="departmentID"
                      label="Department"
                      outlined
                      @change="departmentChange"
                    ></v-select>
                  </v-col>
                  <v-col cols="6" md="6">
                    <v-select
                      :items="fonctions"
                      item-text="name"
                      item-value="id"
                      v-model="editedItem.fonction_id"
                      label="Function"
                      outlined
                      :disabled="departmentID == '' || departmentID == null"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="" @click="closemodifier"> Close </v-btn>
                <v-btn
                  depressed
                  color="primary"
                  @click="dialogConfirmationModifier = true"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogConfirmationModifier" max-width="600px">
            <v-card>
              <v-toolbar dark color="error">
                <v-toolbar-title>Warning !</v-toolbar-title>
              </v-toolbar>
              <v-card-title class="text-h5"
                >Are you sure you want to Modifier this user?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  depressed
                  color=""
                  @click="dialogConfirmationModifier = false"
                  >Cancel</v-btn
                >
                <v-btn depressed color="error" @click="save()">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-toolbar dark color="error">
                <v-toolbar-title>Warning !</v-toolbar-title>
              </v-toolbar>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this user?</v-card-title
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
          <v-dialog v-model="dialogExel" max-width="800px">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Ajouter from exel </v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="11">
              <h3 class="sub-title">File exel :</h3>
              <v-file-input outlined label="File" v-model="file"></v-file-input>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="" @click="dialogExel = false">Cancel</v-btn>
          <v-btn depressed color="primary" @click="addFromExel()"
            >Save</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          v-if="
            item.fonction.name == 'DRIVER' || item.fonction.name == 'FOREMAN'
          "
          color="#FB8C00"
          class="mr-2 btn white--text"
          @click="editeUserToProfilegroupItem(item)"
        >
          <v-icon medium class="mr-2"> mdi-car-cog </v-icon>
        </v-btn>
        <v-btn
          color="primary"
          class="mr-2 btn white--text"
          @click="editItem(item)"
        >
          <v-icon medium class="mr-2"> mdi-pencil </v-icon>
        </v-btn>
        <v-btn
          color="#f45"
          class="mr-2 btn white--text"
          @click="deleteItem(item)"
        >
          <v-icon medium @click="deleteItem(item)"> mdi-delete </v-icon>
        </v-btn>
        <v-btn
          color="#545"
          class="m-2 btn white--text"
          @click="resetPassword(item)"
        >
          <v-icon medium> mdi-lock-reset </v-icon>
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
    dialogExel: false,
    LoadingPage: false,
    dialogDelete: false,
    dialogModifier: false,
    showInput: false,
    showInputDepartment: false,
    dialogediteUserToProfilegroup: false,
    dialogprofilgroupToUser: false,
    dialogAddprofilgroupToUser: false,
    dialogConfirmationModifier: false,
    search: "",
    loading: "false",
    headers: [
      { text: "Username", value: "username", align: "start", sortable: true },
      { text: "LastName", value: "lastName", sortable: true },
      { text: "FirstName", value: "firstName", sortable: true },
      { text: "Email", value: "email", sortable: true },
      { text: "Company", value: "company", sortable: true },
      { text: "Fonction", value: "fonction.name", sortable: true },
      { text: "Department", value: "fonction.department.name", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headersProfilegroup: [
      { text: "Name", value: "name", align: "start", sortable: true },
      { text: "Created at", value: "created_at", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    users: [],
    profilegroups: [],
    profilegroupsActive: [],
    profilegroupsData: [],
    profilegroupsFiltre: [],
    UserToProfile: {
      user_id: null,
      profile_group_id: null,
    },
    departments: [],
    departmentid: null,
    fonctions: [],
    profile_groupe_id: "",
    editedIndex: -1,
    departmentID: "",
    editedItem: {
      id: "",
      created_date: null,
      email: "",
      password: null,
      phoneNumber: "",
      update_date: null,
      username: "",
      fonction_id: "",
      firstName: "",
      lastName: "",
      fonction: {
        id: "",
        department: {
          id: "",
        },
      },
    },
    defaultItem: {
      id: "",
      created_date: "",
      email: "",
      password: null,
      phoneNumber: "",
      update_date: "",
      username: "",
      fonction_id: "",
      firstName: "",
      lastName: "",
      fonction: {
        id: "",
        department: {
          id: "",
        },
      },
    },
    searchprofilegroupsActive: "",
    file: [],
    objectExel:{
      users:[],
      countUsers:0,
    },
  }),
  mounted() {
    document.title = "Checklist";
    this.loading = true;
    setTimeout(() => {
      this.initialize();
      this.loading = false;
    }, 2500);
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
    ...mapGetters([
      "getUsers",
      "getdepartements",
      "getfunctions",
      "getprofilegroups",
    ]),
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      if (!val) {
        this.editedIndex = -1;
        this.editedItem = {
          id: "",
          name: "",
          departmentID: "",
          fonction_id: "",
          fonction: {
            id: "",
            department: {
              id: "",
            },
          },
        };
      }
      val || this.closeDelete();
    },
    dialogModifier(val) {
      if (!val) {
        this.closemodifier();
      }
    },
    dialogediteUserToProfilegroup(val) {
      if (!val) {
        this.closemodifier();
      }
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      console.log("initialize");
      this.setUsersAction().then(() => {
        this.users = [...this.getUsers];
      });
      this.setDepartementsAction().then(() => {
        this.departments = [...this.getdepartements];
      });
      this.setPROFILEDROUPSAction().then(() => {
        this.profilegroups = [...this.getprofilegroups];
      });
      this.setFUNCTIONSAction().then(() => {
        this.fonctions = [...this.getfunctions];
      });
    },
    ...mapActions([
      "setUsersAction",
      "editUserAction",
      "deleteUserAction",
      "addUserAction",
      "setDepartementsAction",
      "setFUNCTIONSAction",
      "setPROFILEDROUPSAction",
      "addUserToProfileGroupAction2",
      "deleteUserFromProfileGroupAction2",
      "resetPasswordAction",
      "addUserFromExelAction",
    ]),
    changeDepartmentinDialogeProfilgroup() {
      this.profilegroupsActive = [];
      this.profilegroupsActive = this.profilegroupsData.filter((e) => {
        return e.department_id == this.departmentid;
      });
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      this.departmentID = this.editedItem.fonction.department.id;
      this.dialogModifier = true;
    },
    editeUserToProfilegroupItem(item) {
      this.profilegroupsActive = [];
      this.UserToProfile.user_id = item.id;

      console.log("item user", item);

      this.editedIndex = this.users.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      this.profilegroupsActive = item.profile_groups;
      this.profilegroupsData = item.profile_groups;
      console.log("this.profilegroupsActive", this.profilegroupsActive);
      this.profilegroupsFiltre = this.profilegroups.filter((e) => {
        var exist = this.profilegroupsActive.filter((i) => {
          return i.id == e.id;
        });
        return exist.length == 0;
      });
      this.LoadingPage = true;

      setTimeout(() => {
        this.LoadingPage = false;
      }, 2000);
      this.dialogediteUserToProfilegroup = true;
    },
    SaveUserToProfilegroupItem() {
      this.UserToProfile.user_id = this.editedItem.id;
      this.addUserToProfileGroupAction(this.UserToProfile)
        .then(() => {
          console.log("done ");
          this.LoadingPage = true;

          setTimeout(() => {
            this.LoadingPage = false;
          }, 2000);
        })
        .catch(() => {
          swal("Error", "", "error");
        });

      this.dialogediteUserToProfilegroup = false;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteUserAction({
        id: this.editedItem.id,
      }).then(() => {
        this.users = [...this.getUsers];
      });
      this.LoadingPage = true;

      setTimeout(() => {
        this.LoadingPage = false;
      }, 2000);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
    },
    closemodifier() {
      this.dialogModifier = false;
      this.editedIndex = -1;
      this.departmentID = "";
      this.editedItem = {
        id: "",
        created_date: "",
        email: "",
        password: null,
        phoneNumber: "",
        update_date: "",
        username: "",
        fonction_id: "",
        firstName: "",
        lastName: "",
        fonction: {
          id: "",
          department: {
            id: "",
          },
        },
      };
    },
    opendialogDelete(item) {
      this.UserToProfile.profile_group_id = item.id;
      this.dialogprofilgroupToUser = true;
      console.log("this.UserToProfile", this.UserToProfile);
    },
    deleteUserFromProfileGroup() {
      this.deleteUserFromProfileGroupAction2(this.UserToProfile)
        .then(() => {
          this.profilegroupsActive = this.profilegroupsActive.filter((e) => {
            if (e.id != this.UserToProfile.profile_group_id) {
              return true;
            } else {
              var deletedProfileGroup = this.getprofilegroups.filter((e) => {
                return e.id == this.UserToProfile.profile_group_id;
              })[0];
              this.profilegroupsFiltre.push(deletedProfileGroup);
            }
          });
          this.LoadingPage = true;

          setTimeout(() => {
            this.LoadingPage = false;
          }, 2000);
        })
        .catch(() => {
          swal("Error", "", "error");
        });

      this.dialogprofilgroupToUser = false;
    },
    AddUserFromProfileGroup() {
      this.addUserToProfileGroupAction2(this.UserToProfile)
        .then((user) => {
          this.users = [...this.getUsers];
          this.profilegroupsActive = user.profile_groups;
          this.profilegroupsFiltre = this.profilegroupsFiltre.filter((e) => {
            return e.id != this.UserToProfile.profile_group_id;
          });
          this.LoadingPage = true;

          setTimeout(() => {
            this.LoadingPage = false;
          }, 2000);
        })
        .catch(() => {
          swal("Error", "", "error");
        });

      this.dialogAddprofilgroupToUser = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    save() {
      if (this.editedIndex == -1) {
        console.log("add");
        this.addUserAction(this.editedItem).then(() => {
          this.setUsersAction().then(() => {
            this.users = [...this.getUsers];
          });
          this.closemodifier();
          this.LoadingPage = true;

          setTimeout(() => {
            this.LoadingPage = false;
          }, 2000);
        });
      } else {
        console.log("edite");
        this.editUserAction(this.editedItem).then(() => {
          this.users = [...this.getUsers];
          this.dialogModifier = false;
          this.closemodifier();
          this.LoadingPage = true;

          setTimeout(() => {
            this.LoadingPage = false;
          }, 2000);
        });
      }
      this.dialogConfirmationModifier = false;
      this.close();
    },
    departmentChange(id) {
      this.fonctions = this.getfunctions.filter((e) => {
        return e.department_id == id;
      });
    },
    resetPassword(item) {
      this.resetPasswordAction(item)
        .then(() => {
          swal("success", "Password has been reset successfully", "success");
        })
        .catch(() => {
          swal("Error", "", "error");
        });
    },
    showDialogeExel() {
      this.dialogExel = true;
    },
    addFromExel() {
      var file = this.file,
        f = file;

      var XLSX = require("xlsx");
      var reader = new FileReader();
      var that = this;

      reader.onload = function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: "array", cellDates: true });
        let sheetName = workbook.SheetNames[0];
        console.log(workbook);
        let worksheet = workbook.Sheets[sheetName];
        console.log(XLSX.utils.sheet_to_json(worksheet));
        that.usersFromExel = [...XLSX.utils.sheet_to_json(worksheet)];
        that.dataExelToObjectLaravel(that.usersFromExel);
      };
      reader.readAsArrayBuffer(f);
      this.dialogExel = false;
    },
    dataExelToObjectLaravel(DATA) {

      this.objectExel.users = DATA;
      this.objectExel.countUsers = DATA.length;

      this.addUserFromExelAction(this.objectExel).then((resolve) => {
        this.initialize();    
        this.dialogExel = false;
      });
      setTimeout(() => {
      }, 3000);
    },
  },
};
</script>
