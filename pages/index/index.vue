<template>
	<view class="container">
		<uni-grid :column="2" :showBorder="false" class="u-p-20">
			<view class="login">
				<image v-if="isLogin" :src="userInfo?.headImage" ></image>
				<view v-if="!isLogin" :src="userInfo?.headImage" @click="onToLogin">
					{{$t('index.no-login')}}
				</view>
			</view>
			<view class="u-flex w85" @click="onToSearch">
				<input style="width: 85%;padding:0;marginLeft:20px;"/> 
				<view class="bg-f">
					<uni-icons type="search" size="28"></uni-icons>
				</view>
			</view>
			<!-- <uni-search-bar style="width: 85%;padding:0;marginLeft:20px;" class="uni-mt-10" radius="100"
				cancelButton="none" @tap="onToSearch" /> -->
		</uni-grid>
		<swiper class="swiper-box" autoplay @change="change1" :current="swiperDotIndex">
			<swiper-item v-for="(item, index) in 3" :key="index">
				<view class="swiper-item" :class="'swiper-item' + index">
					<text style="color: #fff; font-size: 32px;">{{index+1}}</text>
				</view>
			</swiper-item>
		</swiper>
		<uni-grid :column="2" class="u-p-20 ">
			<uni-grid-item style="height:80px;width: 49%;" @click="onToinquriy">
				<view class="claFlex">
					<uni-icons type="email" size="30"></uni-icons>
					<uni-title type="h2" :title="$t('index.public-enquiry')"></uni-title>
				</view>
				<text style="font-size: 12px;">{{$t('index.enquiry-msg')}}</text>
			</uni-grid-item>
			<uni-grid-item style="height:80px;width: 49%;border-left:1px solid rgb(210, 210, 210)"
				@click="onTocategory">
				<view class="claFlex">
					<image src="@/static/images/tabbar/tabbar_category.png" style="width: 24px;height:24px" />
					<uni-title type="h2" :title="$t('index.all-categories')"></uni-title>
				</view>
				<text style="font-size: 12px;"> {{$t('index.categories-msg')}} </text>
			</uni-grid-item>
		</uni-grid>
		<uni-section :title="$t('index.explosive-goods')" type="line">
			<template v-slot:right><uni-icons type="right" size="22" @click="onToGoods"></uni-icons></template>
			<view class="model_scrollx flex_row">
				<scroll-view class="uni-swiper-tab" scroll-x :style="'height:'+scrollH+'px'">
					<view class="scrollx_items tg_zdtg" v-for="item in productList" @click="onToProduct(item.productID)">
						<image :src="item.src" class="tgyx_img"></image>
						<view class="tgyx_title">{{item.title}}</view>
						<view class="tgyx_price">{{item.price}}/{{item.pieceOrSet}}</view>
						<view class="tgyx_desc">{{$t('detail.moq')}}:{{item.order}}</view>
					</view>
				</scroll-view>
			</view>
		</uni-section>
		<uni-section :title="$t('index.hot-list')" type="line" >
			<view class="model_scrollx flex_row">
				<scroll-view class="uni-swiper-tab" scroll-x :style="'height:150px'">
					<view class="scrollx_items1 tg_zdtg" @click="onToHot('工程及建筑机械')">
						<view class="tgyx_img1 u-m-b-10">图片</view>
						<view class="tgyx_title">工程及建筑机械</view>
					</view>
					<view class="scrollx_items1 tg_zdtg" @click="onToHot('汽车')">
						<view class="tgyx_img1 u-m-b-10">图片</view>
						<view class="tgyx_title">汽车</view>
					</view>
					<view class="scrollx_items1 tg_zdtg" @click="onToHot('警察和军事用品')">
						<view class="tgyx_img1 u-m-b-10">图片</view>
						<view class="tgyx_title">警察和军事用品</view>
					</view>
					<view class="scrollx_items1 tg_zdtg" @click="onToHot('钢材')">
						<view class="tgyx_img1 u-m-b-10">图片</view>
						<view class="tgyx_title">钢材</view>
					</view>
				</scroll-view>
			</view>
		</uni-section>
		<recommendation ></recommendation>
	</view>
</template>

