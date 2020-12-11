<template>
	<view class="u-flex u-row-center" style="flex-direction: column;height: 75vh;">
		<view style="font-size: 80rpx;color: #bbb;">这里啥都没有</view>
		<view style="height:50rpx;"></view>
		<u-button plain :custom-style="buttonStyle" shape="circle" hover-class="none"
		@click="$navTo('../authorsRecommend/authorsRecommend')">
		整点
		</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				buttonStyle:{
					'font-size':'44rpx',
					'color':'orange',
					'min-width':'250rpx'
				}
			};
		}
	}
</script>
