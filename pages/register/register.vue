<template>
	<view class="container">
		<uni-forms ref="form" :modelValue="baseFormData" class="form" :rules="rules">
			<uni-forms-item :label="$t('login.user-name')" name="userName">
				<uni-easyinput class="labelInput" v-model="baseFormData.userName"
					:placeholder="$t('register.in-username')" />
			</uni-forms-item>
			<uni-forms-item :label="$t('login.user-password')" name="passWord">
				<uni-easyinput class="labelInput" v-model="baseFormData.passWord" type="password"
					:placeholder="$t('register.in-password')" />
			</uni-forms-item>
			<uni-forms-item :label="$t('login.email-name')" name="email">
				<uni-easyinput class="labelInput" v-model="baseFormData.email" :placeholder="$t('register.in-email')" />
			</uni-forms-item>
			<uni-forms-item :label="$t('login.email-code')" name="emailVerificationCode">
				<view style="width:100%;display:flex;justify-content:space-between;">
					<uni-easyinput class="labelInput1" v-model="baseFormData.emailVerificationCode"
						:placeholder="$t('register.in-email-code')" />
					<button class="button" size="mini" type="default"
						@click="getVode">{{sendCode ?  nums : $t('login.in-email-code')}}</button>
				</view>
			</uni-forms-item>
			<uni-forms-item label="" name="radio">
				<uni-grid :column="3" :showBorder="false">
					<input type="radio" v-model="baseFormData.radio" />
					{{$t('login.consent-agreement')}}
					<text style="color:blue"
						@click='onToServiceAgreement'>{{`《${$t('index.serviceAgreement')}》`}}</text>
				</uni-grid>
			</uni-forms-item>
			<button type="primary" @click="submit('valiForm')">{{$t('register.submit')}}</button>
		</uni-forms>
		<uni-grid :column="2" :showBorder="false">
			<uni-grid-item style="text-align: right;">
				{{$t('register.yourself-id')}}，
			</uni-grid-item>
			<uni-grid-item style="text-align: left;">
				<text style="color:blue" @click='onToLogin'>{{$t('register.go-login')}}</text>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sendCode: false,
				num: 60,
				timer: null,
				nums: '60s',
				baseFormData: {
					userName: '',
					passWord: '',
					email: '',
					emailVerificationCode: '',
					radio: false,
				},
				rules: {
					userName: {
						rules: [{
								required: true,
								errorMessage: this.$t('register.in-username'),
							},
							{
								minLength: 6,
								maxLength: 20,
								errorMessage: this.$t('register.rules-username'),
							}
						]
					},
					passWord: {
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
					// // 对email字段进行必填验证
					email: {
						rules: [{
							required: true,
							errorMessage: this.$t('register.rules-email'),
						}, {
							pattern: /^\w+(-+.\w+)*@\w+(-.\w+)*.\w+(-.\w+)*$/,
							errorMessage: this.$t('register.rules-email'),
						}]
					},
					emailVerificationCode: {
						rules: [{
							required: true,
							errorMessage: this.$t('register.rules-code'),
						}]
					},
					radio: {
						rules: [{
							required: true,
							errorMessage: this.$t('register.rules-radio'),
						}, {
							validateFunction: (rule, value, data, callback) => {
								if (!value) {
									callback(this.$t('register.rules-radio'))
								}
								return true
							}
						}]
					}
				}
			};
		},

		methods: {
			onToServiceAgreement() {
				uni.navigateTo({
					url: "../serviceAgreement/serviceAgreement"
				})
			},
			onToLogin() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
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
				if (!this.sendCode && this.baseFormData.email.length>0) {
					this.sendCode = true
					this.timers()
					this.$request.post('api/sysAuth/emailCode',{email:this.baseFormData.email,
						type:2})
					// this.$http('sysAuth.emailCode',{
					// 	email:this.baseFormData.email,
					// 		type:2
					// })
			
				}
			},
			submit(form) {
				this.$refs.form.validate().then(res => {
					this.$http('sysAuth.register',{
						userName: res.userName,
						passWord: res.passWord,
						email: res.email,
						emailVerificationCode: res.emailVerificationCode
					})
					// this.$request.post('api/sysAuth/register', {
					// 	userName: res.userName,
					// 	passWord: res.passWord,
					// 	email: res.email,
					// 	emailVerificationCode: res.emailVerificationCode
					// }).then(res=>{
					// 	console.log(res);
					// })
					// uni.navigateTo({
					// 	url: "../login/login"
					// })
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			}
		}
	}
</script>

<style>
	.container {
		background-color: #fff;
		height: 100vh;
		border-top: 1px solid #eee;
	}

	.button {
		height: 68rpx;
		line-height: 68rpx;
		margin: 0
	}

	.form {
		padding: 10px;
	}
</style>