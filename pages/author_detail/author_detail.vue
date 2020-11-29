<template>
	<view>
		<lp-nav-bar type="back" title="作者详情" />
		<view class="author-info">
			<img-cache class="author-background-image" :src="backgroundImgUrl" preview mode="aspectFill"></img-cache>
			
			<img-cache class="author-side" :src="sideImgUrl" preview mode="aspectFill"></img-cache>
			
			<view class="author-name">{{name}}</view>
			<view class="author-id">pixiv id:{{id}}</view>
			<view class="author-comment">{{comment}}</view>
		</view>
		<lp-novel-row-list type="rowData" :data="novels" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backgroundImgUrl:"",
				sideImgUrl:"",
				name:"",
				id:"",
				comment:"",
				novels:[]
			}
		},
		async onLoad(options) {
			// 初始化各种信息
			let info = await this.$getPixivUserDetail(options.id);
			this.name = info.name
			this.id = info.userId
			this.comment = info.comment
			this.sideImgUrl = info.imageBig
			this.backgroundImgUrl = info.background?info.background.url:""
			// 初始化小说列表
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
	.author-info{
		width: 100%;
		background: $card-backgrond;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		box-shadow: 0rpx 0rpx 16rpx #999;
		.author-background-image{
			position: absolute;
			width: 100%;
			height: 200rpx;
		}
		.author-side{
			margin-top: 60rpx;
			border: 20rpx solid $card-backgrond;
			width: 250rpx;
			height: 250rpx;
			border-radius: 250rpx;
		}
		.author-name{
			margin-top: -10rpx;
			font-size: 80rpx;
			font-weight: bold;
		}
		.author-id{
			font-size: 30rpx;
			line-height: 40rpx;
			color: $pixiv-blue;
		}
		.author-comment{
			font-size: 36rpx;
			padding: 20rpx 100rpx;
			margin-bottom: 40rpx;
			word-break: break-all;
		}
	}
</style>
