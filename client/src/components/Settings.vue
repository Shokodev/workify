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
    <v-btn dark color="indigo"><v-icon dark>mdi-content-save</v-icon>Save</v-btn>

  </div>


</template>

<script>
import PostService from "@/PostService";
    export default {
        name: "Settings",
      data() {
          return{
            settings: null,
          }
      },
     async mounted() {
      this.settings = await PostService.getSettings();
      }
    }
</script>

<style scoped>

</style>