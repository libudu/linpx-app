<template>
	<view>
		<uni-fav :checked="state" bgColorChecked="#bb8840" @click.native="clickFav"></uni-fav>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				favNovels:Array
			}
		},
		props:{
			id:undefined
		},
		computed:{
			store_id(){
				return "pn"+this.id
			},
			state(){
				return this.favNovels.indexOf(this.store_id) !== -1
			}
		},
		methods:{
			// 点了一下
			clickFav(e){
				// 阻止事件向下传递
				e.stopPropagation()
				// 原来是在，点一下需要去掉
				if(this.state){
					let index = this.favNovels.indexOf(this.store_id)
					if(index !== -1){
						this.favNovels.splice(index, 1)
					}
				}
				// 原来不在，点一下添加
				else{
					this.favNovels.unshift(this.store_id)
					// 注意！有可能这个小说根本就没点开缓存到本地过就被收藏了
					// 这个时候还要尝试下载
					this.$getPixivNovelDetail(this.id)
				}
				uni.setStorageSync('favNovels', this.favNovels)
				return false
			}
		},
		created() {
			this.favNovels = getApp().globalData.favNovels || []
		}
	}
</script>

<style>

</style>
