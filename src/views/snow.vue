<template>
  <div id="container"></div>
</template>
<script>
import Snow from "./snow.js";
export default {
  mounted() {
    let snow = new Snow({
      id: "container",
      max: 300,
      size: 6,
      speed: 1
    });
    snow.start();
  }
};
</script>
<style lang="less" scoped>
#container {
  height: 100vh;
  background: url("../assets/pattern.svg");
}
</style>
