<template>
	<view class="novel-item">
		<img-cache class="novel-cover" />
		<view>
			<view class="novel-title" @click="clickNovel">{{getMaxStr(title)}}</view>
			<!-- <lp-fav :id="id" class="novel-fav"></lp-fav> -->
			<view class="novel-author">
				{{author}}
			</view>
			<view class="novel-caption" @click="clickNovel">
				<rich-text :nodes="caption"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				MAX_TITLE_LENGTH:10
			}
		},
		props:{
			title:String,
			caption:String,
			id:undefined,
			author:undefined
		},
		methods:{
			async clickNovel(){
				let r = await this.$getPixivNovelDetail(this.id);
				console.log(r);
				if(r){
					uni.navigateTo({
						url:"../novel_detail/novel_detail?id="+this.id
					})
				}
			},
			getMaxStr(str){
				if(str.length <= this.MAX_TITLE_LENGTH){
					return str;
				}
				return str.substring(0, this.MAX_TITLE_LENGTH-2) + "...";
			}
		}
	}
</script>

<style lang="scss">
	.novel-item{
		box-shadow: 5rpx 5rpx 10px #bbb;
		background: rgb(246,245,236);
		border-radius: 20rpx;
		padding: 20rpx;
		margin: 40rpx;
		display: flex;
		flex-direction: row;
		// 封面
		.novel-cover{
			margin-right: 10rpx;
			height: 220rpx;
			width: 150rpx;
			border-radius: 20rpx;
			background: #888;
			flex-shrink: 0;
		}
		view{
			width: 460rpx;
			// 标题、作者、简介、收藏
			.novel-title{
				line-height: 45rpx;
				font-size: 44rpx;
				font-weight: bold;
			}
			.novel-author{
				line-height: 64rpx;
				font-size: 34rpx;
			}
			.novel-caption{
				font-size: 28rpx;
				line-height: 38rpx;
				height: 110rpx;
				overflow-y: scroll;
				overflow-x: hidden;
			}
		}
	}
	.novel-fav{
		margin: auto 10rpx;
	}
</style>
