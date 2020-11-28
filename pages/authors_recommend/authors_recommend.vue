<template>
	<view>
		<lp-nav-bar type="back" title="推荐作者" />
		<lp-author-row-list :authorIds="recommendPixivAuthors" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recommendPixivAuthors:Array
			};
		},
		onLoad(){
			this.recommendPixivAuthors = uni.getStorageSync('recommendPixivAuthors')
			// 不存在则初始化
			if(!this.recommendPixivAuthors){
				let rowData = {
					"安卓":"30135992",
					"坎德":"3754812",
					"爱吃肉的龙仆":"12261974",
					"戌子雨":"20662397",
					"DEER1216":"33407541",
					"迦迪垃":"11342501",
					"肆指":"1537839",
					"crysimon":"5266594"
				}
				rowData = Object.values(rowData)
				this.recommendPixivAuthors = rowData.sort(()=>Math.random()-0.5)
				uni.setStorageSync('recommendPixivAuthors', this.recommendPixivAuthors)
			}
		}
	}
</script>

<style lang="scss">

</style>
