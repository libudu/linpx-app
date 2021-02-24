export const BASE_URL = 'http://api.linpx.linpicio.com'
//const BASE_URL = 'http://localhost:8000'

// url:访问的url，必须
// method:请求的方法，默认为GET
// data:请求发送的数据
const requestCache = {};

export const linpxRequest = (url, options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: BASE_URL + url,
			method: options?.method || 'GET',
			data: options?.data || {},
			success: (res) => {
				resolve(res.data)
			},                           
			fail: (err) => {
				reject(err)
			}
		});
	}
	)
}

// 小说内容
export const getPixivNovel = (id)=>{
	return linpxRequest(`/pixiv/novel/${id}`);
}

// 用户信息
export const getPixivUser = (id)=>{
	return linpxRequest(`/pixiv/user/${id}`);
}

// 一系列小说基本信息
export const getPixivNovelProfiles = (idList)=>{
	let query = '';
	for(const id of idList) {
		query += `ids[]=${id}&`;
	}
	return linpxRequest(`/pixiv/novels?${query}`);
}

// 推荐作者列表
export const getRecommendPixivAuthors = async (update=false)=>{
	return linpxRequest('/recommend/authors');
}

// 获取远程版本号
export const getRemoteVersion = async ()=>{
	return linpxRequest('/version');
}