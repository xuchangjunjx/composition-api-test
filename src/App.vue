<template>
  <div class="maintainer">
    <ul>
      <li>
        <router-link to="liujiaotu">六角图</router-link>
      </li>
      <li>
        <router-link to="d3">d3</router-link>
      </li>
      <li>
        <router-link to="snow">下雪</router-link>
      </li>
      <li>
        <router-link to="tran">排序动画</router-link>
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>
<style lang="less" scoped>
.maintainer {
}
</style>
