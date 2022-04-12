<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <span>{{ count }}</span>
    <div>{{ count2 }}</div>
    <a-button type="primary" @click="change">+1</a-button>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import HelloWorld from "@/components/HelloWorld.vue";
export default defineComponent({
  name: "home",
  components: {
    HelloWorld,
  },
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
