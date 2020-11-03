<template>
  <v-app id="app">
    <AppBar></AppBar>
    <v-container>
      <p class="error" v-if="error">{{error}}</p>
      <router-view :posts="posts"></router-view>
    </v-container>
  </v-app>
</template>

<script>
import PostService from "./PostService";
import AppBar from "./layouts/home/AppBar";

export default {
  name: 'App',
  components: {
    AppBar,
  },
  data() {
    return {
      posts: [],
      error: '',
    }
  },
  mounted() {
    this.$store.dispatch('tryAutoLogin')
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
