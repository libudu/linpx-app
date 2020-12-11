<template>
	<view>
		<lp-nav-bar title="用户" />
		<view class="header">
			<image class="user-side" src="../../static/logo/lbd.jpg"></image>
			<view>
				<view class="user-name">用户名</view>
				<view class="user-note">用户备注<br>暂未确定整不整</view>
			</view>
		</view>
		
		<view class="body">
			<view v-for="(item, index) in buttonList" :key="index" class="user-button" @click="clickUserButton(item)">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				buttonList:[
					{
						'name':'设置',
						'url':'devote'
					},
					{
						'name':'高级',
						'url':'devote'
					},
					{
						'name':'关于',
						'url':'devote'
					},
					{
						'name':'检查更新',
						'url':'../downloadLinpx/downloadLinpx'
					},
					{
						'name':'引导',
						'url':'devote'
					}
				]
			};
		},
		methods:{
			clickUserButton(item){
				if(item.url){
					this.$navTo(item.url)
				}
			}
		}
	}
</script>

<style lang="scss">
	$sub-color: rgb(246,245,236);
	.header{
		background: $sub-color;
		box-shadow: 0rpx 0rpx 20rpx #ccc;
		margin: 50rpx 60rpx;
		padding: 13rpx 23rpx;
		height: 180rpx;
		border-radius: 100rpx;
		display: flex;
		flex-direction: row;
		.user-side{
			flex-shrink: 0;
			width: 150rpx;
			height: 150rpx;
			border-radius: 75rpx;
			border: 5rpx solid orange;
			margin-right: 30rpx;
		}
		.user-name{
			font-size: 40rpx;
			line-height: 60rpx;
			height: 60rpx;
			font-weight: bold;
		}
		.user-note{
			height: 80rpx;
		}
	}
	
	.body{
		background: $sub-color;
		box-shadow: 5rpx 5rpx 15rpx #ccc;
		margin: 70rpx 100rpx;
		padding: 20rpx 0rpx;
		border-radius: 30rpx;
		.user-button{
			border-bottom: 2px solid #ddd;
			height: 100rpx;
			line-height: 100rpx;
			font-size: 40rpx;
			margin: 0rpx 30rpx;
		}
		.user-button:last-child{
			border-bottom: 0px;
		}
		
	}
</style>
