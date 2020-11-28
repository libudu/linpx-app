<template>
	<view class="main">
		<view class="launch-header">
		</view>
		
		<view class="launch-main">
			<view class="main-logo">
				<image class="pic-logo" src="../../static/logo/pic_logo.png" mode="aspectFit"></image>
				<image class="word-logo" src="../../static/logo/word_logo.png" mode="aspectFit"></image>
			</view>
				<view class="launch-tips">
					<!-- <view class="launch-tips-title">使用须知：</view> -->
					<text>
						内部测试版
						很多没做完
						看看效果即可
					</text>
				</view>
			<button class="fr-main-button" style="width: 450rpx;" @click="gotoNext">确定</button>
		</view>
		
		<view class="launch-footer">
			<view class="author-info">开发者：丢<br>v0.0.2</view>
			<image class="author-logo" src="../../static/logo/author_logo.png" mode="widthFix" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			gotoNext(){
				uni.switchTab({
					url:"../search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
	.main{
		height: 100vh;
		background-image: linear-gradient(45deg, rgb(236,115,55) 0%, rgb(236,138,58) 25%, rgb(237,178,63) 75%, rgb(238,199,65) 100%);
	}
	@mixin font-mixin {
		position: absolute;
		width: 100%;
		text-align: center;
	}
	.launch-banner{
		height: 280rpx;
		.float-letter{
			@include font-mixin;
			z-index: 0;
			font-size: 100rpx;
			line-height: 90rpx;
			font-style: italic;
			color: #333;
		}
		.launch-title{
			@include font-mixin;
			margin-top: 50rpx;
			font-size: 70rpx;
			font-weight: bold;
		}
	}
	// 页眉、主体、页脚
	.launch-header{
		height: 10%;
	}
	.launch-main{
		height: 55%;
	}
	.launch-footer{
		position: absolute;
		bottom: 0rpx;
		width: 100%;
	}
	// logo
	.main-logo{
		width: 60%;
		margin-left: 20%;
		max-height: 400rpx;
		display: flex;
		flex-direction: row;
		.pic-logo{
			height: 200rpx;
			margin-right: 30rpx;
		}
		.word-logo{
			height: 60rpx;
			top: 70rpx;
		}
	}
	// 作者信息、作者logo
	.author-info{
		margin: 20rpx 20rpx 40rpx 0rpx;
		text-align: center;
		font-size: 34rpx;
		color: rgba(#000, 0.5);
	}
	.author-logo{
		width: 260rpx;
		position: absolute;
		top: -80rpx;
		right: 10rpx;
	}
	// 文字提示
	.launch-tips{
		font-size: 34rpx;
		margin-top: 60rpx;
		padding: 0rpx 40rpx;
		text-align: center;
		.launch-tips-title{
			text-align: center;
			font-size: 40rpx;
			font-weight: bold;
			margin: 20rpx 0rpx;
		}
	}
</style>