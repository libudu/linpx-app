<template>
	<view>
		<lp-nav-bar type="back" title="收藏" />
		<lp-novel-list :novels="novelsInfo" />
		<lp-empty-page v-if='novelsInfo.length == 0'></lp-empty-page>
	</view>
</template>

<script>
	import { makePixivNovelsLoader } from '../../util/lazyDataList.js';
	export default {
		data() {
			return {
				novelsInfo:[]
			};
		},
		async onLoad() {
			const novelIds = Object.keys(uni.getStorageSync('favNovels')).map((ele)=>ele.slice(2));
			if(!novelIds?.length) this.isEmpty = true;
			this.loadNovels = makePixivNovelsLoader(this.novelsInfo, novelIds);
			this.loadNovels();
		},
		onReachBottom() {
			this.loadNovels();
		}
	}
</script>

<style lang="scss">

</style>
