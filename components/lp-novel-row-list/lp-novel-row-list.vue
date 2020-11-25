<template>
	<view>
		<lp-novel-list :novels="novels"></lp-novel-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				novels:undefined
			};
		},
		methods:{
			// 输入一个小说id列表，返回小说的介绍信息
			extractId2Intro(storageName){
				let pixivIds = uni.getStorageSync(storageName) || []
				let intros = []
				pixivIds.forEach(async (pixivId)=>{
					let rowData = await this.$getPixivNovelDetail(pixivId, "");
					if(rowData){
						let intro = {
							id: rowData.id,
							title: rowData.title,
							caption: rowData.description,
							author: rowData.userName
						};
						intros.push(intro);
					}
				})
				return intros
			},
		},
		props:[
			'type',
			'data'
		],
		created() {
			switch (this.type){
				case 'storage':
					this.novels = this.extractId2Intro(this.data);
					break;
			}
		}
	}
</script>

<style lang="scss">

</style>
