<template>
	<view>
		<lp-nav-bar type="back" title="收藏" />
		<lp-novel-list :novels="novels" />
		<lp-empty-page v-if='novels.length == 0'></lp-empty-page>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				novels:[]
			};
		},
		async onLoad() {
			this.novels = (await this.$api.getPixivNovelsByStorageKey('favNovels')).reverse()
		}
	}
</script>

<style lang="scss">

</style>
