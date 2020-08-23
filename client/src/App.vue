<template>
  <v-app id="app">
    <AppBar></AppBar>
    <v-container>
      <p class="error" v-if="error">{{error}}</p>
      <Datatable :posts="posts"></Datatable>
    </v-container>
  </v-app>
</template>

<script>
import PostService from "./PostService";
import AppBar from "./layouts/home/AppBar";
import Datatable from "./components/Datatable";

export default {
  name: 'App',
  components: {
    AppBar,
    Datatable,
  },
  data() {
    return {
      posts: [],
      error: '',
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (e) {
      this.error = e.message;
    }
  },

  methods: {
    async createPost(item) {
      await PostService.insertPost(item);
      console.log('send new item', item)
      this.posts = await PostService.getPosts()
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts()
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
