<template>
	<view>
		<lp-novel-item class="animation-slide-left" :style="getTransitionDelay(index)"
		 v-for="(novel,index) in novels" :key="novel.id"
		:title="novel.title" :caption="novel.caption" :id="novel.id"
		:author="novel.author" :coverUrl="novel.coverUrl" :tags="novel.tags" />
	</view>
</template>

<script>
	export default {
		data(){
			return {
			}
		},
		props:{
			'novels':Array
		},
		methods:{
			getTransitionDelay(index){
				return (index<7)?{animationDelay: (index + 1)*0.1 + 's'}:{}
			}
		}
	}
</script>
