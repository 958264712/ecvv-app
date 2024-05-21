<template>
	<view class="container">
		<uni-forms ref="form" :modelValue="baseFormData" class="form" :rules="rules">
			<uni-forms-item :label-width="85" :label="$t('login.user-name')" name="username">
				<uni-easyinput class="labelInput" v-model="baseFormData.username"
					:placeholder="$t('register.in-username')" />
			</uni-forms-item>
			<uni-forms-item :label-width="85" :label="$t('login.email-code')" name="emailcode">
				<view style="width:100%;display:flex;justify-content:space-between;">
					<uni-easyinput class="labelInput1" v-model="baseFormData.emailcode"
						:placeholder="$t('register.in-email-code')" />
					<button class="button" size="mini" type="default">{{$t('login.in-email-code')}}</button>
				</view>
			</uni-forms-item>
			<uni-forms-item :label-width="85" :label="$t('forget.set-password')" name="userpassword">
				<uni-easyinput class="labelInput" v-model="baseFormData.userpassword" type="password"
					:placeholder="$t('register.in-password')" />
			</uni-forms-item>
			<uni-forms-item :label-width="85" :label="$t('forget.confirm-password')" name="userpassword1">
				<uni-easyinput class="labelInput" v-model="baseFormData.userpassword1" type="password"
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
					username: '',
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
					userpassword: {
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