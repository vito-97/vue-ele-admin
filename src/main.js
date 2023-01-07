import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/styles/iconfont/iconfont.css' // 扩展图标

import Element from 'element-ui'
import './styles/element-variables.scss'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
import 'element-ui/lib/theme-chalk/display.css'// 基于断点的隐藏类

import '@/styles/index.scss' // global css
import '@/styles/app.scss' // 自定义样式
import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import AppMixin from '@/utils/mixin/app'

import * as filters from './filters' // global filters
import { UTable, UTableColumn } from 'umy-ui'
import 'umy-ui/lib/theme-chalk/index.css'// 引入样式

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// 使用umy的表格，可以虚拟dom，大数据量下效果好
Vue.component(UTable.name, UTable)
Vue.component(UTableColumn.name, UTableColumn)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.mixin(AppMixin)

// 獲取配置信息
store.dispatch('site/getConfig')

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
