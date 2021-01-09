<template>
     <v-card 
     elevation="2" 
     class="ma-1"
     max-height="300px"
     width="300px"
     >
              <v-card-title> {{data.name}}
              </v-card-title>
              <v-progress-circular
                class="mb-6"
                :rotate="360"
                :size="100"
                :width="15"
                :value="data.value"
                color="teal"
              >
                {{ Math.round(data.value) }} %
              </v-progress-circular>
              <div class="pa-4">
                <p class="text-left">
                  Current:
                  <strong>{{ data.current }}</strong>
                </p>
                <p class="text-left">
                  
                Expected:<strong>{{ data.expected }}</strong
                  >
                </p>
              </div>
     </v-card>
</template>
<script>
export default {
    name:"ProgressCard",
    props:{
        data:Object,
    }
}
</script>