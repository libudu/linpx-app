<template>
	<view>
		<lp-novel-item v-for="(novel,index) in novels" :key="index"
		:title="novel.title" :caption="novel.caption" :id="novel.id"
		:author="novel.author" :coverUrl="novel.coverUrl" :tags="novel.tags"
		class="novel-item" />
	</view>
</template>

<script>
	export default {
		data(){
			return {
				'novels':[]
			}
		},
		props:{
			// novelDataList:直接小说数据的列表
			// novelIdList:小说id的列表
			// storageKeyIdList:小说id的列表的存储key
			'type':{
				type:String,
				default:'novelDataList'
			},
			'data':undefined
		},
		async created(){
			let novels = undefined
			switch(this.type){
				case 'novelDataList':
					this.novels = this.data
					break
				case 'novelIdList':
					novels = await this.$api.getPixivNovelsByIdList(this.data)
					this.novels = this.novels.concat(novels)
					break
				case 'storageKeyIdList':
					novels = await this.$api.getPixivNovelsByStorageKey(this.data)
					this.novels = this.novels.concat(novels)
					break
				default:
					console.log("lp-novel-list的type错误，不为指定的值！")
					break
			}
		}
	}
</script>
