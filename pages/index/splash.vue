<template>
	<!-- 启动页内容，可以是一张背景图或简单动画 -->
	<view class="container">
		<view class="fixed">
			<view class="btn" @click="onToIndex">{{$t("index.experience")}}</view>
			<view class="btn" @click="onToLogin">{{$t("index.login")}}/{{$t("register.submit")}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			/**
			 * 获取本地存储中launchFlag的值
			 * 若存在，说明不是首次启动，直接进入首页；
			 * 若不存在，说明是首次启动，进入引导页；
			 */
			//  获取本地存储中launchFlag标识
			const value = uni.getStorageSync('launchFlag');
			if (value) {
				// launchFlag=true直接跳转到首页
				const token = uni.getStorageSync('token');
				if (token) {
					uni.switchTab({
						url: '/pages/index/index',
					});
				} else {
					uni.redirectTo({
						url: '/pages/login/login',
					});
				}
			} else {
				uni.setStorage({
					key: 'launchFlag',
					data: true,
					success: function() {
						console.log('error时存储launchFlag');
					}
				});
			}
		},
		methods: {
			onToLogin() {
				uni.redirectTo({
					url: '/pages/login/login',
				});
			},
			onToIndex() {
				uni.navigateBack({
					url: '/pages/index/index',
				})
			},
		}
	};
</script>
<style lang="scss" scoped>
	.container {
		background-color: #ccc;
		position: relative;
		height: 100vh;

		.fixed {
			position: absolute;
			left: 10vw;
			bottom: 10vh;

			.btn {
				width: 80vw;
				height: 80rpx;
				line-height: 80rpx;
				border-radius: 40rpx;
				background-color: #15b4fb;
				margin-bottom: 40rpx;
				text-align: center;
				color: #fff;
			}
		}
	}
</style>