<template>
	<view>
		<uni-nav-bar title="搜索"></uni-nav-bar>
		
		<lp-search-input />
		
		<view class="card-button-group">
			<view v-for="(item, index) in getShowCardButtonList" :key="index"
			class="card-button" :style="item.style">
				<image v-if='item.icon' class="card-button-icon" mode="aspectFit" :src="item.icon"></image>
				{{item.name}} 
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardButtonList:[
					{
						'name':'排行榜',
						'show':true,
						'open':false,
						'icon':'../../static/emoji/good.png'
					},
					{
						'name':'推荐',
						'show':true,
						'open':false,
						'icon':'../../static/emoji/fire.png'
					},
					{
						'name':'作者',
						'show':true,
						'open':false,
						'icon':'../../static/emoji/sun.png'
					},
					{
						'name':'最近',
						'show':true,
						'open':false,
						'icon':'../../static/emoji/drop.png',
						'style':{
							'background-image': 'linear-gradient(45deg, rgb(236,115,55) 0%, rgb(236,138,58) 25%, rgb(237,178,63) 75%, rgb(238,199,65) 100%)'
						}
					}
				],
				
				hotPixivAuthor:{
					"安卓":"30135992",
					"坎德":"3754812",
					"爱吃肉的龙仆":"12261974",
					"戌子雨":"20662397",
					"DEER1216":"33407541",
					"迦迪垃":"11342501",
					"肆指":"1537839",
					"crysimon":"5266594"
				},
			};
		},
		computed:{
			getShowCardButtonList(){
				return this.cardButtonList.filter(obj=>{
					return obj.show
				})
			}
		},
		methods:{
			// 根据输入，开始搜索
			startSearch(){
				console.log("start search!");
				// if(){
				this.searchPixivAuthor(this.pixivId);
				// }
			},
			// 搜索pixiv平台下，用户的小说
			async searchPixivAuthor(user_id){
				// 请等待
				uni.showLoading({
					title:"正在搜索，请稍等",
					mask:true
				})
				// 开始搜索
				const res = await this.$myRequest({
					url:"user_novels?id="+user_id
				})
				// 等待结束
				uni.hideLoading()
				// 成功获取
				if(res.statusCode == '200'){
					// console.log(res.data);
					// 作品数为0
					if(res.data.novels.length == 0){
						uni.showToast({
							title:"不存在该作者或该作者小说数为0",
							icon:"none"
						})
					}
					else{
						getApp().globalData.search_novels = res.data
						uni.navigateTo({
							url:"../search_novels/search_novels"
						})
					}
				}
				// 获取失败
				else{
					uni.showToast({
						title:"连接失败，错误码："+res.statusCode+"，错误信息："+res.errMsg
					})
				}
			}
		},
		onLoad(option) {
			
		}
	}
</script>

<style lang="scss" scoped>
	.card-button-group{
		display: flex;
		justify-content: left;
		flex-wrap: wrap;
		margin: 50rpx 0rpx 50rpx 65rpx;
		.card-button{
			
			position: relative;
			width:280rpx;
			height: 180rpx;
			margin: 0rpx 50rpx 50rpx 0rpx;
			
			border-radius: 30rpx;
			box-shadow: 5rpx 5rpx 20rpx #ccc;
			background: rgb(246,245,236);
			
			text-align: center;
			font-size: 52rpx;
			line-height: 180rpx;
			font-weight: bold;
			
			overflow: hidden;
			z-index: -1;
			
			.card-button-icon{
				height: 180rpx;
				width: 180rpx;
				position: absolute;
				left: -60rpx;
				top: 20rpx;
				opacity: 0.6;
				z-index: -1;
			}
		}
	}
</style>
