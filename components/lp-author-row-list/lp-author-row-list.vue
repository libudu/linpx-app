<template>
	<view>
		<lp-author-list :authorsInfo="authorsInfo" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authorsInfo:[]
			};
		},
		props:{
			type:String
		},
		async created() {
			let authorIds = []
			if(this.type === 'recommendPixivAuthors'){
				authorIds = await this.$getRecommendPixivAuthors()
			}
			
			authorIds.forEach((authorId)=>{
				this.$getPixivUserDetail(authorId).then((data)=>{
					if(data){
						let info = {
							id: data.userId,
							name: data.name,
							comment: data.comment,
							imageUrl: data.imageBig
						};
						this.authorsInfo.push(info);
					}
				})
				
			})
		}
	}
</script>

<style lang="scss">

</style>
