<template>
	<view>
		<lp-author-item class="animation-slide-left" :style="getTransitionDelay(index)"
		v-for="(info,index) in authorsInfo" :key="info.id"
		:name="info.name" :id="info.id" :comment="info.comment" :sideImgUrl="info.sideImgUrl" />
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			getTransitionDelay(index){
				return (index<7)?{animationDelay: (index + 1)*0.1 + 's'}:{}
			}
		},
		props:{
			authorsInfo:Array
		}
	}
</script>

<style lang="scss">
</style>
