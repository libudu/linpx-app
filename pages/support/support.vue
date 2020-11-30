<template>
	<view>
		<lp-nav-bar type="back" title="支持" />
		<view class="support-main">
			<br>
			<view class="support-title">github开源仓库</view>
			<button @click="openUrl(githubUrl)">游览器打开</button>
			<text>
				如果有github账号不妨点个star~
			</text>
			
			<br>
			<br>
			<text class="support-title">LINPX项目交流QQ群</text>
			<text @click="clickGroupNum" style="text-decoration: underline;display: block;">
				576268549(点击加入)
			</text>
			
			<br>
			<view class="share-download">
				<view class="support-title">分享下载链接</view>
				<!-- 微信分享无法打开下载内容的页面，暂时不整 -->
				<!-- <button @click="shareDownload('weixin')">微信分享</button> -->
				<button @click="shareDownload('text')">分享到应用</button>
				<!-- 微博分享需要在应用内输密码，比较智障，暂时不整 -->
				<!-- <button @click="shareDownload('weibo')">微博分享</button> -->
				<button @click="setClipboard(downloadUrl, '下载链接复制成功，快分享给朋友吧！')">复制链接</button>
			</view>
			
			<br>
			<view class="support-title">分享下载二维码</view>
			<img-cache style="width: 300rpx;" src="../../static/image/downloadQrcode.png"
			mode="widthFix" preview local></img-cache>
			<button @click="shareDownload('image')">分享二维码</button>
			
			<br>
			<view class="support-title">赞助平台-爱发电</view>
			<button @click="openUrl(afdianUrl)">游览器打开</button>
			<button @click="setClipboard(afdianUrl, '下载链接复制成功，快去支持创作者吧！')">复制链接</button>
			<br>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				afdianUrl:"https://afdian.net/@LINPX",
				githubUrl:"https://github.com/libudu/linpx-frontend",
				downloadUrl:"http://api.linpx.linpicio.com/download"
			};
		},
		methods:{
			openUrl(url){
				plus.runtime.openURL(url)
			},
			setClipboard(text, successTip){
				uni.setClipboardData({
					data:text,
					success() {
						uni.hideToast()
						uni.showToast({
							icon:"none",
							title:successTip || "复制成功！"
						})
					}
				})
			},
			clickGroupNum(){
				plus.runtime.openURL('mqqwpa://card/show_pslcard?src_type=internal&version=1&uin=576268549&card_type=group&source=qrcode',function (res) {
					plus.nativeUI.alert("本机没有安装QQ，无法启动");
				});
			},
			shareDownload(type){
				if(type === 'text'){
					uni.shareWithSystem({
						summary:"♧深夜寂寞♧\n♤售人文学♤\n♡直连Pixiv♡\n☆点击即看☆",
						href:this.downloadUrl
					});
				}
				else if(type === 'image'){
					uni.shareWithSystem({
						summary:"♧深夜寂寞♧\n♤售人文学♤\n♡直连Pixiv♡\n☆点击即看☆",
						href:this.downloadUrl,
						imageUrl:"../../static/logo/app_logo.png"
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.support-main{
		text-align: center;
		font-size: 36rpx;
	}
	.support-title{
		font-size: 44rpx;
	}
	button{
		width: 50%;
	}
</style>
