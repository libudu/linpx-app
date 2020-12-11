<template>
	<view>
		<lp-nav-bar type="back" title="支持" />
		<view class="support-main">
			<br>
			<view class="support-title">github开源仓库</view>
			<button @click="$share.openUrl('github')">游览器打开</button>
			<text>
				如果有github账号不妨点个star~
			</text>
			
			<br>
			<br>
			<text class="support-title">LINPX项目交流QQ群</text>
			<text @click="$share.openLinpxQQGroup" style="text-decoration: underline;display: block;">
				576268549(点击加入)
			</text>
			
			<br>
			<view class="share-download">
				<view class="support-title">分享下载链接</view>
				<button @click="$share.shareLinpxDownloadWithSystem">分享到应用</button>
				<button @click="$share.setClipboard(downloadUrl, '下载链接复制成功，快分享给朋友吧！')">复制链接</button>
			</view>
			
			<br>
			<view class="support-title">分享下载二维码</view>
			<img-cache style="width: 300rpx;" src="../../static/image/downloadQrcode.png"
			mode="widthFix" preview local></img-cache>
			<button @click="$share.shareLinpxQrcodeWithSystem">分享二维码</button>
			
			<br>
			<view class="support-title">赞助平台-爱发电</view>
			<button @click="$share.openUrl('afdian')">游览器打开</button>
			<button @click="$share.setClipboard(afdianUrl, '下载链接复制成功，快去支持创作者吧！')">复制链接</button>
			<br> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				afdianUrl:"https://afdian.net/@LINPX",
				downloadUrl:"http://api.linpx.linpicio.com/download"
			};
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
