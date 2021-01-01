<template>
    <v-dialog
    v-if="dialog"
    v-model="dialog"
    max-width="400px"
    persistent
    >
       <v-card class="pa-8 grey lighten-2"> 
        <div class="text--lighten-1 text-h3 mb-4">
        Are you sure ?
        </div>
      <v-btn
        class="ma-2"
        color="grey"
        
        x-large
        @click="cancle()"
      >
        Cancel
      </v-btn>

      <v-btn
        class="ma-2"
        color="error"
       
        x-large
        @click="confirmed()"
      >
        YES
      </v-btn>
       </v-card>
    </v-dialog>
</template>
<script>
export default {
    name:"AreYouSureAlert",
    props:{
       showDialog:Boolean
    },
    data (){
      return {
        dialog: this.showDialog,
      }
    },
    methods:{
        confirmed(){
            this.$emit("confirm", true);
            
        },
        cancle(){
           this.$emit("confirm", false);
        }
    }
}
</script>