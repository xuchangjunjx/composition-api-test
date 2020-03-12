<template>
  <div class="main">
    <div class="left" style="transform: rotate(-90deg);">
      <div class="base"></div>
      <div class="vert"></div>
      <div
        v-for="(line,key) in lines"
        :key="key"
        class="line"
        :style="`width:${line.width}px;background:${line.color};color:${line.color};transform: translate(350px, 198px) rotate(${line.deg}deg);`"
      >
        <span :style="`transform: rotate(${Math.abs(90-line.deg)}deg);`">{{line.name}}</span>
      </div>
    </div>
    <div style="width:600px;">
      <div>
        <div v-for="(line,key) in lines" :key="key">
          <div style="display:flex;">
            <div span="8">
              名称
              <Input v-model="line.name" />
            </div>
            <div span="8">
              角度
              <Input v-model="line.deg" />
            </div>
            <div span="8">
              颜色
              <Input v-model="line.color" type="color" />
            </div>
            <div span="8">
              长度
              <Input v-model="line.width" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button type="primary" @click="addLine">加条线</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  setup() {
    const lines = reactive([]);
    const addLine = () => {
      lines.push({
        name: "",
        deg: 0,
        color: "red",
        width: 100
      });
    };
    return {
      addLine,
      lines
    };
  }
};
</script>
<style lang="less" scoped>
.main {
  display: flex;
  height: 100vh;
}
.left {
  flex: 1;
  border: 1px solid #ccc;
  height: 100%;
}
.base {
  display: block;
  width: 100%;
  height: 0px;
  border-top: 1px dashed green;
  transform: translate(0px, 200px);
}
.vert {
  display: block;
  width: 100%;
  height: 0px;
  border-top: 1px dashed green;
  transform-origin: 250px 0%;
  transform: translate(100px, 200px) rotate(90deg);
}
.line {
  display: inline-block;
  width: 100px;
  position: absolute;
  height: 1px;
  transform-origin: 0% 0%;
  transition: transform 0.3s ease-in;
  span {
    position: absolute;
    right: -6px;

    top: 2px;
  }
  &::after {
    content: ">";
    position: absolute;
    top: -11px;
    right: -2px;
    color: inherit;
  }
}
</style>