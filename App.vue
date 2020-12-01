<script>
export default {
	globalData:{
		// 按用户搜索页面和搜索结果的通讯变量
		search_novels:undefined,
		favNovels:Object,
		favAuthors:Object,
		version:String
	},
	onLaunch: async function() {
		console.log('App Launch');
		//#ifdef APP-PLUS
		// 获取当前版本号
		getApp().globalData.version = plus.runtime.version
		// 隐藏头尾，全屏显示
		plus.navigator.hideSystemNavigation()
		plus.navigator.setFullscreen(true)
		//#endif
	},
	onShow: function() {
		console.log('App Show');
		//#ifdef APP-PLUS
		// uni.getClipboardData({
		// 	success:(data)=>{
		// 		console.log(data);
		// 	}
		// })
		// uni.setClipboardData({
		// 	data:'114514',
		// 	success:()=>{
		// 		console.log('success');
		// 	}
		// })
		//#endif
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import './common/ui.scss';
@import "uview-ui/index.scss";
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
