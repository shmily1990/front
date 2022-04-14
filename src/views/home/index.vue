<template>
  <div id="home">
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import proxyAmap from "@/utils/map/aMap";
let map = null;
export default defineComponent({
  name: "home",
  components: {},
  props: {},
  setup() {
    async function initAmap() {
      map = await proxyAmap();
      map.init("mapContainer", {
        mapStyle: "amap://styles/b64d6b2cb9e7363de82744f3cffcab04",
        zoom: 11, //级别
        center: [116.397428, 39.90923], //中心点坐标
        viewMode: "3D", //使用3D视图
      });
    }
    onMounted(() => {
      initAmap();
    });
  },
});
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  font-size: 16px;
  #mapContainer {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    backdrop-filter: blur(10px);
  }
}
</style>
