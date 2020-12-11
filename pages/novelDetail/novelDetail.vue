<template>
	<view style="position: relative;">
		<scroll-view class="novel-scroll" @scroll="novelScroll" scroll-y>
			<view style="position: relative;" :animation="animationData">
				<lp-nav-bar type="back" title="小说详情" headerStyle="background: #f6f5ec" fixed>
					<!-- 这里面的内容是位于navBar右边的插槽 -->
					<template v-slot:right style="width: 200rpx;">
						<image mode="aspectFit" src="../../static/icon/share.png" style="width: 54rpx;height: 54rpx;"
						@click="$share.shareTextWithSystem($share.getShareText('pn', novel.id,`《${novel.title}》`))" />
						<view style="width: 20rpx;" />
						<image mode="aspectFit" src="../../static/icon/menu.png" style="width: 70rpx;height: 70rpx;"
						@click="$refs.menu.show = true"></image>
					</template>
				</lp-nav-bar>
			</view>
			
			<view class="novel-intro" id="novelIntro" :style="{'opacity':novelIntroOpacity}">
				<view style="display: flex;flex-direction: column;align-items: center;">
					<img-cache class="novel-cover" mode="widthFix" :src="novel.coverUrl" preview></img-cache>
					
					<view class="novel-title">
						{{novel.title}}
						<lp-fav-item storageKey="favNovels" :favItem="'pn'+novel.id" style="display: inline-block;position: relative;top: 8rpx;">
							<template v-slot:no>
								<image mode="aspectFit" src="../../static/icon/star_idle.png"
								style="width: 58rpx;height: 58rpx;"></image>
							</template>
							<template v-slot:yes>
								<image mode="aspectFit" src="../../static/icon/star_hover.png"
								style="width: 58rpx;height: 58rpx;"></image>
							</template>
						</lp-fav-item>
					</view> 
					<view class="novel-author" @click="clickAuthorName">
						{{novel.author}}
					</view>
					<lp-tags class="novel-tags" :tags="novel.tags" />
					<view class="novel-caption">
						<rich-text :nodes="novel.caption"></rich-text>
					</view>
				</view>
			</view>
			
			<view class="novel-content">
				<text>{{novel.content}}</text>
			</view>
		</scroll-view>
		<view class="novel-bottom-info">
			<view class="novel-bottom-item" style="padding-left: 30rpx;width: 150rpx;">{{(scrollProcess*100).toFixed(0)}}%</view>
			<view class="novel-bottom-item" style="padding:0rpx 20rpx 0rpx 20rpx;width: 420rpx;">{{novel.title}}</view>
			<view class="novel-bottom-item" style="padding-right: 30rpx;width: 180rpx;">{{novel.author}}</view>
		</view>
		
		<lp-bottom-menu ref="menu" :items="menuItems"></lp-bottom-menu>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 小说数据和封面图路径
				novel:Object,
				shortTitle:"",
				// intro部分的透明度、高度
				novelIntroOpacity:1.0,
				novelIntroHeight:undefined,
				// 上一次滑的时候距离顶部的高度是多少
				lastScrollTop:0,
				scrollProcess:0,
				// navBar当前的状态，是收起还是放下
				navBarState:"down",
				// 屏幕高度
				windowHeight:0,
				
				animation:undefined,
				animationData:undefined,
				
				// 菜单部分
				showMenu:false,
				menuItems:[
					{
						title:"复制作品信息",
						callback:()=>{this.$share.copyShareText('pn', this.novel.id,`《${this.novel.title}》`)}
					},
					{
						title:"打开作品Pixiv页面",
						callback:()=>{this.$share.openPixivUrl('pn', this.novel.id)}
					},
					{
						title:"分享Linpx",
						callback:this.$share.shareLinpxQrcodeWithSystem
					},
					{
						title:"复制Linpx链接",
						callback:this.$share.copyLinpxShareText
					}
				]
			}
		},
		methods:{
			getShortTitle(){
				if(this.novel && this.novel.title){
					let title = this.novel.title
					if(title.length<14){
						this.shortTitle = title
					}
					else{
						this.shortTitle = title.substring(0,10)+'...'
					}
				}
			},
			clickAuthorName(){
				this.$gotoPixivAuthor(this.novel.authorId)
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
				let maxRecentNovels = this.$config.get(maxRecentNovels)
				if(Object.keys(recentNovels).length > maxRecentNovels){
					recentNovels.splice(maxRecentNovels, 10);
				}
				// 保存回去
				uni.setStorageSync('recentNovels', recentNovels);
			},
			novelScroll(e){
				let scrollTop = e.target.scrollTop
				let scrollHeight = e.target.scrollHeight
				let deltaY = e.target.deltaY
				// 如果还不知道intro的高度那先获取高度
				if(!this.novelIntroHeight){
					uni.createSelectorQuery().select('#novelIntro').fields({
						size:true
					},data=>{
						this.novelIntroHeight = data.height
					}).exec()
				}
				// 计算滑动进程
				if(this.novelIntroHeight){
					let nowScroll = scrollTop - this.novelIntroHeight
					let allScroll = scrollHeight - this.novelIntroHeight - this.windowHeight 
					this.scrollProcess = nowScroll>0?(nowScroll/allScroll):0
				}
				// 根据滑动距离设置透明度
				this.novelIntroOpacity = 1.0 - (scrollTop / this.novelIntroHeight);
				// 根据滑动方向判断行为
				// 现在在往上滑
				if(deltaY > 5){
					// navBar不在下面，那就下来
					if(this.navBarState !== 'down'){
						this.navBarDown()
					}
				}
				// 现在在往下滑
				if(deltaY < -5){
					// navBar不在上面，那就上去
					if(this.navBarState !== 'up' && this.novelIntroHeight < this.lastScrollTop){
						this.navBarUp()
					}
				}
				// 不管怎样，位置要更新
				this.lastScrollTop = scrollTop
			},
			navBarUp(){
				this.navBarState = 'up'
				plus.navigator.setFullscreen(true);
				this.animation.top('-200rpx').step()
				this.animationData = this.animation.export()
			},
			navBarDown(){
				this.navBarState = 'down'
				plus.navigator.setFullscreen(false);
				this.animation.top('0rpx').step()
				this.animationData = this.animation.export()
			}
		},
		async onLoad(option) {
			// 尝试获取小说信息
			this.novel = await this.$api.getPixivNovelDetail(option.id)
			//console.log(this.novel);
			this.getShortTitle()
			// 添加到最近阅读
			const storeId = "pn"+option.id;
			this.updateRecentNovels(storeId);
			// 初始化动画对象
			this.animation = uni.createAnimation({
				timingFunction:'ease',
				duration:500
			})
			// 初始动画
			this.animation.top('0rpx').step()
			this.animationData = this.animation.export()
			// 获取窗口高度
			this.windowHeight = uni.getSystemInfoSync().windowHeight
		},
		onShow() {
			//#ifdef APP-PLUS
			this.$android.hideNavigation()
			//#endif
		},
		onUnload() {
			//#ifdef APP-PLUS
			plus.navigator.setFullscreen(false);
			this.$android.showNavigation()
			//#endif
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
			line-height: 60rpx;
			font-size: 54rpx;
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
		.novel-caption{
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
	.novel-bottom-info{
		position: fixed;
		font-size: 26rpx;
		width: 100vw;
		bottom: -5rpx;
		text-align: center;
		z-index: 1;
		background: white;
		.novel-bottom-item{
			display: inline-block;
			opacity: 0.5;
			@include ellipsis-oneline;
		}
	}
</style>
