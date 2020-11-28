<template>
	<view>
		<lp-novel-list :novels="novels"></lp-novel-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				novels:[]
			};
		},
		// type为storage，从storage中取ids列表索引，favNovels或recentNovels
		// type为rowData，直接绑定的原数据
		props:[
			'type',
			'data'
		],
		created() {
			switch (this.type){
				// 直接用原数据
				case 'rowData':
					this.novels = this.data;
					break;
				// 传入的是一个作品id列表，要转换成作品内容放到this.novels里
				case 'rowList':
					break;
				// 来自存储键的列表，需要专门提取
				case 'storageList':
					this.novels = this.extractId2Intro(this.data);
					//console.log(this.novels);
					break;
			}
		},
		methods:{
			// 输入一个小说id字典，返回小说的介绍信息
			extractId2Intro(storageName){
				let prefixIds = uni.getStorageSync(storageName) || {}
				let intros = []
				Object.keys(prefixIds).reverse().forEach(async (prefixId)=>{
					let rowData = await this.$getPixivNovelDetail(prefixId, "");
					console.log(rowData);
					if(rowData){
						let intro = {
							id: rowData.id,
							title: rowData.title,
							caption: rowData.description,
							author: rowData.userName,
							coverUrl: rowData.coverUrl,
							tags: rowData.tags.tags.map((item)=>item.tag)
						};
						intros.push(intro);
					}
				})
				return intros
			},
		}
	}
</script>

<style lang="scss">

</style>
