<template>
  <v-container>
    <v-row>
      <v-col cols="3" md="3">
        <template>
          <v-card class="mx-auto" max-width="200" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4 red--text">
                  Pending Damage Tickets
                </div>
                <v-list-item-title class="text-h5 mb-1 red--text">
                  5
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar tile size="60" color="white">
                <v-icon color="red" large>
                  mdi-alarm-light
                </v-icon></v-list-item-avatar
              >
            </v-list-item>
          </v-card>
        </template>
      </v-col>
      <v-col cols="3" md="3">
        <template>
          <v-card class="mx-auto" max-width="200" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4 deep-orange--text">
                  CONFIRMED DAMAGE TICKETS
                </div>
                <v-list-item-title class="text-h5 mb-1 deep-orange--text">
                  5
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar tile size="60" color="white">
                <v-icon color="deep-orange" large>
                  mdi-bell-check
                </v-icon></v-list-item-avatar
              >
            </v-list-item>
          </v-card>
        </template>
      </v-col>
      <v-col cols="3" md="3">
        <template>
          <v-card class="mx-auto" max-width="200" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4 blue--text">
                  Closed Damage Tickets
                </div>
                <v-list-item-title class="text-h5 mb-1 blue--text">
                  5
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar tile size="60" color="white">
                <v-icon color="blue" large>
                  mdi-lock-open
                </v-icon></v-list-item-avatar
              >
            </v-list-item>
          </v-card>
        </template>
      </v-col>

      <v-col cols="3" md="3">
        <template>
          <v-card class="mx-auto" max-width="200" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4 green--text">
                  Total Functional Equipement
                </div>
                <v-list-item-title class="text-h5 mb-1 green--text">
                  5
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar tile size="60" color="white">
                <v-icon color="green" large>
                  mdi-check-bold
                </v-icon></v-list-item-avatar
              >
            </v-list-item>
          </v-card>
        </template>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5" md="5" sm="12">
        <div>
          <v-select
            :items="chartlineBy"
            outlined
            item-text="name"
            item-value="id"
            v-model="chartline"
            label="Damage By :"
            @change="chartlineByFunc"
            color="blue"
          ></v-select>
        </div>
        <table
          class="charts-css show-data-on-hover line show-labels show-primary-axis show-4-secondary-axes show-data-axes"
          id="my-chart"
        >
          <tbody>
            <tr>
              <th class="thchartline" scope="row">Monday</th>
              <td style="--start: 0; --size: 0.6">
                <span class="data"> 4 </span>
              </td>
            </tr>
            <tr>
              <th class="thchartline" scope="row">Tuesday</th>
              <td style="--start: 0.6; --size: 0.8">
                <span class="data"> 4 </span>
              </td>
            </tr>
            <tr>
              <th class="thchartline" scope="row">Wednesday</th>
              <td style="--start: 0.8; --size: 0.5">
                <span class="data"> 4 </span>
              </td>
            </tr>
            <tr>
              <th class="thchartline" scope="row">Thursday</th>
              <td style="--start: 0.5; --size: 0.5">
                <span class="data"> 4 </span>
              </td>
            </tr>
            <tr>
              <th class="thchartline" scope="row">Friday</th>
              <td style="--start: 0.5; --size: 1">
                <span class="data"> 4 </span>
              </td>
            </tr>
            <tr>
              <th class="thchartline" scope="row">Saturday</th>
              <td style="--start: 1; --size: 1">
                <span class="data"> 4 </span>
              </td>
            </tr>
            <tr>
              <th class="thchartline" scope="row">Sunday</th>
              <td style="--start: 1; --size: 1">
                <span class="data"> 4 </span>
              </td>
            </tr>
          </tbody>
        </table>
      </v-col>
      <v-col cols="3" md="3">
        <v-sparkline
          :fill="fill"
          :gradient="selectedGradient"
          :line-width="width"
          :padding="padding"
          :smooth="radius || false"
          :value="value"
          :labels="labels"
          auto-draw
        ></v-sparkline>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" md="4" sm="12">
        <div>
          <v-select
            :items="profilegroups"
            outlined
            item-text="name"
            item-value="id"
            v-model="profile_groupe_id"
            label="Equipment groupe :"
            @change="changeProfile_groupeSELECT"
            color="red"
          ></v-select>
        </div>
        <div id="datasets-example-2">
          <ul class="charts-css legend legend-inline legend-square border">
            <li v-for="(item, i) in this.equipmentsFiltre" :key="i">
              {{ item }}
            </li>
          </ul>

          <table
            class="charts-css [ column ] [ show-primary-axis show-4-secondary-axes show-data-axes ] [ data-spacing-10 reverse-data ] show-labels data-spacing-10"
            id="my-chart"
          >
            <caption>
              Damage
            </caption>
            <tbody>
              <tr v-for="(item, i) in this.equipmentsFiltre" :key="i">
                <th scope="row">{{ item }}</th>
                <td style="--size: 0.7"><span class="data"> 60 </span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];
