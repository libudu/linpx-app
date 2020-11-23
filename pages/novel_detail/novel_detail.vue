<template>
	<view>
		<view class="novel-item">
			<img-cache class="novel-cover" mode="widthFix" :src="novel.coverUrl"></img-cache>
			<view class="novel-title">
				{{novel.title}}
			</view>
			<text class="novel-content">
				{{novel.content}}
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				novel:Object
			};
		},
		methods:{
			updateRecentNovels(store_id){
				// 取出原来的
				let recentNovels = uni.getStorageSync('recentNovels') || [];
				// 看看之前有没有
				let idIndex = recentNovels.indexOf(store_id);
				// 之前有了，为了刷新所以要去掉
				if(idIndex !== -1){
					recentNovels.splice(idIndex, 1);
				}
				// 把新的结果插入开头
				recentNovels.unshift(store_id);
				// 如果数量超过了最大数量，那就去掉之后的
				let MaxRecentNovels = uni.getStorageSync('MaxRecentNovels').data
				if(recentNovels.length > MaxRecentNovels){
					recentNovels.splice(MaxRecentNovels, 10);
				}
				// 保存回去
				uni.setStorageSync('recentNovels', recentNovels);
			}
		},
		async onLoad(option) {
			const store_id = "pn"+option.id;
			// 尝试获取小说信息
			this.novel = await this.$getPixivNovelDetail(option.id)
			// 添加到最近阅读
			this.updateRecentNovels(store_id);
			// 根据小说内容设置标题
			uni.setNavigationBarTitle({
				title:this.novel.title
			})
		}
	}
</script>

<style lang="scss">
	.novel-item{
		margin: 30rpx;
	}
	.novel-title{
		text-align: center;
		font-size: 45rpx;
		font-weight: bold;
		margin-bottom: 40rpx;
	}
	.novel-content{
		font-size: 40rpx
	}
	.novel-cover{
		width: 100%;
		border: 5px solid $main-color;
		border-radius: 60rpx;
	}
</style>
