<template>
	<view class="u-p-20">
		<view class="u-flex u-row-between item" v-for="(item,index) in list" :key="index">
			<text>{{item.title}}</text>
			<view @click="onToDetails(item)">
				{{item.content}}
				<uni-icons type="right" size="22" v-if="item.title!=$t('user.set-edition')"></uni-icons>
			</view>
		</view>
		<view class="fixed">
			  <view class="cell-title" @click="onDeleteAccount">{{$t('user.set-sign-out')}}</view>
			  <view class="cell-title red" @click="logOut">{{$t('user.set-quit')}}</view>
		</view>
		<uni-popup ref="alertDialog" type="center" class="alert">
			<text class="text">{{$t("user.set-sign-title")}}</text>
			<view>{{$t("user.set-sign-content")}}</view>
			<view class="u-flex u-row-right">
				<button type="default" @click="dialogClose">{{$t("search.cancel")}}</button>
				<button type="primary" @click="dialogConfirm">{{$t("search.confirm")}}</button>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				applicationLocale:'',
				lang:'简体中文',
				list: [{
						id: 1,
						title: this.$t("user.set-lang"),
						auth: true,
						content: '',
						href: './details/setLang'
					},
					{
						id: 2,
						title: this.$t("user.set-password"),
						auth: true,
						content: '',
						href: './details/setPassword'
					},
					{
						id: 3,
						title: this.$t("user.set-email"),
						auth: true,
						content: '',
						href: './details/setEmail'
					},
					{
						id: 4,
						title: this.$t("user.set-edition"),
						auth: true,
						content: this.$t('user.set-renewal'),
						href: ''
					}
				]
			};
		},
		onLoad() {
		  this.applicationLocale = uni.getLocale();
		  uni.onLocaleChange((e) => {
		    this.applicationLocale = e.locale;
		  })
		  if(this.applicationLocale === 'en'){
			  this.list[0].content = this.$t('locale.en')
		  }else if(this.applicationLocale === 'zh-Hans'){
			   this.list[0].content = this.$t('locale.zh-hans')
		  }else if(this.applicationLocale === 'zh-Hant'){
			   this.list[0].content = this.$t('locale.zh-hant')
		  }
		},
		methods: {
			onToDetails(item) {
				if (item.title != '版本') {
					this.$Router.push({
						path: item.href,
						query: {
							id: item.id
						}
					})
				}else{
					// 获取设备信息
					const platform = uni.getSystemInfoSync().platform;
					const pkgName = '你的应用包名';
					
					if (platform === 'android') {
					  // 尝试打开华为应用市场
					  // if (/* 检测是华为设备 */) {
					  //   plus.runtime.openURL('appmarket://details?id=' + pkgName);
					  // } 
					  // // 尝试打开小米应用市场
					  // else if (/* 检测是小米设备 */) {
					  //   plus.runtime.openURL('market://details?id=' + pkgName);
					  // }
					  // 默认尝试打开Google Play
					  // else {
					  //   plus.runtime.openURL('market://details?id=' + pkgName);
					  // }
					} 
					else if (platform === 'ios') {
					  // 跳转至App Store
					  plus.runtime.launchApplication({
					    action: `https://apps.apple.com/app/id你的AppStoreID`
					  }, function(e) {
					    console.log('打开App Store失败:', e.message);
					  });
					}
				}
			},
			onDeleteAccount() {
			  let that = this;
			 this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				this.$refs.alertDialog.close()
				if(this.productObj.state === 2){
					this.messageText = this.$t("user.inquiry-messageText")
				}else{
					this.messageText = this.$t("user.inquiry-messageText1")
				}
				this.$refs.message.open()
			},
			dialogClose() {
				this.$refs.alertDialog.close()
			},
			logOut(){
				uni.removeStorageSync('userInfo');
				uni.removeStorageSync('accessToken');
				uni.removeStorageSync('refreshToken');
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		},

	};
</script>
<style lang="scss" scoped>
	.item {
		height: 50px;
		background-color: #fff;
		margin-bottom: 1px;
		padding: 0 10px;
	}
	.fixed{
		position: fixed;
		bottom: 10px;
		left: 5vw;
	}
	.cell-title{
		width: 90vw;
		margin: 10px 0;
		// border: 1px solid #ccc;
		border-radius: 20px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 28rpx;
		background-color: #ccc;
		color: white;
	}
	.red{
		background-color: #e51818;
	}
	.alert{
		:deep(.uni-popup__wrapper){
			height: 200px;
			width: 90vw;
			background-color: #fff !important;
			padding: 20px;
			text-align: center;
			display: flex !important;
			justify-content: space-between;
			flex-direction: column;
			border-radius: 5px;
			.text{
				font-size: 18px;
				font-weight: bold;
				display: block;
			}
			uni-button{
				margin: 0;
				border-radius: 20px;
				width: 76px;
				margin-left: 10px;
				font-size: 12px;
			}
			uni-button::after{
				border: none;
			}
		}
	}
</style>