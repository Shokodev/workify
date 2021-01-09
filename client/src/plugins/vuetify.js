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
                primary: '#212121',
                secondary: '#C8C8C8',
                accent: '#C4C8CA',
                error: '#FF5252',
                info: '#2CA1C0',
                success: '#2CA1C0',
                warning: '#FFC107',
                background: '#111B27',

              },
        },
    },
    icons: {
        iconfont: "mdi"
    }

};

export default new Vuetify(opts);
