<template>
	<view>
		<lp-nav-bar type="back" title="作者详情" />
		<view class="author-info">
			<img-cache class="author-background-image" :src="userInfo.backgroundImgUrl" preview mode="aspectFill"></img-cache>
			
			<img-cache class="author-side" :src="userInfo.sideImgUrl" preview mode="aspectFill"></img-cache>
			
			<view class="author-name">{{userInfo.name}}
				<lp-fav-item storageKey="favAuthors" :favItem="platformId" style="width: 70rpx;height: 70rpx;display: inline-block;">
					<template v-slot:no>
						<image mode="aspectFit" src="../../static/icon/star_idle.png"
						style="width: 70rpx;height: 70rpx;"></image>
					</template>
					<template v-slot:yes>
						<image mode="aspectFit" src="../../static/icon/star_hover.png"
						style="width: 70rpx;height: 70rpx;"></image>
					</template>
				</lp-fav-item>
			</view>
			<view class="author-id">pixiv id:{{userInfo.id}}</view>
			<view class="author-comment">{{userInfo.comment}}</view>
		</view>
		<lp-novel-list :data="userNovels" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				userNovels:[]
			}
		},
		computed:{
			platformId(){
				return 'pa'+this.userInfo.id
			}
		},
		async onLoad(options) {
			// 初始化各种信息
			this.userInfo = await this.$api.getPixivUserDetail(options.id)
			// 初始化小说列表，如果全局变量中没有缓存，那就再发一次请求
			let novels = getApp().globalData.search_novels
			if(!novels){
				novels = await this.$api.getPixivUserNovels(options.id)
			}
			novels = novels.novels
			for(var i in novels){
				this.userNovels.push(novels[i])
			}
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
