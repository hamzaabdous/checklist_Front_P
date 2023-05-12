<template>
  <div style="padding: 0; padding-top: 13px">
    <div style="margin: 0 auto; width: 100%">
      <v-container class="damageContainer">
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-select
              :items="profile_groupe"
              item-text="name"
              item-value="id"
              v-model="profile_groupe_id"
              label="Equipment groups :"
              :disabled="disabled"
              @change="changeProfile_groupeSELECT"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-select
              :items="equipmentsFiltre"
              item-text="name"
              item-value="id"
              v-model="equipments_id"
              label="Equipment :"
              @change="changeEquipmentsFiltreSELECT"
              :disabled="disabledEquipmentsFiltre"
            ></v-select>
          </v-col>
        </v-row>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-toolbar dark color="error">
              <v-toolbar-title>Warning !</v-toolbar-title>
            </v-toolbar>
            <v-card-title class="text-h5">
              Are you sure to validate this Checklist ?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="white" @click="cancel"> No </v-btn>
              <v-btn color="primary" @click="dialog = false"> Yes </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogValide" persistent max-width="600px">
          <v-card>
            <v-toolbar dark color="error">
              <v-toolbar-title>Warning !</v-toolbar-title>
            </v-toolbar>
            <v-card-title class="text-h5">
              Are you sure to validate this Checklist ?
            </v-card-title>
            <v-card-text class="font-weight-bold"></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="white" @click="cancelvalide()"> No </v-btn>
              <v-btn color="primary" @click="valider()"> Yes </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogValideDamage" persistent max-width="600px">
          <v-card>
            <v-toolbar dark color="error">
              <v-toolbar-title>Warning !</v-toolbar-title>
            </v-toolbar>
            <v-card-title class="text-h5">
              Are you sure to validate this Checklist ?
            </v-card-title>
            <v-card-text class="font-weight-bold"></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="white" @click="dialogValideDamage = false">
                No
              </v-btn>
              <v-btn color="primary" @click="validerDamages()"> Yes </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="resolvedDialoge" persistent max-width="490">
          <v-card>
            <v-card-title class="text-h5 red lighten-1 white--text">
              Warning !!
            </v-card-title>
            <v-spacer></v-spacer>

            <v-card-text class="pa-4 black--text">
              Warning this is a resolved item, are you sure you want to turn it
              not-defected or defected ?
            </v-card-text>
            <v-card-actions>
              <v-btn color="#fff " @click="resolvedDialoge = false">
                Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="mr-2" color="#76ba99" @click="closed">
                Not-Defected
              </v-btn>
              <v-btn class="mr-2" color="#f54" @click="revert">
                Defected
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="defectedDialoge" persistent max-width="490">
          <v-card>
            <v-card-title class="text-h5 red lighten-1 white--text">
              Warning !!
            </v-card-title>
            <v-spacer></v-spacer>

            <v-card-text class="pa-4 black--text">
              Warning this is a defected item, are you sure you want to turn it
              not-defected ?
            </v-card-text>
            <v-card-actions>
              <v-btn color="#fff" @click="defectedDialoge = false">
                Cancel
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn class="mr-2" color="#76ba99" @click="confirmed">
                Not-Defected
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-container>
          <v-row>
            <v-col cols="12" class="TECpanell">
              <v-row>
                <v-col cols="12" class="d-flex justify-center">
                  <span>Technique </span>
                  <span class="red--text">
                    ({{ this.countDefectsTEC + this.countResolvedTEC }})</span
                  ></v-col
                >
              </v-row>

              <v-col cols="12" sm="12" class="scroll">
                <v-list flat>
                  <v-list-item-group
                    name="TEC"
                    class="TEC"
                    v-model="modelTEC"
                    multiple
                    color="#fff"
                  >
                    <div class="hamzatec">
                      <v-list-item
                        v-for="(item, i) in damageTypesTEC"
                        :key="i"
                        class="item"
                        two-line
                        active-class="bg-active"
                      >
                        <v-list-item-content
                          v-if="item.damage == null"
                          class="item-content"
                          @click="valider(item, i)"
                        >
                          <span v-if="item.important == false">
                            <v-list-item-title
                              name="damageTypesTEC"
                              class="itemName"
                              style="background-color: #76ba99"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              class="itemSubtitle"
                              style="color: #76ba99; width: 170px !important"
                              >{{ item.name }}</v-list-item-subtitle
                            >
                          </span>
                          <span v-else-if="item.important == true">
                            <v-list-item-title
                              name="damageTypesTEC"
                              class="itemName"
                              style="background-color: #76ba99"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              class="itemSubtitle"
                              style="
                                color: rgb(0, 171, 88);
                                font-weight: bolder !important;
                                width: 170px !important;
                              "
                              >{{ item.name }}</v-list-item-subtitle
                            >
                          </span>
                        </v-list-item-content>
                        <v-list-item-content
                          @click="resolvedFunction(item, i)"
                          v-else-if="item.damage.status == 'resolved'"
                          class="item-content resolved"
                        >
                          <span v-if="item.important == false">
                            <v-list-item-title
                              name="damageTypesTEC"
                              class="itemName"
                              style="background-color: #ff8f56"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              style="color: #ff8f56; width: 170px !important"
                              class="itemSubtitle"
                              >{{ item.name }}</v-list-item-subtitle
                            >
                          </span>
                          <span v-else-if="item.important == true">
                            <v-list-item-title
                              name="damageTypesTEC"
                              class="itemName"
                              style="background-color: #ff8f56"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              style="
                                color: #ff8f56;
                                width: 170px !important;
                                font-weight: bolder !important;
                              "
                              class="itemSubtitle"
                              >{{ item.name }}</v-list-item-subtitle
                            >
                          </span>
                        </v-list-item-content>
                        <v-list-item-content
                          v-else-if="item.damage.status == 'on progress'"
                          class="item-content defects"
                          @click="defectedFunction(item, i)"
                        >
                          <span v-if="item.important == false">
                            <v-list-item-title
                              name="damageTypesTEC"
                              class="itemName"
                              style="background-color: #f54"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              style="color: #f54; width: 170px !important"
                              class="itemSubtitle"
                              >{{ item.name }}</v-list-item-subtitle
                            >
                          </span>
                          <span v-if="item.important == true">
                            <v-list-item-title
                              name="damageTypesTEC"
                              class="itemName"
                              style="background-color: #f54"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              style="
                                color: #f54;
                                font-weight: bolder !important;
                                width: 170px !important;
                              "
                              class="itemSubtitle"
                              >{{ item.name }}</v-list-item-subtitle
                            >
                          </span>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-col>
            <v-col cols="12" class="ITpanell">
              <v-row>
                <v-col cols="12" class="d-flex justify-center">
                  <span>IT </span>
                  <span class="red--text"
                    >({{ this.countDefects + this.countResolved }})</span
                  ></v-col
                >
              </v-row>

              <v-col cols="12" sm="12" class="scrollIT">
                <v-list flat>
                  <v-list-item-group
                    name="it"
                    v-model="modelIT"
                    multiple
                    color="#fff"
                    class="ITcol TEC"
                  >
                    <div class="hamzatec">
                      <v-list-item
                        v-for="(item, i) in damageTypesIT"
                        :key="i"
                        class="item"
                        two-line
                        active-class="bg-active"
                      >
                        <v-list-item-content
                          v-if="item.damage == null"
                          class="item-content"
                          @click="valider(item, i)"
                        >
                          <span v-if="item.important == false">
                            <v-list-item-title
                              name="damageTypesTEC"
                              class="itemName"
                              style="background-color: #76ba99"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              class="itemSubtitle"
                              style="color: #76ba99"
                              >{{ item.name }}</v-list-item-subtitle
                            >
                          </span>
                          <span v-else-if="item.important == true">
                            <v-list-item-title
                              name="damageTypesTEC"
                              class="itemName"
                              style="background-color: #76ba99"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              class="itemSubtitle"
                              style="
                                color: rgb(0, 171, 88);
                                font-weight: bolder !important;
                              "
                              >{{ item.name }}</v-list-item-subtitle
                            >
                          </span>
                        </v-list-item-content>
                        <v-list-item-content
                          @click="resolvedFunction(item, i)"
                          v-else-if="item.damage.status == 'resolved'"
                          class="item-content resolved"
                        >
                          <span v-if="item.important == false">
                            <v-list-item-title
                              name="damageTypesTEC"
                              class="itemName"
                              style="background-color: #ff8f56"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              style="color: #ff8f56"
                              class="itemSubtitle"
                              >{{ item.name }}</v-list-item-subtitle
                            >
                          </span>
                          <span v-else-if="item.important == true">
                            <v-list-item-title
                              name="damageTypesTEC"
                              class="itemName"
                              style="background-color: #ff8f56"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              style="
                                color: #ff8f56;
                                font-weight: bolder !important;
                              "
                              class="itemSubtitle"
                              >{{ item.name }}</v-list-item-subtitle
                            >
                          </span>
                        </v-list-item-content>
                        <v-list-item-content
                          v-else-if="item.damage.status == 'on progress'"
                          class="item-content defects"
                          @click="defectedFunction(item, i)"
                        >
                          <span v-if="item.important == false">
                            <v-list-item-title
                              name="damageTypesTEC"
                              class="itemName"
                              style="background-color: #f54"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              style="color: #f54"
                              class="itemSubtitle"
                              >{{ item.name }}</v-list-item-subtitle
                            >
                          </span>
                          <span v-if="item.important == true">
                            <v-list-item-title
                              name="damageTypesTEC"
                              class="itemName"
                              style="background-color: #f54"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              style="
                                color: #f54;
                                font-weight: bolder !important;
                              "
                              class="itemSubtitle"
                              >{{ item.name }}</v-list-item-subtitle
                            >
                          </span>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-center">
            <v-col cols="4">
              <v-sheet
                color="#f54"
                elevation="1"
                height="20"
                width="20"
                rounded
              ></v-sheet>
              Defected
            </v-col>
            <v-col cols="4">
              <v-sheet
                color="#FF8F56"
                elevation="1"
                height="20"
                width="20"
                rounded
              ></v-sheet>
              Resolved
            </v-col>
            <v-col cols="3">
              <v-sheet
                color="#76ba99"
                elevation="1"
                height="20"
                width="20"
                rounded
              ></v-sheet>
              Not-Defected
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row>
            <v-col class="d-flex justify-center" cols="12">
              <v-btn
                depressed
                color="primary"
                :disabled="disabled"
                @click="test()"
              >
                Valider
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </div>

    <LoadingPage v-if="LoadingPage == true" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { defineAsyncComponent } from "vue";
