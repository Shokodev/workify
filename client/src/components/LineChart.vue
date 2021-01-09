<script>
import { Line } from 'vue-chartjs'
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
    data () {
      return {
        gradient: null,
        options: {
          showScale: true,
          scales: {
            yAxes: [{
              gridLines: {
                display: true,
                color: '#EEF0F4',
                borderDash: [5, 15]
              }
            }],
            xAxes: [ {
              gridLines: {
                display: true,
                color: '#EEF0F4',
                borderDash: [5, 15]
              }
            }]
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },

  mounted() {
    this.renderChart(this.chartdata, this.options);

    setTimeout(() => {
      this.download();
    }, 500);
  },
  
}
</script>
