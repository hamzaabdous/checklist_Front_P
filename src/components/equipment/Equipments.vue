<template>
  <div style="padding: 5px; padding-top: 2%">
    <v-data-table
      :headers="headers"
      :items="equipmentsFiltres"
      :search="search"
      sort-by="item.id"
      class="elevation-1"
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
          <v-dialog v-model="dialog" max-width="600px">
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
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="" @click="close(item)">Cancel</v-btn>
                <v-btn color="primary" @click="save(editedItem)">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-toolbar dark color="error">
                <v-toolbar-title>Warning !</v-toolbar-title>
              </v-toolbar>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this Equipment ?</v-card-title
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
          color="primary"
          class="ml-2 m-2 btn white--text"
          @click="editItem(item)"
        >
          <v-icon medium class="mr-2"> mdi-pencil </v-icon>
        </v-btn>

        <v-btn
          color="#f45"
          class="ml-2 m-2 btn white--text"
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
//import LoadingPage from "../LoadingPage.vue";
const LoadingPage = defineAsyncComponent(() => import("../LoadingPage.vue"));
export default {
  components: {
    LoadingPage,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      { text: "Name", value: "name", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    equipments: [],
    equipmentsFiltres: [],
    profile_groupe: [],
    profile_groupesFiltre: [],
    idgrp: null,
    editedIndex: -1,
    editedItem: {
      id: null,
      name: "",
      profile_group_id: "",
    },
    defaultItem: {
      id: null,
      name: "",
      description: "",
      profileGroup: {
        id: null,
      },
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
    ...mapGetters(["getequipments"]),
  },
  watch: {
    dialog(val) {
      val || this.close();
      if (!val) {
        this.editedIndex = -1;
        this.editedItem = {
          id: null,
          name: "",
          profile_group_id: "",
        };
      }
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {},
  methods: {
    initialize() {
      console.log("initialize");
      this.idgrp = localStorage.getItem("id");
      this.setequipmentsAction().then(() => {
        this.equipments = [...this.getequipments];
        this.equipments.forEach((element) => {
          if (element.profile_group_id == localStorage.getItem("id")) {
            this.equipmentsFiltres.push(element);
          }
        });
      });
    },
    ...mapActions([
      "setequipmentsAction",
      "editEQUIPMENTAction",
      "deleteEQUIPMENTAction",
      "addEQUIPMENTAction",
    ]),

    editItem(item) {
      this.editedIndex = this.equipments.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteEQUIPMENTAction(this.editedItem)
        .then(() => {
          this.equipmentsFiltres = this.equipmentsFiltres.filter((e) => {
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
      this.editedIndex = -1;

      this.closeDelete();
    },
    close() {
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    save() {
      if (this.editedIndex == -1) {
        this.editedItem.profile_group_id = localStorage.getItem("id");
        this.addEQUIPMENTAction(this.editedItem)
          .then((equipment) => {
            this.equipmentsFiltres.push(equipment);

            this.LoadingPage = true;

            setTimeout(() => {
              this.LoadingPage = false;
              swal("Good job!", "success", "success");
            }, 2000);
          })
          .catch(() => {
            swal("Error", "", "error");
          });
      } else {
        this.editEQUIPMENTAction(this.editedItem)
          .then((equipment) => {
            this.equipmentsFiltres = this.equipmentsFiltres.map((c) => {
              if (c.id == equipment.id) return equipment;
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
      }

      this.close();
    },
  },
};
</script>
