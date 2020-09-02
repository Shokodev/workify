import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);
const opts = {
    theme: {
        options: {
          customProperties: true,
        },
        themes: {
          light: {
              GECC: '#d9adad',
              Siemens: '#009999',
              Planer: '#bfdcae',
              accent: '#f1f3f8'
          }
        },
    },
    options: {
        customProperties: true
    },
    icons: {
        iconfont: "mdi"
    }

};

export default new Vuetify(opts);
