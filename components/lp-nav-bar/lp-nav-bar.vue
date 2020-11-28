<template>
	<view>
		<uni-nav-bar :leftText="leftText" :leftIcon="leftIcon" :title="title"
		:fixed="fixed" :headerStyle="headerStyle"
		@clickLeft="leftClickHandle">
			<template v-slot:right>
				<slot name="right"></slot>
			</template>
		</uni-nav-bar>
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
				leftClickHandle:""
			};
		},
		props:{
			type:{
				type:String,
				default:'default'
			},
			title:String,
			fixed:{
				type:Boolean,
				default:false
			},
			headerStyle:{
				type:String
			}
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
