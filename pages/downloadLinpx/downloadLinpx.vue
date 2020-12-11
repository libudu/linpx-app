<template>
	<view>
		<u-mask :show="true" zoom class="u-flex u-row-center">
			<view style="text-align: center;">
				<view style="color: white;font-size: 34rpx;">正在下载{{'.'.repeat(ellipsisCount)}}</view>
				<u-line-progress active-color="#2979ff" :percent="downloadProcess" style="width: 400rpx;height: 50rpx;"></u-line-progress>
				<view style="color: white;font-size: 30rpx;" v-show="showDownloadSize">{{nowDownloadSize}}m / {{totalDownloadSize}}m</view>
				<view>
					<button style="display: inline-block;">后台下载</button>
					<view style="width: 20rpx;display: inline-block;" />
					<button style="display: inline-block;">终止下载</button>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				downloadProcess:0,
				totalBytesExpectedToWrite:0,
				totalBytesWritten:0,
				ellipsisCount:0
			};
		},
		computed:{
			showDownloadSize(){
				return this.totalBytesExpectedToWrite && this.totalBytesWritten
			},
			nowDownloadSize(){
				return (this.totalBytesWritten / 1000000).toFixed(2)
			},
			totalDownloadSize(){
				return (this.totalBytesExpectedToWrite / 1000000).toFixed(2)
			}
		},
		methods:{
			downloadLinpx(){
				// 省略号字符动画
				let intervalId = setInterval(()=>{
					this.ellipsisCount = (this.ellipsisCount + 1) % 7
				},500)
				// 开始下载
				let downloadTask = uni.downloadFile({
					url: this.$api.BASE_URL+'download',
					// 下载成功了那就安装
					success: (res) => {
						if (res.statusCode === 200) {
							console.log('下载成功')
							plus.runtime.install(res.tempFilePath)
							console.log(res.tempFilePath);
						}
					},
					// 下载错误提示
					fail() {
						uni.showToast({
							icon:"none",
							title:"下载失败"
						})
					},
					// 不管怎样，下载完成了就取消字符动画、显示tabBar、撤销遮罩
					complete: () => {
						uni.redirectTo({
							url:"../search/search"
						})
						clearInterval(intervalId)
					}
				})
				downloadTask.onProgressUpdate((res) => {
					this.downloadProcess = res.progress
					this.totalBytesExpectedToWrite = res.totalBytesExpectedToWrite
					this.totalBytesWritten = res.totalBytesWritten
				})
			}
		},
		onLoad(){
			//this.downloadLinpx()
		}
	}
</script>

<style lang="scss">

</style>
