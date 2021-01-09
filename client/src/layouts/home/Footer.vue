<template>
        <div v-if="dataProgress">
      <v-footer
      
        v-if="$route.name === 'dashboard' ? true : false"
        class="d-flex justify-center footer"
        
      >
        <v-card flat tile width="100%" class="info text-center">
          <v-card-text class="white--text">
            <h3 class="text-uppercase">Progress Status</h3>
          </v-card-text>
        </v-card>
        <v-row>
          <v-col>
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
              <div class="pa-4">
                <p class="text-left">
                  Current:
                  <strong>{{ dataProgress.floorPlans.current }}</strong>
                </p>
                <p class="text-left">
                  <strong
                    >Expected:{{ dataProgress.floorPlans.expected }}</strong
                  >
                </p>
              </div>
            </v-card>
          </v-col>
          <v-col>
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
              <div class="pa-4">
                <p class="text-left">
                  Current:
                  <strong>
                    {{ dataProgress.navigationsGraphics.current }}</strong
                  >
                </p>
                <p class="text-left">
                  Expected:<strong>{{
                    dataProgress.navigationsGraphics.expected
                  }}</strong>
                </p>
              </div>
            </v-card>
          </v-col>
          <v-col>
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
              <div class="pa-4">
                <p class="text-left">
                  Current:<strong>{{
                    dataProgress.plantGraphics.current
                  }}</strong>
                </p>
                <p class="text-left">
                  Expected:<strong>{{
                    dataProgress.plantGraphics.expected
                  }}</strong>
                </p>
              </div>
            </v-card>
          </v-col>
          <v-col>
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
              <div class="pa-4">
                <p class="text-left">
                  Current:<strong>{{
                    dataProgress.regulationGraphics.current
                  }}</strong>
                </p>
                <p class="text-left">
                  Expected:<strong>{{
                    dataProgress.regulationGraphics.expected
                  }}</strong>
                </p>
              </div>
            </v-card>
          </v-col>
          <v-col>
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
              <div class="pa-4">
                <p class="text-left">
                  Current:<strong>{{ dataProgress.total.current }}</strong>
                </p>
                <p class="text-left">
                  Expected:<strong>{{ dataProgress.total.expected }}</strong>
                </p>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-footer>
    </div>
</template>

<script>
import PostService from "@/PostService";
export default {
  name: "Footer",

  async mounted() {
    await this.$store.dispatch("loadProgressData");
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (e) {
      this.error = e.message;
    }
  },
  computed: {
    dataProgress() {
      return this.$store.getters.getProgressData;
    },
  },

  methods: {
    calculatePercentage() {
      this.progressTotal = Math.round(
        (190 * this.progressdata.total.current) /
          this.progressdata.total.expected
      );
    },
  },
};
</script>