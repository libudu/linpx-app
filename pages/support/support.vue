<template>
	<view>
		<lp-nav-bar type="back" title="支持" />
		<view class="support-main">
			<view class="support-title">github开源仓库</view>
			<button @click="$share.openUrl('github')">游览器打开</button>
			<text>
				如果有github账号不妨点个star~
			</text>
			
			<text class="support-title">LINPX项目交流QQ群</text>
			<text @click="$share.openLinpxQQGroup" style="text-decoration: underline;display: block;">
				576268549(点击加入)
			</text>
			
			<view class="share-download">
				<view class="support-title">分享下载链接</view>
				<button @click="$share.shareLinpxDownloadWithSystem">分享到应用</button>
				<button @click="$share.setClipboard(downloadUrl, '下载链接复制成功，快分享给朋友吧！')">复制链接</button>
			</view>
			
			<view class="support-title">分享下载二维码</view>
			<image style="width: 400rpx;" src="@/static/image/downloadQrcode.png"
			mode="widthFix" preview local></image>
			<button @click="$share.shareLinpxQrcodeWithSystem">分享二维码</button>
			
			<view class="support-title">赞助平台-爱发电</view>
			<button @click="$share.openUrl('afdian')">游览器打开</button>
			<button @click="$share.setClipboard(afdianUrl, '下载链接复制成功，快去支持创作者吧！')">复制链接</button>
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
		margin-top: 30px;
		font-size: 44rpx;
	}
	button{
		width: 50%;
	}
</style>
