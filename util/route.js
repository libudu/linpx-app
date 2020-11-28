let api = require("./api.js")

export const navigateTo = (option)=>{
	uni.navigateTo(Object.assign({
		animationType:"pop-in",
		animationDuration:500
	}, option))
}

// 封装后的navigateTo
export const navTo = (url)=>{
	navigateTo({
		url
	})
}

// 跳转到小说页面
export const gotoPixivNovel = async (novelId)=>{
	let novel = await api.getPixivNovelDetail(novelId);
	if(novel){
		navTo("../novel_detail/novel_detail?id="+novelId)
	}
}

// 跳转到作者页面
export const gotoPixivAuthor = async (userId)=>{
	let novels = await api.getPixivUserNovels(userId)
	if(novels){
		navTo("../author_detail/author_detail?id="+userId)
	}
}