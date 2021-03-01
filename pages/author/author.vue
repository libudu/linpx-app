<template>
	<view>
		<lp-nav-bar type="back" title="作者详情" fixed>
			<template v-slot:right>
				<image mode="aspectFit" src="../../static/icon/share.png" style="width: 54rpx;height: 54rpx;"
				@click="$share.shareTextWithSystem($share.getShareText('pa', userInfo.id, userInfo.name))" />
				<view style="width: 20rpx;" />
				<image mode="aspectFit" src="../../static/icon/menu.png" style="width: 70rpx;height: 70rpx;"
				@click="$refs.menu.show = true" />
			</template>
		</lp-nav-bar>
		<view class="author-info">
			<img-cache v-if="userInfo.backgroundUrl" class="author-background-image" :src="userInfo.backgroundUrl" preview mode="aspectFill"></img-cache>
			
			<img-cache class="author-side" :src="userInfo.imageUrl" preview mode="aspectFill"></img-cache>
			
			<view class="author-name">{{userInfo.name}}
				<lp-fav-item storageKey="favAuthors" :favItem="platformId" style="display: inline-block;position: relative;top:10rpx; left: 20rpx;">
					<template v-slot:no>
						<image mode="aspectFit" src="../../static/icon/star_idle.png"
						style="width: 74rpx;height: 74rpx;"></image>
					</template>
					<template v-slot:yes>
						<image mode="aspectFit" src="../../static/icon/star_hover.png"
						style="width: 74rpx;height: 74rpx;"></image>
					</template>
				</lp-fav-item>
			</view>
			<view class="author-id">pixiv id:{{userInfo.id}}</view>
			<view class="author-comment">{{userInfo.comment}}</view>
		</view>
		<lp-novel-list :novels="userNovels" />
		<lp-bottom-menu ref="menu" :items="menuItems"></lp-bottom-menu>
	</view>
</template>

<script>
	import { makePixivNovelsLoader } from '../../util/lazyDataList.js';
	export default {
		data() {
			return {
				userInfo:{},
				userNovels:[],
				showMenu:false,
				menuItems:[
					{
						title:"复制作者信息",
						callback:()=>{this.$share.copyShareText('pa', this.userInfo.id, this.userInfo.name)}
					},
					{
						title:"打开作者Pixiv主页",
						callback:()=>{this.$share.openPixivUrl('pa', this.userInfo.id)}
					},
					{
						title:"分享Linpx",
						callback:this.$share.shareLinpxQrcodeWithSystem
					},
					{
						title:"复制Linpx链接",
						callback:this.$share.copyLinpxShareText
					}
				]
			}
		},
		computed:{
			platformId(){
				return 'pa'+this.userInfo.id
			}
		},
		async onLoad(options) {
			// 获取小说信息
			this.userInfo = await this.$api.getPixivUser(options.id);
			const novelIdList = Object.keys(this.userInfo.novels);
			this.loadNovels = makePixivNovelsLoader(this.userNovels, novelIdList);
			this.loadNovels();
		},
		onReachBottom() {
			this.loadNovels();
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