import swal from "sweetalert";
//import LoadingPage from "../LoadingPage.vue";
const LoadingPage = defineAsyncComponent(() => import("../LoadingPage.vue"));
import moment from "moment/src/moment";

export default {
  components: {
    LoadingPage,
  },
  data: () => ({
    userFiltre: [],
    disabled: false,
    LoadingPage: false,
    resolvedDialoge: false,
    defectedDialoge: false,
    dialogLogin: false,
    damageTypesIT: [],
    damageTypesTEC: [],
    modelDamageIT: [],
    modelDamageTEC: [],
    confirmedDamageTEC: [],
    confirmedDamageIT: [],
    equipmentsFiltre: [],
    Data: [],
    damageCourent: {
      declaredBy_id: null,
      equipment_id: null,
      damage_type_id: null,
      shift: "",
    },
    damage_type_id: null,
    modelIT_id_Courent: null,
    modelTEC_id_Courent: null,
    profile_groupe: [],
    equipments: [],
    damagesend: [],
    modelIT: [],
    modelTEC: [],
    department: [],
    departmentIT: {
      id: null,
      name: "",
      email: "",
      created_at: "",
      updated_at: "",
    },
    departmentTEC: {
      id: null,
      name: "",
      email: "",
      created_at: "",
      updated_at: "",
    },
    departmentOP: {
      id: null,
      name: "",
      email: "",
      created_at: "",
      updated_at: "",
    },
    DamageSelect: {
      id: null,
      status: "",
      description: "",
      declaredBy_id: null,
      declaredAt: "",
      confirmedBy_id: null,
      confirmedAt: null,
      closedBy_id: null,
      closedAt: null,
      rejectedBy_id: null,
      rejectedAt: null,
      rejectedTimes: null,
      equipment_id: null,
      damage_type_id: null,
      created_at: "",
      updated_at: "",
      declared_by: {
        id: null,
        username: "",
        lastName: "",
        firstName: "",
        email: "",
        phoneNumber: "",
        fonction_id: null,
        created_at: "",
        updated_at: "",
        fonction: {
          id: null,
          name: "",
          department_id: null,
          created_at: "",
          updated_at: "",
          department: {
            id: null,
            name: "",
            created_at: "",
            updated_at: "",
          },
        },
      },
      confirmed_by: null,
      closed_by: null,
      rejected_by: null,
      equipment: {
        id: null,
        name: "",
        profile_group_id: null,
        created_at: "",
        updated_at: "",
        profile_group: {
          id: null,
          name: "",
          department_id: null,
          created_at: "",
          updated_at: "",
          department: {
            id: null,
            name: "",
            created_at: "",
            updated_at: "",
          },
        },
      },
      damage_type: {
        id: null,
        name: "",
        profile_group_id: null,
        department_id: null,
        created_at: "",
        updated_at: "",
        profile_group: {
          id: null,
          name: "",
          department_id: null,
          created_at: "",
          updated_at: "",
          department: {
            id: null,
            name: "",
            created_at: "",
            updated_at: "",
          },
        },
        department: {
          id: null,
          name: "",
          created_at: "",
          updated_at: "",
        },
      },
      photos: [
        {
          id: null,
          description: null,
          filename: "",
          damage_id: null,
          created_at: "",
          updated_at: "",
        },
      ],
    },
    presenceCheck: {
      user_id: 0,
      equipment_id: 0,
      validation_presence_At: "",
    },
    confirmDamage: {
      id: null,
      confirmedBy_id: null,
      resolveDescription: "",
    },
    closeDamage: {
      id: null,
      closedBy_id: null,
    },
    revertDamage: {
      id: null,
      rejectedBy_id: null,
      rejectedDescription: "",
    },
    resolveditem: [],
    defecteditem: [],
    defectsChange: {
      item: [],
      damagetypeOld: [],
      statusOld: null,
      statusNew: "",
    },
    EmailModel: {
      payload: {
        Equipment: "",
        EquipmentGroupe: "",
        Department: "",
        Defects: [],
        Status: "on progress",
        DriverOut: "",
        DeclaredBy: "",
        DeclaredAt: "",
      },
      status: "",
      email: "",
      department: [],
    },
    EmailModelTEC: {
      payload: {
        Equipment: "",
        EquipmentGroupe: "",
        Department: "",
        Defects: [],
        Status: "on progress",
        DriverOut: "",
        DeclaredBy: "",
        DeclaredAt: "",
      },
      status: "",
      email: "",
      department: [],
    },
    a: [],
    b: [],
    listdepartmentIT: [],
    listDefectsNamesIT: [],
    listdepartmentTEC: [],
    listDefectsNamesTEC: [],
    listDefectsNamesTECFinal: [],
    listDefectsNamesITFinal: [],
    listDefectsChange: [],
    DamageTypeByEquipmentID: [],
    DamagesMergedWithDamageTypes: [],
    damageSelect: [],
    isvalide: false,
    equipments_id: "",
    dialog: false,
    dialogValide: false,
    profile_groupe_id: null,
    disabledEquipmentsFiltre: true,
    dialogValideDamage: false,
    countDefects: 0,
    countResolved: 0,
    countDefectsTEC: 0,
    countResolvedTEC: 0,
    countImportantTEC: 0,
    countImportantIT: 0,
    EquipmentName: "",
  }),
  mounted() {
    document.title = "Checklist";
    console.log("shift   : ", this.getActualShift());
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters([
      "getUsers",
      "getdamageTypes",
      "getprofilegroups",
      "getequipments",
      "getDamageTypeByEquipmentID",
      "getdamage",
      "getEquipmentDamagesMergedWithDamageTypes",
      "getdepartements",
      "getUserActive",
    ]),
  },
  watch: {
    dialog(val) {
      val || this.cancel();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    test() {
      if (this.Data.length == 0) {
        if (this.equipments_id == "") {
          swal(
            "warning !!",
            "Please can you chose equipment you use it!",
            "warning"
          );
          this.dialogValide = false;
          this.dialogValideDamage = false;
        } else {
          swal({
            title: "Are you sure?",
            text: "you want make checklist !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              this.presenceCheck.user_id = this.getUserActive.id;
              this.presenceCheck.equipment_id = this.equipments_id;
              this.presenceChecksAction(this.presenceCheck).then((resolve) => {
                console.log("presenceCheck DONE");
                swal("success !!", "Checklist success", "success");
              });
              this.dialogValide = false;
              this.dialogValideDamage = false;
            } else {
              swal("Checklist cancel");
            }
          });
        }
      } else {
        this.dialogValideDamage = true;
      }
    },
    changeProfile_groupeSELECT() {
      this.modelDamageIT = [];
      this.modelDamageTEC = [];
      this.equipmentsFiltre = [];
      this.confirmedDamageTEC = [];
      this.confirmedDamageIT = [];
      this.damageTypesIT.length = 0;
      this.damageTypesTEC.length = 0;
      this.equipments_id = 0;
      this.disabledEquipmentsFiltre = false;
      var count = 0;
      console.log("equipments", this.equipments);
      this.equipments.map((item) => {
        if (item.profile_group_id == this.profile_groupe_id) {
          this.equipmentsFiltre.push(item);
          count++;
        }
      });
      if (count == 0) {
        this.equipmentsFiltre = [];
      }
    },
    changeEquipmentsFiltreSELECT() {
      var IT = this.departmentIT.id;
      var TEC = this.departmentTEC.id;
      this.modelDamageTEC = [];
      this.modelDamageIT = [];
      this.damageTypesTEC = [];
      this.damageTypesIT = [];
      this.modelTEC = [];
      this.modelIT = [];
      this.Data = [];
      this.confirmedDamageTEC = [];
      this.confirmedDamageIT = [];
      this.FindDamageTypeByEquipmentID = [];
      this.setequipmentsByIDAction(this.equipments_id).then(() => {
        this.EquipmentName = [this.getequipments];
      });
      this.getEquipmentDamagesMergedWithDamageTypesAction(
        this.equipments_id
      ).then(() => {
        this.DamagesMergedWithDamageTypes = [
          ...this.getEquipmentDamagesMergedWithDamageTypes,
        ];
        console.log(
          "DamagesMergedWithDamageTypes",
          this.DamagesMergedWithDamageTypes
        );

        this.damageTypesTEC = this.DamagesMergedWithDamageTypes.filter(
          (c) => c.department_id == TEC
        );
        this.damageTypesIT = this.DamagesMergedWithDamageTypes.filter(
          (c) => c.department_id == IT
        );
        this.countDefects = 0;
        this.countResolved = 0;
        this.countDefectsTEC = 0;
        this.countResolvedTEC = 0;
        this.countImportantTEC = 0;
        this.countImportantIT = 0;
        this.damageTypesIT.map((e) => {
          if (e.damage == null) {
            console.log("null");
          } else if (e.damage.status == "on progress") {
            this.countDefects = this.countDefects + 1;
            if (e.important == true) {
              this.countImportantIT = this.countImportantIT + 1;
              swal(
                "warning !",
                "There are some elements that are important for the operation of this Equipment" +
                  ` ${this.EquipmentName[0].name}`,
                "warning"
              );
            }
          } else if (e.damage.status == "resolved") {
            this.countResolved = this.countResolved + 1;
          }
        });
        this.damageTypesTEC.map((e) => {
          if (e.damage == null) {
            console.log("null");
          } else if (e.damage.status == "on progress") {
            this.countDefectsTEC = this.countDefectsTEC + 1;
            if (e.important == true) {
              this.countImportantTEC = this.countImportantTEC + 1;
              swal(
                "warning !",
                "There are some elements that are important for the operation of this Equipment" +
                  ` ${this.EquipmentName[0].name}`,
                "warning"
              );
            }
          } else if (e.damage.status == "resolved") {
            this.countResolvedTEC = this.countResolvedTEC + 1;
          }
        });
      });
      if (parseInt(this.countImportantTEC) >= 1) {
        console.log("test");
      }
    },
    initialize() {
      console.log("initialize");
      this.setPROFILEDROUPSAction().then(() => {
        this.setUsersbyIDAction(this.getUserActive.id).then(() => {
          this.userFiltre = this.getUsers;
          if (this.userFiltre.profileGroups.length == 0) {
            swal("warning !!", "You don't have any group !", "warning");
            this.disabled = true;
            // this.profile_groupe = [...this.getprofilegroups];
          } else if (this.userFiltre.profileGroups.length != 0) {
            this.profile_groupe = [...this.userFiltre.profileGroups];
          }
        });
      });
      this.setequipmentsAction().then(() => {
        this.equipments = [...this.getequipments];
        console.log("set equipments", this.equipments);
      });
      this.setDepartementsAction().then(() => {
        this.department = [...this.getdepartements];
        this.department.map((item) => {
          if (item.name.toLowerCase() == "technique") {
            this.departmentTEC = item;
          }
          if (item.name.toLowerCase() == "it") {
            this.departmentIT = item;
          }
          if (item.name.toLowerCase() == "operations") {
            this.departmentOP = item;
          }
        });
        console.log("set Departements", this.department);
      });
    },
    ...mapActions([
      "setDAMAGEAction",
      "editDAMAGEAction",
      "deleteDAMAGEAction",
      "declareDamageAction",
      "confirmDamageAction",
      "closeDamageAction",
      "revertDamageAction",
      "setDAMAGETYPESAction",
      "setPROFILEDROUPSAction",
      "setequipmentsAction",
      "addDAMAGESAction",
      "FindDamageTypeByEquipmentIDAction",
      "getEquipmentDamagesMergedWithDamageTypesAction",
      "setDepartementsAction",
      "setUsersbyIDAction",
      "presenceChecksAction",
      "setequipmentsByIDAction",
      "SendEmailAction",
    ]),
    valider(item, i) {
      this.damageCourent.declaredBy_id = this.getUserActive.id;
      this.damageCourent.damage_type_id = item.id;
      this.damageCourent.equipment_id = this.equipments_id;
      this.damage_type_id = item.id;
      this.modelIT_id_Courent = i;

      if (item.department.name == "IT") {
        this.listdepartmentIT.push(item.department.name);
        this.listDefectsNamesIT.push(item);
      } else if (item.department.name == "TECHNIQUE") {
        this.listdepartmentTEC.push(item.department.name);
        this.listDefectsNamesTEC.push(item);
      }

      if (this.Data.length == 0) {
        if (item.important == true) {
          swal(
            "warning !",
            "this item " +
              `*** ${item.name} *** ` +
              " must be immediately reported to the hierarchy ",
            "warning"
          );
          console.log("1");
          var Damage = {
            declaredBy_id: null,
            equipment_id: null,
            damage_type_id: null,
            shift: "",
          };
          Damage.declaredBy_id = this.getUserActive.id;
          Damage.damage_type_id = this.damage_type_id;
          Damage.equipment_id = this.equipments_id;
          Damage.shift = this.getActualShift();

          this.damageSelect.push(Damage);

          this.Data.push(Damage);
        } else {
          var Damage = {
            declaredBy_id: null,
            equipment_id: null,
            damage_type_id: null,
            shift: "",
          };
          Damage.declaredBy_id = this.getUserActive.id;
          Damage.damage_type_id = this.damage_type_id;
          Damage.equipment_id = this.equipments_id;
          Damage.shift = this.getActualShift();
          console.log("shift", this.getActualShift());

          this.damageSelect.push(Damage);

          this.Data.push(Damage);
        }
      } else if (this.Data.length > 0) {
        this.isvalide = false;
        this.Data.map((e) => {
          if (e.damage_type_id == this.damage_type_id) {
            this.isvalide = true;
          }
        });
        if (this.isvalide == true) {
          this.Data = this.Data.filter((c) => c.damage_type_id != item.id);
        } else {
          if (item.important == true) {
            swal(
              "warning !",
              `*** ${item.name} *** ` +
                " must be immediately reported to the hierarchy ",
              "warning"
            );
            console.log("2");
            var Damage = {
              declaredBy_id: null,
              equipment_id: null,
              damage_type_id: null,
              shift: "",
            };
            Damage.declaredBy_id = this.getUserActive.id;
            Damage.damage_type_id = this.damage_type_id;
            Damage.equipment_id = this.equipments_id;
            Damage.shift = this.getActualShift();
            console.log("shift", this.getActualShift());

            this.damageSelect.push(Damage);

            this.Data.push(Damage);
          } else {
            var Damage = {
              declaredBy_id: null,
              equipment_id: null,
              damage_type_id: null,
              shift: "",
            };
            Damage.declaredBy_id = this.getUserActive.id;
            Damage.damage_type_id = this.damage_type_id;
            Damage.equipment_id = this.equipments_id;
            Damage.shift = this.getActualShift();
            console.log("shift", this.getActualShift());
            this.damageSelect.push(Damage);

            this.Data.push(Damage);
          }
        }
      }
    },
    resolvedFunction(item, i) {
      this.resolveditem = [];
      this.resolvedDialoge = true;
      this.resolveditem.push(item);
    },
    defectedFunction(item, i) {
      this.resolveditem = [];
      this.defectedDialoge = true;
      this.resolveditem.push(item);
      console.log("this.resolveditem[0]", this.resolveditem[0]);
    },
    changeDefectsFunction() {
      this.defectsChange.item = this.resolveditem[0];
      this.defectsChange.damagetypeOld = this.resolveditem[0].damage;
      this.defectsChange.statusOld = this.resolveditem[0].damage.status;
      this.defectsChange.statusNew = "closed";

      this.listDefectsChange.push(this.defectsChange);
      if (this.resolveditem[0].department.name == "IT") {
        this.damageTypesIT.push(this.resolveditem[0]);
        this.modelDamageIT = this.modelDamageIT.filter(
          (c) => c.id != this.resolveditem[0].id
        );
      } else if (this.resolveditem[0].department.name == "TECHNIQUE") {
        this.damageTypesTEC.push(this.resolveditem[0]);
        this.modelDamageTEC = this.modelDamageTEC.filter(
          (c) => c.id != this.resolveditem[0].id
        );
      }
      console.log("listDefectsChange", this.listDefectsChange);
      this.defectedDialoge = false;
    },
    confirmed() {
      console.log("resolveditem closed :", this.resolveditem);
      this.closeDamage.id = this.resolveditem[0].damage.id;
      this.closeDamage.closedBy_id = this.getUserActive.id;
      this.closeDamageAction(this.closeDamage)
        .then((resolve) => {
          this.EmailModel.payload.Equipment = this.EquipmentName[0].name;
          this.EmailModel.status = "Closed ";
          this.EmailModel.payload.EquipmentGroupe =
            this.resolveditem[0].department.name;
          this.EmailModel.payload.Defects = resolve.damage_type.name;
          this.EmailModel.payload.Status = "closed";
          this.EmailModel.email =
            this.departmentOP.email.toString() +
            this.resolveditem[0].department.email.toString();
          this.EmailModel.payload.ClosedBy = this.getUserActive.username;
          this.EmailModel.payload.ClosedAt = resolve.declaredAt;
          if (resolve.driver_out != null) {
            this.EmailModel.payload.DriverOut = resolve.driver_out.username;
          } else {
          }
          this.EmailModel.payload.DeclaredBy = resolve.declared_by.username;
          this.EmailModel.payload.DeclaredAt = resolve.declaredAt;

          this.SendEmailAction(this.EmailModel).then(() => {
            console.log("DONE");
          });
          // this.LoadingPage = true;

          this.$router.go();
        })
        .catch(() => {
          swal("Error", "", "error");
        });

      this.changeEquipmentsFiltreSELECT();

      this.defectedDialoge = false;
      this.modelTEC = [];
      this.modelIT = [];
    },
    closed() {
      console.log("resolveditem closed :", this.resolveditem);
      this.closeDamage.id = this.resolveditem[0].damage.id;
      this.closeDamage.closedBy_id = this.getUserActive.id;
      this.closeDamageAction(this.closeDamage)
        .then((resolve) => {
          this.EmailModel.payload.Equipment = this.EquipmentName[0].name;
          this.EmailModel.status = "Closed ";

          this.EmailModel.payload.EquipmentGroupe =
            this.resolveditem[0].department.name;
          this.EmailModel.payload.Defects = resolve.damage_type.name;
          this.EmailModel.payload.Status = "closed";
          this.EmailModel.email =
            this.departmentOP.email.toString() +
            this.resolveditem[0].department.email.toString();

          this.EmailModel.payload.ClosedBy = this.getUserActive.username;
          this.EmailModel.payload.ClosedAt = resolve.declaredAt;
          if (resolve.driver_out != null) {
            this.EmailModel.payload.DriverOut = resolve.driver_out.username;
          } else {
          }
          this.EmailModel.payload.DeclaredBy = resolve.declared_by.username;
          this.EmailModel.payload.DeclaredAt = resolve.declaredAt;

          this.SendEmailAction(this.EmailModel).then(() => {
            console.log("DONE");
          });
          this.resolvedDialoge = false;
          // this.LoadingPage = true;

          this.$router.go();
        })
        .catch(() => {
          swal("Error", "", "error");
        });

      this.changeEquipmentsFiltreSELECT();
      this.modelTEC = [];
      this.modelIT = [];
    },
    revert() {
      console.log("resolveditem closed :", this.resolveditem);
      this.revertDamage.id = this.resolveditem[0].damage.id;
      this.revertDamage.rejectedBy_id = this.getUserActive.id;
      this.revertDamageAction(this.revertDamage)
        .then((resolve) => {
          this.EmailModel.payload.Equipment = this.EquipmentName[0].name;
          this.EmailModel.payload.EquipmentGroupe =
            this.resolveditem[0].department.name;
          this.EmailModel.payload.Defects = resolve.damage_type.name;
          this.EmailModel.status = "Rejcted ";
          this.EmailModel.email =
            this.departmentOP.email.toString() +
            this.resolveditem[0].department.email.toString();

          this.EmailModel.payload.Status = "on progress";
          this.EmailModel.payload.Rejected_by = this.getUserActive.username;
          this.EmailModel.payload.RejectedAt = resolve.declaredAt;
          this.EmailModel.payload.RejectedTimes = resolve.rejectedTimes;
          this.EmailModel.payload.Confirmed_by = resolve.confirmed_by.username;
          this.EmailModel.payload.ConfirmedAt = resolve.declaredAt;

          if (resolve.driver_out != null) {
            this.EmailModel.payload.DriverOut = resolve.driver_out.username;
          } else {
          }
          this.EmailModel.payload.DeclaredBy = resolve.declared_by.username;
          this.EmailModel.payload.declaredAt = resolve.declaredAt;

          this.SendEmailAction(this.EmailModel).then(() => {
            console.log("DONE");
          });
          this.resolvedDialoge = false;

          // this.LoadingPage = true;

          this.$router.go();
        })
        .catch(() => {
          swal("Error", "", "error");
        });

      this.changeEquipmentsFiltreSELECT();
      this.modelTEC = [];
      this.modelIT = [];
    },
    cancel() {
      this.dialog = false;
    },
    cancelvalide() {
      if (this.Data.length == 0) {
        this.dialogValide = false;
      } else {
        this.Data = this.Data.map((e) => {
          if (e.damage_type_id != this.damage_type_id) {
            return e;
          }
        });
        this.dialogValide = false;
        this.modelIT = this.modelIT.map((e) => {
          if (e != this.modelIT_id_Courent) {
            return e;
          }
        });
        this.Data = this.Data.filter(function (element) {
          return element !== undefined;
        });
      }
    },
    dialogValideFunction(item, i) {
      this.damageCourent.declaredBy_id = this.getUserActive.id;
      this.damageCourent.damage_type_id = item.id;
      this.damageCourent.equipment_id = this.equipments_id;
      this.damage_type_id = item.id;
      this.modelIT_id_Courent = i;
      //this.dialogValide = true;
    },
    clearModelEmail() {
      this.EmailModel.payload = {
        Equipment: "",
        EquipmentGroupe: "",
        Department: "",
        Defects: [],
        Status: "on progress",
        DriverOut: "",
        DeclaredBy: "",
        DeclaredAt: "",
      };
      this.EmailModel.status = "";
      this.EmailModel.email = "";
      this.EmailModel.department = [];

      // TEC

      this.EmailModelTEC.payload = {
        Equipment: "",
        EquipmentGroupe: "",
        Department: "",
        Defects: [],
        Status: "on progress",
        DriverOut: "",
        DeclaredBy: "",
        DeclaredAt: "",
      };
      this.EmailModelTEC.status = "";
      this.EmailModelTEC.email = "";
      this.EmailModelTEC.department = [];

      this.listdepartmentIT = [];
      this.listdepartmentIT = [];
      this.listDefectsNamesIT = [];
      this.listDefectsNamesITFinal = [];

      this.listdepartmentTEC = [];
      this.listdepartmentTEC = [];
      this.listDefectsNamesTEC = [];
      this.listDefectsNamesTECFinal = [];
    },
    validerDamages() {
      console.log("this.modelTEC", this.modelTEC);
      console.log("this.modelIT", this.modelIT);

      if (this.Data.length == 0) {
        if (this.equipments_id == "") {
          swal(
            "warning !!",
            "Please can you chose equipment you use it!",
            "warning"
          );
          this.dialogValide = false;
          this.dialogValideDamage = false;
        } else {
          this.presenceCheck.user_id = this.getUserActive.id;
          this.presenceCheck.equipment_id = this.equipments_id;
          this.presenceChecksAction(this.presenceCheck)
            .then((resolve) => {
              console.log("presenceCheck DONE");
              swal("success !!", "", "success");
            })
            .catch(() => {
              swal("Error", "", "error");
            });

          this.dialogValide = false;
          this.dialogValideDamage = false;
        }
      } else if (this.Data.length > 0) {
        this.declareDamageAction(this.Data)
          .then((resolve) => {
            this.modelTEC = [];
            this.modelIT = [];
            this.EmailModel.payload.Defects = [];
            this.EmailModelTEC.payload.Defects = [];
            console.log("validerDamages", resolve);
            var ITemail = this.departmentIT.email;
            var TECemail = this.departmentTEC.email;

            this.Data.map((item) => {
              this.a = [...new Set(this.listDefectsNamesTEC)];
              console.log("this.a ", this.a);

              this.a.map((c) => {
                if (c.id == item.damage_type_id) {
                  this.EmailModelTEC.payload.Defects.push(c.name);
                }
              });
            });
            this.Data.map((item) => {
              this.b = [...new Set(this.listDefectsNamesIT)];
              console.log("this.b ", this.b);

              this.b.map((c) => {
                if (c.id == item.damage_type_id) {
                  this.EmailModel.payload.Defects.push(c.name);
                }
              });
            });

            if (this.listdepartmentIT.length != 0) {
              this.EmailModel.department = "IT";
              this.EmailModel.payload.Equipment = this.EquipmentName[0].name;
              this.EmailModel.payload.EquipmentGroupe =
                this.EquipmentName[0].profile_group.name;

              this.EmailModel.payload.Department = "IT";
              this.EmailModel.payload.Status = "on progress";
              this.EmailModel.status = "Defected ";
              this.EmailModel.email =
                this.departmentIT.email.toString() +
                this.departmentOP.email.toString();

              if (resolve[0].driver_out != null) {
                this.EmailModel.payload.DriverOut =
                  resolve[0].driver_out.username;
              } else {
              }
              this.EmailModel.payload.DeclaredBy =
                resolve[0].declaredBy.username;
              this.EmailModel.payload.DeclaredAt = resolve[0].declaredAt;
              console.log("this.EmailModel.email", this.EmailModel.email);
              this.SendEmailAction(this.EmailModel).then(() => {
                console.log("DONE");
                this.listdepartmentIT = [];
                this.listdepartmentIT = [];
                this.listDefectsNamesIT = [];
                this.listDefectsNamesITFinal = [];
              });
            }
            if (this.listdepartmentTEC.length != 0) {
              setTimeout(() => {
                this.EmailModelTEC.department = "TECHNIQUE";
                this.EmailModelTEC.payload.Equipment =
                  this.EquipmentName[0].name;
                this.EmailModelTEC.payload.EquipmentGroupe =
                  this.EquipmentName[0].profile_group.name;

                this.EmailModelTEC.payload.Department = "TECHNIQUE";
                this.EmailModelTEC.payload.Status = "on progress";
                this.EmailModelTEC.status = "Defected ";
                this.EmailModelTEC.email =
                  this.departmentTEC.email.toString() +
                  "," +
                  this.departmentOP.email.toString();
                if (resolve[0].driver_out != null) {
                  this.EmailModelTEC.payload.DriverOut =
                    resolve[0].driver_out.username;
                } else {
                }
                this.EmailModelTEC.payload.DeclaredBy =
                  resolve[0].declaredBy.username;
                this.EmailModelTEC.payload.DeclaredAt = resolve[0].declaredAt;

                console.log("this.EmailModelTEC", this.EmailModelTEC);

                this.SendEmailAction(this.EmailModelTEC).then(() => {
                  console.log("DONE");

                  this.listdepartmentTEC = [];
                  this.listDefectsNamesTEC = [];
                  this.listDefectsNamesTECFinal = [];
                });
              }, 1000);
            }
            this.Data = [];
            this.presenceCheck.user_id = this.getUserActive.id;
            this.presenceCheck.equipment_id = this.equipments_id;
            this.presenceChecksAction(this.presenceCheck).then((resolve) => {
              console.log("presenceCheck DONE");
            });
            this.damageSelect = [];
            this.changeEquipmentsFiltreSELECT();
            this.dialogValide = false;
            this.dialogValideDamage = false;
            this.LoadingPage = true;
            setTimeout(() => {
              this.LoadingPage = false;
              swal("Good job!", "success", "success");
            }, 1500);
          })
          .catch(() => {
            swal("Error", "", "error");
          });
      }
    },
    getActualShift() {
      let thisDate = new Date("2022-02-16T06:30:00");
      let nowDate = new Date();
      let shift = ["D", "A", "B", "C"];
      let momentDate = moment(thisDate);

      while (momentDate.add(72, "hours").toDate() < nowDate) {
        shift = this.shiftArrays(shift);
      }

      if (
        ((nowDate.getHours() == 6 && nowDate.getMinutes() >= 30) ||
          nowDate.getHours() >= 7) &&
        ((nowDate.getHours() == 14 && nowDate.getMinutes() < 30) ||
          nowDate.getHours() < 15)
      )
        return shift[0];
      else if (
        ((nowDate.getHours() == 14 && nowDate.getMinutes() >= 30) ||
          nowDate.getHours() >= 15) &&
        ((nowDate.getHours() == 22 && nowDate.getMinutes() < 30) ||
          nowDate.getHours() < 23)
      )
        return shift[1];
      else if (
        (nowDate.getHours() == 22 && nowDate.getMinutes() >= 30) ||
        (nowDate.getHours() >= 0 &&
          nowDate.getHours() < 6 &&
          nowDate.getMinutes() < 30)
      )
        return shift[2];
    },
    shiftArrays(array) {
      let c = "";
      c = array[3];
      array[3] = array[2];
      array[2] = array[1];
      array[1] = array[0];
      array[0] = c;

      return array;
    },
  },
};
</script>
