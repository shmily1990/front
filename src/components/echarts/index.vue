<template>
  <div :id="id" class="echarts" :style="style" />
</template>

<script>
import * as Echarts from "echarts";
import { computed } from "@vue/runtime-core";
const unwarp = (obj) => obj && (obj.__v_raw || obj.valueOf() || obj);
export default {
  name: "Echart",
  components: {},
  props: {
    id: {
      type: String,
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
    },
    option: {
      type: Object,
    },
    dataZoom: {
      type: Function,
      default: null,
    },
    brush: {
      type: Function,
      default: null,
    },
    legendselectchanged: {
      type: Function,
      default: null,
    },
    chartClick: {
      type: Function,
      default: null,
    },
    contextmenu: {
      type: Function,
      default: null,
    },
  },
  setup(props) {
    const { width, height } = props;
    const style = computed(() => {
      return {
        height,
        width,
      };
    });
  },
};
</script>
