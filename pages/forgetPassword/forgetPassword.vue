<template>
	<view class="container">
		<uni-forms ref="form" :modelValue="baseFormData" class="form" :rules="rules">
			<uni-forms-item :label-width="85" :label="$t('login.email-name')" name="email">
				<uni-easyinput class="labelInput" v-model="baseFormData.email" :placeholder="$t('register.in-email')" />
			</uni-forms-item>
			<uni-forms-item :label-width="85" :label="$t('login.email-code')" name="verificationCode">
				<view style="width:100%;display:flex;justify-content:space-between;">
					<uni-easyinput class="labelInput1" v-model="baseFormData.verificationCode"
						:placeholder="$t('register.in-email-code')" />
					<button class="button" size="mini" type="default"
						@click="getVode">{{sendCode ?  nums : $t('login.take-email-code')}}</button>
				</view>
			</uni-forms-item>
			<uni-forms-item :label-width="85" :label="$t('forget.set-password')" name="newPassword">
				<uni-easyinput class="labelInput" v-model="baseFormData.newPassword" type="password"
					:placeholder="$t('register.in-password')" />
			</uni-forms-item>
			<uni-forms-item :label-width="85" :label="$t('forget.confirm-password')" name="confirmNewPassword">
				<uni-easyinput class="labelInput" v-model="baseFormData.confirmNewPassword" type="password"
					:placeholder="$t('forget.again-password')" />
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
				baseFormData: {
					email: '',
					newPassword: '',
					confirmNewPassword: '',
					verificationCode: '',
				},
				msgType: 'success',
				messageText: '这是一条成功提示',
				sendCode: false,
				num: 60,
				timer: null,
				nums: '60s',
				rules: {
					email: {
						rules: [{
								required: true,
								errorMessage: this.$t('register.rules-email'),
							},
							{
								pattern: /^\w+(-+.\w+)*@\w+(-.\w+)*.\w+(-.\w+)*$/,
								errorMessage: this.$t('register.rules-email')
							}
						]
					},
					newPassword: {
						rules: [{
								required: true,
								errorMessage: this.$t('register.in-password'),
							},
							{
								pattern: /^(?=.*[0-9])(?=.*[A-Za-z!@#$%^&*?~<>,._;:'"=+-]).{6,16}$/,
								errorMessage: this.$t('register.rules-password'),
							}
						]
					},
					// verificationCode: {
					// 	rules: [{
					// 		required: true,
					// 		errorMessage: this.$t('register.rules-code'),
					// 	}, {
					// 		validateFunction: (rule, value, data, callback) => {
					// 			console.log(typeof value);
					// 			if (typeof value === Number) {
					// 				callback(this.$t('forget.rule-code'))
					// 			}
					// 			return true
					// 		},
					// 	}]
					// },
					confirmNewPassword: {
						rules: [{
							required: true,
							errorMessage: this.$t('register.in-password'),
						}, {
							validateFunction: (rule, value, data, callback) => {
								if (value !== this.baseFormData.newPassword) {
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
					this.num = 60
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
				if (!this.sendCode && this.baseFormData.email.length > 0) {
					this.sendCode = true
					this.timers()
					this.$request.post('api/sysAuth/emailCode', {
						email: this.baseFormData.email,
						type: 3
					})
				}
			},
			submit(form) {
				this.$refs.form.validate().then(res => {
					this.$request.post('api/sysAuth/forgetThePassword', {
						email: res.email,
						verificationCode: res.verificationCode,
						newPassword: res.newPassword,
						confirmNewPassword: res.confirmNewPassword,
					}).then(res => {
						this.msgType = 'success'
						this.messageText = this.$t('forget.success')
						this.$refs.message.open()
						
					setTimeout(() => {
						uni.navigateTo({
							url: "../login/login"
						})
					}, 500)
					})
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

	.container {
		background-color: #fff;
		height: 100vh;
		border-top: 1px solid #eee;
	}

	.form {
		border-top: 1px solid #eee;
		padding: 40rpx 10rpx;
		background-color: #fff;
	}
</style>