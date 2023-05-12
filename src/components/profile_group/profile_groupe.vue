<template>
  <div style="padding: 50px; padding-top: 8%">
    <v-data-table
      :headers="headers"
      :items="profilegroups"
      :loading="loading"
      sort-by="item.id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Equipment's Profile :</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#1D4F91"
                class="mb-2 btn white--text"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left> mdi-account-multiple-plus </v-icon>
                Add
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        outlined
                        v-model="editedItem.name"
                        label="name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        :items="departments"
                        outlined
                        item-text="name"
                        item-value="id"
                        v-model="editedItem.department_id"
                        label="departments :"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#ffff" class="mb-2 btn" @click="close(item)">
                  Cancel
                </v-btn>
                <v-btn
                  color="#1D4F91"
                  class="mb-2 btn white--text"
                  @click="openSave"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-toolbar dark color="error">
                <v-toolbar-title>Warning !</v-toolbar-title>
              </v-toolbar>
              <v-card-title class="text-h5"
                >Are you sure you want to Delete this Equipment
                group?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="#fff"
                  class="mb-2 btn black--text"
                  @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  color="#1D4F91"
                  class="mb-2 btn white--text"
                  @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="confirmAddSave" max-width="500px">
            <v-card>
              <div v-if="editedIndex == -1">
                <v-toolbar dark color="error">
                  <v-toolbar-title>Warning !</v-toolbar-title>
                </v-toolbar>
                <v-card-title class="text-h5"
                  >Are you sure you want to add this Equipment
                  group?</v-card-title
                >
              </div>
              <div v-else>
                <v-toolbar dark color="error">
                  <v-toolbar-title>Warning !</v-toolbar-title>
                </v-toolbar>
                <v-card-title class="text-h5"
                  >Are you sure you want to update this Equipment
                  group?</v-card-title
                >
              </div>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="#ffff"
                  class="mb-2 btn"
                  @click="closeAddSaveDialog"
                  >No</v-btn
                >
                <v-btn
                  color="#1D4F91"
                  class="mb-2 btn white--text"
                  @click="save"
                  >Yes</v-btn
                >

                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogView" width="1000px">
            <v-card>
              <v-container>
                <div>Equipment's Profile</div>
                <v-tabs color="#1D4F91" left>
                  <v-tab>users</v-tab>
                  <v-tab>Damage type</v-tab>
                  <v-tab>Equipment</v-tab>

                  <v-tab-item>
                    <v-container fluid>
                      <v-row>
                        <template>
                          <User />
                        </template>
                      </v-row>
                    </v-container>
                  </v-tab-item>
                  <v-tab-item>
                    <v-container fluid>
                      <v-row>
                        <template>
                          <DamageType />
                        </template>
                      </v-row>
                    </v-container>
                  </v-tab-item>
                  <v-tab-item>
                    <v-container fluid>
                      <v-row>
                        <template> </template>
                      </v-row>
                    </v-container>
                  </v-tab-item>
                </v-tabs>
              </v-container>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn depressed color="" @click="closedialogView"
                  >Cancel</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          color="teal"
          class="mr-2 btn white--text"
          @click="pageView(item)"
        >
          <v-icon medium class="mr-2"> mdi-eye-outline </v-icon>
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
          <v-icon medium> mdi-delete </v-icon>
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
const LoadingPage = defineAsyncComponent(() => import("../LoadingPage.vue"));
//import LoadingPage from "../LoadingPage.vue";
const User = defineAsyncComponent(() => import("../user/Users.vue"));
//import User from "../user/Users.vue";
const DamageType = defineAsyncComponent(() =>
  import("../damage_Type/DamageType.vue")
);
//import DamageType from "../damage_Type/DamageType.vue";
export default {
  components: {
    User,
    DamageType,
    LoadingPage,
  },
  data: () => ({
    dialog: false,
    LoadingPage: false,
    dialogDelete: false,
    confirmAddSave: false,
    dialogView: false,
    loading: "false",
    headers: [
      { text: "Name", value: "name", sortable: true },
      { text: "Department", value: "department.name", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    profilegroups: [],
    departments: [],
    departmentid: "",
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      department_id: "",
    },
    defaultItem: {
      id: "",
      name: "",
      department_id: "",
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
      return this.editedIndex === -1
        ? "New Equipment group"
        : "Edit Equipment group";
    },
    ...mapGetters(["getprofilegroups", "getdepartements"]),
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.editedIndex = -1;
        this.editedItem = {
          id: "",
          name: "",
          department_id: "",
        };
      }

      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {},
  methods: {
    initialize() {
      this.setPROFILEDROUPSAction().then(() => {
        this.profilegroups = [...this.getprofilegroups];
      });
      this.setDepartementsAction().then(() => {
        this.departments = [...this.getdepartements];
      });
    },
    pageView(item) {
      this.$router.push({
        name: "ViewEquipement",
        params: { name: item.name },
      });
      localStorage.removeItem("id");
      localStorage.setItem("id", item.id);
    },
    ...mapActions([
      "setPROFILEDROUPSAction",
      "editPROFILEDROUPAction",
      "deletePROFILEDROUPAction",
      "addPROFILEDROUPAction",
      "setDepartementsAction",
    ]),

    editItem(item) {
      this.editedIndex = this.profilegroups.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      console.log("this.editedItem", this.editedItem);
      this.deletePROFILEDROUPAction(this.editedItem)
        .then(() => {
          this.profilegroups = [...this.getprofilegroups];

          this.LoadingPage = true;

          setTimeout(() => {
            this.LoadingPage = false;
            swal("Good job!", "success", "success");
          }, 2000);
        })
        .catch(() => {
          swal("Error", "", "error");
        });

      this.closeDelete();
    },
    close() {
      this.editedIndex = -1;

      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    closeAddSaveDialog() {
      this.confirmAddSave = false;
    },
    closedialogView() {
      this.dialogView = false;
    },
    openSave() {
      this.confirmAddSave = true;
    },
    save() {
      console.log("this.editedItem", this.editedItem);
      if (this.editedIndex == -1) {
        this.addPROFILEDROUPAction(this.editedItem)
          .then(() => {
            this.profilegroups = [...this.getprofilegroups];
            console.log("this.profilegroups", this.profilegroups);
            this.LoadingPage = true;

            setTimeout(() => {
              this.LoadingPage = false;
              swal("Good job!", "success", "success");
            }, 2000);
          })
          .catch(() => {
            swal("Error", "", "error");
          });

        this.closeAddSaveDialog();
      } else {
        this.editPROFILEDROUPAction(this.editedItem)
          .then(() => {
            this.profilegroups = [...this.getprofilegroups];
            this.LoadingPage = true;

            setTimeout(() => {
              this.LoadingPage = false;
              swal("Good job!", "success", "success");
            }, 2000);
          })
          .catch(() => {
            swal("Error", "", "error");
          });

        this.closeAddSaveDialog();
      }

      this.close();
    },
  },
};
</script>
<style></style>
