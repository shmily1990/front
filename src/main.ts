import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Bus from "./utils/bus";
const app = createApp(App);
app.config.globalProperties.$bus = Bus;
app.use(Antd);

app.use(store).use(router).mount("#app");
