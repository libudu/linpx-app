<template>
	<view class="main">
		<view class="search">
			<picker class="search-picker" :range="searchTypeList" range-key="name" :value="searchTypeIndex"
			@change="searchTypeChanged">
				{{searchTypeName}}
				<view class="search-picker-tip">▽</view>
			</picker>
			
			<input class="search-input" :placeholder="searchInputTip" :type="searchInputType"
			@input="userInput=$event.detail.value"/>
			
			<view class="search-icon" @click="startSearch">
				<uni-icons color="#999999" class="uni-searchbar__box -icon-search" size="26" type="search" />
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInput:"",
				searchTypeList:[
					{
						'name': 'Pixiv作者',
						'tip': '请输入作者id',
						'type': 'number'
					},
					{
						'name': 'Pixiv作品',
						'tip': '请输入作品id',
						'type': 'number'
					},
					{
						'name': '关键字',
						'tip': '请输入搜索内容',
						'type': 'text'
					}
				],
				searchTypeIndex:0
			};
		},
		computed:{
			searchType(){
				return this.searchTypeList[this.searchTypeIndex]
			},
			searchTypeName(){
				return this.searchType.name;
			},
			searchInputTip(){
				return this.searchType.tip;
			},
			searchInputType(){
				return this.searchType.type;
			}
		},
		methods:{
			startSearch(){
				this.$emit('startSearch', {
					searchType:this.searchTypeName,
					userInput:this.userInput
				})
			},
			searchTypeChanged(e){  
				this.searchTypeIndex = e.detail.value
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
