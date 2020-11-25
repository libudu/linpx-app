import Vue from 'vue'
import App from './App'

// API全局方法
var api = require('./util/api.js');
Vue.prototype.$myRequest = api.myRequest
Vue.prototype.$myCacheRequest = api.myCacheRequest
Vue.prototype.$getPixivNovelDetail = api.getPixivNovelDetail
Vue.prototype.$getPixivUserNovels = api.getPixivUserNovels

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
let initStorageToGlobal = function(storageName){
	app.globalData[storageName] = uni.getStorageSync(storageName)
}
initStorageToGlobal('favNovels')

