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
			let infos = [];
			this.authorIds.forEach(async (authorId)=>{
				let rowData = await this.$getPixivUserDetail(authorId, "");
				if(rowData){
					let user = rowData.user;
					let info = {
						id: String(user.id),
						name: user.name,
						comment: user.comment,
						imageUrl: user.profile_image_urls.medium
					};
					infos.push(info);
				}
				this.authorsInfo = infos;
			})
		}
	}
</script>

<style lang="scss">

</style>
