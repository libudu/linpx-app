<template>
	<view @click.stop="clickFav" style="z-index: 1000;">
		<slot name="yes" v-if="state"></slot>
		<slot name="no" v-if="!state"></slot>
		<slot name="default"></slot>
	</view>
</template>

<script>
	export default {
		// @initFav(value):最一开始喜欢的状态
		// @favChange(value):喜欢按钮被点击，value是点击后的状态值
		data() {
			return {
				favItemDict:{}	// 所有收藏项目的列表，检查元素是否在其中，自动根据存储键索引全局变量
			}
		},
		props:{
			'storageKey':String,	// favNovels和favAuthors，有新项改动后要同步存入记录
			'favItem':String,		// 收藏的元素
			'favTip':{
				type:String,
				default:'已收藏'
			},
			'unfavTip':{
				type:String,
				default:'已取消收藏'
			},
			'failTip':{
				type:String,
				default:'收藏失败'
			},
			// 尝试去fav一个项目后的回调函数，根据返回值真假确定fav是否成功
			// 用处：fav一个小说后需要把小说下载到本地，根据下载的成功与否决定收藏成功与否
			// 但下载逻辑与收藏无关，可以通过回调实现
			'tryFavCallBack':undefined
		},
		computed:{
			state: function(){
				return this.favItem in this.favItemDict
			}
		},
		watch:{
			state: function(newValue,oldValue){
				this.$emit('favChange', newValue)
			}
		},
		methods:{
			showTip(content){
				let tip = this.state?this.favTip:this.unfavTip
				uni.showToast({
					title: content || tip,
					icon:"none",
					duration:800
				})
			},
			// 点了一下
			async clickFav(e){
				// 阻止事件向下传递
				e.stopPropagation()
				// 原来是在，点一下需要去掉
				if(this.state){
					this.$delete(this.favItemDict,this.favItem)
					this.showTip()
					uni.setStorageSync(this.storageKey, this.favItemDict)
				}
				// 原来不在，点一下添加
				else{
					// 存在点击回调就调用
					if(this.tryFavCallBack){
						let result = await this.tryFavCallBack()
						// 返回true表示收藏成功，否则表示失败
						if(!result){
							this.showTip(this.failTip)
							return
						}
					}
					this.$set(this.favItemDict, this.favItem, true)
					this.showTip()
					uni.setStorageSync(this.storageKey, this.favItemDict)
				}
				return this.state
			}
		},
		created() {
			// 自动从全局变量取出
			this.favItemDict = getApp().globalData[this.storageKey]
			if(!this.favItemDict){
				console.log("lp-fav-item时出现错误，全局变量"+this.storageKey+"为空");
			}
			this.$emit('initFav', this.state)
		}
	}
</script>

<style>

</style>
