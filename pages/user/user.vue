<template>
	<view class="container">
		<view class="header" v-if="isLogin">
			<view class="avatar" @click="onToUser('id')">
				<image src="https://demo.shopro.top/uploads/20240308/3de27769f453c6ecb4b1e2498a39a7e4.png" style="width: 100%;height: 100%;border-radius: 50%;"></image>
			</view>
			<view class="info">
				<view class="username">admin</view>
				<view class="email">888888888@163.com</view>
			</view>
		</view>
		<view class="header" v-if="!isLogin">
			<view class="avatar" @click="onToLogin">
				<image src="https://demo.shopro.top/uploads/20240308/3de27769f453c6ecb4b1e2498a39a7e4.png" style="width: 100%;height: 100%;border-radius: 50%;"></image>
			</view>
			<button class="btn" @click="onToLogin">
				{{$t("index.login")}}/{{$t("register.submit")}}
			</button>
		</view>
		<view class="menu">
			<view class="section-title">{{$t("user.mine-section")}}</view>
			<view class="section-body">
				<view v-for="(item,index) in myServices" :key="index" @click="onServiceClick(item.href)"
					class="section">
					<cover-image class="icon" :src="item.icon"></cover-image>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		<view class="menu">
			<view class="section-title">{{$t("user.platform-section")}}</view>
			<view class="section-body">
				<view v-for="(item,index) in platformServices" :key="index" @click="onServiceClick(item.href)"
					class="section">
					<cover-image class="icon" :src="item.icon"></cover-image>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "MyMenu",
		data() {
			return {
				isLogin: false,
				myServices: [{
						icon: '../../static/images/icon/inquiry.png',
						title: this.$t("user.mineInquiry"),
						href: './mineInquiry'
					}, {
						icon: '../../static/images/icon/tracks.png',
						title: this.$t("user.mine-footmark"),
						href: './mineFootmark'
					},
					{
						icon: '../../static/images/icon/collection.png',
						title: this.$t("user.mine-collect"),
						href: './mineCollection'
					}
				],
				platformServices: [{
						icon: '../../static/images/icon/question.png',
						title: this.$t("user.platform-problem"),
						href: './mineQuestion'
					}, {
						icon: '../../static/images/icon/suggestion.png',
						title: this.$t("user.platform-feedback"),
						href: './mineSuggestion'
					},
					{
						icon: '../../static/images/icon/set.png',
						title: this.$t("user.platform-set"),
						href: './mineSet'
					}
				],
			};
		},
		methods: {
			onServiceClick(path) {
				this.$Router.push({
					path: path
				})
			},
			onToLogin() {
				uni.navigateTo({
					url: `../../pages/login/login`
				})
			},
			onToUser(id) {
				this.$Router.push({
					path: './info',
					query: {
						id
					}
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		padding: 10px;
	}

	.header {
		display: flex;
		align-items: center;
		padding: 40px 20px;
		background-color:#15b4fb;
		border-radius: 10px;
		color: #fff;
	}

	.avatar {
		width: 60px;
		height: 60px;
		background-size: cover;
		background-position: center;
		background-color: #fff;
		border-radius: 50%;
		color: #000;
		margin-right: 20px;
	}

	.btn {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		border-radius: 30px;
		margin: 0;
	}

	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.username {
		font-size: 18px;
		font-weight: bold;
	}

	.email {
		font-size: 14px;
		color: #eee;
		margin-top: 10px;
	}

	.menu {
		margin-top: 20px;
		background-color: #fff;
		padding: 10px;
		border-radius: 5px;
	}

	.section-title {
		font-size: 14px;
		font-weight: bold;
		padding-bottom: 10px;
		border-bottom: 1px solid #ccc;
	}

	.section-body {
		padding: 20px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.section {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-right: 30px;
		font-size: 12px;
	}

	.icon {
		width: 24px;
		height: 24px;
		margin-bottom: 10px;
	}
</style>