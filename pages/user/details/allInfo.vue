<template>
	<view class="u-p-20">
		<view class="u-m-b-20">
			<uni-title type="h4" :title="$t('chat.info')" style="margin-left: 10px;"></uni-title>
			<view class="u-flex u-row-between bg">
				<text>{{$t("user.feedback-state")}}</text>
				<text>已结束</text>
			</view>
			<view class="u-flex u-row-between bg">
				<text>{{$t("user.inquiry-time")}}</text>
				<text>已结束</text>
			</view>
		</view>
		<view class="u-m-b-20">
			<uni-title type="h4" :title="$t('inquiry.product-info')" style="margin-left: 10px;"></uni-title>
			<view class="u-flex u-row-between bg">
				<text>{{$t('inquiry.product-name')}}</text>
				<text>新能源汽车</text>
			</view>
			<view class="u-flex u-row-between bg">
				<text>{{$t('inquiry.product-type')}}</text>
				<text>汽车</text>
			</view>
			<view class="u-flex u-row-between bg">
				<text>{{$t('inquiry.buy-quantity')}}</text>
				<text>200</text>
			</view>
			<view class="u-flex u-row-between bg">
				<text>{{$t('inquiry.unit-quantity')}}</text>
				<text>辆</text>
			</view>
			<view class="u-flex u-row-between bg">
				<text>{{$t('inquiry.quantity-unit')}}</text>
				<text>140000000</text>
			</view>
			<view class="u-flex u-row-between bg">
				<text>{{$t('inquiry.budget-amount')}}</text>
				<text>人民币</text>
			</view>
			<view class="u-flex u-row-between bg">
				<text>{{$t('inquiry.procurement-type')}}</text>
				<text>定制产品</text>
			</view>
			<view class="bg">
				<view>{{$t('inquiryItem.description')}}</view>
				<text>数量：500辆，出厂交货时间20天内，政府单位公务用车，需要可以定制车身上的指定颜色</text>
			</view>
			<view class="bg">
				<view>{{$t('inquiryItem.other')}}</view>
				<text>图片</text>
			</view>
		</view>
		<view class="u-m-b-20">
			<uni-title type="h4" :title="$t('inquiry.transport-payment')" style="margin-left: 10px;"></uni-title>
			<view class="u-flex u-row-between bg">
				<text>{{$t('inquiry.mode-transport')}}</text>
				<text>定制产品</text>
			</view>
			<view class="u-flex u-row-between bg">
				<text>{{$t('inquiry.destination')}}</text>
				<text>定制产品</text>
			</view>
			<view class="u-flex u-row-between bg">
				<text>{{$t('inquiry.delivery-time')}}</text>
				<text>定制产品</text>
			</view>
			<view class="u-flex u-row-between bg">
				<text>{{$t('inquiry.mothod-payment')}}</text>
				<text>定制产品</text>
			</view>

		</view>
		<view class="u-m-b-20">
			<uni-title type="h4" :title="$t('inquiryItem.contact-information')" style="margin-left: 10px;"></uni-title>
			<view class="u-flex u-row-between bg">
				<text>{{$t('inquiryItem.email')}}</text>
				<text>定制产品</text>
			</view>
			<view class="u-flex u-row-between bg">
				<text>{{$t('inquiryItem.company-name')}}</text>
				<text>定制产品</text>
			</view>
			<view class="u-flex u-row-between bg">
				<text>{{$t('inquiryItem.name')}}</text>
				<text>定制产品</text>
			</view>
			<view class="u-flex u-row-between bg">
				<text>{{$t('inquiryItem.contact-number')}}</text>
				<text>定制产品</text>
			</view>
		</view>
		<view class="u-m-l-20">
			<view class="u-flex">
				<checkbox :value="formData.radio1" checked="" style="transform:scale(0.6)" />
				{{$t('inquiryItem.radio1')}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapActions,
		mapState,
		mapGetters
	} from 'vuex';
	export default {

		data() {
			return {
				formData: {
					name: 'LiMing',
					email: 'dcloud@email.com',
					value: 1,
					radio1: true,
					radio2: false,
					range: [{
							value: 0,
							text: "篮球"
						},
						{
							value: 1,
							text: "足球"
						},
						{
							value: 2,
							text: "游泳"
						},
					],
				},

			}

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
			}
		}
	};
</script>

<style lang="scss" scoped>
	.button {
		width: 280px;
		display: inline-block;
	}

	.confirm {
		border-radius: 30px;
		border: 1px solid #ccc;
		font-size: 16px;
		font-weight: bold;
		height: 38px;
		line-height: 38px;
		color: #fff;
	}

	.bg {
		background-color: #fff;
		padding: 10px;
		font-size: 14px;
		margin-bottom: 1px;
	}
</style>