<template>
	<view class="container">
		<uni-forms ref="form" :modelValue="baseFormData" class="form" :rules="rules">
			<uni-forms-item :label-width="95" :label="$t('login.user-name')" name="username">
				<uni-easyinput class="labelInput" v-model="baseFormData.username"
					:placeholder="$t('register.in-username')" disabled/>
			</uni-forms-item>
			<uni-forms-item :label-width="95" :label="$t('login.email-code')" name="emailcode">
				<view style="width:100%;display:flex;justify-content:space-between;">
					<uni-easyinput class="labelInput1" v-model="baseFormData.emailcode"
						:placeholder="$t('register.in-email-code')" />
					<button class="button" size="mini" type="default"
						@click="getVode">{{sendCode ?  nums : $t('login.in-email-code')}}</button>
				</view>
			</uni-forms-item>
			<uni-forms-item :label-width="95" :label="$t('user.password-old')" name="oldpassword">
				<uni-easyinput class="labelInput" v-model="baseFormData.oldpassword" type="password"
					:placeholder="$t('inquiryItem.place-input')" />
			</uni-forms-item>
			<uni-forms-item :label-width="95" :label="$t('user.password-new')" name="userpassword">
				<uni-easyinput class="labelInput" v-model="baseFormData.userpassword" type="password"
					:placeholder="$t('inquiryItem.place-input')" />
			</uni-forms-item>
			<uni-forms-item :label-width="95" :label="$t('forget.confirm-password')" name="userpassword1">
				<uni-easyinput class="labelInput" v-model="baseFormData.userpassword1" type="password"
					:placeholder="$t('inquiryItem.place-input')" />
			</uni-forms-item>
			<button type="primary" @click="submit('valiForm')">{{$t('forget.submit')}}</button>
		</uni-forms>
		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sendCode: false,
				num: 120,
				timer: null,
				nums: '120s',
				baseFormData: {
					username: '',
					oldpassword:'',
					userpassword: '',
					userpassword1: '',
					emailcode: '',
					msgType: 'success',
					messageText: '这是一条成功提示',
				},
				rules: {
					username: {
						rules: [{
								required: true,
								errorMessage: this.$t('register.in-username'),
							},
							{
								validateFunction: (rule, value, data, callback) => {
									if (value !== '123456') {
										callback(this.$t('forget.rule-username'))
									}
									return true
								},
							}
						]
					},
					oldpassword: {
						rules: [{
								required: true,
								errorMessage: this.$t('user.password-rule'),
							},
							{
								pattern: /^(?=.*[0-9])(?=.*[A-Za-z!@#$%^&*?~<>,._;:'"=+-]).{6,16}$/,
								errorMessage: this.$t('user.password-rule'),
							}
						]
					},
					userpassword: {
						rules: [{
								required: true,
								errorMessage: this.$t('register.in-password'),
							},
							{
								validateFunction: (rule, value, data, callback) => {
									let pattern= /^(?=.*[0-9])(?=.*[A-Za-z!@#$%^&*?~<>,._;:'"=+-]).{6,16}$/
									if (!pattern.test(value)) {
										callback(this.$t('register.rules-password'))
									}else if (value === this.baseFormData.oldpassword){
										callback(this.$t('user.password-rule1'))
									}
									return true
								},
							}
						]
					},
					emailcode: {
						rules: [{
							required: true,
							errorMessage: this.$t('register.rules-code'),
						}, {
							validateFunction: (rule, value, data, callback) => {
								if (value !== '1234') {
									callback(this.$t('forget.rule-code'))
								}
								return true
							},
						}]
					},
					userpassword1: {
						rules: [{
							required: true,
							errorMessage: this.$t('register.in-password'),
						}, {
							validateFunction: (rule, value, data, callback) => {
								if (value !== this.baseFormData.userpassword) {
									callback(this.$t('forget.rule-password'))
								}
								return true
							},
						}]
					}
				},
			};
		},

		methods: {
			timers() {
				if (this.num <= 0) {
					clearTimeout(this.timer)
					this.num = 120
					this.sendCode = false
					this.timer = null
				} else {
					if (this.sendCode) {
						this.num = this.num - 1
						this.nums = this.num + 's'
						this.timer = setTimeout(() => {
							this.timers()
						}, 1000)
					}
				}
			},
			getVode() {
				if (!this.sendCode ) {
					this.sendCode = true
					this.timers()
					// this.$request.post('api/sysAuth/emailCode',{email:this.baseFormData.email,
					// 	type:2})
				}
			},
			submit(form) {
				this.$refs.form.validate().then(res => {
					this.msgType = 'success'
					this.messageText = this.$t('forget.success')
					this.$refs.message.open()
					setTimeout(() => {
						uni.navigateTo({
							url: "../login/login"
						})

					}, 500)
				}).catch(err => {
					this.msgType = 'error'
					this.messageText = this.$t('forget.error')
					this.$refs.message.open()
					console.log('表单错误信息：', err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.button {
		height: 68rpx;
		line-height: 68rpx;
		margin: 0
	}

	.form {
		border-top: 1px solid #eee;
		padding: 40rpx 10rpx;
		background-color: #fff;
	}
</style>