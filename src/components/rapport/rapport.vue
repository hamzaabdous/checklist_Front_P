<template>
  <div style="padding: 0px; padding-top: 2%">
    <v-container class="">
      <h4>Rapport by :</h4>
      <v-row>
        <v-col cols="12" sm="4" md="4">
          <v-select
            :items="profile_groupe"
            item-text="name"
            item-value="id"
            v-model="profile_groupe_id"
            label="Equipment groupe :"
            @change="changeProfile_groupeSELECT"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-select
            :items="equipmentsFiltre"
            item-text="name"
            :return-object="true"
            :item-value="item"
            v-model="equipments_id"
            label="Equipment :"
            @change="changeEquipmentsFiltreSELECT"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-select
            item-text="name"
            item-value="id"
            v-model="equipments_id"
            label="Defect item :"
            @change="changeEquipmentsFiltreSELECT"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
    <v-container style="padding: 0px; padding-top: 2%">
      <v-row>
        <div style="margin: 0 auto; width: 100%">
          <v-data-table
            :headers="headers"
            :items="Data"
            :items-per-page="5"
            class="elevation-1"
          >
          </v-data-table>
        </div>
      </v-row>
    </v-container>
    <v-container style="padding: 0px; padding-top: 4%">
      <v-row class="d-flex justify-center">
        <v-btn color="primary"> Generate Rapport </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const imagesWidth = [];
const imgDataList = [];
const img = new Image();
var ImageToLoad = new Image();
const imagesList = {
  imag1:
    "https://as2.ftcdn.net/jpg/00/42/98/87/500_F_42988762_JMNpHWOFWnbtCBZeYsRo5PmzD28rIquS.jpg",
  image2:
    "https://as2.ftcdn.net/jpg/00/42/98/87/500_F_42988762_JMNpHWOFWnbtCBZeYsRo5PmzD28rIquS.jpg",
};

export default {
  components: {},
  data() {
    return {
      drawer: false,
      profile_groupe: [],
      profile_groupe_id: 0,
      equipmentsFiltre: [],
      equipments_id: 0,
      Data: [],
      headers: [
        { text: "Defect item", value: "damage_type" },
        { text: "Status", value: "status" },
        { text: "Equipment", value: "name" },
        { text: "Description", value: "Description" },
        { text: "Declared by", value: "declared_by" },
        { text: "Declared aT", value: "declaredAt" },
        {
          text: "Defects items departement",
          value: "damage_type_departement",
        },
      ],
    };
  },
  mounted() {
    document.title = "Checklist";
    this.initialize();
  },
  computed: {
    ...mapGetters([
      "getprofilegroups",
      "getequipments",
      "getDamageTypeByEquipmentID",
    ]),
  },
  watch: {},
  methods: {
    initialize() {
      this.setPROFILEDROUPSAction().then(() => {
        this.profile_groupe = [...this.getprofilegroups];
      });
      this.setequipmentsAction().then(() => {
        this.equipments = [...this.getequipments];
      });
    },

    changeProfile_groupeSELECT() {
      this.equipmentsFiltre = [];
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
      //console.log("hamza",this.equipments_id);
      this.FindDamageTypeByEquipmentIDRapportAction(this.equipments_id.id).then(
        (resolve) => {
          this.Data = resolve;
        }
      );
    },

    getImageFromUrl(url, callback) {
      ImageToLoad.crossOrigin = "Anonymous";

      ImageToLoad.onError = function () {
        console.log('Cannot load image: "' + url + '"');
      };

      ImageToLoad.onload = function () {
        alert("image is loaded");
      };

      ImageToLoad.onload = function () {
        imagesWidth.push({
          width: ImageToLoad.width,
          height: ImageToLoad.height,
        });
        callback(ImageToLoad);
      };
      ImageToLoad.src = url;
      createPDF(ImageToLoad);
    },
    createPDF(imgData) {
      imgDataList.push(imgData);
      // Rotate Image angle: -20,
      var pwidth = doc.internal.pageSize.getWidth();
      var pheight = doc.internal.pageSize.getHeight();
      var maxWidth = pwidth - 40; // Max width for the image
      var maxHeight = pheight - 40; // Max height for the image
      var ratio = 0; // Used for aspect ratio
      var width = imgData.width; // Current image width
      var height = imgData.height; // Current image height
      // Check if the current width is larger than the max
      if (width > maxWidth) {
        ratio = maxWidth / width; // get ratio for scaling image
        // $(this).css("width", maxWidth); // Set new width
        // $(this).css("height", height * ratio);  // Scale height based on ratio
        height = height * ratio; // Reset height to match scaled image
        width = width * ratio; // Reset width to match scaled image
      }
      // Check if current height is larger than max
      if (height > maxHeight) {
        ratio = maxHeight / height; // get ratio for scaling image
        // $(this).css("height", maxHeight);   // Set new height
        // $(this).css("width", width * ratio);    // Scale width based on ratio
        width = width * ratio; // Reset width to match scaled image
        height = height * ratio; // Reset height to match scaled image
      }
      doc.addImage({
        imageData: imgData,
        x: 20,
        y: 5,
        w: width,
        h: height,
        angle: -20,
      });
      if (imgDataList.length !== Object.keys(imagesList).length) doc.addPage();
      if (imgDataList.length == Object.keys(imagesList).length) {
        doc.save("sample-file.pdf");
        //window.open(doc.output('bloburl'), '_blank');
      }
    },

    ...mapActions([
      "setPROFILEDROUPSAction",
      "setequipmentsAction",
      "FindDamageTypeByEquipmentIDRapportAction",
    ]),
  },
};
</script>

<style></style>
