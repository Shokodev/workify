<template>
    <div class="container">
        <Bar-chart
                v-if="loaded"
                :chartdata="chartdata"
                :options="options"/>

    </div>
</template>

<script>
    import PostService from "../PostService";
    import BarChart from "./BarChart";
    import { Bar } from 'vue-chartjs'

    export default {
        name: "Dashboard",
        components: {BarChart},
        extends: Bar,

        data: () => ({
            loaded: false,
            chartdata: null,
            options: {
                type: Object,
                default: null
            },

            dataObject: {
                labels: ['KW30', 'KW31', 'KW32'],
                datasets: [
                    {
                        label: 'Graphics / Week',
                        data: [],
                    }
                ]
            }
        }),

        methods: {

        },

        async mounted() {
            this.loaded = false;
            try {

                this.dataObject = await PostService.getDashboard();
                console.log(this.dataObject.weeklyStatisticsGECC)
                this.chartdata = this.dataObject.weeklyStatisticsGECC;
                this.loaded = true
            } catch (e) {
                console.error(e)
            }

        }
    }
</script>

<style scoped>

</style>