import Vue from 'vue'
import App from './App'

// API全局方法
var api = require('./util/api.js');
Vue.prototype.$api = api

// 路由全局方法
var route = require('./util/route.js');
Vue.prototype.$navTo = route.navTo
Vue.prototype.$gotoPixivNovel = route.gotoPixivNovel
Vue.prototype.$gotoPixivAuthor = route.gotoPixivAuthor
Vue.prototype.$navigateTo = route.navigateTo


Vue.prototype.$todoToast = (title)=>uni.showToast({
	title: title || '敬请期待...',
	icon: "none",
	duration: 1000
})


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()


// 初始化一个存储项，有则跳过，没有则初始化
let initStorage = function(name, value){
	if(!uni.getStorageSync(name)){
		uni.setStorageSync(name, value)
	}
}
initStorage('MaxRecentNovels', 50)

// 加载持久数据到全局变量
let initStorageToGlobal = function(storageName, defaultValue={}){
	app.globalData[storageName] = uni.getStorageSync(storageName) || defaultValue
	console.log("app.globalData["+storageName+"]: ",app.globalData[storageName]);
}
initStorageToGlobal('favNovels')
initStorageToGlobal('favAuthors')

// 尝试刷新最新的推荐作者列表
api.getRecommendPixivAuthors(true)