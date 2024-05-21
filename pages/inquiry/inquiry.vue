<template>
	<scroll-view scroll-y>
		<uni-forms ref="form" :modelValue="formData" :rules="rules" :label-width="90">
			<view>
				<uni-title type="h4" :title="$t('inquiry.product-info')" style="margin-left: 10px;"></uni-title>
				<view style="background-color: #fff;padding: 10px;margin: 10px;">
					<uni-forms-item :label="$t('inquiry.product-name')" name="subject" required>
						<uni-easyinput type="text" v-model="formData.name"
							:placeholder="$t('inquiryItem.place-input')" />
					</uni-forms-item>
					<uni-forms-item :label="$t('inquiry.product-type')" name="subject">
						<uni-data-select v-model="value" :localdata="range"
							:placeholder="$t('inquiryItem.place-change')" @change="change"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item :label="$t('inquiry.buy-quantity')" name="subject" required>
						<uni-easyinput type="text" v-model="formData.name"
							:placeholder="$t('inquiryItem.place-input')" />
					</uni-forms-item>
					<uni-forms-item :label="$t('inquiry.unit-quantity')" name="subject" required>
						<uni-data-select v-model="value" :localdata="range"
							:placeholder="$t('inquiryItem.place-change')" @change="change"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item :label="$t('inquiry.quantity-unit')" name="subject" required>
						<uni-easyinput type="text" v-model="formData.name"
							:placeholder="$t('inquiryItem.place-input')" />
					</uni-forms-item>
					<uni-forms-item :label="$t('inquiry.budget-amount')" name="subject" required>
						<uni-data-select v-model="value" :localdata="range"
							:placeholder="$t('inquiryItem.place-change')" @change="change"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item :label="$t('inquiry.procurement-type')" name="quantity">
						<uni-data-select v-model="value" :localdata="range"
							:placeholder="$t('inquiryItem.place-change')" @change="change"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item :label="$t('inquiryItem.description')" name="description" required
						style="margin-bottom: 40PX;">
						<uni-easyinput class="input" row="5" maxlength="5000" v-model="formData.textarea"
							type="textarea" :placeholder="$t('inquiryItem.place-description')" />
					</uni-forms-item>
					<uni-forms-item :label="$t('inquiryItem.other')" name="other">
						<uni-file-picker limit="3" file-mediatype="all"
							:title="$t('inquiryItem.place-other')"></uni-file-picker>
					</uni-forms-item>
				</view>
			</view>
			<view>
				<uni-title type="h4" :title="$t('inquiry.transport-payment')" style="margin-left: 10px;"></uni-title>
				<view style="background-color: #fff;padding: 10px;margin: 10px;">
					<uni-forms-item :label="$t('inquiry.mode-transport')" name="email" required>
						<uni-data-select v-model="value" :localdata="range"
							:placeholder="$t('inquiryItem.place-change')" @change="change"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item :label="$t('inquiry.destination')" name="companyname" required>
						<uni-data-select v-model="value" :localdata="range"
							:placeholder="$t('inquiryItem.place-change')" @change="change"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item :label="$t('inquiry.delivery-time')" name="name" required>
						<uni-data-select v-model="value" :localdata="range"
							:placeholder="$t('inquiryItem.place-change')" @change="change"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item :label="$t('inquiry.mothod-payment')" name="contactnumber" required>
						<uni-data-select v-model="value" :localdata="range"
							:placeholder="$t('inquiryItem.place-change')" @change="change"></uni-data-select>
					</uni-forms-item>
				</view>
			</view>
			<view>
				<uni-title type="h4" :title="$t('inquiryItem.contact-information')"
					style="margin-left: 10px;"></uni-title>
				<view style="background-color: #fff;padding: 10px;margin: 10px;">
					<uni-forms-item :label="$t('inquiryItem.email')" name="email" required>
						<uni-easyinput type="text" v-model="formData.name"
							:placeholder="$t('inquiryItem.place-input')" />
					</uni-forms-item>
					<uni-forms-item :label="$t('inquiryItem.company-name')" name="companyname" required>
						<uni-easyinput class="input" v-model="formData.email" type="text"
							:placeholder="$t('inquiryItem.place-input')"
							@input="binddata('email',$event.detail.value)" />
					</uni-forms-item>
					<uni-forms-item :label="$t('inquiryItem.name')" name="name" required>
						<uni-easyinput class="input" v-model="formData.time" type="text"
							:placeholder="$t('inquiryItem.place-input')" />
					</uni-forms-item>
					<uni-forms-item :label="$t('inquiryItem.contact-number')" name="contactnumber" required>
						<uni-easyinput class="input" v-model="formData.time" type="text"
							:placeholder="$t('inquiryItem.place-input')" />
					</uni-forms-item>
				</view>
			</view>
			<view class="u-m-l-20">
				<uni-forms-item label-width="0" label="" name="radio1">
					<view class="u-flex">
						<input type="radio" v-model="formData.radio1" />{{$t('inquiryItem.radio1')}}
					</view>
				</uni-forms-item>
			</view>
			<view class="u-flex u-row-center u-m-b-100">
				<button type="primary" @click="submit('form')"
					class="button confirm ">{{$t('inquiryItem.submit')}}</button>
			</view>
		</uni-forms>
	</scroll-view>
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
				radio1: '同意与厂家分享我的联系方式',
				radio2: '同时邀请更多优质厂家报价',
				formData: {
					name: 'LiMing',
					email: 'dcloud@email.com',
					value: 1,
					radio1: false,
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
				rules: {
					subject: {
						rules: [{
							required: true,
							errorMessage: this.$t('inquiryItem.place-subject'),
						}, {
							minLength: 1,
							maxLength: 20,
							errorMessage: this.$t('inquiryItem.place-subject'),
						}]
					},
					quantity: {
						rules: [{
							required: true,
							errorMessage: this.$t('inquiryItem.place-quantity'),
						}]
					},
					unit: {
						rules: [{
							required: true,
							errorMessage: this.$t('inquiryItem.place-unit'),
						}]
					},
					description: {
						rules: [{
							required: true,
							errorMessage: this.$t('inquiryItem.place-description'),
						}]
					},
					email: {
						rules: [{
							required: true,
							errorMessage: this.$t('inquiryItem.place-email'),
						}, {
							pattern: /^\w+(-+.\w+)*@\w+(-.\w+)*.\w+(-.\w+)*$/,
							errorMessage: this.$t('register.rules-email'),
						}]
					},
					country: {
						rules: [{
							required: true,
							errorMessage: this.$t('inquiryItem.place-country'),
						}]
					},
					companyname: {
						rules: [{
							required: true,
							errorMessage: this.$t('inquiryItem.place-company-name'),
						}]
					},
					name: {
						rules: [{
							required: true,
							errorMessage: this.$t('inquiryItem.place-name'),
						}]
					},
					address: {
						rules: [{
							required: true,
							errorMessage: this.$t('inquiryItem.place-address'),
						}]
					},
					contactnumber: {
						rules: [{
							required: true,
							errorMessage: this.$t('inquiryItem.place-contact-number'),
						}]
					},
					radios1: {
						rules: [{
							required: true,
							errorMessage: this.$t('inquiryItem.place-radios1'),
						}]
					},
				}
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
</style>