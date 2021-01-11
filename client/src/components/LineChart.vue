<script>
import { Line } from "vue-chartjs";
import Colors from "@/assets/Colors";
import Printable from "@/mixins/Printable";

export default {
  extends: Line,
  mixins: [Printable],
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      chart: null,
      gradient: null,
      options: {
        showScale: true,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "#EEF0F4",
                borderDash: [5, 15],
                ticks: {
                  beginAtZero: true,
                },
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                stacked: true,
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
    const chart = this.chartdata;

    for (let i = 0; i < chart.datasets.length; i++) {
      chart.datasets[i].fill = false;
      chart.datasets[i].steppedLine = true;
      chart.datasets[i].borderColor = Colors.getColor(i);
    }

    this.renderChart(chart, this.options);

    setTimeout(() => {
      this.download();
    }, 500);
  },
};
</script>
