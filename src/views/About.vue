<template>
  <div class="about">
    <echarts width="100%" height="500px" :option="state.option"></echarts>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
export default {
  components: {},
  setup() {
    const state = reactive({
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
          },
        ],
      },
    })
    onMounted(() => {
      console.log(state)
    })
    return {
      state,
    }
  },
}
</script>

<style lang="scss" scoped>
.about {
  width: 100%;
  height: 100%;
}
</style>
