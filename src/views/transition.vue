<template>
  <div>
    <div>
      <Button type="primary" @click="shuffle">打乱</Button>
      <Button type="primary" @click="maopao">冒泡排序</Button>
      <Button type="primary" @click="xuanze">选择排序</Button>
    </div>
    {{ model.items }}
    <div class="flex">
      <transition-group name="flip-list" tag="div">
        <div
          class="flex-item"
          v-for="item in model.items"
          v-bind:key="item"
          :style="{ height: item * 10 + 'px' }"
        ></div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import { bubble, choose } from "@/algorithm/index.js";
import _ from "lodash";
export default {
  setup() {
    let gen = null;
    const model = reactive({
      show: true,
      bounce: true,
      items: [9, 6, 7, 5, 3, 1, 4, 8, 2]
    });

    function bounce() {
      model.bounce = !model.bounce;
    }
    function shuffle() {
      model.items = _.shuffle(model.items);
    }
    function wrapper(fun) {
      const ins = setInterval(() => {
        if (!gen) {
          gen = fun(model.items);
        }
        let { value, done } = gen.next();
        if (!done) {
          model.items = [...value];
        } else {
          gen = null;
          clearInterval(ins);
        }
      }, 800);
    }
    function maopao() {
      wrapper(bubble);
    }
    function xuanze() {
      wrapper(choose);
    }
    return {
      xuanze,
      model,
      bounce,
      shuffle,
      maopao
    };
  }
};
</script>
<style lang="less" scoped>
.transition(@name) {
  .@{name}-enter-active,
  .@{name}-leave-active {
    transition: opacity 0.5s;
  }
  .@{name}-enter, .@{name}-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
.flip-list-move {
  transition: transform 1s;
}
.transition("fade");
.circle {
  width: 50px;
  height: 50px;
  background: greenyellow;
  border-radius: 50%;
}
.bounce-enter-active {
  animation: bounce-in 5s;
}
.bounce-leave-active {
  animation: bounce-in 5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateY(0px);
  }
  10% {
    transform: translateY(-100px);
  }
  20% {
    transform: translateY(0px);
  }
  30% {
    transform: translateY(-50px);
  }
  40% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-25px);
  }
  100% {
    transform: translateY(0px);
  }
}
.flex {
  & > div {
    display: flex;
    flex-flow: wrap-reverse;
  }
  & .flex-item {
    width: 20px;
    background: green;
    & + div {
      margin-left: 12px;
    }
  }
}
</style>
