<template>
  <v-app id="app">
    <v-container>
    <AppBar></AppBar>
      <p class="error" v-if="error">{{error}}</p>
      <router-view :posts="posts"></router-view>
    </v-container>
    <div v-if="dataProgress">
    <v-footer  v-if="$route.name === 'dashboard' ? true: false"  color="white" class="d-flex justify-center">
      
      <v-card flat tile width="100%" class="grey lighten-1 text-center">
        <v-card-text class="white--text">
          <strong>Progress Status</strong>
        </v-card-text>
      </v-card>
      <v-card elevation="2" class="ma-1">
        <v-card-title>
          <p class="text-left">Floor Plans</p>
        </v-card-title>
        <v-progress-circular
          class="mb-6"
          :rotate="360"
          :size="100"
          :width="15"
          :value="dataProgress.floorPlans.value"
          color="teal"
        >
          {{ Math.round(dataProgress.floorPlans.value) }} %
        </v-progress-circular>
        <div class="ms-4">
          <p class="text-left">Current:{{ dataProgress.floorPlans.current }}</p>
          <p class="text-left">
            Expected:{{ dataProgress.floorPlans.expected }}
          </p>
        </div>
      </v-card>

      <v-card elevation="2" class="ma-1">
        <v-card-title>
          <p class="text-left">Navigations Graphics</p>
        </v-card-title>
        <v-progress-circular
          class="mb-6"
          :rotate="360"
          :size="100"
          :width="15"
          :value="dataProgress.navigationsGraphics.value"
          color="teal"
        >
          {{ Math.round(dataProgress.navigationsGraphics.value) }} %
        </v-progress-circular>
        <div class="ms-4">
          <p class="text-left">
            Current:{{ dataProgress.navigationsGraphics.current }}
          </p>
          <p class="text-left">
            Expected:{{ dataProgress.navigationsGraphics.expected }}
          </p>
        </div>
      </v-card>

      <v-card elevation="2" class="ma-1">
        <v-card-title>
          <p class="text-left">Plant Graphics</p>
        </v-card-title>
        <v-progress-circular
          class="mb-6"
          :rotate="360"
          :size="100"
          :width="15"
          :value="dataProgress.plantGraphics.value"
          color="teal"
        >
          {{ Math.round(dataProgress.plantGraphics.value) }} %
        </v-progress-circular>
        <div class="ms-4">
          <p class="text-left">
            Current:{{ dataProgress.plantGraphics.current }}
          </p>
          <p class="text-left">
            Expected:{{ dataProgress.plantGraphics.expected }}
          </p>
        </div>
      </v-card>

      <v-card elevation="2" class="ma-1">
        <v-card-title>
          <p class="text-left">Regulations Graphics</p>
        </v-card-title>
        <v-progress-circular
          class="mb-6"
          :rotate="360"
          :size="100"
          :width="15"
          :value="dataProgress.regulationGraphics.value"
          color="teal"
        >
          {{ Math.round(dataProgress.regulationGraphics.value) }} %
        </v-progress-circular>
        <div class="ms-4">
          <p class="text-left">
            Current:{{ dataProgress.regulationGraphics.current }}
          </p>
          <p class="text-left">
            Expected:{{ dataProgress.regulationGraphics.expected }}
          </p>
        </div>
      </v-card>

      <v-card elevation="2" class="ma-1">
        <v-card-title>
          <p class="text-left">Total</p>
        </v-card-title>
        <v-progress-circular
          class="mb-6"
          :rotate="360"
          :size="100"
          :width="15"
          :value="dataProgress.total.value"
          color="teal"
        >
          {{ Math.round(dataProgress.total.value) }} %
        </v-progress-circular>
        <div class="ms-4">
          <p class="text-left">Current:{{ dataProgress.total.current }}</p>
          <p class="text-left">Expected:{{ dataProgress.total.expected }}</p>
        </div>
      </v-card>
    </v-footer>
    </div>
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
  async mounted() {
    await this.$store.dispatch('tryAutoLogin')
    await this.$store.dispatch('loadPosts')
    await this.$store.dispatch('loadProgressData')
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (e) {
      this.error = e.message;
    }
  },
  computed:{
    dataProgress(){
      return this.$store.getters.getProgressData
    }
  },

  methods:{
    calculatePercentage() {
      this.progressTotal = Math.round(
        (190 * this.progressdata.total.current) /
          this.progressdata.total.expected
      );
      console.log(this.progressTotal);
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
