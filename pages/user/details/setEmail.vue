<template>
	<view class="container">
		<uni-forms ref="form" :modelValue="baseFormData" class="form" :rules="rules" >
			<uni-forms-item :label-width="95" :label="$t('inquiryItem.email')" >
				<uni-easyinput class="labelInput" v-model="baseFormData.email" disabled/>
			</uni-forms-item>
			<uni-forms-item :label-width="95" :label="$t('user.email-new')" name="newemail">
				<uni-easyinput class="labelInput" v-model="baseFormData.newEmail" type="text"
					:placeholder="$t('inquiryItem.place-input')" />
			</uni-forms-item>
			<uni-forms-item :label-width="95" :label="$t('login.email-code')" name="emailcode">
				<view style="width:100%;display:flex;justify-content:space-between;">
					<uni-easyinput class="labelInput1" v-model="baseFormData.emailcode"
						:placeholder="$t('register.in-email-code')" />
					<button class="button" size="mini" type="default"
						@click="getVode">{{sendCode ?  nums : $t('login.in-email-code')}}</button>
				</view>
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
					email: '111@qq.com',
					newEmail:'',
					emailcode: '',
					msgType: 'success',
					messageText: '这是一条成功提示',
				},
				rules: {
					newemail: {
						rules: [{
								required: true,
								errorMessage: this.$t('user.email-rule0'),
							},
							{
								validateFunction: (rule, value, data, callback) => {
									let pattern= /^\w+(-+.\w+)*@\w+(-.\w+)*.\w+(-.\w+)*$/
									if (!pattern.test(value)) {
										callback(this.$t('user.email-rule'))
									}else if(value === this.baseFormData.email){
										callback(this.$t('user.email-rule2'))
									}
									return true
								}
							}
						]
					},
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