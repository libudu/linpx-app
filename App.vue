<script>
export default {
	globalData:{
		// 按用户搜索页面和搜索结果的通讯变量
		search_novels:undefined,
		favNovels:Object,
		favAuthors:Object
	},
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
		uni.getClipboardData({
			success:(data)=>{
				console.log(data);
			}
		})
		// uni.setClipboardData({
		// 	data:'114514',
		// 	success:()=>{
		// 		console.log('success');
		// 	}
		// })
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import './common/ui.scss';
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
