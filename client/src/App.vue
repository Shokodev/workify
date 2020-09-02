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
