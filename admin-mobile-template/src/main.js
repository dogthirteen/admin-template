import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/normalize.css'
import 'amfe-flexible'
import '@/icons'
import '@/filters'
import '@/directive'

import { Button, Popup, Cell, Tabbar, TabbarItem } from 'vant'

Vue.use(Popup)
Vue.use(Cell)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Button)

//生产环境 禁用vue devtools
const isDebug_mode = process.env.NODE_ENV !== 'production'

Vue.config.debug = isDebug_mode
Vue.config.productionTip = false
Vue.config.devtools = isDebug_mode

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
