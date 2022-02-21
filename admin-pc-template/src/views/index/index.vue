<template>
  <div class="index-container">
    <div class="index-text">name: {{ name }}</div>
    <div class="index-text">roleList: <span v-for="role in roleList" :key="role">{{ role }}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roleList'
    ])
  }
}
</script>

<style lang="scss" scoped>
.index {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
