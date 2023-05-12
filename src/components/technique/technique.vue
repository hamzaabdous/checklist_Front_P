<template>
  <div style="padding: 50px; padding-top: 8%">
    <v-col cols="6" md="6">
      <v-btn
        v-if="fonction == 'FOREMAN'"
        color="primary"
        class="pa-2 white--text"
        @click="changeDepartment"
      >
        Fill in checklist<v-icon medium class="mr-2"> mdi-eye-outline </v-icon>
      </v-btn>
    </v-col>
    <v-data-table
      :headers="computedHeaders"
      :items="profilegroupsBydepartements"
      :search="search"
      :loading="loading"
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
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.NonFunctionalEquipement="{ item }">
        <p>
          {{ item.equipmentsCount - item.functionalEquipmnet }}
        </p>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          color="teal"
          class="mr-2 btn white--text"
          @click="pageView(item)"
        >
          <v-icon medium class="mr-2"> mdi-eye-outline </v-icon>
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
    loading: false,
    LoadingPage: false,
    search: "",
    fonction: "",
    confirmAddSave: false,
    headers: [
      { text: "Name", value: "name", sortable: true },
      {
        text: "Total equipment Checked",
        value: "equipmentCheckedCount",
        sortable: true,
      },
      { text: "Total equipments", value: "equipmentsCount", sortable: true },
      {
        text: "With non defects items",
        value: "functionalEquipmnet",
        sortable: true,
      },
      {
        text: "With defects items",
        value: "NonFunctionalEquipement",
        sortable: true,
      },
      { text: "Total of defects", value: "damagedCount", sortable: true },
      { text: "Resolved", value: "confirmedCount", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    profilegroups: [],
    profilegroupsBydepartements: [],
    departements: [],
    test: [],
    merge: [],
    departementId: "",
    editedIndex: -1,
    ProfileGroupsByCounters: {
      id: null,
      equipmentsCount: null,
      damagedCount: null,
      confirmedCount: null,
      closedCount: null,
    },
    editedItem: {
      id: "",
      name: "",
      departement: "",
      domain: {
        id: "",
      },
    },
    defaultItem: {
      id: "",
      name: "",
      departement: "",
      domain: {
        id: "",
      },
    },
    userDepartment: "",
  }),
  mounted() {
    document.title = "Checklist";
    this.fonction = this.getUserActive.fonction.name;

    this.loading = true;
    setTimeout(() => {
      this.initialize();
      this.loading = false;
    }, 2500);
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    computedHeaders() {
      this.fonction = this.getUserActive.fonction.name;
      this.userDepartment = this.getUserActive.fonction.department.name;
      if (this.userDepartment == "TECHNIQUE") {
        return this.headers.filter((c) => c.value != "equipmentCheckedCount");
      } else return this.headers;
    },
    ...mapGetters([
      "getProfileGroupsByCounters",
      "getdepartements",
      "getUserActive",
    ]),
  },
  watch: {
    dialog(val) {
      if (this.editedIndex == -1) {
        this.editedIndex = -1;
        this.editedItem = {
          id: "",
          name: "",
          departement: "",
          domain: {
            id: "",
          },
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
      this.profilegroupsBydepartements = [];

      if (this.getUserActive.fonction.name == "ADMIN") {
        this.getProfileGroupsByCountersAction().then(() => {
          this.profilegroupsBydepartements = [
            ...this.getProfileGroupsByCounters,
          ];
        });
      } else {
        if (this.getUserActive.fonction.department_id == 1) {
          this.getProfileGroupsByCountersITAction().then(() => {
            this.profilegroupsBydepartements = [
              ...this.getProfileGroupsByCounters,
            ];
          });
        } else if (this.getUserActive.fonction.department_id == 2) {
          this.getProfileGroupsByCountersTECAction().then(() => {
            this.profilegroupsBydepartements = [
              ...this.getProfileGroupsByCounters,
            ];
          });
        } else {
          this.getProfileGroupsByCountersAction().then(() => {
            this.profilegroupsBydepartements = [
              ...this.getProfileGroupsByCounters,
            ];
          });
        }
      }

      this.setDepartementsAction().then(() => {
        this.departements = [...this.getdepartements];
      });
    },
    pageView(item) {
      this.$router.push({
        name: "techniqueView",
        params: { name: item.name },
      });
      localStorage.removeItem("idDomainGroupesid");

      localStorage.setItem("idDomainGroupesid", item.id);
    },
    ...mapActions([
      "getProfileGroupsByCountersAction",
      "setDepartementsAction",
      "getProfileGroupsByCountersITAction",
      "getProfileGroupsByCountersTECAction",
      "getProfileGroupsByCountersAction",
    ]),
    changeDepartment() {
      this.$router.push({
        name: "DamageForeman",
      });
    },
  },
};
</script>
