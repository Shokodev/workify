<template>
  <div>
    <p>Settings</p>
    <p>{{settings}}</p>
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