<template>
  <v-app id="app">
    <AddItem
    v-on:add-item="createPost($event)"
    ></AddItem>
    <v-card>
      <PostComponent></PostComponent>
    </v-card>
  </v-app>
</template>

<script>
import PostComponent from './components/PostComponent.vue'
import PostService from "./PostService";
import AddItem from "./components/AddItem";

export default {
  name: 'App',
  components: {
    PostComponent,
    AddItem
  },
  methods: {
    async createPost(item) {
      await PostService.insertPost(item);
      console.log('send new item', item)
      //this.posts = await PostService.getPosts()
    },
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
