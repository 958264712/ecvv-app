<!-- 商品详情 -->
<template>
	<view>
		<swiper class="swiper" circular indicator-dots :interval="2000" autoplay duration style="height: 170px;">
			<swiper-item v-for="item in 6" style="background-color: aqua;">
				{{item}}
			</swiper-item>
		</swiper>
		<!-- <scroll-view scroll-y> -->
		<uni-card>
			<view class="u-flex u-row-between">
				<view>
					<view>
						<text class="icon-money">$</text>
						<text class="price">39000.00</text>
						<text class="units">/件</text>
					</view>
					<text class="moq">
						{{$t('detail.moq')}}：100个
					</text>
				</view>
				<view>
					<view>
						<text class="icon-money">$</text>
						<text class="price">38000.00</text>
						<text class="units">/件</text>
					</view>
					<text class="moq">
						200-500个
					</text>
				</view>
				<view>
					<view>
						<text class="icon-money">$</text>
						<text class="price">37000.00</text>
						<text class="units">/件</text>
					</view>
					<text class="moq">
						600-1000个
					</text>
				</view>
			</view>
			<uni-title type="h4" title="新能源汽车 比亚迪海豚四轮电动车 廉价SUV"></uni-title>
			<view class="moq">
				{{$t('detail.have-been')}}<text class="icon-money">32489</text>{{$t('detail.inquiry')}}
			</view>
		</uni-card>
		<uni-card>
			<view class="u-flex u-row-between">
				<view class="u-text-center">
					<uni-title type="h4" :title="$t('detail.quotation-type')" align="center"></uni-title>
					<text>离岸价</text>
				</view>
				<view class="u-text-center">
					<uni-title type="h4" :title="$t('detail.place-dispatch')" align="center"></uni-title>
					<text>中国深圳</text>
				</view>
				<view class="u-text-center">
					<uni-title type="h4" :title="$t('detail.supply-capacity')" align="center"></uni-title>
					<text>100台/每天</text>
				</view>
				<view class="u-text-center">
					<uni-title type="h4" :title="$t('detail.lead-time')" align="center"></uni-title>
					<text>30天</text>
				</view>
			</view>
		</uni-card>
		<uni-card>
			<template v-slot:title>
				<view class="u-flex u-col-center u-row-between">
					<view style="width: 60px;margin-right: 10px;">
						<image src="@/static/logo.png"
							style="width: 50px;height:50px;border-radius: 50%;margin-top: 10px;"></image>
					</view>
					<view>
						<uni-title type="h4" title="深圳XXXXXXXX生态汽车有限公司"></uni-title>
						<text class="text1">主营：电动汽车、环保汽车、电动汽车经销商,电动汽车、环保汽车、电动汽车经销商</text>
					</view>
					<view @click="onToManufacturer">
						<uni-icons type="right"></uni-icons>
					</view>
				</view>
			</template>
		</uni-card>
		<uni-card>
			<uni-title type="h4" :title="$t('detail.specification')" ></uni-title>
			<uni-icons type="right" class="icon-right" @click="openDialog"></uni-icons>
			<view>
				<text class="text-left">状态</text>
				<text class="text-right">全新</text>
			</view>
			<view>
				<text class="text-left">品牌名称</text>
				<text class="text-right">比亚迪</text>
			</view>
			<view>
				<text class="text-left">状态</text>
				<text class="text-right">全新</text>
			</view>
		</uni-card>
		<uni-card>
			<uni-title type="h4" :title="$t('detail.service')" ></uni-title>
			<uni-icons type="right" class="icon-right" @click="openDialog1"></uni-icons>
			<view>
				<text class="text-left">付款方式</text>
				<text class="text-right">信用卡、电汇、速汇金</text>
			</view>
			<view>
				<text class="text-left">物流方式</text>
				<text class="text-right">海运、空运</text>
			</view>
		</uni-card>
		<uni-card>
			<uni-title type="h4" :title="$t('detail.info')" ></uni-title>
			<view>
				<text class="text-left">付款方式</text>
				<text class="text-right">信用卡、电汇、速汇金</text>
			</view>
			<view>
				<text class="text-left">物流方式</text>
				<text class="text-right">海运、空运</text>
			</view>
		</uni-card>
		<recommendation :list="recommendationList"></recommendation>
		<view style="height: 60px;">
		</view>
		<!-- </scroll-view> -->
		<uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup" @click="onClick"
			@buttonClick="buttonClick" style="margin-top: 20px;" class="goods-carts" />
		<uni-popup ref="alertDialog" type="dialog" >
			<view class="dialog-content">
				<uni-title type="h3" align="center" :title="$t('detail.specification')"></uni-title>
				<uni-icons type="closeempty" class="icon-close" size="30" @click="close"></uni-icons>
				<scroll-view class="scroll-content" scroll-y>
					<view v-for="item in 8">
						<uni-title type="h4"  title="状态"></uni-title>
						<text style="font-size: 14px;">全新</text>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<uni-popup ref="alertDialog1" type="dialog" >
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
		</uni-popup>
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
				recommendationList: [{
						name: '推荐'
					},
					{
						name: '农业'
					},
					{
						name: '服饰'
					},
					{
						name: '汽车'
					},
					{
						name: '摩托车'
					},
					{
						name: '美容'
					},
					{
						name: '美发'
					},
				],
				customButtonGroup: [{
					text: this.$t('detail.immediate-inquiry'),
					backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
					color: '#fff'
				}]
			}

		},
		// 是否登录
		computed: {

		},
		async onLoad() {
			let that = this;
			this.backIconName = getCurrentPages().length > 1 ? 'arrow-left' : 'home-fill';
			const type = this.$Route.query.type;
			this.detailType = type;
			switch (type) {
				case 'score':
					await this.getScoreDetail();
					break;
				default:
					await this.getGoodsDetail();
			}
		},

		onUnload() {},

		methods: {
			openDialog(){
				this.$refs.alertDialog.open()
			},
			close(){
				this.$refs.alertDialog.close()
			},
			openDialog1(){
				this.$refs.alertDialog1.open()
			},
			close1(){
				this.$refs.alertDialog1.close()
			},
			buttonClick(){
				this.$Router.push({path:'inquiry-item',query:{id:this.$route.query.id}})
			},
			onToManufacturer(){
				this.$Router.push({path:'../company/manufacturer/manufacturer',query:{id:this.$route.query.id}})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.scroll-content{
		background-color: #fff;
		width: 100vw;
		height: 50vh;
		border-top: 1px solid #ccc;
		padding: 10px;
	}
	.dialog-content{
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
		width: 80%;
		font-size: 12px;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.text-left {
		width: 60px;
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