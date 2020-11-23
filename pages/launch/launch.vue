<template>
	<view class="main">
		<view class="launch-header">
		</view>
		
		<view class="launch-main">
			<view class="main-logo">
				<image class="pic-logo" src="../../static/logo/pic_logo.png" mode="aspectFit"></image>
				<image class="word-logo" src="../../static/logo/word_logo.png" mode="aspectFit"></image>
			</view>
		<!-- 		<view class="launch-tips">
					<view class="launch-tips-title">使用须知：</view>
					<text>
						1、当前为极早期测试版，仅供体验效果。后续更新几乎一定会完全清空本地数据。
						2、当前后端采用的是heroku虚拟主机免费版，无法支撑过多用户，进入休眠后重启至少有10秒延迟。
						3、开发菜鸟，欢迎指点，轻喷。
						4、欢迎打赏，有任何问题欢迎联系，微博@林彼丢带橘猫。
					</text>
				</view> -->
			<button class="fr-main-button" style="width: 450rpx;" @click="gotoNext">确定</button>
		</view>
		
		<view class="launch-footer">
			<view class="author-info">开发者：丢<br>v0.0.1</view>
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
		padding: 0rpx 40rpx;
		.launch-tips-title{
			text-align: center;
			font-size: 40rpx;
			font-weight: bold;
			margin: 20rpx 0rpx;
		}
	}
</style>