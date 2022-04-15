import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import echarts from '@/components/echarts/index.vue'
import { setupAntdIcon } from './utils/icon'
import 'ant-design-vue/dist/antd.css'
import Bus from './utils/bus'
const app = createApp(App)
app.config.globalProperties.$bus = Bus
app.use(Antd)
// a-icon 图标封装
setupAntdIcon(app)
app.component('Echarts', echarts)
app.use(store).use(router).mount('#app')
