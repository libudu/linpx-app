const BASE_URL = 'https://linpicio.herokuapp.com/furryreader/'
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: BASE_URL+options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	}
	)
}

export const getPixivNovelDetail = async (id)=>{
	let store_id = 'pn' + id
	let novel = uni.getStorageSync(store_id);
	if(!novel){
		uni.showLoading({
			title:"加载中..."
		})
		const res = await myRequest({
			url:"novel_detail?id="+id
		})
		uni.hideLoading()
		uni.setStorageSync(store_id, res.data.body);
		novel = res.data.body;
	}
	return novel
}