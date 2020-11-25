<template>
	<view>
		<uni-nav-bar :leftText="leftText" :leftIcon="leftIcon" :title="title" @clickLeft="leftClickHandle"></uni-nav-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				leftIcon:"",
				leftText:"",
				rightIcon:"",
				rightText:"",
				leftClickHandle:undefined
			};
		},
		props:{
			type:{
				type:String,
				default:'default'
			},
			title:String
		},
		created() {
			switch (this.type){
				case 'default':
					break;
				case 'back':
					this.leftClickHandle = uni.navigateBack
					this.leftIcon = "back"
					this.leftText = "返回"
					break;
			}
		},
		methods:{
		}
	}
</script>

<style lang="scss">

</style>
