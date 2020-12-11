<template>
	<view>
		<lp-nav-bar type="back" title="关注" />
		<lp-author-list :authorsInfo="authorsInfo" />
		<lp-empty-page v-if='authorIds.length == 0'></lp-empty-page>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authorIds:[],
				authorsInfo:[]
			};
		},
		async onLoad() {
			this.authorIds = Object.keys(uni.getStorageSync('favAuthors'))
			this.authorsInfo = await this.$api.getPixivUserDetailByList(this.authorIds)
		}
	}
</script>

<style lang="scss">

</style>
