<!-- 商品详情 -->
<template>
	<view>
		<swiper class="swiper" circular indicator-dots :interval="2000" autoplay duration style="height: 170px;"
			v-if="productDetail.picPathAll?.length">
			<swiper-item v-for="item in productDetail.picPathAll">
				<image :src="item" style="width: 100%;"></image>
			</swiper-item>
		</swiper>
		<!-- <scroll-view scroll-y> -->
		<uni-card>
			<view class="u-flex u-row-between"
				v-if="productOtherInfo.priceType === 1 || productOtherInfo.priceType === 2">
				<view>
					<view>
						<text class="icon-money">{{productOtherInfo.priceUnit}}</text>
						<text class="price">{{productOtherInfo.productPrice}}</text>
						<text class="units">/{{productOtherInfo.productUnit}}</text>
					</view>
					<text class="moq">
						{{$t('detail.moq')}}：{{productDetail.minOrder}}{{productOtherInfo.productUnit}}
					</text>
				</view>
			</view>
			<view class="u-flex u-row-between" v-if="productOtherInfo.priceType === 3">
				<view v-for="(item,key,index) in productOtherInfo.listPrice">
					<view>
						<text class="icon-money" v-if="index===0">{{productOtherInfo.priceUnit}}</text>
						<text class="price">{{key}}</text>
						<text class="units">/{{productOtherInfo.productUnit}}</text>
					</view>
					<text class="moq">
						<text v-if="index===0">{{$t('detail.moq')}}：</text>{{item}}{{productOtherInfo.productUnit}}
					</text>
				</view>
			</view>
			<uni-title type="h4" :title="productDetail.productName"></uni-title>
			<view class="moq">
				{{$t('detail.have-been')}}<text
					class="icon-money">{{productDetail.inquiryNum}}</text>{{$t('detail.inquiry')}}
			</view>
		</uni-card>
		<uni-card>
			<view class="u-flex u-row-between">
				<view class="u-text-center flex1" v-for="(item,key,index) in productMainInfo">
					<uni-title type="h4" :title="key" align="left"></uni-title>
					<text class="text1">{{item}}</text>
				</view>
			</view>
		</uni-card>
		<uni-card>
			<template v-slot:title>
				<view class="u-flex u-p-t-20 u-row-between" style="align-items: flex-start;">
					<view style="width: 60px;margin-right: 10px;">
						<image :src="productStore.storeImg"
							style="width: 50px;height:50px;border-radius: 50%;margin-top: 10px;"></image>
					</view>
					<view>
						<uni-title type="h4" :title="productStore.storeName"></uni-title>
						<text class="text1">{{$t('company.main-product')}}：{{productStore.mainProduct}}</text>
					</view>
					<view @click="onToManufacturer" class="u-p-t-10 u-p-l-10">
						<uni-icons type="right"></uni-icons>
					</view>
				</view>
			</template>
		</uni-card>
		<uni-card v-if="productDetail.productPropertyList?.length">
			<uni-title type="h4" :title="$t('detail.specification')"></uni-title>
			<uni-icons type="right" class="icon-right" @click="openDialog"></uni-icons>
			<view v-for="item in productDetail.productPropertyList" :key="item.propertyID">
				<text class="text-left">{{item.propertyName}}</text>
				<text class="text-right">{{item.valueStr}}</text>
			</view>
		</uni-card>
		<uni-card>
			<uni-title type="h4" :title="$t('detail.info')"></uni-title>
			<rich-text :nodes="productDetail.productDescription"></rich-text>
		</uni-card>
		<recommendation></recommendation>
		<view style="height: 60px;">
		</view>
		<!-- </scroll-view> -->
		<uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup" @click="onClick"
			@buttonClick="buttonClick" style="margin-top: 20px;" class="goods-carts" />
		<uni-popup ref="alertDialog" type="dialog">
			<view class="dialog-content">
				<uni-title type="h3" align="center" :title="$t('detail.specification')"></uni-title>
				<uni-icons type="closeempty" class="icon-close" size="30" @click="close"></uni-icons>
				<scroll-view class="scroll-content" scroll-y>
					<view v-for="item in productDetail.productPropertyList" :key="item.propertyID">
						<uni-title type="h4" :title="item.propertyName"></uni-title>
						<text style="font-size: 14px;">{{item.valueStr}}</text>
						<text class="text-left">{{}}</text>
						<text class="text-right"></text>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<!-- 	<uni-popup ref="alertDialog1" type="dialog" >
			<view class="dialog-content">
				<uni-title type="h3" align="center" :title="$t('detail.service')"></uni-title>
				<uni-icons type="closeempty" class="icon-close" size="30" @click="close1"></uni-icons>
				<scroll-view class="scroll-content" scroll-y>
					<view v-for="item in 8">
						<uni-title type="h4"  title="状态"></uni-title>
						<text style="font-size: 14px;">全新</text>
					</view>
				</scroll-view>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
	import recommendation from '@/components/recommendation/recommendation.vue';
	import {
		mapMutations,
		mapActions,
		mapState,
		mapGetters
	} from 'vuex';
	export default {
		components: {
			recommendation
		},
		data() {
			return {
				show1: false,
				options: [{
					icon: 'shop',
					text: this.$t('detail.shop'),
				}, {
					icon: 'star',
					text: this.$t('detail.collect'),
				}],
				customButtonGroup: [{
					text: this.$t('detail.immediate-inquiry'),
					backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
					color: '#fff'
				}],
				productDetail: {},
				productStore: {},
				productMainInfo: {},
				productOtherInfo: {}
			}

		},
		// 是否登录
		computed: {

		},
		async mounted() {
			await this.$request.get('api/home/getProductInfo', {
				pid: this.$route.query.id
			}).then(res => {
				if (res.type === 'success') {
					this.productDetail = res.result.productDetail
					this.productStore = res.result.productStore
					this.productMainInfo = res.result.productMainInfo
					this.productOtherInfo = res.result.productOtherInfo
				}
			})
		},
		methods: {
			openDialog() {
				this.$refs.alertDialog.open()
			},
			close() {
				this.$refs.alertDialog.close()
			},
			openDialog1() {
				this.$refs.alertDialog1.open()
			},
			close1() {
				this.$refs.alertDialog1.close()
			},
			buttonClick() {
				this.$Router.push({
					path: 'inquiry-item',
					query: {
						id: this.$route.query.id
					}
				})
			},
			onToManufacturer() {
				this.$Router.push({
					path: '../company/manufacturer/manufacturer',
					query: {
						id: this.productDetail.eCompanyID
					}
				})
			},
			onClick(e) {
				if (e.index === 0) {
					this.onToManufacturer()
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.scroll-content {
		background-color: #fff;
		width: 100vw;
		height: 50vh;
		border-top: 1px solid #ccc;
		padding: 10px;
	}

	.dialog-content {
		background-color: #fff;
		position: relative;
		width: 100vw;
	}

	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		height: 50px;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}

	.icon-money,
	.price {
		color: red;
	}

	.icon-money,
	.units,
	.moq {
		font-size: 12px;
	}

	.price {
		font-size: 16px;
	}

	.units,
	.moq {
		color: #ccc;
	}

	.text1 {
		display: -webkit-box;
		width: 96%;
		font-size: 12px;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.flex1 {
		flex: 1;
		height: 100px;
	}

	.text-left {
		width: 100px;
		text-align: left;
		color: #000;
		display: inline-block;
	}

	.text-right {
		text-align: left;
	}

	.icon-right {
		position: absolute;
		top: 20px;
		right: 10px;
	}

	.icon-close {
		position: absolute;
		top: 5px;
		right: 10px;
	}
</style>