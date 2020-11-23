<template>
	<view>
		<lp-novel-item v-for="(novel,index) in novels" :key="index"
		:title="novel.title" :caption="novel.caption" :id="novel.id" :author="novel.author"
		class="novel-item" />
	</view>
</template>

<script>
	export default {
		props:{
			novels:Array
		}
	}
</script>
