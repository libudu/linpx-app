<template>
	<view>
		<lp-nav-bar type="back" title="更新"></lp-nav-bar>
		<view class="u-flex u-row-center" style="flex-direction: column;font-size: 42rpx;">
			<br>
			<br>
			<view>当前版本：{{$config.get('version')}}</view>
			<view>最新版本：{{$config.get('remoteVersion')}}</view>
			
			<view v-if="needUpdate">新版信息：【这里还没做】</view>
			<view v-if="!needUpdate">当前已是最新版</view>
			
			<br>
			<!-- 需要更新且本地有安装包，那就直接用本地安装包 -->
			<view v-if="localLinpxApk" class="u-flex u-row-center" style="flex-direction: column;">
				<view>检测到本地安装包</view>
				<lp-button style="font-size: 40rpx;width: 200rpx;line-height: 80rpx;" @click="clickInstallButton">安装</lp-button>
			</view>
			
			<!-- 需要更新且本地没有安装包，则显示下载按钮 -->
			<view v-if="needUpdate && !localLinpxApk" class="u-flex u-row-center" style="flex-direction: column;">
				<lp-button style="font-size: 40rpx;width: 200rpx;line-height: 80rpx;"
				@click="downloadLinpx">下载</lp-button>
			</view>
		</view>
		<u-mask v-show="isDownloading" :show="true" zoom class="u-flex u-row-center">
			<view style="text-align: center;">
				<view style="color: white;font-size: 34rpx;">{{textTip}}</view>
				<view style="color: white;font-size: 30rpx;">{{downloadSizeTip}}</view>
				<u-line-progress active-color="#2979ff" :percent="downloadProcess"
				style="width: 400rpx;height: 50rpx;margin-top: 20rpx;" />
				<view style="margin-top: 30rpx;">
					<lp-button @click='downloadBackground'>后台下载</lp-button>
					<view style="width: 50rpx;display: inline-block;" />
					<lp-button @click="downloadTask.abort()">终止下载</lp-button>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前是否需要更新
				needUpdate:false,
				// 下载是否已完成
				isDownloading:false,
				// 本地已有缓存
				localLinpxApk:undefined,
				// 下载进度、总字节、已下载字节
				downloadTask:undefined,
				downloadProcess:0,
				totalBytesExpectedToWrite:0,
				totalBytesWritten:0,
				// 省略号动画
				ellipsisCount:0
			};
		},
		computed:{
			downloadSizeTip(){
				if(this.totalBytesExpectedToWrite && this.totalBytesWritten){
					let now = (this.totalBytesWritten / 1000000).toFixed(2)
					let all = (this.totalBytesExpectedToWrite / 1000000).toFixed(2)
					return `${now}m / ${all}m`
				}
				return ""
			},
			textTip(){
				return "正在下载"+'.'.repeat(this.ellipsisCount)
			}
		},
		methods:{
			downloadBackground(){
				uni.showToast({
					icon:"none",
					title:"已在后台下载~"
				})
				uni.navigateBack()
			},
			clickInstallButton(){
				plus.runtime.install(this.localLinpxApk.path)
			},
			downloadLinpx(){
				this.isDownloading = true
				// 省略号字符动画
				let intervalId = setInterval(()=>{
					this.ellipsisCount = (this.ellipsisCount + 1) % 7
				},500)
				// 在下面用this.$config不知道为什么会丢失引用
				let $config = this.$config
				// 开始下载
				this.downloadTask = uni.downloadFile({
					url: this.$api.BASE_URL+'download',
					// 下载成功
					success: (res) => {
						if (res.statusCode === 200) {
							// 保存文件
							uni.saveFile({
								tempFilePath:res.tempFilePath,
								success(res) {
									// 尝试安装
									let value = {
										path: res.savedFilePath,
										version: $config.get('remoteVersion')
									}
									// 记录文件路径和版本
									$config.set('localLinpxApk', value)
									plus.runtime.install(res.savedFilePath)
								},
								fail(res) {
									uni.showModal({
										title:"文件保存失败："+res
									})
								}
							})
						}
					},
					// 下载错误提示
					fail(res) {
						uni.showToast({
							icon:"none",
							title:"下载失败"+res.errMsg
						})
					},
					// 不管怎样，下载完成了就取消字符动画、回到主页面
					complete: () => {
						this.isDownloading = false
						clearInterval(intervalId)
						uni.redirectTo({
							url:"../search/search"
						})
					}
				})
				this.downloadTask.onProgressUpdate((res) => {
					this.downloadProcess = res.progress
					this.totalBytesExpectedToWrite = res.totalBytesExpectedToWrite
					this.totalBytesWritten = res.totalBytesWritten
				})
			}
		},
		onLoad(options){
			// 确认是否需要更新
			this.needUpdate = this.$api.checkUpdate()
			if(options.download){
				this.downloadLinpx()
			}
			// 如果需要更新
			if(this.needUpdate){
				// #ifdef APP-PLUS
				// 先看有没有安装包记录
				let localApk = this.$config.get('localLinpxApk')
				if(localApk){
					let localApkVersion = localApk.version
					let remoteApkVersion = this.$config.get('remoteVersion')
					// 有记录那看看文件存不存在
					plus.io.resolveLocalFileSystemURL(localApk.path, (res)=>{
						// 文件存在，对比版本号
						if(localApkVersion == remoteApkVersion){
							this.localLinpxApk = localApk
						}
					}, (res)=>{
						// 文件不存在，需要删掉记录
						this.$config.set('localLinpxApk', undefined)
					})
				}
				// #endif
			}
			
		}
	}
</script>

<style lang="scss">

</style>
