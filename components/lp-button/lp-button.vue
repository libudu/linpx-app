<template>
	<button class="lp-button" @click="$emit('click')">
		<slot></slot>
	</button>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.lp-button{
		border-radius:1000rpx;
		background: linear-gradient(45deg, rgb(250, 235, 65), rgb(243, 92, 22));
		display: inline-block;
		font-size: 30rpx;
		font-weight: bold;
	}
</style>
