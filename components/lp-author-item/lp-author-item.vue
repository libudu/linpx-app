<template>
	<view class="author-main" @click="clickAuthor">
		<img-cache class="author-side" :src="imageUrl" mode="aspectFill"/>
		<view class="author-info">
			<view class="author-name">
				{{name}}
			</view>
			<view class="author-id">
				<image class="pixiv-ico" src="../../static/logo/pixiv.png" mode="aspectFit"></image>
				{{id}}
			</view>
			<view class="author-comment">
				{{comment}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		props:{
			name:String,
			id:String,
			comment:String,
			imageUrl:""
		},
		methods:{ 
			clickAuthor(){
				this.$gotoPixivAuthor(this.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.author-main{
		background: #eee;
		border-radius: 20rpx;
		padding: 20rpx;
		box-shadow: 10rpx 10rpx 15rpx #bbb;
		margin: 30rpx 30rpx 30rpx 30rpx;
		display: flex;
		flex-direction: row;
		.author-side{
			width: 180rpx;
			height: 180rpx;
			border-radius: 20rpx;
			margin-right: 20rpx;
			//box-shadow: 0rpx 0rpx 20rpx #bebebe;
			border: 2rpx solid #cdcdcd;
			flex-shrink: 0;
		}
		.author-info{
			width: 450rpx;
			display: flex;
			flex-direction: column;
			.author-name{
				@include ellipsis-oneline;
				font-size: 42rpx;
				line-height: 60rpx;
				margin-top: -8rpx;
				font-weight: bold;
			}
			.author-id{
				.pixiv-ico{
					width: 28rpx;
					height: 28rpx;
					margin-right: 10rpx;
					top: 2rpx;
				}
				color: rgb(0,150,250);
				font-size: 32rpx;
				line-height: 36rpx;
			}
			.author-comment{
				font-size: 28rpx;
				line-height: 32rpx;
				@include ellipsis-lines(3);
			}
		}
	}
</style>
