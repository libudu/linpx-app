<template>
	<view>
		<scroll-view class="novel-scroll" @scroll="novelScroll" scroll-y>
			<lp-nav-bar type="back" title="小说详情" headerStyle="background: #f6f5ec" fixed >
				<!-- 这里面的内容是位于navBar右边的插槽 -->
				<template v-slot:right style="width: 200rpx;">
					<!-- 其中第一个图标是收藏按钮，用到lp-fav-item实现收藏功能 -->
					<lp-fav-item storageKey="favNovels" :favItem="'pn'+novel.id" style="width: 70rpx;height: 70rpx;">
						<template v-slot:no>
							<image mode="aspectFit" src="../../static/icon/star_idle.png"
							style="width: 70rpx;height: 70rpx;"></image>
						</template>
						<template v-slot:yes>
							<image mode="aspectFit" src="../../static/icon/star_hover.png"
							style="width: 70rpx;height: 70rpx;"></image>
						</template>
					</lp-fav-item>
					<view style="width: 10rpx;"></view>
					<!-- 第二个按钮是菜单，还没做好 -->
					<image mode="aspectFit" src="../../static/icon/menu.png" style="width: 80rpx;height: 80rpx;"
					@click="clickMenu"></image>
				</template>
			</lp-nav-bar>
			<view class="novel-intro" id="novelIntro" :style="{'opacity':novelIntroOpacity}">
				<view style="display: flex;flex-direction: column;align-items: center;">
					<img-cache class="novel-cover" mode="widthFix" :src="novel.coverUrl" preview></img-cache>
					
					<view class="novel-title">
						{{novel.title}}
					</view> 
					<view class="novel-author" @click="clickAuthorName">
						{{novel.userName}}
					</view>
					<lp-tags class="novel-tags" :tags="tags" />
					<view class="novel-description">
						<rich-text :nodes="novel.description"></rich-text>
					</view>
				</view>
			</view>
			
			<view class="novel-content">
				<text>{{novel.content}}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				novel:Object,
				tags:[],
				localCoverPath:"",
				novelIntroOpacity:1.0,
				novelIntroHeight:undefined
			};
		},
		methods:{
			clickAuthorName(){
				this.$gotoPixivAuthor(this.novel.userId)
			},
			clickMenu(){
				this.$todoToast('菜单还没整上...')
			},
			// 点进详情后需要更新最近小说
			updateRecentNovels(storeId){
				// 取出原来的
				let recentNovels = uni.getStorageSync('recentNovels') || {};
				// 看看之前有没有
				delete recentNovels[storeId]
				// 把新的结果插入开头
				recentNovels[storeId] = true
				// 如果数量超过了最大数量，那就去掉之后的
				let MaxRecentNovels = uni.getStorageSync('MaxRecentNovels').data
				if(Object.keys(recentNovels).length > MaxRecentNovels){
					recentNovels.splice(MaxRecentNovels, 10);
				}
				// 保存回去
				uni.setStorageSync('recentNovels', recentNovels);
			},
			novelScroll(e){
				if(!this.novelIntroHeight){
					uni.createSelectorQuery().select('#novelIntro').fields({
						size:true
					},data=>{
						this.novelIntroHeight = data.height
					}).exec()
				}
				this.novelIntroOpacity = 1.0 - (e.target.scrollTop / this.novelIntroHeight);
			}
		},
		async onLoad(option) {
			// 尝试获取小说信息
			this.novel = await this.$getPixivNovelDetail(option.id)
			// 添加到最近阅读
			const storeId = "pn"+option.id;
			this.updateRecentNovels(storeId);
			// 根据小说信息设置tag和封面图路径
			this.tags = this.novel.tags.tags.map((item)=>item.tag)
			this.localCoverPath = uni.getStorageSync('imgcache')[this.novel.coverUrl];
		}
	}
</script>

<style lang="scss">
	.novel-scroll{
		width: 100vw;
		height: 100vh;
	}
	.novel-intro{
		box-shadow: 0rpx 0rpx 40rpx #aa9;
		background: #f6f5ec;
		padding: 40rpx;
		.novel-cover{
			border-radius: 10rpx;
			margin-top: 20rpx;
			margin-bottom: 30rpx;
			width: 350rpx;
			background: #eee;
			flex-shrink: 0;
		}
		.novel-title{
			line-height: 50rpx;
			font-size: 46rpx;
			font-weight: bold;
			text-align: center;
		}
		.novel-author{
			font-size: 40rpx;
			line-height: 60rpx;
			text-decoration: underline;
		}
		.novel-tags{
			margin-left: 40rpx;
			width: 500rpx;
		}
		.novel-description{
			margin-top: 20rpx;
			font-size: 30rpx;
			line-height: 36rpx;
			width: 600rpx;
			text-align: center;
		}
	}
	.novel-content{
		font-size: 40rpx;
		padding: 40rpx;
	}
</style>
