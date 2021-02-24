import { getRemoteVersion } from "./api.js";

const config = uni.getStorageSync('config') || {
	// 最大最近阅读
	maxRecentNovels: 50,
	// 本地安装包，下载完成后更新
	localLinpxApk: undefined,
	// 本地/版本号，仅安卓端
	version: undefined,
	// 远程版本号，网络获取
	remoteVersion: undefined,
};

// 读
export const get = (key)=>{
	if(key in config){
		return config[key];
	}
	else{
		console.log("config读值失败，key不在字典中：",key);
	}
}

// 存
export const save = ()=>{
	uni.setStorageSync('config', config);
}

// 写
export const set = (key, value)=>{
	if(key in config){
		config[key] = value;
		save();
	}
	else{
		console.log("config设值失败，key不在字典中：",key);
	}
}

// 初始化
new Promise(async (resolve)=>{
	// 本地版本号、远程版本号
	//#ifdef APP-PLUS
	config.version = plus.android.version;
	//#endif
	const versionInfo = await getRemoteVersion();
	config.remoteVersion = versionInfo.latestVersion;
	// 保存，提示
	save();
	console.log('config：',config);
})


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
