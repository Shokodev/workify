<template>
<div>
    <v-edit-dialog
        :return-value.sync="propItem"
        @save="save"
        @cancel="cancel"
        large
    >
    
    <v-tooltip bottom
      color="secondary"
      v-if="hasComment"
      >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              class="mx-5"
              v-bind="attrs"
              v-on="on"
            >
              mdi-comment-text
            </v-icon>
          </template>
          <span>{{ propItem[propertyName] }}</span>
    </v-tooltip>
    <v-icon
    small
    class="mx-5"
    v-else
    >mdi-comment
    </v-icon>
   
    <template v-slot:input >
          <v-card class="pa-2 card" >
             <v-card-title>
                 {{label}}
             </v-card-title>  
            <v-textarea
            filled
            label="Comment"
            auto-grow
            v-model="propItem[propertyName]" 
            >
            </v-textarea>
          </v-card>
    </template>
    </v-edit-dialog>
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
export default {
    name:"CommentDialog",
    props:{
        item:Object,
        propName:String,
        label:String
    },
    data() {
    return {
      propItem: this.item.item,
      id: this.item._id,
      propertyName: this.propName,
      snack: false,
      snackColor: "",
      snackText: "",
    };
  },
    methods:{
        save() {
        this.$emit("update-item", {
            item:{
                [this.propertyName]: this.propItem[this.propertyName]
                }, 
            _id: this.id});
        },
        cancel() {
            this.snack = true;
            this.snackColor = "error";
            this.snackText = "Canceled";
        },

    },
    computed:{
      hasComment(){
      if(this.propItem[this.propertyName] === undefined){
          return false        
      } else if(this.propItem[this.propertyName] === ""){
          return false
      } else {
        return true
      }
      
      }
  }
}
</script>
<style scoped>
  .card {
    box-shadow: none !important;
    border-color: transparent !important;
  }
</style>