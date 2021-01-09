<template>
        <div v-if="dataProgress">
      <v-footer
      
        v-if="$route.name === 'dashboard' ? true : false"
        class="footer"
        
      >
        <v-card flat tile width="100%" class="info text-center">
          <v-card-text class="white--text">
            <h3 class="text-uppercase">Progress Status</h3>
          </v-card-text>
        </v-card>
        <v-row class="d-flex justify-space-around">
            <ProgressCard
            v-for="item in dataProgress"
            :key="item.name"
            :data="item"
            />
        </v-row>
      </v-footer>
    </div>
</template>

<script>
import PostService from "@/PostService";
import ProgressCard from "@/components/ProgressCard";

export default {
  name: "Footer",
  components:{
    ProgressCard
  },
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