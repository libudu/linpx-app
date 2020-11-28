<template>
	<view>
		<lp-author-item v-for="(info,index) in authorsInfo" :key="index"
		:name="info.name" :id="info.id" :comment="info.comment" :imageUrl="info.imageUrl" />
	</view>
</template>

<script>
	export default {
		props:{
			authorsInfo:Array
		}
	}
</script>

<style lang="scss">
</style>
