<template>
	<view class="container">
		<view class="title">{{obj.title}}</view>
		<view class="content">
			{{obj.content}}
		</view>
	</view>
</template>

<script>
	// let obj = uni.getStorageSync('question')
	export default {
		data() {
			return {
				obj: {}
			}
		},
		mounted() {
			const storedUserInfo = uni.getStorageSync('question');
			if (storedUserInfo) {
				this.obj = JSON.parse(storedUserInfo)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		margin: 10px;
		padding: 10px;
		background-color: #fff;
	}

	.title {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.date {
		font-size: 16upx;
		color: #999;
		margin-bottom: 20px;
	}

	.content {
		border-top: 1px solid #eee;
		padding-top: 10px;
		font-size: 14px;
		line-height: 1.8;
	}
</style>