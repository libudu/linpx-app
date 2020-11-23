<template>
	<view>
		<swiper class="main-swiper" indicator-dots circular autoplay interval="3000">
			<swiper-item v-for="(swipterItem, index) in swiperContent" :key="index" :style="{background: testSwiperColor[index]}">
				<view style="font-size: 60rpx;display: flex;height:100%;justify-content: center;align-items: center;">{{swipterItem}}</view>
			</swiper-item>
		</swiper>
		
		<view style="margin: 0rpx 30rpx;">
			<view class="main-title">编辑推荐</view>
			<view class="content-block">
				<lp-novel v-for="(novel, index) in editorChoice" :key="index" :novel="novel" />
			</view>
			<view class="main-title">热门作者</view>
			<view class="content-block">
			</view>
			
			<view class="main-title">热门作品</view>
			<view class="content-block">
				<lp-novel v-for="(novel, index) in hotNovels" :key="index" :novel="novel" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperContent:[
					"这里是首页的滑动框",
					"用来显示一些新闻",
					"但是现在啥都还没填"
				],
				// 编辑推荐
				editorChoice:[
					{
						cover:"",
						title:"鱼市街",
						author:"安卓",
						note:"售人控圣经！速点！"
					}
				],
				// 热门小说
				hotNovels:[
					{
						cover:"",
						title:"鱼市街",
						author:"安卓",
						note:"售人控圣经！速点！"
					},
					{
						cover:"",
						title:"鱼市街",
						author:"安卓",
						note:"售人控圣经！速点！售人控圣经！速点！售人控圣经！速点！售人控圣经！速点！售人控圣经！速点！"
					}
				],
				testSwiperColor:["#ff8","#f8f", "#8ff"]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.main-swiper{
		height: 350rpx;
		width: 100%;
	}
	.main-title{
		margin: 30rpx 0rpx 10rpx 0rpx;
		background: $main-color-deep;
		border-radius: 30rpx;
		font-size: 50rpx;
		line-height: 80rpx;
		text-align: center;
	}
	.content-block{
		
	}
</style>
