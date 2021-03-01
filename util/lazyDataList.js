import { getPixivNovelProfiles, getPixivUserList } from './api.js';

export default class LazyDataList {
	constructor(srcList, keyList, callBack, keyBreak=20) {
		this.loading = false;
		this.page = 0;
		this.srcList = srcList;			// 源数据列表
		this.keyList = keyList;			// 加载键列表
		this.callBack = callBack;		// 加载回调
		this.keyBreak = keyBreak;		// 一次加载数量
	}
	
	// 将导出为回调函数，所以必须是箭头函数
	loadData = async () => {
		// 之前的还没加载完
		if(this.loading) return;
		this.loading = true;
		const start = this.page * this.keyBreak;
		// 全部加载完了
		if(start >= this.keyList.length) return;
		const end = start + this.keyBreak;
		const data = await this.callBack(this.keyList.slice(start, end));
		this.srcList.push(...data);
		this.page += 1;
		this.loading = false;
		return data;
	}
}

// 多小说加载
export function makePixivNovelsLoader(srcList, totalIdList) {
	const lazyDataList = new LazyDataList(srcList, totalIdList, async (idList)=>{
		return await getPixivNovelProfiles(idList);
	});
	return lazyDataList.loadData;
}

// 多用户加载
export function makePixivUsersLoader(srcList, totalIdList) {
	const lazyDataList = new LazyDataList(srcList, totalIdList, async (idList)=>{
		return await getPixivUserList(idList);
	}, 10);
	return lazyDataList.loadData;
}