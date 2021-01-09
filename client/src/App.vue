<template>
  <v-app
    id="app"
    dark
  >
    <AppBar></AppBar>
    <div>
      <p class="error" v-if="error">{{ error }}</p>
      <router-view :posts="posts"></router-view>
    </div>
    <Footer class="footer">
    </Footer>
  </v-app>
</template>

<script>
import PostService from "./PostService";
import AppBar from "./layouts/home/AppBar";
import Footer from "./layouts/home/Footer"
/* eslint-disable no-unused-vars */
import styles from "./app.css"
/* eslint-disable no-unused-vars */
export default {
  name: "App",
  components: {
    AppBar,
    Footer,
  },
  data() {
    return {
      posts: [],
      error: "",
    };
  },
  async mounted() {
    await this.$store.dispatch("tryAutoLogin");
    await this.$store.dispatch("loadPosts");
  },
  async created() {
    this.$vuetify.theme.dark = true;
    try {
      this.posts = await PostService.getPosts();
    } catch (e) {
      this.error = e.message;
    }
  },
};
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
* {
  margin: 0;
}
.footer {
  background-color: var(--v-background-base) !important;
}
</style>
