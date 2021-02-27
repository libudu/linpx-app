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
				authorsInfo:[]
			}
		},
		onLoad() {
			this.$api.getRecommendPixivAuthors().then(res=>{
				const authorIds = Object.values(res);
				const authorsInfo = [];
				for(let id of authorIds) {
					this.$api.getPixivUser(id).then((authorInfo)=>{
						authorsInfo.push(authorInfo);
					})
				}
				this.authorsInfo = authorsInfo;
			})
		}
	}
</script>

<style lang="scss">

</style>
