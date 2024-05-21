<template>
	<!-- 标题 -->
	<view class="uni-navbar u-flex u-row-between">
		<uni-icons type="left" size="22" @tap="back"></uni-icons>
		<view class="uni-page-head-bd" style="font-weight: bold;text-align: center;">{{$t("user.platform-feedback")}}
		</view>
		<view class="btn" @click="onToFeedback">
			<view class="num" v-if="num>0">{{num}}</view>
			<image src="../../static/images/icon/feedback.png" style="width: 20px;height: 20px;"></image>
		</view>
	</view>
	<view class="u-p-20 u-m-t-80 ">
		<uni-forms ref="form" :modelValue="formData" class="u-p-20 bg-white" :rules="rules" :label-width="90">
			<uni-forms-item :label='$t("user.feedback-type")' name="feedbackType" required>
				<uni-data-select v-model="formData.select" :localdata="range"
					:placeholder="$t('inquiryItem.place-change')" @change="change"></uni-data-select>
			</uni-forms-item>
			<uni-forms-item label="" name="textarea" label-width="0">
				<textarea :placeholder='$t("user.feedback-rule")' class="u-p-20"
					style="width:100%;border: 1px solid #ccc;" :value="formData.textarea" :maxlength="500" />
			</uni-forms-item>
			<uni-forms-item label="" label-width="0" name="other">
				<uni-file-picker limit="3" :title="$t('inquiryItem.place-other')"></uni-file-picker>
			</uni-forms-item>
		</uni-forms>
	</view>
	<view class="u-flex u-row-center fixed">
		<button type="primary" @click="submit('form')" class="button confirm ">{{$t('inquiryItem.submit')}}</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				num: 1,
				range: [{
						value: 0,
						text: this.$t("user.feedback-type0")
					},
					{
						value: 1,
						text: this.$t("user.feedback-type1")
					},
					{
						value: 2,
						text: this.$t("inquiryItem.other")
					},
				],
				formData: {
					textarea: '',
					select: ''
				},
				rules: {
					feedbackType: {
						rules: [{
							required: true,
							errorMessage: this.$t('inquiryItem.place-change'),
						}]
					},
					textarea: {
						rules: [{
							required: true,
							errorMessage:this.$t("user.feedback-rule"),
						}, {
							min: 10,
							errorMessage: this.$t("user.feedback-rule")
						}]
					},
				}
			};
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `校验通过`
					})
				}).catch(err => {
					console.log('err', err);
				})
			},
			back() {
				uni.navigateBack()

			},
			onToFeedback() {
				this.$Router.push({
					path: './details/feedback'
				})
			}
		}
	};
</script>
<style lang="scss" scoped>
	.uni-navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 44px;
		/* 考虑到状态栏高度 */
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 7px 3px;
		background-color: #fff;
		z-index: 99;
	}

	.button {
		width: 340px;
		display: inline-block;
		position: fixed;
		bottom: 2vh;
	}

	.confirm {
		border-radius: 30px;
		border: 1px solid #ccc;
		font-size: 18px;
		font-weight: bold;
		height: 50px;
		line-height: 50px;
		color: #fff;
	}

	.btn {
		position: relative;
		margin-right: 10px;
	}

	.num {
		position: absolute;
		top: -8px;
		right: -6px;
		background-color: #d9001b;
		color: #fff;
		border-radius: 50%;
		text-align: center;
		width: 18px;
		font-size: 16rpx;
		line-height: 18px;
		z-index: 99;
	}
</style>