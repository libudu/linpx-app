import Vue from 'vue'
import App from './App'

// API全局方法
var api = require('./util/api.js');
// 请求
Vue.prototype.$myRequest = api.myRequest
Vue.prototype.$myCacheRequest = api.myCacheRequest
// 接口
Vue.prototype.$getPixivNovelDetail = api.getPixivNovelDetail
Vue.prototype.$getPixivUserNovels = api.getPixivUserNovels
Vue.prototype.$getPixivUserDetail = api.getPixivUserDetail

// 路由全局方法
var route = require('./util/route.js');
Vue.prototype.$navTo = route.navTo
Vue.prototype.$gotoPixivNovel = route.gotoPixivNovel
Vue.prototype.$gotoPixivAuthor = route.gotoPixivAuthor


Vue.prototype.$todoToast = (title)=>uni.showToast({
	title: title || '敬请期待...',
	icon: "none",
	duration: 1000
})

Vue.prototype.$navigateTo = (option) => {
	uni.navigateTo(Object.assign({
		animationType:"pop-in",
		animationDuration:500
	}, option))
}

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

