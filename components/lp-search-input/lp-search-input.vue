<template>
	<view class="main">
		<view class="search">
			<picker class="search-picker" :range="searchTypeList" :value="searchTypeIndex"
			@change="searchTypeIndex=$event.detail.value">
				{{searchTypeList[searchTypeIndex]}}
				<view class="search-picker-tip">▽</view>
			</picker>
			
			<input class="search-input" placeholder="请输入" />
			
			<view class="search-icon" @click="startSearch">
				<uni-icons color="#999999" class="uni-searchbar__box-icon-search" size="26" type="search" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchTypeList:['Pixiv作者','Pixiv作品','关键字'],
				searchTypeIndex:0
			};
		},
		methods:{
			startSearch(){
				uni.showToast({
					title:"123"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$box-height: 80rpx;
	$box-border: 6rpx;
	$box-inner-height: $box-height - $box-border*2;
	.main{
		height: $box-height;
		border-radius: $box-height/2;
		background-image: linear-gradient(orange, red);
		margin: 20rpx 50rpx;
		.search{
			position: relative;
			top: $box-border;
			margin: $box-border;
			border-radius: $box-height/2;
			height: $box-inner-height;
			line-height: $box-inner-height;
			background: #FFFFFF;
			padding: 0rpx 24rpx;
			.search-picker{
				display: inline-block;
				.search-picker-tip{
					margin-left: 10rpx;
					display: inline-block;
					font-size: 20rpx;
					opacity: 0.6;
				}
			}
			.search-input{
				width: 350rpx;
				display: inline-block;
				position: relative;
				margin-left: 20rpx;
				top: 10rpx;
			}
			.search-icon{
				position: absolute;
				top: 0rpx;
				right: 40rpx;
				height: 30rpx;
				width: 30rpx;
			}
		}
	}
</style>
