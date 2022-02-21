<template>
  <div id="app">
    <transition name="el-fade-in" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
