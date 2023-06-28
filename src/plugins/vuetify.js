import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#a97f29",
        secondary: "#EEEEEE",
      },
    },
  },
});

export default vuetify;

// export default new Vuetify({});
