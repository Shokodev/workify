<template>
  <div class="container">
<v-row>
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
      <Radar-chart
          v-if="loaded"
          :chartdata="chartdata"
          :options="options"/>
    </div>
  </v-col>
</v-row>
<!--    <v-row>
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
    import BarChart from "./BarChart";
/*    import LineChart from "./LineChart";*/
/*    import PieChart from "./PieChart";*/
    import RadarChart from "./RadarChart";
    import { Bar } from 'vue-chartjs'
/*    import { Line } from 'vue-chartjs'*/
    import { Pie } from 'vue-chartjs'
    import { Radar } from 'vue-chartjs'

    export default {
        name: "Dashboard",
        components: {BarChart, RadarChart},
        extends: {Bar, Pie, Radar},

        data: () => ({
            loaded: false,
            chartdata: null,
            options: {
                type: Object,
                default: null
            },
        }),

        methods: {

        },

        async mounted() {
            this.loaded = false;
            try {

                this.dataObject = await PostService.getDashboard();
                this.chartdata = this.dataObject.weeklyStatisticsGECC;
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