<template>
  <div class="home">
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item replace to="/admin" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/me" icon="contact">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      active: 0,
    }
  },

  methods: {},
}
</script>
<style lang="scss">
.home {
  .icon {
    width: 100px;
    height: 100px;
  }
  font-size: 24px;
  color: $theme-color;
}
</style>
