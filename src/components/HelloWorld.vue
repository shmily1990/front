<template>
  <div class="hello">
    <span>{{ count }}</span>
    <div>{{ count2 }}</div>
    <a-button type="primary" @click="change">+1</a-button>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "hello",
  components: {},
  props: {},
  setup() {
    const count = ref(0);
    const store = useStore();
    const count2 = computed(() => {
      return count.value + 2;
    });
    console.log(store);
    function change() {
      count.value++;
      store.commit("app/SET_COLLAPSE", true);
    }
    return {
      count,
      change,
      count2,
    };
  },
});
</script>
