const BASE_URL = 'http://api.linpx.linpicio.com/'
//const BASE_URL = 'http://localhost:8000/'

export const myRequest = (options)=>{
	uni.showLoading({
		title: options.loadTitle || "请稍等..."
	})
	
	return new Promise((resolve,reject)=>{
		uni.request({
			url: BASE_URL+options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					icon:"none",
					title:"网络连接错误"
				})
				reject(err)
			},
			complete() {
				uni.hideLoading()
			}
		})
	}
	)
}

// 按sotrageKey查找缓存，不存在则按url联网查找
export const myCacheRequest = async (options)=>{
	if(options.storageKey){
		// 如果本地有，直接返回结果
		let item = uni.getStorageSync(options.storageKey);
		if(item) return item;
	}
	// 如果本地没有，联网查找
	if(options.url){
		const res = await myRequest({
			url: options.url
		})
		// 用于区分从本地获取和从网络获取
		res._statusCode = res.statusCode
		return res
	}
	// 都没有
	return undefined
}

// 获取小说内容（自动缓存）
export const getPixivNovelDetail = async (id, prefix="pn")=>{
	let storeId = prefix + id
	// 没有前缀，id中已包含前缀，需要去掉
	if(!prefix){
		prefix = id.substring(0,2)
		id = id.substring(2)
	}
	// 获取内容
	let novel = await myCacheRequest({
		url: "novel_detail?id="+id,
		storageKey: storeId
	})
	// 本地有那就直接返回
	if(!novel._statusCode){
		return novel
	}
	// 如果来自网络，则需要提取数据
	novel = novel.data.body;
	// novel应该是一个包含小说信息的字典
	// 如果不存在，或者存在但为Array，则返回undefined
	if(!novel || (novel instanceof Array)){
		uni.showToast({
			icon:"none",
			title:"该作品不存在"
		})
		return undefined
	}
	// 存在则保存返回
	uni.setStorageSync(storeId, novel);
	return novel
}

// 搜索一个作者的小说
export const getPixivUserNovels = async (id)=>{
	let novels = await myRequest({
		url: "user_novels?id="+id
	})
	// 搜索作者小说没有缓存，必然来自网络
	novels = novels.data;
	// 小说数不对
	if(!novels.novels.length || novels.novels.length == 0){
		uni.showToast({
			title:"不存在该作者或该作者小说数为0",
			icon:"none"
		})
		return undefined
	}
	// 一切正常，保存到全局变量使用
	getApp().globalData.search_novels = novels
	return novels;
}


// 获得一个作者的详细信息
export const getPixivUserDetail = async (id)=>{
	let userInfo = await myCacheRequest({
		url: "user_detail?id="+id,
		storageKey: "pa"+id
	})
	// 如果本地有那就直接返回
	if(!userInfo._statusCode){
		return userInfo
	}
	userInfo = userInfo.data
	if(userInfo.error){
		uni.showToast({
			icon:"none",
			title:"该作者不存在"
		})
		return undefined
	}
	uni.setStorageSync('pa'+id, userInfo)
	return userInfo
}