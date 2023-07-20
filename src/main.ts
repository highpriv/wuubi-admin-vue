import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "@mdi/font/css/materialdesignicons.css";
import App from "./App.vue";
import router from "./router";
import AxiosPlugin from "./plugins/axios";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
});

const app = createApp(App);
app.use(AxiosPlugin);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(vuetify);
app.use(router);
app.use(pinia);
app.mount("#app");
