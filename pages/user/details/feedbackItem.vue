<template>
	<view class="container">
		<view class="u-flex u-row-between">
			{{$t("user.feedback-type")}}：
			<view class="time">
				{{obj.type===0 ? $t("user.feedback-type0") :obj.type===1 ? $t("user.feedback-type1"):$t("inquiryItem.other")}}
			</view>
		</view>
		<view class="content">
			<view class="u-m-b-20">
				{{obj.title}}
			</view>
			<view class="u-flex" v-if="obj.files.length>0">
				<image :src="item" v-for="item in obj.files" :key="item"></image>
			</view>
		</view>
		<view class="u-flex u-row-between u-p-b-20 u-m-b-20" style="border-bottom:1px solid #eee;">
			{{$t("user.feedback-time")}}：
			<view class="time">
				{{obj.time}}
			</view>
		</view>
		<view class="u-flex u-row-between">
			{{$t("user.feedback-state")}}：
			<view class="time">
				{{obj.feedback.length > 0 ? $t("user.inquiry-has") : $t("user.inquiry-no")}}
			</view>
		</view>
	</view>
	<view class="container" v-if="obj.feedback.length > 0">
		<view class="u-flex u-row-between">{{$t("user.feedback-back")}}</view>
		<view class="content time">{{obj.feedback}}</view>
		<view class="u-flex u-row-between">
			{{$t("user.inquiry-recovery-time")}}
			<view class="time">
				{{obj.time}}
			</view>
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
			const storedUserInfo = uni.getStorageSync('feedback');
			if (storedUserInfo) {
				this.obj = JSON.parse(storedUserInfo)
			}
			console.log(this.obj);
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

	.time {
		font-size: 14px;
		color: #999;
	}

	.content {
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		padding: 10px 0;
		margin: 10px 0;
		font-size: 14px;
		line-height: 1.8;
	}
</style>