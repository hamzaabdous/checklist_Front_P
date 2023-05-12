<template>
  <div style="padding: 5px; padding-top: 2%">
    <v-data-table
      :headers="headers"
      :items="damageTypesByProfile_group_id"
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
          <v-dialog v-model="dialog" max-width="500px">
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
                <v-toolbar-title>{{ formTitle }} Damage Type</v-toolbar-title>
              </v-toolbar>
              <v-card-title>
                <span class="text-h5">Damage Type :</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="editedItem.name"
                        label="name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-select
                        :items="departments"
                        item-text="name"
                        item-value="id"
                        v-model="editedItem.department_id"
                        label="department"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="" @click="close"> Cancel </v-btn>
                <v-btn color="primary" @click="openSave"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-toolbar dark color="error">
                <v-toolbar-title
                  >Delete Damage Type from Equipment Profile !</v-toolbar-title
                >
              </v-toolbar>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this Damage Type?</v-card-title
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
          <v-dialog v-model="confirmAddSave" max-width="600px">
            <v-card>
              <div v-if="editedIndex == -1">
                <v-toolbar dark color="error">
                  <v-toolbar-title>Warning !</v-toolbar-title>
                </v-toolbar>
                <v-card-title class="text-h5"
                  >Are you sure you want to add this DamageType?</v-card-title
                >
              </div>
              <div v-else>
                <v-toolbar dark color="error">
                  <v-toolbar-title>Warning !</v-toolbar-title>
                </v-toolbar>
                <v-card-title class="text-h5"
                  >Are you sure you want to update this
                  DamageType?</v-card-title
                >
              </div>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="closeAddSaveDialog">No</v-btn>
                <v-btn color="primary" @click="save">Yes</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          color="primary"
          @click="editItem(item)"
          class="m-2 mr-2 btn white--text"
        >
          <v-icon medium class="mr-2"> mdi-pencil </v-icon>
        </v-btn>
        <v-btn
          color="#f45"
          @click="deleteItem(item)"
          class="m-2 btn white--text"
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
    confirmAddSave: false,
    search: "",
    headers: [
      { text: "Name", value: "name", sortable: true },
      { text: "Department", value: "department.name", sortable: true },
      { text: "Created date", value: "created_at", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    damageTypes: [],
    damageTypesByProfile_group_id: [],
    departments: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      profile_group_id: "",
      department_id: "",
    },
    defaultItem: {
      name: "",
      profile_group_id: "",
      department_id: "",
    },
  }),
  mounted() {
    document.title = "Checklist";

    this.initialize();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "ADD" : "EDIT";
    },
    ...mapGetters([
      "getdamageTypes",
      "getdamageTypesByProfile_group_id",
      "getdepartements",
    ]),
  },
  watch: {
    dialog(val) {
      if (this.editedIndex == -1) {
        this.editedIndex = -1;
        this.editedItem = {
          id: "",
          name: "",
          profile_group_id: "",
          department_id: "",
        };
        this.closemodifier();
      }

      val || this.close();
    },
    dialogDelete(val) {
      if (this.editedIndex == -1) {
        this.editedIndex = -1;
        this.editedItem = {
          name: "",
          profile_group_id: "",
          department_id: "",
        };
        this.closemodifier();
      }
      val || this.closeDelete();
    },
  },
  created() {},
  methods: {
    initialize() {
      this.setDAMAGETYPESAction().then(() => {
        this.damageTypes = [...this.getdamageTypes];
        this.damageTypes.map((item) => {
          if (item.profile_group_id == localStorage.getItem("id")) {
            this.damageTypesByProfile_group_id.push(item);
          }
        });
      });
      this.setDepartementsAction().then(() => {
        this.departments = [...this.getdepartements];
      });
    },
    ...mapActions([
      "setDAMAGETYPESAction",
      "editDAMAGETYPEAction",
      "deleteDAMAGETYPEAction",
      "addDAMAGETYPEAction",
      "setDAMAGETYPESByProfile_group_idAction",
      "setDepartementsAction",
    ]),

    editItem(item) {
      this.editedIndex = this.damageTypes.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      console.log("item :", item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      console.log("delete", this.editedItem);
      this.deleteDAMAGETYPEAction(this.editedItem)
        .then(() => {
          this.damageTypesByProfile_group_id =
            this.damageTypesByProfile_group_id.filter((e) => {
              return e.id != this.editedItem.id;
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

      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.closemodifier();
    },
    closeDelete() {
      setTimeout(() => {
        this.editedIndex = -1;
        this.closemodifier();
      }, "3000");
      this.dialogDelete = false;
    },
    closeAddSaveDialog() {
      this.confirmAddSave = false;
      this.closemodifier();
    },
    openSave() {
      this.confirmAddSave = true;
    },
    closemodifier() {
      this.dialogModifier = false;
      this.editedIndex = -1;
      this.editedItem = {
        id: "",
        name: "",
        profile_group_id: "",
        department_id: "",
      };
    },
    save() {
      if (this.editedIndex == -1) {
        this.editedItem.profile_group_id = localStorage.getItem("id");
        this.addDAMAGETYPEAction(this.editedItem)
          .then((damageType) => {
            this.damageTypesByProfile_group_id.push(damageType);
            this.LoadingPage = true;

            setTimeout(() => {
              this.LoadingPage = false;
              swal("Good job!", "success", "success");
            }, 2000);
          })
          .catch(() => {
            swal("Error", "", "error");
          });
        this.editedIndex = -1;
        this.editedItem = {
          name: "",
          profile_group_id: "",
          department_id: "",
        };

        this.closeAddSaveDialog();
      } else {
        this.editDAMAGETYPEAction(this.editedItem)
          .then((damageType) => {
            this.damageTypesByProfile_group_id =
              this.damageTypesByProfile_group_id.map((c) => {
                if (c.id == damageType.id) return damageType;
                return c;
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
        this.editedIndex = -1;
        this.editedItem = {
          name: "",
          profile_group_id: "",
          department_id: "",
        };

        this.closeAddSaveDialog();
      }

      this.close();
    },
  },
};
</script>
