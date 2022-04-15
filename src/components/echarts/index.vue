<template>
  <div :id="id" class="echarts" :style="style" ref="echarts" />
</template>

<script>
import * as Echarts from 'echarts'
import {
  computed,
  reactive,
  toRefs,
  onMounted,
  ref,
  nextTick,
  onBeforeUnmount,
  getCurrentInstance,
  watch,
} from '@vue/runtime-core'
const unwarp = (obj) => obj && (obj.__v_raw || obj.valueOf() || obj)
export default {
  name: 'Echart',
  components: {},
  props: {
    id: {
      type: String,
    },
    width: {
      type: String,
      default: '100%',
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
    const { proxy } = getCurrentInstance()
    const { width, height } = toRefs(props)
    const state = reactive({
      MyCharts: null,
    })
    const echarts = ref()
    const style = computed(() => {
      return {
        height: height.value,
        width: width.value,
      }
    })
    console.log(style)
    watch(
      () => props.option,
      (newVal, oldVal) => {
        state.MyCharts && state.MyCharts.clear()
        if (unwarp(state.MyCharts)) {
          if (newVal) {
            unwarp(state.MyCharts).setOption(newVal, true)
          } else {
            unwarp(state.MyCharts).setOption(oldVal, true)
          }
        } else {
          InitChart()
        }
      },
      { deep: true }
    )
    function InitChart(theme = 'default') {
      if (!props.option) {
        return
      }
      state.MyCharts = Echarts.init(echarts.value, theme)
      /**
       * 此方法适用于所有项目的图表，但是每个配置都需要在父组件传进来，相当于每个图表的配置都需要写一遍，不是特别的省代码，主要是灵活度高
       * echarts的配置项，可以直接在外边配置好，直接扔进来一个this.option
       */
      unwarp(state.MyCharts).clear() // 适用于大数据量的切换时图表绘制错误,先清空在重绘
      unwarp(state.MyCharts).setOption(props.option, true) // 设置为true可以是图表切换数据时重新渲染
      unwarp(state.MyCharts).dispatchAction({
        type: 'takeGlobalCursor',
        // 如果想变为“可刷选状态”，必须设置。不设置则会关闭“可刷选状态”。
        key: 'brush',
        brushOption: {
          // 参见 brush 组件的 brushType。如果设置为 false 则关闭“可刷选状态”。
          brushType: 'lineX',
          // 参见 brush 组件的 brushMode。如果不设置，则取 brush 组件的 brushMode 设置。
          // brushMode: String
        },
      })
      resize()
    }
    function resize() {
      nextTick(() => {
        const width = window
          .getComputedStyle(echarts.value, null)
          .getPropertyValue('width')
        if (/\d+px$/.test(width)) {
          unwarp(state.MyCharts).resize()
        }
      })
    }
    onMounted(() => {
      InitChart()
      window.addEventListener('resize', resize)
      proxy.$bus.$on('handle-echart-resize', () => {
        resize()
      })
      if (props.legendselectchanged) {
        unwarp(state.MyCharts).on(
          'legendselectchanged',
          props.legendselectchanged,
          props.option
        )
      }
      if (props.chartClick) state.MyCharts.on('click', props.chartClick)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', resize)
    })
    return {
      state,
      style,
      echarts,
    }
  },
}
</script>
