import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);
const opts = {
    theme: {
        options: {
          customProperties: true,
        },
        themes: {
        light: {
          
            primary: '#1976D2',
            secondary: '#4F5566',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#FAFBFE',
          

              },
              dark: {
                primary: '#C8C8C8',
                secondary: '#212121',
                accent: '#C4C8CA',
                error: '#FF5252',
                info: '#009688',
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
