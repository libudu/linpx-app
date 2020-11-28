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
			authorIds:Array
		},
		async created() {
			this.authorIds.forEach((authorId)=>{
				this.$getPixivUserDetail(authorId, "").then((rowData)=>{
					if(rowData){
						let user = rowData.user;
						let info = {
							id: String(user.id),
							name: user.name,
							comment: user.comment,
							imageUrl: user.profile_image_urls.medium
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
