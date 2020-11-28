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
				favItemDict:undefined	// 所有收藏项目的列表，检查元素是否在其中，自动根据存储键索引全局变量
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
			'tryFavCallBack':undefined
		},
		computed:{
			state: function(){
				return this.favItem in this.favItemDict
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
					this.$emit('favChange', false)
					this.showTip()
					uni.setStorageSync(this.storageKey, this.favItemDict)
				}
				// 原来不在，点一下添加
				else{
					// 存在点击回调就调用
					if(this.tryFavCallBack){
						let result = await this.tryFavCallBack()
						console.log(result);
						// 返回true表示收藏成功，否则表示失败
						if(!result){
							this.showTip('收藏失败')
							return
						}
					}
					this.$set(this.favItemDict, this.favItem, true)
					this.$emit('favChange', true)
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
