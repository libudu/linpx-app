<template>
	<view class="chat">
		<view class="chat-header">
			<u-navbar height="50" back-icon-size="40" :background="{background: '#eee'}">
				<view class="chat-header-inner">
					<view class="chat-header-title">{{config.title}}{{isBottom}}</view>
					<view class="chat-header-subtitle">{{config.subtitle}}</view>
				</view>
			</u-navbar>
		</view>
		<scroll-view class="chat-content-list" :style="{'overflow-anchor': 'none'}"
			scroll-y
			:scroll-top="scrollTop"
			:scroll-with-animation="scrollAnimation"
			@scroll="onScroll"
			:lower-threshold="20"
			@scrolltolower="onScrollBottom"
		>
			<view class="chat-content" v-for="(dialog,index) in contents" :key="index">
				<lp-chat-dialog v-if="!dialog.type"
					:text="dialog.text"
					:side="roles[dialog.role].side"
					:name="roles[dialog.role].name"
					:isRight="roles[dialog.role].isRight"
				/>
				<lp-chat-notice v-if="dialog.type === 'notice'" :text="dialog.text" />
			</view>
		</scroll-view>
		
		<uni-icons v-if="showScrollDown" class="chat-toread-tip" type="arrowdown" size="30"
			@click="clickDownIcon()"
		/>
		
		<view class="chat-footer"></view>
	</view>
</template>

<script>
	import Script from './script.json';
	export default {
		data() {
			return {
				// 运行时数据
				isBottom: true,
				scrollHeight: undefined,
				scrollTop: 1000000000,
				scrollAnimation: false,	// 是否启动滚动动画，最开始默认来到底部不要动画，启动之后延迟片刻再启动动画
				showScrollDown: false,	// 是否显示滑到底的按钮
				scrollInto: '',					// 控制scroll-view滑到底的字符串
				// 界面信息
				config:{},
				// 角色信息
				roles:{},
				// 对话框内容
				contents:[],
			};
		},
		onLoad() {
			setTimeout(()=>this.scrollAnimation = true, 300);
			this.loadObj(Script);
			
			// let time = 0;
			// setInterval(()=>{
			// 	time += 1;
			// 	this.addText({
			// 		role: '1',
			// 		text: '延迟消息' + time,
			// 	})
			// }, 2000);
		},
		mounted() {
			this.$u.getRect('.chat-content-list').then(res => {
				this.scrollHeight = res.height;
			});
		},
		methods:{
			addText(textObj){
				this.contents.push(textObj);
				// 如果当前在底部，那下滑
				if(this.isBottom){
					this.scrollToBottom();
				// 如果当前不在底部，那就只显示箭头，但不下滑
				} else {
					this.showScrollDown = true;
				}
			},
			loadObj(obj){
				this.config = obj.config;
				this.roles = obj.roles;
				this.contents = obj.contents;
			},
			// 点击到底部按钮，来到底部
			clickDownIcon(){
				this.scrollToBottom();
			},
			// 触发滚到最底下
			scrollToBottom(){
				this.scrollTop += 1;
				this.isBottom = true;
				this.showScrollDown = false;
			},
			onScroll(e){
				const d = e.detail;
				// 向上滚
				if(d.deltaY > 0 && d.scrollHeight - d.scrollTop - this.scrollHeight > 20){
					this.isBottom = false;
				}
			},
			// 手动滚到底部
			onScrollBottom(){
				this.isBottom = true;
				this.showScrollDown = false;
			}
		}
	}
</script>

<style lang="scss">
	.chat{
		height: 100vh;
		width: 100vw;
		background-color: #eee;
		font-family: 'SimHei';
		display: flex;
		flex-direction: column;
		overflow-y: hidden;
	}
	
	.chat-header{
		flex-shrink: 0;
		width: 100%;
		height: max-content;
		
		.chat-header-inner{
			margin-right: 80rpx;
			width: 100%;
			text-align: center;
			
			.chat-header-title{
				font-size: 34rpx;
			}
			
			.chat-header-subtitle{
				font-size: 20rpx;
			}
		}
	}
	
	.chat-content-list{
		flex-shrink: 1;
		overflow-y: hidden;
	}
	
	.chat-content{
		padding-bottom: 40rpx;
	}
	
	.chat-footer{
		flex-shrink: 0;
		height: 100rpx;
		width: 100%;
		background-color: white;
	}
	
	.chat-toread-tip{
		$bubble-size: 50rpx;
		width: $bubble-size;
		height: $bubble-size;
		
		color: $tim-blue-deep !important;
		
		// 位置
		position: fixed;
		right: 30rpx;
		bottom: 120rpx;
		z-index: 100;
	}
</style>