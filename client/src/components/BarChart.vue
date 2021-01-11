<script>
import { Bar } from "vue-chartjs";
import Colors from "@/assets/Colors";
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
    const chart2 = this.chartdata;
    for (let i = 0; i < chart2.datasets.length; i++) {
      chart2.datasets[i].backgroundColor = Colors.getColors(
        chart2.datasets[i].data.length,
        [i]
      );
    }

    this.renderChart(chart2, this.options);

    setTimeout(() => {
      this.download();
    }, 500);
  },
};
</script>
