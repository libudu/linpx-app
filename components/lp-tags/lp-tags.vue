<template>
	<view class="novel-tag-list">
		<view class="novel-tag" v-for="(tag, index) in tags" :key="index" :style="tagStyle">
			{{tag}}
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
			tags:{
				type:Array,
				default:()=>{return []}
			},
			tagStyle:String
		}
	}
</script>

<style lang="scss" scoped>
	.novel-tag-list{
		display: flex;
		display: inline;
		.novel-tag{
			padding: 5rpx 10rpx 5rpx 10rpx;
			margin-right: 10rpx;
			margin-bottom: 0rpx;
			display: inline-block;
			border-radius: 24rpx;
			font-size: 24rpx;
			box-shadow: 0rpx 0rpx 8rpx #888;
			background: #FFF;
		}
	}
</style>
