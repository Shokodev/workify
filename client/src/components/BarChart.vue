<script>
import { Bar } from "vue-chartjs";
import Printable from "@/mixins/Printable";

export default {
  extends: Bar,
  mixins: [Printable],
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      gradient: null,
      options: {
        showScale: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
              },
              gridLines: {
                display: true,
                color: "#EEF0F4",
                borderDash: [5, 15],
              },
              categoryPercentage: 1,
              barPercentage: 0.4,
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: true,
                color: "#EEF0F4",
                borderDash: [5, 15],
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);

    setTimeout(() => {
      this.download();
    }, 500);
  },
};
</script>
