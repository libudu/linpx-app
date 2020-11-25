<template>
	<view>
		<lp-nav-bar title="搜索" />
		
		<lp-search-input @startSearch="startSearch" />
		<view class="card-button-group">
			<view v-for="(item, index) in getShowCardButtonList" :key="index"
			class="card-button" @click="clickCardButton(item.name)" :style="item.style">
				<image v-if='item.icon' class="card-button-icon" mode="aspectFit" :src="item.icon"></image>
				<view class="card-button-text">{{item.name}}</view>
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
						'icon':'../../static/emoji/good.png',
						'style':{
							background: "#aaa",
							opacity:0.5
						}
					},
					// {
					// 	'name':'推荐',
					// 	'show':true,
					// 	'open':false,
					// 	'icon':'../../static/emoji/fire.png'
					// },
					{
						'name':'作者',
						'show':true,
						'open':false,
						'icon':'../../static/emoji/sun.png',
						'style':{
							background: "#aaa",
							opacity:0.5
						}
					},
					{
						'name':'最近',
						'show':true,
						'open':false,
						'icon':'../../static/emoji/drop.png'
					},
					{
						'name':'收藏',
						'show':true,
						'open':false,
						'icon':'../../static/emoji/star.png'
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
			navigateTo(pageName){
				uni.navigateTo({
					url:`../${pageName}/${pageName}`
				})
			},
			clickCardButton(e){
				switch(e){
					case '最近':
						this.navigateTo("novels_recent");
						break;
					case '收藏':
						this.navigateTo("novels_fav");
						break;
				}
			},
			// 根据输入，开始搜索
			async startSearch(option){
				switch(option.searchType.toLowerCase()){
					case 'pixiv作者':
						this.searchPixivAuthor(option.userInput);
						break;
					case 'pixiv作品':
						this.searchPixivNovel(option.userInput);
						break;
					case '关键字':
						break;
				}
			},
			// 搜索pixiv平台下，小说的内容
			async searchPixivNovel(novelId){
				let novel = await this.$getPixivNovelDetail(novelId);
				if(novel){
					uni.navigateTo({
						url:"../novel_detail/novel_detail?id="+novelId
					})
				}
			},
			// 搜索pixiv平台下，用户的小说
			async searchPixivAuthor(userId){
				// 请等待
				let novels = await this.$getPixivUserNovels(userId)
				if(novels){
					uni.navigateTo({
						url:"../search_novels/search_novels"
					})
				}
			}
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
			
			overflow: hidden;
			.card-button-text{
				position: relative;
				text-align: center;
				font-size: 52rpx;
				line-height: 180rpx;
				font-weight: bold;
				z-index: 1;
			}
			
			.card-button-icon{
				height: 180rpx;
				width: 180rpx;
				position: absolute;
				left: -60rpx;
				top: 20rpx;
				opacity: 0.6;
			}
		}
	}
</style>
