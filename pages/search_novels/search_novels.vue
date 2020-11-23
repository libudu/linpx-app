<template>
	<view>
		<view>todo:重排版、直接保存到本地按钮、显示创作时间、下拉末刷新更多、标签等</view>
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
