<template>
  <div class="content">
    <div class="container mt-15">
      <div class="Chart__container">
        <div class="Chart__title">
          <h3 class="primary--text">Overal</h3>
          <DownloadButton :name="'Overall'" :link="overallPng" />
        </div>
        <v-divider class="primary"></v-divider>
        <component
          v-bind:is="component"
          v-if="loaded"
          :chartdata="main"
          :options="options"
          @generate="setOverallPng"
        />
        <v-select v-model="chart1" :items="items" dense @input="changeChart">
        </v-select>
      </div>

      <div class="Chart__container">
        <div class="Chart__title">
          <h3 class="primary--text">Weekly</h3>
          <DownloadButton :name="'Weekly'" :link="weeklyPng" />
        </div>
        <v-divider class="primary"></v-divider>
        <component2
          v-bind:is="component2"
          v-if="loaded"
          :chartdata="weekly"
          :options="options"
          @generate="setWeeklyPng"
        />
        <v-select v-model="chart2" :items="items" dense @input="changeChart2">
        </v-select>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import RadarChart from "./RadarChart";
import DownloadButton from "./Download";
import { Bar } from "vue-chartjs";
import { Line } from "vue-chartjs";
import { Pie } from "vue-chartjs";
import { Radar } from "vue-chartjs";

export default {
  name: "Dashboard",
  components: { BarChart, RadarChart, PieChart, LineChart, DownloadButton },
  extends: { Bar, Pie, Radar, Line },

  data: () => ({
    loaded: false,
    progressLoaded: false,
    items: ["BarChart", "LineChart"],
    chart1: "BarChart",
    chart2: "BarChart",
    component: "BarChart",
    component2: "BarChart",
    mainData: {
      label: null,
      data: null,
      backgroundColor: null,
    },
    main: {
      label: null,
      data: null,
      backgroundColor: null,
    },
    weekly: {
      label: null,
      data: null,
      backgroundColor: null,
    },
    options: {
      type: Object,
      default: null,
    },
    overallPng: null,
    weeklyPng: null,
  }),

  methods: {
    async loadChartData(type) {
      this.loaded = false;
      this.chartdata = await PostService.getDashboard(type);
      this.addChartColors(this.chartdata);
      this.loaded = true;
    },

    changeChart() {
      this.component = this.chart1;
    },
    changeChart2() {
      this.component2 = this.chart2;
    },
    setOverallPng(payload) {
      this.overallPng = payload;
    },
    setWeeklyPng(payload) {
      this.weeklyPng = payload;
    },
  },

  async mounted() {
    this.loaded = false;
    this.progressLoaded = false;
    try {
      this.weekly = await PostService.getDashboard("weekly");
      this.main = await PostService.getDashboard("main");
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
    this.progressLoaded = true;
  },
};
</script>

<style>
.Chart__container {
  border-radius: 10px;
  background-color: var(--v-background-lighten1);
  box-shadow: 0 15px 30px 0 rgba(33, 33, 33, 0.11),
    0 5px 15px 0 rgba(17, 27, 39, 0.08);
  padding: 20px;
  margin: 50px;
}

.Chart__title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
