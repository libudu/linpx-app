<template>
	<view>
		<lp-nav-bar type="back" title="推荐作者" />
		<lp-author-list :authorsInfo="authorsInfo"/>
	</view>
</template>

<script>
	import { makePixivUsersLoader } from '../../util/lazyDataList.js';
	export default {
		data() {
			return {
				authorsInfo:[]
			}
		},
		onLoad() {
			this.$api.getRecommendPixivAuthors().then(res=>{
				const authorIds = Object.values(res);
				this.loadAuthors = makePixivUsersLoader(this.authorsInfo, authorIds);
				this.loadAuthors();
			})
		},
		onReachBottom() {
			this.loadAuthors();
		}
	}
</script>

<style lang="scss">

</style>
