<template>
	<view>
		<lp-nav-bar type="back" title="作者详情" />
		<lp-novel-row-list type="rowData" :data="novels" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				novels:[]
			}
		},
		methods: {
		},
		async onLoad(options) {
			// let userInfo = await this.$getPixivUserDetail(options.id);
			// console.log(userInfo);
			let novels = getApp().globalData.search_novels;
			// 如果全局变量中没有缓存，那就再发一次请求
			if(!novels){
				novels = await this.$getPixivUserNovels(options.id)
			}
			novels = novels.novels
			//console.log(novels);
			novels.forEach((novel)=>{
				novel.coverUrl = novel.image_urls.medium || novel.image_urls.large
				novel.tags = novel.tags.map((item)=>item.name)
				novel.author = novel.user.name
				this.novels.push(novel)
				return novel;
			})
		}
	}
</script>

<style lang="scss">
</style>
