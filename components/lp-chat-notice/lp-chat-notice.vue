<template>
	<view class="notice-text u-line-2">
		{{text}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			text: String
		}
	}
</script>

<style>
	.notice-text{
		color: #888;
		font-size: 24rpx;
		text-align: center;
		padding: 0 40rpx;
	}
</style>
