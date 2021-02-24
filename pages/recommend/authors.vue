<template>
	<view>
		<lp-nav-bar type="back" title="推荐作者" />
		<lp-author-list :authorsInfo="authorsInfo"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authorIds:[],
				authorsInfo:[]
			}
		},
		async onShow() {
			this.authorIds = await this.$api.getRecommendPixivAuthors()
			this.authorsInfo = await this.$api.getPixivUserDetailByList(this.authorIds)
		}
	}
</script>

<style lang="scss">

</style>
