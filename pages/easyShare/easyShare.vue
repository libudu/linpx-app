<template>
	<view>
		<u-modal v-model="show" :show-title="false" show-cancel-button :show-confirm-button="showConfirm"
		confirm-text="查看" cancel-text="返回" confirm-color="orange" @cancel="cancelModel" @confirm="confirmModel">
			<view v-if="type=='pa'&&showConfirm" class="u-flex u-row-center" style="flex-direction: column;">
				<view class="u-m-t-20 u-m-b-20 u-font-40">分享作者</view>
				<img-cache style="width: 250rpx;height: 250rpx;border-radius: 20rpx;" :src="data.sideImgUrl" mode="aspectFill"/>
				<view style="font-size: 44rpx;font-weight: bold;margin: 0rpx 40rpx;">{{data.name}}</view>
				<view style="font-size: 38rpx;">{{data.id}}</view>
				<view class="u-line-4" style="padding: 0rpx 40rpx;margin-bottom: 20rpx;">{{data.comment}}</view>
			</view>
			<view v-if="type=='pn'&&showConfirm" class="u-flex u-row-center" style="flex-direction: column;">
				<view class="u-m-t-20 u-m-b-20 u-font-40">分享作品</view>
				<img-cache style="width: 250rpx;height: 330rpx;border-radius: 20rpx;" :src="data.coverUrl" mode="aspectFill"/>
				<view style="font-size: 44rpx;font-weight: bold;margin: 0rpx 60rpx;text-align: center;">{{data.title}}</view>
				<view style="font-size: 38rpx;">{{data.author}}</view>
				<view class="u-line-4" style="padding: 0rpx 40rpx;margin-bottom: 20rpx;">{{data.caption}}</view>
			</view>
			<view style="text-align: center;margin: 50rpx 0rpx;font-size: 45rpx;">{{errorTip}}</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 展示内容的类型和id
				type:undefined,
				id:undefined,
				// 控制的变量
				show:true,			// model是否显示，永远显示
				data:{},
				errorTip:"",
				// 点击确定后的回调函数
				confirmCallBack:()=>{}
			};
		},
		computed:{
			showConfirm(){
				return !Boolean(this.errorTip)
			}
		},
		async onLoad(options) {
			this.type = options.type
			this.id = options.id
			switch(this.type){
				case 'pa':
					await this.$api.getPixivUserDetail(this.id, false).then((res)=>{
						if(res){
							this.data = res
							this.confirmCallBack = ()=>{
								this.$gotoPixivAuthor(this.id)
							}
						}else{
							this.errorTip = "该作者不存在"
						}
					}).catch((res)=>{
						this.errorTip = "出现错误，错误原因：" + res
					})
					break;
				case 'pn':
					await this.$api.getPixivNovelDetail(this.id, false).then((res)=>{
						if(res){
							this.data = res
							this.confirmCallBack = ()=>{
								this.$gotoPixivNovel(this.id)
							}
						}else{
							this.errorTip = "该作品不存在"
						}
					}).catch((res)=>{
						this.errorTip = "出现错误，错误原因：" + res
					})
					break;
				default:
					this.title = "type错误"
					break;
			}
			console.log(this.data);
		},
		methods:{
			cancelModel(){
				uni.navigateBack()
			},
			confirmModel(){
				uni.navigateBack()
				this.confirmCallBack()
			}
		}
	}
</script>

<style lang="scss">

</style>
