<script>
const share = require('./util/share.js')
export default {
	globalData:{
		// 按用户搜索页面和搜索结果的通讯变量
		search_novels:undefined,
		favNovels:Object,
		favAuthors:Object,
		version:String
	},
	onShow: function() {
		console.log('App Show');
		//#ifdef APP-PLUS
		uni.getClipboardData({
			success:(data)=>{
				share.extractParse(data.data)
			},
			fail:(res)=>{
				console.log('剪切板获取失败，原因：',res);
			}
		})
		//#endif
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import './common/ui.scss';
@import "colorui/animation.css";
@import "uview-ui/index.scss";
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
