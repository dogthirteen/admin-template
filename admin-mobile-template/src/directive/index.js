import Vue from 'vue'

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    console.log(el)
    // 聚焦元素
    el.focus()
  },
})
