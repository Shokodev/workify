<template>
  <div class="container">
    <v-row>
      <v-col>
        <v-btn class="mx-2" @click="loadChartData('main')">main</v-btn>
        <v-btn class="mx-2" @click="loadChartData('weekly')">weekly</v-btn>
      </v-col>
    </v-row>
<v-row>
  <v-col>
    <div class="small">
      <component v-bind:is="component"
                 v-if="loaded"
                 :chartdata="chartdata"
                 :options="options"/>
      <v-select
          v-model="chart1"
          :items="items"
          dense
          @input="changeChart"
      >
      </v-select>
    </div>
  </v-col>
  <v-col>
    <div class="small">
      <component2 v-bind:is="component2"
                 v-if="loaded"
                 :chartdata="chartdata"
                 :options="options"/>
      <v-select
          v-model="chart2"
          :items="items"
          dense
          @input="changeChart2"
      >
      </v-select>
    </div>
  </v-col>
</v-row>
<!--    <v-row v-if="false">
      <v-col>
        <div class="small">
          <Bar-chart
              v-if="loaded"
              :chartdata="chartdata"
              :options="options"/>
        </div>
      </v-col>
      <v-col>
        <div class="small">
          <Pie-chart
              v-if="loaded"
              :chartdata="chartdata"
              :options="options"/>
        </div>
      </v-col>
    </v-row>-->
  </div>
</template>

<script>
    import PostService from "../PostService";
    import Colors from "@/assets/Colors";
    import BarChart from "./BarChart";
    import LineChart from "./LineChart";
    import PieChart from "./PieChart";
    import RadarChart from "./RadarChart";
    import { Bar } from 'vue-chartjs'
    import { Line } from 'vue-chartjs'
    import { Pie } from 'vue-chartjs'
    import { Radar } from 'vue-chartjs'

    export default {
        name: "Dashboard",
        components: {BarChart, RadarChart, PieChart, LineChart},
        extends: {Bar, Pie, Radar, Line},

        data: () => ({
            loaded: false,
            items: ['BarChart', 'LineChart', 'PieChart', 'RadarChart'],
            chart1: 'BarChart',
            chart2: 'PieChart',
            component: 'BarChart',
            component2: 'PieChart',
            mainData: {
              label: null,
              data: null,
              backgroundColor: null
            },
            chartdata: {
              label: null,
              data: null,
              backgroundColor: null
            },
            options: {
                type: Object,
                default: null
            },
        }),

        methods: {
          async loadChartData(type) {
            this.loaded = false
            this.chartdata = await PostService.getDashboard(type);
            this.addChartColors(this.chartdata)
            this.loaded = true
          },
          addChartColors(data) {
            for (let i = 0; i < data.datasets.length; i++) {
              data.datasets[i].backgroundColor = Colors.getColors(data.datasets[i].data.length, [i]);
            }
          },
          changeChart() {
            this.component = this.chart1
          },
          changeChart2() {
            this.component2 = this.chart2
          },
        },

        async mounted() {
            this.loaded = false;
            try {

                this.chartdata = await PostService.getDashboard("weekly");
                this.addChartColors(this.chartdata)
                this.loaded = true
            } catch (e) {
                console.error(e)
            }

        }
    }
</script>

<style>
    .small {
        max-width: 800px;
        margin:  150px auto;
    }

</style>
