<template>
	<view style="background-color: #fff; height: 100vh; padding-top: 10vh;">
		<!-- <image>logo</image> -->
		<view class="logo">
			<image src="@/static/images/ecvvlogo.png" style="width: 100%;height: 100%"></image>
		</view>
		<uni-section>
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="current" :values="items" style-type="text" active-color="#007aff"
					@clickItem="onClickItem" />
			</view>
			<uni-forms ref="form" :modelValue="baseFormData" class="form">
				<view v-if="current === 0">
					<!-- :label="$t('login.user-name')" -->
					<uni-forms-item>
						<uni-easyinput class="labelInput" v-model="baseFormData.account"
							:placeholder="$t('login.in-user')" />
					</uni-forms-item>
					<!-- :label="$t('login.user-password')" -->
					<uni-forms-item>
						<uni-easyinput class="labelInput" v-model="baseFormData.password" type="password"
							:placeholder="$t('login.in-user-password')" />
					</uni-forms-item>
				</view>
				<view v-if="current === 1">
					<!-- :label="$t('login.email-name')" -->
					<uni-forms-item>
						<uni-easyinput class="labelInput" v-model="baseFormData.email"
							:placeholder="$t('login.in-email')" />
					</uni-forms-item>
					<!-- :label="$t('login.email-code')" -->
					<uni-forms-item>
						<view style="width:100%;display:flex;justify-content:space-between;">
							<uni-easyinput class="labelInput1" v-model="baseFormData.emailLoginCode"
								:placeholder="$t('login.in-email-code')" />
							<button class="button" size="mini" type="default"
								@click="getVode">{{sendCode ?  nums : $t('login.take-email-code')}}</button>
						</view>
					</uni-forms-item>
				</view>
				<uni-forms-item label="">
					<uni-grid :column="3" :showBorder="false">
						<input type="radio" v-model="baseFormData.radio" />
						{{$t('login.consent-agreement')}}
						<text style="color:blue"
							@click='onToServiceAgreement'>{{`《${$t('index.serviceAgreement')}》`}}</text>
					</uni-grid>
				</uni-forms-item>
				<button type="primary" @click="submit('valiForm')"
					style="border-radius: 20px;">{{$t('index.login')}}</button>
			</uni-forms>
			<uni-grid :column="3" :showBorder="false">
				<uni-grid-item style="text-align: right;width: 40%;">
					<text style="color:blue" @click='onToRegister'>{{$t('index.register')}}</text>
				</uni-grid-item>
				<span style="margin:0 20px;">|</span>
				<uni-grid-item style="text-align: left;width: 45%;">
					<text style="color:blue" @click='onToChangePassword'>{{$t('login.forget-password')}}</text>
				</uni-grid-item>
			</uni-grid>
		</uni-section>
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseFormData: {
					account: '',
					password: '',
					email: '',
					emailLoginCode: '',
					radio: false,
				},
				items: [this.$t('login.user'), this.$t('login.email')],
				current: 0,
				codeId: 0,
				sendCode: false,
				num: 60,
				timer: null,
				nums: '60s',
				msgType: 'success',
				messageText: 'Login Success!',
			};
		},

		methods: {
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			change(e) {
				this.baseFormData.radio = !this.baseFormData.radio
				console.log(e.detail, this.baseFormData.radio)
			},
			onToServiceAgreement() {
				uni.navigateTo({
					url: "../serviceAgreement/serviceAgreement"
				})
			},
			onToRegister() {
				uni.navigateTo({
					url: "../register/register"
				})
			},
			onToChangePassword() {
				uni.navigateTo({
					url: "../forgetPassword/forgetPassword"
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
				if (!this.sendCode && this.baseFormData.email.length > 0) {
					this.sendCode = true
					this.timers()
					this.$request.post('api/sysAuth/emailCode', {
						email: this.baseFormData.email,
						type: 1
					}).then(res => {
						this.codeId = res.result
					})
				}
			},
			submit(form) {
				this.$refs.form.validate().then(res => {
					if (this.current === 0) {
						this.$request.post('api/sysAuth/login', {
							account: this.baseFormData.account.trim(),
							password: this.baseFormData.password.trim(),
							type: 2,
						}).then(res => {
							if (res.type === 'error') {
								this.msgType = 'error'
								this.messageText = res.message
								this.$refs.message.open()
							} else {
								uni.setStorageSync('accessToken', res.result.accessToken);
								uni.setStorageSync('refreshToken', res.result.refreshToken);
								this.$refs.message.open()
								setTimeout(() => {
									uni.switchTab({
										url: "../index/index"
									})
								}, 500)
							}
						})
					} else {
						this.$request.post('api/sysAuth/login', {
							type: 3,
							account: 'super',
							password: 'ec1234',
							email: this.baseFormData.email.trim(),
							emailLoginCode: this.baseFormData.emailLoginCode.trim(),
							code: this.baseFormData.emailLoginCode.trim(),
							codeId: this.codeId.trim()
						}).then(res => {
							if (res.type === 'error') {
								this.msgType = 'error'
								this.messageText = res.message
								this.$refs.message.open()
							} else {
								uni.setStorageSync('accessToken', res.result.accessToken);
								uni.setStorageSync('refreshToken', res.result.refreshToken);
								this.$refs.message.open()
								setTimeout(() => {
									uni.switchTab({
										url: "../index/index"
									})
								}, 500)
							}
						})
					}
				})
			}
		}
	};
</script>

<style>
	.logo {
		width: 50vw;
		height: 8vh;
		margin: 0 auto;
	}

	.labelInput {
		width: 100%;
	}

	.labelInput1 {
		width: 45%;
		display: inline-block;
	}

	.button {
		height: 68rpx;
		line-height: 68rpx;
		margin: 0
	}

	.form {
		margin: 40rpx;
	}
</style>