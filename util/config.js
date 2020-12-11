// 不要声明为export，这样一般通过this.$config索引不到，但js中能import
// 如果存储中没有，那就新建一个
const config = uni.getStorageSync('config') || {}

// 读
export const get = (key)=>{
	if(key in config){
		return config[key]
	}
	else{
		console.log("config读值失败，key不在字典中：",key);
	}
}

// 存
export const save = ()=>{
	uni.setStorageSync('config', config)
}

// 写
export const set = (key, value)=>{
	if(key in config){
		config[key] = value
		save()
	}
	else{
		console.log("config设值失败，key不在字典中：",key);
	}
}

// 初始默认配置
const initConfig = {
	maxRecentNovels:50,		// 最大最近阅读
	localLinpxApk:undefined,	// linpx临时安装包，包含版本和路径两个属性
	//#ifdef APP-PLUS
	version:plus.runtime.version,	// 获取当前版本号
	//#endif
	remoteVersion:undefined,	// 远程版本号，一开始默认没有记录，应用启动时会在api.js中尝试写入
}
// 用初始默认配置尝试去更新config
for(let key in initConfig){
	// 如果之前没有，就用这个更新
	if(!(key in config)){
		config[key] = initConfig[key]
	}
}
// 每次启动都要重新获取版本号，而不是用历史记录
set('version', plus.runtime.version)
// 保存
save()
console.log('init config：',config);

