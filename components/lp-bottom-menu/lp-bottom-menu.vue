<template>
	<u-popup v-model="show" mode="bottom">
		<view v-for="item in items" style="width: 100%;">
			<view class="menu-item u-flex u-row-center" @click="item.callback">{{item.title}}</view>
			<u-line color="orange"/>
		</view>
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {
				show:false
			};
		},
		props:{
			items:Array
		}
	}
</script>

<style lang="scss">
	.menu-item{
		padding: 20rpx 0rpx;
		font-size: 34rpx;
	}
</style>
