<template>
  <div class="maintainer">
    <Card title="compositionApi">
      <Button type="success" @click="increment">increment</Button>
      count:{{ state.count }}, computed:{{ state.double }}
    </Card>
  </div>
</template>

<script>
import { reactive, computed, watch } from "@vue/composition-api";

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    });
    watch(() => {
      document.title = `count is ${state.count}`;
    });
    function increment() {
      state.count++;
    }

    return {
      state,
      increment
    };
  }
};
</script>
