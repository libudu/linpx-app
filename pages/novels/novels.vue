<template>
	<view>
		<!-- 弹出新增内容的按钮 -->
		<uni-fab horizontal="right" :popMenu="false" @fabClick="$refs.popup.open()"></uni-fab>
		<!-- 弹出式的各种添加的按钮 -->
		<uni-popup ref="popup">
			<view style="width: 750rpx;">
				<view class="pixiv-title">从pixiv添加</view>
				<view class="button-box">
					<button class="pixiv-button" hover-class="pixiv-button-hover" @click="gotoSearch('pixiv','按作品')">按作品</button>
					<button class="pixiv-button" hover-class="pixiv-button-hover" @click="gotoSearch('pixiv','按作者')">按作者</button>
				</view>
				
				<view class="local-title">从本地添加</view>
				<view class="button-box">
					<button disabled>本地文件</button>
					<button disabled>手动创建</button>
				</view>
			</view>
		</uni-popup>
		
		<!-- 分栏 -->
		<uni-segmented-control class="main-page-control" :current="page" :values="pageTitles"
		@clickItem="page = $event.currentIndex;updateFavNovels();" activeColor="#e0a34d">
		</uni-segmented-control>
		
		<view>todo:从本地文件添加、手动创建。从微博、b站添加</view>
		
		<view v-show="page == 0">
			<lp-novel-list :novels="favNovels" />
		</view>
		
		<view v-show="page == 1">
			<lp-novel-list :novels="recentNovels" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageTitles: ['本地收藏','最近阅读'],
				recentNovels:Array,
				favNovels:Array,
				page:0
			}
		},
		methods: {
			// 快速添加的按钮去搜索页面
			gotoSearch(platform, type){
				uni.reLaunch({
					url:"../search/search?platform="+platform+"&type="+type
				})
			},
			// 输入一个小说id列表，返回小说的介绍信息
			extractId2Intro(storageName){
				let ids = uni.getStorageSync(storageName) || []
				let intros = []
				ids.forEach((id)=>{
					let rowData = uni.getStorageSync(id);
					if(rowData){
						let intro = {
							id: rowData.id,
							title: rowData.title,
							caption: rowData.description,
							author: rowData.userName
						};
						intros.push(intro);
					}
				})
				return intros
			},
			// 刷新最近小说
			updateRecentNovels(){
				this.recentNovels = this.extractId2Intro('recentNovels')
				// console.log(this.recentNovels[0].title);
			},
			updateFavNovels(){
				this.favNovels = this.extractId2Intro('favNovels')
			}
		},
		onShow() {
			// 从别的页面回到这个页面时都要刷新最近阅读
			this.updateRecentNovels()
			this.updateFavNovels()
		}
	}
</script>

<style lang="scss">
	@mixin title-banner {
		margin: 0rpx 100rpx;
		border-radius: 30rpx;
		font-size: 50rpx;
		line-height: 80rpx;
		text-align: center;
	}
	.pixiv-title{
		@include title-banner;
		background: rgb(0,150,250);
		color: white;
	}
	.pixiv-button{
		background: rgb(0,150,250);
		color: white;
	}
	.pixiv-button-hover{
		background: rgba(0,150,250, 0.6);
		color: white;
	}
	.local-title{
		@include title-banner;
		background: white;
	}
	.button-box{
		display: flex;
		margin: 20rpx 0rpx 50rpx 0rpx;
	}
	.main-page-control{
		margin: 20rpx;
	}
</style>
