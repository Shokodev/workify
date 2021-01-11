<script>
import { Line } from 'vue-chartjs'
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
    data () {
      return {
        data: null,
        gradient: null,
        options: {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          showScale: true,
          scales: {
            yAxes: [{
              gridLines: {
                display: true,
                color: '#EEF0F4',
                borderDash: [5, 15],
                ticks: {
                  beginAtZero: true,
                }
              }
            }],
            xAxes: [ {
              gridLines: {
                stacked: true,
                display: true,
                color: '#EEF0F4',
                borderDash: [5, 15]
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false,
        }
      }
    },


  methods: {

        addChartColors(data) {
      for (let i = 0; i < data.datasets.length; i++) {
        data.datasets[i].borderColor = Colors.getColors(
          data.datasets[i].data.length,
          [i]
        );
        
      }
    },
  },


  mounted() {
    const data = this.chartdata;
      for (let i = 0; i < data.datasets.length; i++) {
        data.datasets[i].steppedLine = true;
        data.datasets[i].backgroundColor = 'rgba(0, 0, 0, 0.1)';
        data.datasets[i].borderColor = Colors.getColors(
          data.datasets[i].data.length,
          [i]
        );
        
      }

    this.renderChart(data, this.options);



    setTimeout(() => {
      this.download();
    }, 500);
  },

 
}
</script>

