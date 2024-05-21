<template>
	<view class="filter-box">
		<view class="navbar">
			<view class="nav-item u-flex-col" :class="{ current: filterIndex === 0 }" @tap="tabClick(0)">
				<view class="title-box  u-flex u-col-center">
					<text class="filter-title">{{$t('search.filter-produce')}}</text>
				</view>
				<view class="line" :class="{ 'line-active': filterIndex === 0 }"></view>
			</view>
			<view class="nav-item u-flex-col" :class="{ current: filterIndex === 1 }" @tap="tabClick(1)">
				<view class="title-box u-flex"><text class="filter-title">{{$t('search.filter-shop')}}</text></view>
				<view class="line" :class="{ 'line-active': filterIndex === 1 }"></view>
			</view>
		</view>

		<view class="navbar u-flex u-row-between filter-row" v-show="filterIndex === 0">
			<view class="u-flex filter-item">
				<view class="title-box u-flex" @tap="openPopup('showPrice')">
					<text class="filter-title">{{$t('search.filter-price')}}</text>
					<view class="p-box u-flex-col u-m-l-6">
						<uni-icons v-if="!showPrice" type="down" size="12"></uni-icons>
						<uni-icons v-else type="up" size="12"></uni-icons>
					</view>
				</view>
				<view class="title-box u-flex" @tap="openPopup('showForm')">
					<text class="filter-title">{{$t('search.filter-form')}}</text>
					<view class="p-box u-flex-col u-m-l-6">
						<uni-icons v-if="!showForm" type="down" size="12"></uni-icons>
						<uni-icons v-else type="up" size="12"></uni-icons>
					</view>
				</view>
			</view>
			<view class="title-box u-flex filter-item" @tap="openPopup('showFilter')">
				<text class="filter-title">{{$t('search.filter-all')}}</text>
				<view class="filterIcon">
					<image src="@/static/images/icon/filter.png"></image>
				</view>
			</view>
		</view>
		<view class="navbar u-flex u-row-between filter-row" v-show="filterIndex === 1">
			<view class="u-flex filter-item">
				<view class="title-box u-flex" @tap="openPopup('showManufacturer')">
					<text class="filter-title">{{$t('search.filter-form')}}</text>
					<view class="p-box u-flex-col u-m-l-6">
						<uni-icons v-if="!showManufacturer" type="down" size="12"></uni-icons>
						<uni-icons v-else type="up" size="12"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<view class="sel-box u-flex-col filter-popup" v-show="showPrice">
			<view class="title u-flex u-row-between">
				<view>
				</view>
				<view class="middle">
					{{$t('search.filter-price')}}
				</view>
				<uni-icons size="24" type="closeempty" @tap="showPrice=!showPrice"></uni-icons>
			</view>
			<view class="filter item1">
				<uni-title type="h5" :title="`${$t('search.pirce-range')}($)`"></uni-title>
				<view class="num u-flex u-flex-start">
					<input :placeholder="$t('search.max')" v-model="max" />
					<span>&nbsp;&nbsp;—&nbsp;&nbsp;</span>
					<input :placeholder="$t('search.min')" v-model="min" />
				</view>
			</view>
			<view class="btn">
				<view class="bottom">
					<button class="button reset ">{{$t('search.reset')}}</button>
					<button class="button confirm">{{$t('search.confirm')}}</button>
				</view>
			</view>
		</view>
		<view class="sel-box u-flex-col filter-popup" v-show="showForm">
			<view class="title u-flex u-row-between">
				<view>
				</view>
				<view class="middle">
					{{$t('search.filter-form')}}
				</view>
				<uni-icons size="24" type="closeempty" @tap="showForm=!showForm"></uni-icons>
			</view>
			<uni-list class="filter  item2">
				<view class="num u-flex u-row-between ">
					<span>中国</span>
					<uni-icons type="right" size="24"></uni-icons>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>

				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
			</uni-list>
			<view class="btn">
				<view class="bottom">
					<button class="button reset ">{{$t('search.reset')}}</button>
					<button class="button confirm">{{$t('search.confirm')}}</button>
				</view>
			</view>
		</view>
		<view class="sel-box u-flex-col filter-popup" v-show="showFilter">
			<view class="title u-flex u-row-between">
				<view>
				</view>
				<view class="middle">
					{{$t('search.all-filter')}}
				</view>
				<uni-icons size="24" type="closeempty" @tap="showFilter=!showFilter"></uni-icons>
			</view>
			<view class="filter filter1 item3">
				<view class="menu-box">
					<uni-title type="h5" :title="`${$t('search.pirce-range')}($)`"></uni-title>
					<view class="num u-flex u-flex-start">
						<input :placeholder="$t('search.max')" v-model="max" />
						<span>&nbsp;&nbsp;—&nbsp;&nbsp;</span>
						<input :placeholder="$t('search.min')" v-model="min" />
					</view>
					<uni-title type="h5" :title="$t('search.moq-all-units')"></uni-title>
					<view class="num u-flex u-flex-start">
						<input :placeholder="$t('search.input-num')" v-model="orderQuantity" />
					</view>
					<view class="box" v-for="(box,box_index) in submenu" :key="box_index">
						<uni-title type="h5" :title="box.name"></uni-title>
						<view class="labels">
							<view v-for="(label,label_index) in box.submenu" :key="label_index"
								@tap="selectFilterLabel(box_index,label_index)" :class="{'on':label.selected}">
								{{label.name}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="btn">
				<view class="bottom">
					<button class="button reset ">{{$t('search.reset')}}</button>
					<button class="button confirm">{{$t('search.confirm')}}</button>
				</view>
			</view>
		</view>
		<view class="sel-box u-flex-col filter-popup" v-show="showManufacturer">
			<view class="title u-flex u-row-between">
				<view>
				</view>
				<view class="middle">
					{{$t('search.filter-form')}}
				</view>
				<uni-icons size="24" type="closeempty" @tap="showManufacturer=!showManufacturer"></uni-icons>
			</view>
			<uni-list class="filter  item2">
				<view class="num u-flex u-row-between ">
					<span>中国</span>
					<uni-icons type="right" size="24"></uni-icons>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>

				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
				<view class="num u-flex u-row-between">
					<span>阿富汗</span>
				</view>
			</uni-list>
			<view class="btn">
				<view class="bottom">
					<button class="button reset ">{{$t('search.reset')}}</button>
					<button class="button confirm">{{$t('search.confirm')}}</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	/**
	 * 商品筛选组件
	 *
	 */
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex';
	export default {
		components: {},
		props: {},
		data() {
			return {
				filterIndex: 0,
				showPrice: false, //价格
				showForm: false, //发货地
				showFilter: false, //筛选
				showManufacturer: false, //厂家
				payTpye: 0,

				max: null,
				min: null,
				showSel: false, //综合选择
				defaultOrder: 0, //综合
				// priceOrder: 0, //价格
				salesOrder: 0, //销量
				newProdcutOrder: 0, //新品优先
				activeMenuArr: [
					[],
					[],
					[]
				], //UI状态
				submenu: [{
						name: this.$t('search.pay'),
						submenu: [{
								name: "满减活动",
								value: "满减活动"
							},
							{
								name: "打折优惠",
								value: "打折优惠"
							},
							{
								name: "会员专享",
								value: "会员专享"
							}
						]
					},
					{
						name: this.$t('search.merchant-type'),
						submenu: [{
								name: "预定",
								value: "预定"
							},
							{
								name: "点餐",
								value: "点餐"
							},
							{
								name: "外卖",
								value: "外卖"
							},
							{
								name: "WIFI",
								value: "WIFI"
							},
							{
								name: "停车位",
								value: "停车位"
							},
							{
								name: "无烟区",
								value: "无烟区"
							},
							{
								name: "包厢",
								value: "包厢"
							},
							{
								name: "营业中",
								value: "营业中"
							}
						]
					},
					{
						name: this.$t('search.service'),
						submenu: [{
								name: "50以下",
								value: "50以下"
							},
							{
								name: "50-100",
								value: "50-100"
							},
							{
								name: "100-300",
								value: "100-300"
							},
							{
								name: "300以上",
								value: "300以上"
							}
						]
					}
				]
			};
		},
		computed: {
			filterData() {
				const data = {
					defaultOrder: this.defaultOrder,
					filterIndex: this.filterIndex,
					salesOrder: this.salesOrder,
					newProdcutOrder: this.newProdcutOrder
				};
				return data;
			}
		},
		onLoad() {},
		methods: {
			selectFilterLabel(box_index, label_index) {
				let find_index = this.activeMenuArr[box_index]?.indexOf(label_index) ?? -1;
				if (find_index > -1) {
					this.activeMenuArr[box_index].splice(find_index, 1);
					this.submenu[box_index].submenu[label_index].selected = false;
				} else {
					this.activeMenuArr[box_index].push(label_index);
					this.submenu[box_index].submenu[label_index].selected = true;
				}
				this.$forceUpdate();
			},
			openPopup(type) {
				if (type === 'showPrice') {
					this.showPrice = !this.showPrice
					this.showForm = false
					this.showFilter = false
					this.showManufacturer = false
				} else if (type === 'showFilter') {
					this.showFilter = !this.showFilter
					this.showForm = false
					this.showPrice = false					
					this.showManufacturer = false
				} else if (type === 'showManufacturer') {
					this.showManufacturer = !this.showManufacturer
					this.showForm = false
					this.showPrice = false
					this.showFilter = false
				} else {
					this.showForm = !this.showForm
					this.showPrice = false
					this.showFilter = false
					this.showManufacturer = false
				}
			},
			clickPayType(type) {
				this.payTpye = type
				console.log(this.payTpye)
			},
			//筛选
			tabClick(index) {
				this.filterIndex = index;
				if(index===0){
					this.showManufacturer = false
				}else{
					this.showForm = false
					this.showPrice = false
					this.showFilter = false
				}
				this.$emit('change', this.filterData);
			},
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 24rpx;
	}

	.u-row {
		margin: 40rpx 0;
	}

	.demo-layout {
		height: 60rpx;
		border-radius: 40rpx;
	}


	.filter1 {
		width: 100%;
		height: 345px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		.menu-box {
			width: 698rpx;
			height: calc(345px - 75px);
			flex-shrink: 1;

			.box {
				width: 100%;
				padding-top: 16px;
				flex-direction: column;

				.title {
					width: 100%;
					font-size: 13px;
					color: #888;
				}

				.labels {
					flex-direction: row;
					flex-wrap: wrap;
					display: flex;
					text-align: center;
					line-height: 30px;

					.on {
						border-color: #ec652b;
						background-color: #ec652b;
						color: #fff;
					}

					>view {
						box-sizing: border-box;
						width: calc((698rpx - 30rpx * 3) / 4);
						height: 30px;
						border: solid 1rpx #adadad;
						border-radius: 20px;
						margin-right: 30rpx;
						margin-top: 8px;
						font-size: 12px;
						flex-direction: row;
						justify-content: center;
						align-items: center;

						&:nth-child(4n) {
							margin-right: 0;
						}
					}
				}
			}
		}

		.btn-box {
			flex-shrink: 0;
			width: 698rpx;
			height: 75px;
			flex-direction: row !important;
			align-items: center;
			justify-content: space-between;

			>view {
				width: 320rpx;
				height: 40px;
				border-radius: 40px;
				border: solid 1rpx #ec652b;
				align-items: center;
				justify-content: center;
			}

			.reset {
				color: #ec652b;
			}

			.submit {
				color: #fff;
				background-color: #ec652b;
			}
		}
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.filter-row {
		padding: 0 20px;

		.filter-item .title-box {
			margin-right: 20px;
		}
	}

	.filterIcon {
		width: 24px;
		height: 24px;

		uni-image {
			width: 100%;
			height: 100%;
		}
	}

	.filter-popup {
		background-color: #fff;
		border: 1px solid #ccc;

		.title {
			padding: 10px;
			background-color: #fff;
			border-bottom: 1px solid #ccc;
		}

		.item1 {
			min-height: 10vh;
		}

		.item2 {
			min-height: 60vh;
		}

		.item3 {
			min-height: 60vh;
		}

		.filter {
			background-color: #fff;
			padding-left: 10px;
			overflow: hidden;
			overflow-y: scroll;

			.num {
				margin-left: 20px;
				margin-bottom: 20px;
			}

			.num span {
				display: inline-block;
				height: 30px;
				line-height: 30px;
			}

			.num input {
				border: 1px solid #ccc;
				width: 80px;
				border-radius: 14px;
				font-size: 14px;
				height: 30px;
				line-height: 30px;
				text-align: center;
			}
		}

		.btn {
			background-color: #fff;
			padding: 10px 0;
			border-top: 1px solid #ccc;
			border-bottom: 1px solid #ccc;
		}

		.bottom {
			background-color: #fff;
			margin: 0 auto;
			width: 360px;

			.button {
				width: 180px;
				display: inline-block;
			}

			.reset:after {
				border-radius: 0px;
			}

			.confirm:after {
				border-radius: 0px;
			}

			.reset,
			.confirm {
				border-radius: 0px;
				border: 1px solid #ccc;
				font-size: 16px;
				font-weight: bold;
				height: 38px;
				line-height: 38px;
			}

			.reset {
				border-top-left-radius: 30px;
				border-bottom-left-radius: 30px;
				border-right: none;
			}

			.confirm {
				background-color: blue;
				color: #fff;
				border-top-right-radius: 30px;
				border-bottom-right-radius: 30px;
				border-left: none;
			}
		}
	}

	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	@mixin height {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}

	.popup-content {
		@include flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 50px;
		background-color: #fff;
	}

	.popup-height {
		@include height;
		width: 200px;
	}

	.text {
		font-size: 12px;
		color: #333;
	}

	.sel-box {
		position: absolute;
		width: 750rpx;
		height: 140rpx;
		background: rgba(246, 246, 246, 1);
		border-radius: 0px 0px 20rpx 20rpx;
		z-index: 999;
		left: 50%;
		transform: translateX(-50%);
		bottom: -138rpx;
		transition: all ease-out 0.2s;

		.sel-item {
			color: #333;
			padding: 20rpx 40rpx 0;
			font-size: 24rpx;
			font-weight: 500;
		}

		.sel-active {
			color: #d5a65a;
			font-size: 26rpx;
			font-weight: 600;
		}
	}

	.filter-box {
		width: 750rpx;
	}

	.navbar {
		display: flex;
		width: 750rpx;
		height: 95rpx;
		background: #fff;
		border-bottom: 1upx solid #e6e6e6;
		position: relative;
		z-index: 999;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30rpx;
			position: relative;

			.filter-title {
				font-size: 28rpx;
				color: #333;
				font-weight: 600;
			}

			.line {
				width: 110rpx;
				height: 4rpx;
				background: transparent;
				position: absolute;
				bottom: 0;
				z-index: 2;
			}

			.line-active {
				background: rgba(213, 166, 90, 1);
			}

			.p-box {
				display: flex;
				flex-direction: column;
			}
		}
	}

	.current {
		color: #d5a65a;
	}
</style>