export default {
  components: {},
  data: () => ({
    fill: false,
    selectedGradient: gradients[1],
    labels: [],
    gradients,
    padding: 8,
    radius: 0,
    value: [0, 9, 3, 9, 5, 10, 3],
    width: 3,

    dialog: false,
    dialogDelete: false,
    confirmAddSave: false,
    dialogView: false,
    loading: "false",
    headers: [
      { text: "name", value: "name", sortable: true },
      { text: "equipments", value: "equipments.length", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    profilegroups: [],
    equipments: [],
    equipmentsFiltre: [],
    chartlineBy: ["Week", "Month", "Year"],
    datalinechart: "",
    footerchartline: [],
    chartline: "",
    profile_groupe_id: "",

    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
    },
    defaultItem: {
      id: "",
      name: "",
    },
  }),
  mounted() {
    document.title = "Checklist";

    this.initialize();
    this.labels = [];
    var week = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    this.labels = week;
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["getprofilegroups", "getequipments"]),
  },
  watch: {
    dialog(val) {
      if (this.editedIndex == -1) {
        this.editedIndex = -1;
        this.editedItem = {
          id: "",
          name: "",
        };
      }

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
      this.setPROFILEDROUPSAction().then(() => {
        this.profilegroups = [...this.getprofilegroups];
        console.log(this.profilegroups);
      });
    },
    changeProfile_groupeSELECT() {
      this.equipmentsFiltre = [];
      this.equipments = [];
      this.setequipmentsAction().then(() => {
        this.equipments = [...this.getequipments];
        this.equipments.map((dataitem) => {
          if (dataitem.profileGroup.id == this.profile_groupe_id) {
            this.equipmentsFiltre.push(dataitem.name);
          }
        });
      });
      console.log("equipmentsFiltre", this.equipmentsFiltre);
    },
    chartlineByFunc() {
      this.footerchartline = [];

      console.log("chartlineBy", this.chartline);
    },
    chartlinedata(item1, item2) {
      var cc;
      return (cc = `--start: ${{ item1 }}; --size: calc( ${{ item2 }} / 100 )`);
    },
    ...mapActions(["setPROFILEDROUPSAction", "setequipmentsAction"]),

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
      this.deletePROFILEDROUPAction(this.editedIndex).then(() => {
        this.profilegroups = this.getprofilegroups;
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
      if (this.editedIndex == -1) {
        this.addPROFILEDROUPAction(this.editedItem).then(() => {
          this.profilegroups = [...this.profilegroups];
        });
        this.closeAddSaveDialog();
      } else {
        this.editPROFILEDROUPAction(this.editedItem).then(() => {
          this.profilegroups = this.getprofilegroups;
        });
        this.closeAddSaveDialog();
      }

      this.close();
    },
  },
};
</script>
