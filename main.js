import Vue from 'vue'
import App from './App'

import uView from "uview-ui";
Vue.use(uView);

// 持久+全局配置
Vue.prototype.$config = require('./util/config.js')

// 分享API
Vue.prototype.$share = require('./util/share.js')

// 数据API
var api = require('./util/api.js');
Vue.prototype.$api = api

// 路由API
var route = require('./util/route.js');
Vue.prototype.$navTo = route.navTo
Vue.prototype.$navBack = uni.navigateBack
Vue.prototype.$gotoPixivNovel = route.gotoPixivNovel
Vue.prototype.$gotoPixivAuthor = route.gotoPixivAuthor
Vue.prototype.$navigateTo = route.navigateTo

Vue.prototype.$todoToast = (title)=>uni.showToast({
	title: title || '敬请期待...',
	icon: "none",
	duration: 1000
})

// 设置app的navigation的方法
//#ifdef APP-PLUS
var android = require('./util/android.js')
Vue.prototype.$android = android
//#endif

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

// 加载持久数据到全局变量
let initStorageToGlobal = function(storageName, defaultValue={}){
	app.globalData[storageName] = uni.getStorageSync(storageName) || defaultValue
}
initStorageToGlobal('favNovels')
initStorageToGlobal('favAuthors')

// 尝试刷新最新的推荐作者列表
api.getRecommendPixivAuthors(true)