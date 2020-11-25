<template>
	<view>
		<lp-nav-bar type="back" title="搜索结果" />
		<lp-novel-list :novels="novels" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				novels:Object
			}
		},
		methods: {
		},
		onLoad() {
			this.novels = getApp().globalData.search_novels.novels;
			uni.setNavigationBarTitle({
				title:this.novels[0].user.name + " 的小说"
			})
		}
	}
</script>

<style lang="scss">
	.novel-item{
		background: rgba($main-color, 0.4);
		padding: 20rpx;
		margin: 40rpx;
		border-radius: 40rpx;
	}
</style>
