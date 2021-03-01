<template>
	<view :class="['dialog ', isRight?'dialog-right':'dialog-left']">
		<image :src="side" class="dialog-side" mode="aspectFit"></image>
		<view>
			<view class="dialog-name">{{name}}</view>
			<view class="dialog-text">{{text}}</view>
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
			text: String,
			side: String,
			name: String,
			isRight: Boolean,
		}
	}
</script>

<style lang="scss">
	$edgesize: 12rpx;
	
	.dialog{
		display: flex;
		flex-direction: row;
		
		.dialog-side{
			flex-shrink: 0;
			width: 80rpx;
			height: 80rpx;
			border-radius: 15%;
			margin: 0 28rpx;
		}
		
		.dialog-name{
			color: #888;
			font-size: 24rpx;
			line-height: 28rpx;
			margin-top: 4rpx;
			margin-bottom: 16rpx;
		}
		
		.dialog-text{
			max-width: max-content;
			font-size: 34rpx;
			line-height: 40rpx;
			border-radius: 12rpx;
			padding: 20rpx;
			position: relative;
			
			&::before {
				content: ' ';
				top: 0;
				position: absolute;
				border-top-right-radius: $edgesize / 2;
				border-left: $edgesize solid transparent;
        border-right: $edgesize solid transparent;
        border-bottom: $edgesize solid transparent;
			}
		}
	}
	
	.dialog-left{
		.dialog-text{
			background-color: white;
			margin-right: 120rpx;
			
			&::before{
				left: -$edgesize;
				border-top: $edgesize solid white;
				border-top-left-radius: $edgesize / 2;
			}
			
			$hover-color: #ccc;
			&:active{
				background-color: $hover-color;
				
				&::before{
					border-top: $edgesize solid $hover-color;
				}
			}
		}
	}
	
	.dialog-right{
		flex-direction: row-reverse;
		
		.dialog-name{
			text-align: right;
		}
		
		.dialog-text{
			float: right;
			color: white;
			background-color: $tim-blue;
			margin-left: 120rpx;
			
			&::before{
				right: -$edgesize;
				border-top: $edgesize solid $tim-blue;
			}
			
			&:active{
				background-color: $tim-blue-deep;
				
				&::before{
					border-top: $edgesize solid $tim-blue-deep;
				}
			}
		}
		
	}
</style>