<script>
	import recommendation from '@/components/recommendation/recommendation.vue';
	export default {
		data() {
			return {
				isLogin:false,
				systemLocale: '',
				applicationLocale: '',
				current: 0,
				dotsStyles: {},
				userInfo: uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : {},
				swiperDotIndex: 0,
				scrollH: 200,
				productList:[]
			}
		},
		onReachBottom() {
			uni.$emit('onReachBottom')
		},
		onShow() {
			uni.getStorageSync('userInfo') ? this.isLogin = true : this.isLogin = false
			this.$request.get('api/sysAuth/appUserInfo').then(res => {
				uni.setStorageSync('userInfo',JSON.stringify(res.result))
				this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			})
		},
		methods: {
			onToinquriy() {
				uni.switchTab({
					url: '../../pages/inquiry/inquiry'
				})
			},
			onTocategory() {
				uni.switchTab({
					url: '../../pages/classify/classify'
				})
			},
			onToSearch() {
				uni.navigateTo({
					url: '../../pages/public/search'
				})
			},
			change(e) {
				this.current = e.detail.current
			},
			onToLogin() {
				uni.navigateTo({
					url: '../../pages/login/login'
				})
			},
			onToGoods() {
				uni.navigateTo({
					url: '../../pages/explosiveGoods/explosiveGoods'
				})
			},
			onToHot(str) {
				uni.navigateTo({
					url: `../../pages/hotList/hotList?title=${str}`
				})
			},
			async handlequeryProduct(data){
				await this.$request.get('api/home/getHotProductList',{pagesize:10,pageindex:1}).then(res=>{
					if(res.type==='success'){
						this.productList =res.result.list
					}
				})
			},
			onToProduct(data){
				uni.navigateTo({
					url:`/pages/goods/detail?id=${data}`
				})
			}	
		},
		mounted() {
			uni.setTabBarBadge({
				index:3,
				text:String(4)
			})
			// this.$request.get('api/sysAuth/appUserInfo').then(res => {
			// 	uni.setStorageSync('userInfo',JSON.stringify(res.result))
			// 	this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			// })
			this.handlequeryProduct()
		}
	}
</script>

<style lang="scss" scoped>
	@font-face {
		font-family: CustomFont;
		src: url('@/static/images/tabbar/tabbar_category.png');
	}

	.title {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 15px;
	}

	.login {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		uni-image{
			border-radius: 50%;
			width: 100%;
			height: 100%;
		}
		uni-view{
			border-radius: 50%;
			width: 100%;
			font-size: 18rpx;
			text-align: center;
			line-height: 36px;
			font-weight: bold;
			color: #eee;
			height: 100%;
			background-color: #15b4fb;
		}
	}

	.bg-f {
		position: absolute;
		background-color: #f2f2f2;
		right: 20px;
	}

	.w85 {
		width: 85%;
		border: 1px solid #ccc;
		border-radius: 20px;
	}

	.claFlex {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	::v-deep.uni-grid-item--border {
		justify-content: space-evenly;
		align-items: center !important;
	}

	.swiper-box {
		height: 200px;
		margin-top: 20px;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 200px;
		color: #fff;
	}

	.swiper-item0 {
		background-color: #cee1fd;
	}

	::v-deep .uni-grid {
		justify-content: space-between;
	}

	.swiper-item1 {
		background-color: #b2cef7;
	}

	.swiper-item2 {
		background-color: #cee1fd;
	}

	@media screen and (min-width: 500px) {
		.uni-swiper-dot-box {
			width: 400px;
			margin: 0 auto;
			margin-top: 8px;
		}

		.image {
			width: 100%;
		}
	}

	/* 左右滑动 */
	.uni-swiper-tab {
		white-space: nowrap;
	}

	.model_scrollx {
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.scrollx_items {
		display: inline-block;
		width: 250rpx;
		box-sizing: border-box;
		margin-left: 20px;
	}
	.scrollx_items1 {
		display: inline-block;
		width: 180rpx;
		box-sizing: border-box;
		margin-left: 20px;
	}

	.scrollx_items:last-child {
		margin-right: 30rpx;
	}

	.tgyx_img {
		width: 130px;
		height: 130px;
		border-radius: 5px;
	}

	.tgyx_img1 {
		width: 100px;
		height: 100px;
		border-radius: 5px;
		border: 1px solid #000;
	}

	.tgyx_title {
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tgyx_price {
		font-size: 14px;
		color: red;
	}

	.tgyx_desc {
		font-size: 12px;
		color: #d5d5d5;
	}

	.tg_zdtg {
		background: linear-gradient(bottom right, #d5e4fa, #dae7fb);
		color: #15b4fb;
	}


</style>