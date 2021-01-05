<template>
  <div>
  <div class="container">
    <v-row>
      <v-col>
        <div>
          <p class="text-button">Overall</p>
          <component

            v-bind:is="component"
            v-if="loaded"
            :chartdata="main"
            :options="options"
          />
          <v-select v-model="chart1" :items="items" dense @input="changeChart">
          </v-select>
        </div>
      </v-col>
      <v-col>
        <p class="text-button">Weekly</p>
        <div>
          <component2
            v-bind:is="component2"
            v-if="loaded"
            :chartdata="weekly"
            :options="options" 
          />
          <v-select v-model="chart2" :items="items" dense @input="changeChart2">
          </v-select>
        </div>
      </v-col>
    </v-row>
  </div>
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
  },

  async mounted() {
    this.loaded = false;
    this.progressLoaded = false;
    try {
      this.weekly = await PostService.getDashboard("weekly");
      this.main = await PostService.getDashboard("main");
      this.addChartColors(this.weekly);
      this.addChartColors(this.main);
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
    this.progressLoaded = true;
  },
};
</script>

<style>
.small {
  max-height: 500px;
}
</style>
