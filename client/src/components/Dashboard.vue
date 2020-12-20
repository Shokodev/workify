<template>
  <div class="container">
    <v-row>
      <v-col>
        <v-btn class="mx-2" @click="loadChartData('main')">main</v-btn>
        <v-btn class="mx-2" @click="loadChartData('weekly')">weekly</v-btn>
      </v-col>
    </v-row>
    <v-card></v-card>
    <v-row>
      <v-col>
        <div>
          <component
            v-bind:is="component"
            v-if="loaded"
            :chartdata="chartdata"
            :options="options"
            height="300px"
          />
          <v-select v-model="chart1" :items="items" dense @input="changeChart">
          </v-select>
        </div>
      </v-col>
      <v-col>
        <div>
          <component2
            v-bind:is="component2"
            v-if="loaded"
            :chartdata="chartdata"
            :options="options"
            height="300px"
          />
          <v-select v-model="chart2" :items="items" dense @input="changeChart2">
          </v-select>
        </div>
      </v-col>
    </v-row>
    <v-footer fixed color="white" class="d-flex justify-space-between">
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
          {{ Math.round(dataProgress.floorPlansvalue) }} %
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
          :value="dataProgress.regulationGraphics.value"
          color="teal"
        >
          {{ Math.round(dataProgress.regulationGraphics.value) }} %
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
</template>

<script>
import PostService from "../PostService";
import Colors from "@/assets/Colors";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import RadarChart from "./RadarChart";
import { Bar } from "vue-chartjs";
import { Line } from "vue-chartjs";
import { Pie } from "vue-chartjs";
import { Radar } from "vue-chartjs";

export default {
  name: "Dashboard",
  components: { BarChart, RadarChart, PieChart, LineChart },
  extends: { Bar, Pie, Radar, Line },

  data: () => ({
    loaded: false,
    progressLoaded: false,
    items: ["BarChart", "LineChart", "PieChart", "RadarChart"],
    chart1: "BarChart",
    chart2: "PieChart",
    component: "BarChart",
    component2: "PieChart",
    dataProgress: {},
    mainData: {
      label: null,
      data: null,
      backgroundColor: null,
    },
    chartdata: {
      label: null,
      data: null,
      backgroundColor: null,
    },
    options: {
      type: Object,
      default: null,
    },
  }),

  methods: {
    async loadChartData(type) {
      this.loaded = false;
      this.chartdata = await PostService.getDashboard(type);
      this.addChartColors(this.chartdata);
      this.loaded = true;
    },
    addChartColors(data) {
      for (let i = 0; i < data.datasets.length; i++) {
        data.datasets[i].backgroundColor = Colors.getColors(
          data.datasets[i].data.length,
          [i]
        );
      }
    },
    changeChart() {
      this.component = this.chart1;
    },
    changeChart2() {
      this.component2 = this.chart2;
    },

    calculatePercentage() {
      this.progressTotal = Math.round(
        (190 * this.progressdata.total.current) /
          this.progressdata.total.expected
      );
      console.log(this.progressTotal);
    },
  },

  async mounted() {
    this.loaded = false;
    this.progressLoaded = false;
    try {
      this.dataProgress = await PostService.getDashboard("progress");
      this.chartdata = await PostService.getDashboard("weekly");
      this.addChartColors(this.chartdata);
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
    this.progressdata = await PostService.getDashboard("progress");
    //this.calculatePercentage()
    this.progressLoaded = true;
  },
};
</script>

<style>
.small {
  max-height: 500px;
}
</style>
