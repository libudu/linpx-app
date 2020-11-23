import Vue from 'vue'
import App from './App'

import {myRequest, getPixivNovelDetail} from './util/api.js'
Vue.prototype.$myRequest = myRequest
Vue.prototype.$getPixivNovelDetail = getPixivNovelDetail

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

// 初始化一些缓存到全局变量
let initStorageToGlobal = function(storageName){
	app.globalData[storageName] = uni.getStorageSync(storageName)
}
initStorageToGlobal('favNovels')

