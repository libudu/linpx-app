<template>
	<view>
		<lp-author-item v-for="(info,index) in authorsInfo" :key="index"
		:name="info.name" :id="info.id" :comment="info.comment" :sideImgUrl="info.sideImgUrl" />
	</view>
</template>

<script>
	export default {
		data(){
			return {
				authorsInfo:[]
			}
		},
		props:{
			type:{
				type:String,
				default:'authorInfoList'
			},
			data:undefined
		},
		async created() {
			let authorIds = undefined
			switch(this.type){
				case 'authorInfo':
					this.authorsInfo = this.data
					break
				case 'recommendPixivAuthors':
					authorIds = await this.$api.getRecommendPixivAuthors()
					this.authorsInfo = await this.$api.getPixivUserDetailByList(authorIds)
					break;
				case 'favAuthors':
					authorIds = uni.getStorageSync('favAuthors')
					authorIds = Object.keys(authorIds)
					this.authorsInfo = await this.$api.getPixivUserDetailByList(authorIds)
					break;
				default:
					console.log("lp-author-list传入type不正确："+this.type);
			}
		}
	}
</script>

<style lang="scss">
</style>
