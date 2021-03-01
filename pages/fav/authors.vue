<template>
	<view>
		<lp-nav-bar type="back" title="关注" />
		<lp-author-list :authorsInfo="authorsInfo" />
		<lp-empty-page v-if='isEmpty'></lp-empty-page>
	</view>
</template>

<script>
	import { makePixivUsersLoader } from '../../util/lazyDataList.js';
	export default {
		data() {
			return {
				isEmpty: false,
				authorsInfo:[]
			};
		},
		onLoad() {
			const authorIds = Object.keys(uni.getStorageSync('favAuthors')).map((ele)=>ele.slice(2));
			if(!authorIds?.length) this.isEmpty = true;
			this.loadAuthors = makePixivUsersLoader(this.authorsInfo, authorIds.reverse());
			this.loadAuthors();
		},
		onReachBottom() {
			this.loadAuthors();
		}
	}
</script>

<style lang="scss">

</style>
