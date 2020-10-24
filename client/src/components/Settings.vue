<template>
  <div>
    <p>Settings</p>
    <v-text-field
        v-model="settings.calculatedGraphics"
        label="Calculated graphic"
        required
    ></v-text-field>
    <v-text-field
        v-model="settings.plantGraphics"
        label="Plant graphics"
        required
    ></v-text-field>
    <v-text-field
        v-model="settings.floorPlan"
        label="Floor plan"
        required
    ></v-text-field>
    <v-text-field
        v-model="settings.navigationGraphic"
        label="Navigation graphic"
        required
    ></v-text-field>
    <v-text-field
        v-model="settings.regulationsGraphic"
        label="Regulations graphic"
        required
    ></v-text-field>
    <v-text-field
        v-model="settings.requiredGraphicsAtWeek"
        label="Required graphic per week"
        required
    ></v-text-field>
    <v-text-field
        v-model="settings.totalDataPoints"
        label="Total data points"
        required
    ></v-text-field>
    <v-btn color="indigo"
           class="white--text"
           @click="updateSettings(settings)"
           :loading ="loadingActive"
           :disabled="loadingActive">
      <v-icon color="white">mdi-content-save</v-icon>Save
    </v-btn>
  </div>


</template>

<script>
import PostService from "@/PostService";
    export default {
        name: "Settings",
      data() {
          return{
            settings: {
              calculatedGraphics: "",
              plantGraphics: "",
              floorPlan: "",
              navigationGraphic: "",
              regulationsGraphic: "",
              requiredGraphicsAtWeek: "",
              totalDataPoints: ""
            },
            id:"",
            loadingActive: false,
      }
      },
     async mounted() {
      let res = await PostService.getSettings();
      this.id = res._id;
      this.settings = res.settings;
      },
      methods:{
          async updateSettings(settings){
            this.loadingActive = true;
            PostService.updateSettings(settings, this.id).then(()=>{
             this.loadingActive = false;
             }
            ).catch(err=>{
              console.log(err);
              this.loadingActive = false;
            });
            await PostService.getSettings();
          }
      }
    }
</script>

<style scoped>

</style>
