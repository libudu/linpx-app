<template>
	<view class="novel-item" @click="clickNovel">
		<view style="display: flex;flex-direction: column; justify-content: center;">
			<img-cache class="novel-cover" :src="coverUrl" mode="widthFix" preview />
		</view>
		<view>
			<lp-fav-item :favItem="platformId" storageKey="favNovels" :tryFavCallBack="tryFavCallBack"
			@favChange="favChange" @initFav="initFav">
				<image :class="isFav?'novel-fav':'novel-unfav'" :src="isFav?'../../static/icon/bookmark_hover.png':'../../static/icon/bookmark_idle.png'"
				 mode="widthFix" />
			</lp-fav-item>
			<view class="novel-title">{{title}}</view>
			<!-- <lp-fav :id="id" class="novel-fav"></lp-fav> -->
			<view class="novel-author">
				{{author}}
			</view>
			<lp-tags :tags="tags" tagStyle="font-size: 18rpx;" />
			<!-- <view class="novel-caption">
				<rich-text :nodes="caption"></rich-text>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				favNovels:Array,
				isFav:Boolean
			}
		},
		computed:{
			platformId(){
				return this.platform + this.id
			}
		},
		props:{
			title:String,
			caption:String,
			id:undefined,
			author:undefined,
			coverUrl:"",
			tags:Array,
			platform:{
				type:String,
				default:'pn'
			}
		},
		methods:{
			// 点击收藏后，调用这个函数，尝试下载小说，根据结果判断收藏是否成功
			async tryFavCallBack(){
				let result = await this.$api.getPixivNovelDetail(this.id)
				// 收藏按钮点击后，小说下载成功
				if(result){
					return true
				}
				return false
			},
			favChange(value){
				this.isFav = value
			},
			initFav(value){
				this.isFav = value
			},
			clickNovel(){
				this.$gotoPixivNovel(this.id);
			}
		}
	}
</script>

<style lang="scss">
	.novel-item{
		box-shadow: 0rpx 0rpx 15rpx #bbb;
		background: $card-backgrond;
		border-radius: 20rpx;
		padding: 20rpx;
		margin: 40rpx;
		display: flex;
		flex-direction: row;
		overflow-y: hidden;
		// 封面
		.novel-cover{
			margin-right: 20rpx;
			width: 170rpx;
			height: 230rpx;
			border-radius: 10rpx;
			//box-shadow: 0rpx 0rpx 15rpx #aaa;
			border: 2rpx solid #888;
			background: #888;
			flex-shrink: 0;
		}
		view{
			width: 450rpx;
			position: relative;
			@mixin novel-fav-base {
				width: 50rpx;
				position: absolute;
				z-index: 1;
				filter: drop-shadow(4rpx 8rpx 4rpx #bbb);
			}
			.novel-fav{
				@include novel-fav-base;
				top: -20rpx;
				right: 0rpx;
			}
			.novel-unfav{
				@include novel-fav-base;
				top: -70rpx;
				right: 10rpx;
				padding-bottom: 50rpx;
			}
			// 标题、作者、简介、收藏
			.novel-title{
				@include ellipsis-oneline;
				line-height: 45rpx;
				font-size: 40rpx;
				font-weight: bold;
			}
			.novel-author{
				line-height: 42rpx;
				font-size: 34rpx;
			}
			.novel-caption{
				font-size: 28rpx;
				line-height: 38rpx;
				@include ellipsis-lines(3);
			}
		}
	}
	.novel-fav{
		margin: auto 10rpx;
	}
</style>
