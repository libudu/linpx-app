<template>
	<view>
		<lp-nav-bar type="back" title="关注" />
		<lp-author-list :authorsInfo="authorsInfo" />
		<lp-empty-page v-if='isEmpty'></lp-empty-page>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEmpty: false,
				authorsInfo:[]
			};
		},
		onLoad() {
			const authorIds = Object.keys(uni.getStorageSync('favAuthors'))
			if(!authorIds?.length) this.isEmpty = true;
			this.$api.getPixivNovelProfiles(authorIds).then(res=>{
				this.authorsInfo = res;
			})
		}
	}
</script>

<style lang="scss">

</style>
