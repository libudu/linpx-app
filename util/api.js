export const BASE_URL = 'http://api.linpx.linpicio.com/'
//const BASE_URL = 'http://localhost:8000/'

// url:访问的url，必须
// method:请求的方法，默认为GET
// data:请求发送的数据
// loadTitle:加载的标题
// noLoadTip:不显示加载提示
// noFailTip:不显示失败提示
export const myRequest = (options)=>{
	if(!options.noLoadTip){
		uni.showLoading({
			title: options.loadTitle || "请稍等..."
		})
	}
	
	return new Promise((resolve,reject)=>{
		uni.request({
			url: BASE_URL+options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				if(!options.noFailTip){
					uni.showToast({
						icon:"none",
						title:"网络连接错误"
					})
				}
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
		const res = await myRequest(options)
		// 用于区分从本地获取和从网络获取
		res._statusCode = res.statusCode
		return res
	}
	// 都没有
	return undefined
}

// 【缓存】获取小说内容
export const getPixivNovelDetail = async (id, showToast=true)=>{
	let storeId = 'pn' + id
	// 获取内容
	let novel = await myCacheRequest({
		url: "novel_detail?id="+id,
		storageKey: storeId
	})
	// 如果来自网络，则需要提取数据
	if(novel._statusCode){
		novel = novel.data.body;
		// novel应该是一个包含小说信息的字典
		// 如果不存在，或者存在但为Array，则返回undefined
		if(!novel || (novel.length==0)){
			if(showToast){
				uni.showToast({
					icon:"none",
					title:"该作品不存在"
				})
			}
			return undefined
		}
		// 存在则保存
		uni.setStorageSync(storeId, novel);
	}
	novel = {
		id: novel.id,
		title: novel.title,
		caption: novel.description,
		author: novel.userName,
		authorId: novel.userId,
		coverUrl: novel.coverUrl,
		tags: novel.tags.tags.map((item)=>item.tag),
		content: novel.content,
		
	};
	return novel
}

// 通过id列表获取一整个列表的pixiv小说
export const getPixivNovelsByIdList = async(idList)=>{
	let novelInfoList = []
	idList.forEach(async (id)=>{
		// 自动处理前面有没有前缀
		if(id.substring(0,2) == 'pn'){
			id = id.substring(2)
		}
		// 用纯数字id索引
		let novelInfo = await getPixivNovelDetail(id)
		novelInfoList.push(novelInfo)
	})
	return novelInfoList
}

// 通过id列表的存储键获取一整个列表的pixiv小说
export const getPixivNovelsByStorageKey = async (key)=>{
	let novelIdList = uni.getStorageSync(key)
	novelIdList = Object.keys(novelIdList)
	if(!novelIdList){
		console.log("从存储中索引小说小说列表出错，索引"+key+"不存在");
		return []
	}
	return await getPixivNovelsByIdList(novelIdList)
}

// 搜索一个作者的小说
export const getPixivUserNovels = async (id)=>{
	// 如果新搜索的作者与上次缓存在global里的一样，那就直接返回
	let lastData = getApp().globalData.search_novels
	if(lastData && lastData.authorId == id){
		return lastData
	}
	// 不一样，重新发送请求
	let rowData = await myRequest({
		url: "user_novels?id="+id
	})
	// 搜索作者小说没有缓存，必然来自网络
	rowData = rowData.data;
	// 小说数不对
	if(!rowData.novels.length || rowData.novels.length == 0){
		uni.showToast({
			title:"不存在该作者或该作者小说数为0",
			icon:"none"
		})
		return undefined
	}
	// 处理一下
	rowData.novels = rowData.novels.map((novel)=>{
		return {
			coverUrl: novel.image_urls.medium || novel.image_urls.large,
			tags: novel.tags.map((item)=>item.name),
			author: novel.user.name,
			title: novel.title,
			id: novel.id,
			caption: novel.caption
		};
	})
	rowData.authorId = id
	// 一切正常，保存到全局变量使用
	getApp().globalData.search_novels = rowData
	return rowData;
}

// 【缓存】获得一个作者的详细信息
export const getPixivUserDetail = async (id, showToast=true)=>{
	let userInfo = await myCacheRequest({
		url: "user_detail?id="+id,
		storageKey: "pa"+id
	})
	// 如果来自网络的话那需要处理一下
	if(userInfo._statusCode){
		userInfo = userInfo.data
		if(userInfo.error){
			if(showToast){
				uni.showToast({
					icon:"none",
					title:"该作者不存在"
				})
			}
			return undefined
		}
		userInfo = userInfo.body
	}
	// 总之获取成功了，保存并提取需要的字段返回
	uni.setStorageSync('pa'+id, userInfo)
	userInfo = {
		id: userInfo.userId,
		name: userInfo.name,
		comment: userInfo.comment,
		sideImgUrl: userInfo.imageBig,
		backgroundImgUrl: userInfo.background?userInfo.background.url:""
	};
	return userInfo
}

// 获取一整个列表的作者的详细信息
export const getPixivUserDetailByList = async (idList)=>{
	let userDetailList = []
	idList.forEach(async (id)=>{
		// 自动处理前面有没有前缀
		if(id.substring(0,2) == 'pa'){
			id = id.substring(2)
		}
		// 用纯数字id索引
		let userDetail= await getPixivUserDetail(id)
		userDetailList.push(userDetail)
	})
	return userDetailList
}

// 【后台】获取最新推荐作者列表
export const getRecommendPixivAuthors = async (update=false)=>{
	let result = undefined
	if(update){
		result = await myRequest({
			noLoadTip:true,
			noFailTip:true,
			url:"recommend_authors"
		})
		if(result.statusCode == 200){
			result = result.data
			if(result.authors){
				result = Object.values(result.authors);
				result.sort(()=>Math.random()-0.5);
				uni.setStorageSync('recommendPixivAuthors', result);
				//console.log('推荐作者列表更新', result);
			}
		}
	}
	result = uni.getStorageSync('recommendPixivAuthors')
	return result
}

const $config = require('./config.js')
// 获取远程版本号
export const getRemoteVersion = async ()=>{
	let result = await myRequest({
		noLoadTip:true,
		noFailTip:true,
		url:"version"
	})
	if(result.statusCode == '200'){
		$config.set('remoteVersion', result.data)
		return result.data
	}
	return undefined
}
getRemoteVersion()

// 检查更新：对比版本号，返回是否需要更新
export const checkUpdate = ()=>{
	let thisVersion = $config.get('version')
	let remoteVersion = $config.get('remoteVersion')
	if(!thisVersion || !remoteVersion){
		return false
	}
	// 当前版本小于服务器版本的时候才需要更新
	if(thisVersion.split('.') >= remoteVersion.split('.')){
		return false
	}
	return true
}
