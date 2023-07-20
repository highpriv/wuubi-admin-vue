import { type App } from "vue";
import api from "../service/api";

export default {
  install: (app: App) => {
    app.config.globalProperties.$axios = api;
  },
};
