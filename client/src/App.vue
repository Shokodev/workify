<template>
  <v-app id="app">
    <AddItem></AddItem>
    <v-card>
      <PostComponent></PostComponent>
    </v-card>
  </v-app>
</template>

<script>
import PostComponent from './components/PostComponent.vue'
import AddItem from "./components/AddItem";

export default {
  name: 'App',
  components: {
    PostComponent,
    AddItem
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
