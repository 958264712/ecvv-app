<!-- 个人信息 -->
<template>
	<view class="container u-m-15">
		<view class="user-list u-flex u-row-between ">
			<text class="list-name">头像</text>
			<view class="u-flex" @tap="onChooseImg">
				<!-- <image class="avatar" :src="userData.avatar" mode=""></image> -->
				<view class="avatar" style="background-color: #999;">头像</view>
				<text class="u-iconfont uicon-arrow-right u-m-l-20" style="color:#999;"></text>
			</view>
		</view>
		<view class="user-list u-flex u-row-between">
			<text class="list-name">账号</text>
			<view class="u-flex">
				admin
			</view>
		</view>
		<view class="user-list  u-flex u-row-between u-m-b-10" @tap="showCalendar = true">
			<text class="list-name">邮箱</text>
			<view class="u-flex">
				<text class="list-val">888888888@163.com</text>
			</view>
		</view>
	</view>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import Auth from "@/shopro/permission/index.js";

export default {
	components: {},
	data() {
		return {
			userData: {},
			showCalendar: false,
		};
	},
	computed: {
		...mapGetters(["userInfo", "authType"])
	},
	onLoad() {
		this.userData = JSON.parse(JSON.stringify(this.userInfo));
	},
	methods: {
		...mapActions(["getUserInfo", "showAuthModal", "logout"]),

		// 更换头像
		async onChooseImg() {
			let authState = 0;
			authState += await new Auth("writePhotosAlbum").check();
			if (authState < 1) return;
			authState += await new Auth("camera").check();
			if (authState < 2) return;
			const chooseImageRes = await this.chooseImage(1);
			const uploadImageRes = await this.uploadImage(chooseImageRes[0]);
			this.userData.avatar = uploadImageRes.fullurl;
			this.userData.fileUrl = uploadImageRes.url;
			this.editInfoDisabled = this.userData.avatar == this.userInfo.avatar;
		},



		// 图片处理-选择图片
		async chooseImage(count = 1) {
			return new Promise((resolve, reject) => {
				uni.chooseImage({
					count: count, //默认9
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album"], //从相册选择
					success: res => {
						resolve(res.tempFilePaths);
					}
				});
			}).catch(e => {
				console.log(e);
			});
		},
		// 图片处理-上传图片
		async uploadImage(url) {
			const that = this;
			return new Promise((resolve, reject) => {
				that.$u.toast("上传中...");
				uni.uploadFile({
					url: that.$BASE_URL + "/api/common/upload",
					filePath: url,
					name: "file",
					header: { token: uni.getStorageSync("token") },
					success: res => {
						res = JSON.parse(res.data);
						if (res.code === 1) {
							that.$u.toast("上传成功");
							resolve(res.data);
						} else {
							that.$u.toast("上传失败");
						}
					},
					complete: e => {
						uni.hideLoading();
					}
				});
			}).catch(e => {
				console.log(e);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
// 基本信息
.info-head {
	.info-title {
		line-height: 60rpx;
		font-size: 28rpx;
		font-weight: 600;
		color: #333333;
	}

	.save-btn {
		color: #fff;
		background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
		width: 100rpx;
		border-radius: 30rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
	}

	.dis-btn {
		opacity: 0.5;
	}
}

// 三方
.other-account {
	.head-title {
		line-height: 82rpx;
		font-size: 28rpx;
		font-weight: 600;
		color: #333333;
	}

	.list-img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}

	.account-list {
		background-color: #fff;
		height: 100rpx;
		padding: 0 20rpx;

		.info {
			.avatar {
				width: 38rpx;
				height: 38rpx;
				border-radius: 50%;
				overflow: hidden;
			}

			.name {
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
			}
		}

		.bind-box {
			.bind-btn {
				padding: 0 20rpx;
				line-height: 60rpx;
				background: #f5f6f8;
				border-radius: 20rpx;
				color: #999;
			}

			.relieve-btn {
				border-radius: 20rpx;
				padding: 0 20rpx;
				line-height: 60rpx;
				background: rgba(#ff0000, 0.05);
				color: #ff0000;
			}
		}
	}
}

// 个人信息项
.user-list {
	background: #fff;
	height: 100rpx;
	border-bottom: 1rpx solid #f6f6f6;
	padding: 0 20rpx;

	.list-name {
		font-size: 28rpx;
	}

	.avatar {
		width: 67rpx;
		height: 67rpx;
		border-radius: 50%;
	}

	.list-val {
		color: #999;
		font-size: 28rpx;
		text-align: right;
	}
}

.btn-box {
	margin-top: 200rpx;

	.logout-btn {
		width: 710rpx;
		height: 80rpx;
		line-height: 80rpx;
		border: 1rpx solid #f54141;
		border-radius: 40rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #f54141;
	}

	.hover-logout-btn {
		width: 710rpx;
		height: 80rpx;
		background: #f54141;
		border: 1rpx solid #f54141;
		border-radius: 40rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #ffffff;
	}
}
</style>
