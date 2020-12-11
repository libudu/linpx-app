// 导入路由模块
const route = require('./route.js')

// 识别目标字符串的正则表达式，当前只有pa和pn
const targetReg = /【(p[na])(\d*)】/

// 记录上一次解析的字符串
let lastParseString = ""

// 从字符串抽取出信息
export const extractParse = (data)=>{
	// 相同字符只比较一次，避免重复提示
	if(lastParseString == data){
		return
	}
	lastParseString = data
	let result = data.match(targetReg)
	let type = result[1]
	let id = result[2]
	// 类型和id都是存在的
	if(type && id){
		route.navTo("../../pages/easyShare/easyShare?type="+type+"&id="+id)
	}
}

// 设置剪切板内容
export const setClipboard = (data, tip=true)=>{
	uni.setClipboardData({
		data,
		success() {
			if(tip){
				uni.hideToast()
				uni.showToast({
					icon:"none",
					title: (typeof(tip) == 'string')?tip:'成功复制到剪切板'
				})
			}
		}
	})
}

// 根据type、id生成分享信息
export const getShareText = (type, id, addText="")=>{
	let typeWord = ""
	if(type == 'pn') typeWord = '小说' + addText
	else if(type == 'pa') typeWord = '作者' + addText
	else {
		uni.showToast({
			title:"复制失败，type错误：" + type
		})
		return
	}
	let text = `复制这段信息，打开linpx查看我分享的${typeWord}【${type}${id}】，`
	text += "linpx下载地址http://api.linpx.linpicio.com/download"
	return text
}

// 生成分享信息并复制到剪切板
export const copyShareText = (type, id, addText="")=>{
	let text = getShareText(type, id, addText)
	setClipboard(text, "成功复制到剪切板，快去分享给朋友吧！")
	// 避免自己分享给别人后，自己又识别了
	lastParseString = text
}

// 系统分享文本
export const shareTextWithSystem = (summary)=>{
	uni.shareWithSystem({
		summary
	});
}

// 系统分享图片
export const shareImageWithSystem = (summary, imageUrl)=>{
	uni.shareWithSystem({
		summary,
		imageUrl
	});
}

// linpx下载地址
const linpxDownloadUrl = "http://api.linpx.linpicio.com/download"
// linpx分享文本信息
const linpxShareText = "♧深夜寂寞♧\n♤售人文学♤\n♡直连Pixiv♡\n☆点击即看☆\n" + linpxDownloadUrl
// linpx二维码路径
const linpxQrcodeUrl = "../../static/image/downloadQrcode.png"

// 复制Linpx下载信息到剪切板
export const copyLinpxShareText = ()=>{
	setClipboard(linpxShareText, '成功复制到剪切板，快把Linpx分享给朋友吧！')
}

// 系统分享Linpx下载文本
export const shareLinpxDownloadWithSystem = ()=>{
	shareTextWithSystem(linpxShareText)
}

// 系统分享Linpx下载二维码
export const shareLinpxQrcodeWithSystem = ()=>{
	shareImageWithSystem(linpxShareText, linpxQrcodeUrl)
}

// 打开一个QQ群
export const openQQGroup = (id)=>{
	plus.runtime.openURL('mqqwpa://card/show_pslcard?src_type=internal&version=1&uin='+id+'&card_type=group&source=qrcode',function (res) {
		plus.nativeUI.alert("本机没有安装QQ，无法启动");
	});
}

// 打开Linpx官群
export const openLinpxQQGroup = ()=>{
	openQQGroup(576268549)
}


let urlMap = {
	'afdian':'https://afdian.net/@LINPX',
	'github':'https://github.com/libudu/linpx-frontend'
}

export const openUrl = (url)=>{
	// 尝试匹配现有关键URL
	let tryUrl = urlMap[url.toLowerCase()]
	if(tryUrl){
		url = tryUrl
	}
	// 打开网页
	// #ifdef APP-PLUS
	plus.runtime.openURL(url)
	// #endif
	// #ifdef H5
	window.open(url)
	// #endif
}

export const openPixivUrl = (type,id)=>{
	switch(type){
		case 'pa':
			openUrl('https://www.pixiv.net/users/'+id)
			break;
		case 'pn':
			openUrl('https://www.pixiv.net/novel/show.php?id='+id)
			break;
		default:
			console.log("openPixivUrl Type错误:", type);
	}
}