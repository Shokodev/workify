<template>
  <div class="container settings">
    <v-card class="pa-5">
  <div v-if="isAdmin">
    <p class="text-md-h4">Project Settings</p>
    <v-from>
      <v-row>
        <v-col cols="12" sm="6"> 
          <v-text-field
              v-model="settings.calculatedGraphics"
              label="Calculated graphic"
              required
              :rules="numberRules"
          ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
          <v-text-field
              v-model="settings.plantGraphics"
              label="Plant graphics"
              required
              :rules="numberRules"
          ></v-text-field>
          </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6"> 
          <v-text-field
              v-model="settings.floorPlan"
              label="Floor plan"
              required
              :rules="numberRules"
          ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
          <v-text-field
              v-model="settings.navigationGraphic"
              label="Navigation graphic"
              required
              :rules="numberRules"
          ></v-text-field>
          </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6"> 
          <v-text-field
              v-model="settings.regulationsGraphic"
              label="Regulations graphic"
              required
              :rules="numberRules"
          ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
          <v-text-field
              v-model="settings.requiredGraphicsAtWeek"
              label="Required graphic per week"
              required
              :rules="numberRules"
          ></v-text-field>
          </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6"> 
          <v-text-field
              v-model="settings.totalDataPoints"
              label="Total data points"
              required
              :rules="numberRules"
          ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
          
          </v-col>
      </v-row>
    </v-from>
    <v-btn color="info"
           class="white--text"
           @click="updateSettings(settings)"
           :loading ="loadingActive"
           :disabled="loadingActive">
      <v-icon color="white">mdi-content-save</v-icon>Save
    </v-btn>
  </div>
    <div v-if="isAdmin">
    <v-divider class="my-5"></v-divider>
      <p>Administration</p>
      <v-btn
      color="info"
      to="/userAdministration">Edit users</v-btn>
    </div>
    <div v-if="!auth">
      <v-alert
      type='info'
      >Nothing to see here..</v-alert>
    </div>
    </v-card>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}
        <template v-slot:action="{ attrs }">
            <v-btn v-bind="attrs" text @click="snack = false">
            Close
            </v-btn>
        </template>
    </v-snackbar>
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
            snack: false,
            snackColor: "",
            snackText: "",
            numberRules: [
                  v => Number.isInteger(Number(v)) || 'The input has to be a number',
                ],
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
             this.snack = true;
             this.snackColor = "success";
             this.snackText = "Data saved";
             }
            ).catch(()=>{
              this.snack = true;
              this.snackColor = "error";
              this.snackText = "Can't save, check your input!";
              this.loadingActive = false;
            });
            await PostService.getSettings();
          },
      },
      computed: {
          auth () {
           return  this.$store.getters.isAuthenticated
            //TODO get user group
          },  
          isAdmin() {
            return this.$store.getters.userRole === "Admin";
          },
      }
    }
</script>

<style scoped>

.settings {
  margin-top: 80px;
}
</style>
