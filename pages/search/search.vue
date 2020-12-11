<template>
	<view>
		<lp-nav-bar title="搜索" />
		
		<lp-search-input @startSearch="startSearch" />
		<view class="card-button-group">
			<view v-for="(item, index) in getShowCardButtonList" :key="index"
			class="card-button" @click="clickCardButton(item.name)" :style="item.style">
				<image v-if='item.icon' class="card-button-icon" :style="item.imgStyle" mode="aspectFit" :src="item.icon"></image>
				<view class="card-button-text" :style="item.fontStyle">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isDownload:false,
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
					{
						name:'分类',
						show:true,
						open:false,
						icon:'../../static/emoji/fire.png',
						style:{
							background: "#aaa",
							opacity:0.5,
						}
					},
					{
						name:'作者',
						show:true,
						open:false,
						icon:'../../static/emoji/sun.png',
						imgStyle:{
							opacity:0.6
						}
					},
					{
						name:'关注',
						show:true,
						open:false,
						icon:'../../static/emoji/kiss.png'
					},
					{
						name:'最近',
						show:true,
						open:false,
						icon:'../../static/emoji/drop.png'
					},
					{
						name:'收藏',
						show:true,
						open:false,
						icon:'../../static/emoji/star.png'
					},
					{
						name:'支持',
						show:true,
						open:false,
						icon:'../../static/emoji/cute.png',
						imgStyle:{
							'margin-left':"20rpx",
							'margin-top':'-10rpx',
							'width':'170rpx'
						}
					}
				]
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
				this.$navigateTo({
					url:`../${pageName}/${pageName}`,
					animationType:"pop-in",
					animationDuration:200
				})
			},
			clickCardButton(e){
				let waitFlag = false;
				switch(e){
					case '排行榜':
						waitFlag = true;
						break;
					case '分类':
						waitFlag = true;
						break;
					case '作者':
						this.navigateTo("authorsRecommend");
						break;
					case '关注':
						this.navigateTo("authorsFollow");
						break;
					case '最近':
						this.navigateTo("novelsRecent");
						break;
					case '收藏':
						this.navigateTo("novelsFav");
						break;
					case '支持':
						this.navigateTo("support");
						break;
				}
				if(waitFlag){
					this.$todoToast()
				}
			},
			// 根据输入，开始搜索
			async startSearch(option){
				if(option.userInput){
					switch(option.searchType.toLowerCase()){
						case 'pixiv作者':
							this.$gotoPixivAuthor(option.userInput)
							break;
						case 'pixiv作品':
							this.$gotoPixivNovel(option.userInput)
							break;
						case '关键字':
							this.$todoToast("关键词搜索还没整...")
							break;
					}
				}
			}
		},
		onLoad() {
			// 当前是APP则检查版本、尝试下载
			//#ifdef APP-PLUS
			// 显示头尾
			this.$android.showNavigation()
			plus.navigator.setFullscreen(false)
			// 检查更新
			if(this.$api.checkUpdate()){
				uni.showModal({
					title:"发现新版本！是否立刻更新！",
					content:"",
					showCancel:true,
					cancelText:"暂不更新",
					confirmText:"现在下载",
					success:(res)=>{
						if(res.confirm){
							this.$navTo("../downloadLinpx/downloadLinpx?download=true")
						}
					}
				})
			}
			//#endif
		}
	}
</script>

<style lang="scss" scoped>
	.card-button-group{
		display: flex;
		justify-content: left;
		flex-wrap: wrap;
		margin: 50rpx 0rpx 50rpx 85rpx;
		.card-button{
			
			position: relative;
			width:260rpx;
			height: 160rpx;
			margin: 0rpx 60rpx 50rpx 0rpx;
			
			border-radius: 30rpx;
			box-shadow: 5rpx 5rpx 20rpx #ccc;
			background: rgb(246,245,236);
			
			overflow: hidden;
			.card-button-text{
				position: relative;
				text-align: center;
				font-size: 52rpx;
				line-height: 150rpx;
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
