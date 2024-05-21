<template>
	<!-- 标题 -->
	<view class="uni-navbar u-flex u-row-between">
		<uni-icons type="left" size="22" @click="back"></uni-icons>
		<view class="uni-page-head-bd" style="font-weight: bold;text-align: center;">{{$t("user.footmark-title")}}</view>
		<view class="manage-button" @click="changeShow">{{!show ?$t("user.footmark-manage"):$t("search.success")}}
		</view>
	</view>
	<view class="u-m-t-88">
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
			activeColor="#15b4fb" class="head"></uni-segmented-control>
		<view class="u-p-20">
			<view v-if="historyList.length > 0 && current === 0" v-for="(item,index) in historyList" :key="item.id">
				<!-- 日期可全选 -->
				<view>
					<checkbox :value="item.check" style="transform:scale(0.7)" v-if="show"></checkbox>
					{{item.time}}
				</view>
				<uni-swipe-action>
					<uni-swipe-action-item v-for="(item, index) in item.list" :key="index" :right-options="options"
						 >
						<view class="query-block query-inquiry message-null">
							<view class="image-container">
								<image :src="item.image" class="query-image"></image>
								<view class="mask-layer" v-if="item.expired">
									<text class="mask-title">
										{{$t("user.footmark-expired")}}
									</text>
								</view>
							</view>
							<view>
								<view class="query-description" :class="item.expired ? 'expired':''">
									{{ item.title }}
								</view>
								<view class="query-price" :class="item.expired ? 'expired':''">
									${{item.min}}~${{item.max}}/{{item.unit}}</view>
								<view class="u-flex u-row-between">
									<view class="query-time" :class="item.expired ? 'expired':''">
										{{$t("detail.moq")}}：{{ item.num }}{{item.unit}}
									</view>
									<button v-if="!show || item.expired" type="warn" class="warn-btn"
										:disabled="item.expired" @click="onToInquiry(item.id)">
										{{$t("detail.inquiry")}}
									</button>
									<checkbox v-if="show && !item.expired" :value="item.check"></checkbox>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<view v-if="companyList.length > 0 && current === 1" v-for="(item,index) in companyList" :key="item.id">
				<view>
					<checkbox :value="item.check" style="transform:scale(0.7)" v-if="show"></checkbox>
					{{item.time}}
				</view>
				<uni-swipe-action>
					<uni-swipe-action-item v-for="(item, index) in item.list" :key="index" :right-options="options"
						>
						<view class="query-block query-inquiry message-null">
							<view class="image-container mask-logo-layer">
								<image :src="item.image" class="query-logo"></image>
								<view class="mask-logo-layer mask-layer" v-if="item.expired">
									<text class="mask-logo-title mask-title">
										{{$t("user.footmark-expired")}}
									</text>
								</view>
							</view>
							<view>
								<view class="query-description" :class="item.expired ? 'expired':''">
									{{ item.title }}
								</view>
								<view class="u-flex u-m-b-10 query-time" :class="item.expired ? 'expired':''">
									<view class="u-flex u-m-r-20">
										<image src="../../static/images/icon/member.png"
											style="width: 16px;height: 16px;"></image>
										<text>{{$t("user.footmark-manage1")}}{{item.year}}{{$t("user.footmark-year")}}</text>
									</view>
									<view class="u-flex" v-if="item.authentication">
										<image src="../../static/images/icon/authentication.png"
											style="width: 16px;height: 16px;"></image>
										<text>{{$t("user.footmark-authentication")}}</text>
									</view>
								</view>
								<view class="u-flex u-row-between">
									<view class="query-time" :class="item.expired ? 'expired':''">
										{{$t("detail.moq")}}：{{ item.num }}{{item.unit}}
									</view>
									<checkbox v-if="show && !item.expired" :value="item.check"></checkbox>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<view v-if="historyList.length === 0">
				<uni-card class="message-null" style="margin:0 ;margin-top:10px;">
					<image style="width: 200px;height: 100px;" class="u-m-b-10" src="@/static/images/icon/footmark.png">
					</image>
					<view class="u-m-20">{{$t("message.no-message")}}</view>
					<button type="primary" @click="toSearch" class="btn">{{$t("user.footmark-go-search")}}</button>
				</uni-card>
				<recommendation v-if="current === 0" :list="recommendationList"></recommendation>
				<view v-if="current === 1">
					<view class="u-column">
						<uni-title type="h4" :title="$t('search.recommended')"></uni-title>
						<view class="u-flex u-col-center" v-for="leftGoods in leftList" :key="leftGoods.id">
							<uni-card style="margin:0;margin-top:10px;" :thumbnail="leftGoods.image"
								@click="onClick(leftGoods.id)">
								<template v-slot:title>
									<view class="u-flex u-col-center u-row-between" @click="onClick(leftGoods.id)">
										<view style="width: 60px;margin-right: 10px;">
											<image :src="leftGoods.image"
												style="width: 50px;height:50px;border-radius: 50%;margin-top: 10px;">
											</image>
										</view>
										<view>
											<uni-title type="h4" title="深圳XXXXXXXX生态汽车有限公司"></uni-title>
											<view class="u-flex u-col-center u-row-between"
												style="width:40vw;font-size: 12px;">
												<view>经营39年</view>
												<view>现场认证</view>
											</view>
											<text class="text">主营：电动汽车、环保汽车、电动汽车经销商,电动汽车、环保汽车、电动汽车经销商</text>
										</view>
										<view>
											<uni-icons type="right"></uni-icons>
										</view>
									</view>
								</template>
								<uni-grid :column="3" :show-border="false">
									<uni-grid-item v-for="item in 3" style="height:150px" @click="onProduct(item.id)">
										<view style="width: 90%;height: 70%;">
											<image :src="leftGoods.image" style="width: 100%;height: 100%;"></image>
										</view>
										<view class="text1">新能源汽车 比亚迪海豚四轮电动车</view>
									</uni-grid-item>
								</uni-grid>
							</uni-card>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

	<view class="fixed u-flex u-row-between u-p-10" v-if="show">
		<view class="u-flex">
			<checkbox style="transform: scale(.7); margin-right: 10px;"></checkbox>{{$t("user.footmark-select-all")}}
		</view>
		<button type="warn" class="u-m-r-20">{{$t("user.inquiry-del")}}</button>
	</view>
</template>
<script>
	import InquiryTypeCard from '@/components/inquiry-type-card.vue';
	import recommendation from '@/components/recommendation/recommendation.vue';
	export default {
		components: {
			InquiryTypeCard,
			recommendation
		},
		data() {
			return {
				items: [this.$t("search.filter-produce"), this.$t("search.filter-shop")],
				current: 0,
				show: false,
				historyList: [{
						id: 1,
						time: '4月16日',
						check: false,
						list: [{
							id: 11,
							image: 'https://images.pexels.com/photos/20993833/pexels-photo-20993833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
							title: '高品质潜水服，潜水服，氯丁橡服高品质潜水服，潜水服，氯丁橡服高品质潜水服，潜水服，氯丁橡服',
							min: 39000.00,
							max: 40000.00,
							unit: '件',
							num: 5000,
							check: false,
							expired: false
						}, {
							id: 12,
							image: 'https://images.pexels.com/photos/20993833/pexels-photo-20993833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
							title: '高品质潜水服，潜水服，氯丁橡服高品质潜水服，潜水服，氯丁橡服高品质潜水服，潜水服，氯丁橡服',
							min: 39000.00,
							max: 40000.00,
							unit: '件',
							num: 5000,
							check: false,
							expired: true
						}]
					},
					{
						id: 2,
						time: '4月13日',
						check: false,
						list: [{
							id: 21,
							image: 'https://images.pexels.com/photos/20993833/pexels-photo-20993833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
							title: '高品质潜水服，潜水服，氯丁橡服高品质潜水服，潜水服，氯丁橡服高品质潜水服，潜水服，氯丁橡服',
							min: 39000.00,
							max: 40000.00,
							unit: '件',
							num: 5000,
							check: false,
							expired: false
						}, {
							id: 22,
							image: 'https://images.pexels.com/photos/20993833/pexels-photo-20993833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
							title: '高品质潜水服，潜水服，氯丁橡服高品质潜水服，潜水服，氯丁橡服高品质潜水服，潜水服，氯丁橡服',
							min: 39000.00,
							max: 40000.00,
							unit: '件',
							num: 5000,
							check: false,
							expired: false
						}]
					}
				],
				companyList: [{
					id: 1,
					time: '4月16日',
					check: false,
					list: [{
						id: 11,
						image: 'https://images.pexels.com/photos/20993833/pexels-photo-20993833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						title: '高品质潜水服，潜水服，氯丁橡服高品质潜水服，潜水服，氯丁橡服高品质潜水服，潜水服，氯丁橡服',
						min: 39000.00,
						max: 40000.00,
						unit: '件',
						num: 5000,
						check: false,
						expired: false,
						year: 1,
						authentication: false
					}, {
						id: 12,
						image: 'https://images.pexels.com/photos/20993833/pexels-photo-20993833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						title: '高品质潜水服，潜水服，氯丁橡服高品质潜水服，潜水服，氯丁橡服高品质潜水服，潜水服，氯丁橡服',
						min: 39000.00,
						max: 40000.00,
						unit: '件',
						num: 5000,
						check: false,
						expired: true,
						year: 39,
						authentication: true
					}]
				}, ],
				leftList: [{
						"id": 1439,
						"type": "normal",
						"title": "高品质潜水服，潜水服，氯丁橡胶服，潜水装",
						"subtitle": "111",
						"weigh": 11,
						"category_ids": "44,44,45,44,45,46",
						"image": "https://demo.shopro.top/uploads/20240117/d2a1208fddf07c421e815866532f430e.jpeg",
						"price": "1",
						"original_price": "1.00",
						"is_sku": 0,
						"likes": 0,
						"views": 1467,
						"sales": 1111,
						"show_sales": 1111,
						"dispatch_type": "express",
						"dispatch_ids": "1",
						"deletetime": null,
						"total_sales": 1111,
						"activity": null,
						"activity_type": null,
						"buyers": [],
						"sku_price": [{
							"id": 2402,
							"goods_sku_ids": null,
							"goods_id": 1439,
							"weigh": 0,
							"image": null,
							"stock": 1,
							"stock_warning": null,
							"sales": 0,
							"sn": "",
							"weight": 0,
							"price": "1.00",
							"goods_sku_text": null,
							"status": "up",
							"goods_sku_id_arr": [
								""
							]
						}],
						"stock": 1,
						"activity_discounts": [],
						"activity_discounts_types": "",
						"activity_discounts_tags": [],
						"dispatch_type_arr": [
							"express"
						]
					},
					{
						"id": 1413,
						"type": "normal",
						"title": "111111",
						"subtitle": "22222",
						"weigh": 11,
						"category_ids": "47",
						"image": "https://demo.shopro.top/uploads/20230819/8659310afe6e0f2680457c26da4f6d3d.jpg",
						"price": "12",
						"original_price": "222.00",
						"is_sku": 1,
						"likes": 0,
						"views": 1230,
						"sales": 0,
						"show_sales": 0,
						"dispatch_type": "express",
						"dispatch_ids": "26",
						"deletetime": null,
						"total_sales": 0,
						"activity": null,
						"activity_type": null,
						"buyers": [],
						"sku_price": [{
								"id": 2362,
								"goods_sku_ids": "1673",
								"goods_id": 1413,
								"weigh": 0,
								"image": "",
								"stock": 0,
								"stock_warning": null,
								"sales": 0,
								"sn": "",
								"weight": 0,
								"price": "1.00",
								"goods_sku_text": "111",
								"status": "up",
								"goods_sku_id_arr": [
									"1673"
								]
							},
							{
								"id": 2363,
								"goods_sku_ids": "1674",
								"goods_id": 1413,
								"weigh": 0,
								"image": "",
								"stock": 0,
								"stock_warning": null,
								"sales": 0,
								"sn": "",
								"weight": 0,
								"price": "1.00",
								"goods_sku_text": "333",
								"status": "up",
								"goods_sku_id_arr": [
									"1674"
								]
							}
						],
						"stock": 0,
						"activity_discounts": [],
						"activity_discounts_types": "",
						"activity_discounts_tags": [],
						"dispatch_type_arr": [
							"express"
						]
					},
					{
						"id": 1433,
						"type": "normal",
						"title": "测试1114",
						"subtitle": "测试1114",
						"weigh": 2,
						"category_ids": "44,44,45,44,45,46",
						"image": "https://demo.shopro.top/uploads/20231114/cf85108151291911df42636029a8a9ae.jpg",
						"price": "100",
						"original_price": "200.00",
						"is_sku": 1,
						"likes": 0,
						"views": 252,
						"sales": 1,
						"show_sales": 1,
						"dispatch_type": "express",
						"dispatch_ids": "1",
						"deletetime": null,
						"total_sales": 1,
						"activity": null,
						"activity_type": null,
						"buyers": [],
						"sku_price": [{
								"id": 2382,
								"goods_sku_ids": "1684,1688",
								"goods_id": 1433,
								"weigh": 0,
								"image": "",
								"stock": 5,
								"stock_warning": null,
								"sales": 0,
								"sn": "",
								"weight": 0,
								"price": "100.00",
								"goods_sku_text": "红色,24",
								"status": "up",
								"goods_sku_id_arr": [
									"1684",
									"1688"
								]
							},
							{
								"id": 2383,
								"goods_sku_ids": "1685,1688",
								"goods_id": 1433,
								"weigh": 0,
								"image": "",
								"stock": 133,
								"stock_warning": null,
								"sales": 0,
								"sn": "",
								"weight": 0,
								"price": "110.00",
								"goods_sku_text": "绿色,24",
								"status": "up",
								"goods_sku_id_arr": [
									"1685",
									"1688"
								]
							},
							{
								"id": 2384,
								"goods_sku_ids": "1686,1688",
								"goods_id": 1433,
								"weigh": 0,
								"image": "",
								"stock": 45,
								"stock_warning": null,
								"sales": 0,
								"sn": "",
								"weight": 0,
								"price": "120.00",
								"goods_sku_text": "白色,24",
								"status": "up",
								"goods_sku_id_arr": [
									"1686",
									"1688"
								]
							},
							{
								"id": 2385,
								"goods_sku_ids": "1684,1689",
								"goods_id": 1433,
								"weigh": 0,
								"image": "",
								"stock": 33,
								"stock_warning": null,
								"sales": 0,
								"sn": "",
								"weight": 0,
								"price": "130.00",
								"goods_sku_text": "红色,25",
								"status": "up",
								"goods_sku_id_arr": [
									"1684",
									"1689"
								]
							},
							{
								"id": 2386,
								"goods_sku_ids": "1685,1689",
								"goods_id": 1433,
								"weigh": 0,
								"image": "",
								"stock": 776,
								"stock_warning": null,
								"sales": 0,
								"sn": "",
								"weight": 0,
								"price": "140.00",
								"goods_sku_text": "绿色,25",
								"status": "up",
								"goods_sku_id_arr": [
									"1685",
									"1689"
								]
							},
							{
								"id": 2387,
								"goods_sku_ids": "1686,1689",
								"goods_id": 1433,
								"weigh": 0,
								"image": "",
								"stock": 554,
								"stock_warning": null,
								"sales": 0,
								"sn": "",
								"weight": 0,
								"price": "150.00",
								"goods_sku_text": "白色,25",
								"status": "up",
								"goods_sku_id_arr": [
									"1686",
									"1689"
								]
							},
							{
								"id": 2388,
								"goods_sku_ids": "1684,1690",
								"goods_id": 1433,
								"weigh": 0,
								"image": "",
								"stock": 44,
								"stock_warning": null,
								"sales": 0,
								"sn": "",
								"weight": 0,
								"price": "160.00",
								"goods_sku_text": "红色,26",
								"status": "up",
								"goods_sku_id_arr": [
									"1684",
									"1690"
								]
							},
							{
								"id": 2389,
								"goods_sku_ids": "1685,1690",
								"goods_id": 1433,
								"weigh": 0,
								"image": "",
								"stock": 33,
								"stock_warning": null,
								"sales": 0,
								"sn": "",
								"weight": 0,
								"price": "170.00",
								"goods_sku_text": "绿色,26",
								"status": "up",
								"goods_sku_id_arr": [
									"1685",
									"1690"
								]
							},
							{
								"id": 2390,
								"goods_sku_ids": "1686,1690",
								"goods_id": 1433,
								"weigh": 0,
								"image": "",
								"stock": 0,
								"stock_warning": null,
								"sales": 0,
								"sn": "",
								"weight": 0,
								"price": "180.00",
								"goods_sku_text": "白色,26",
								"status": "up",
								"goods_sku_id_arr": [
									"1686",
									"1690"
								]
							}
						],
						"stock": 1623,
						"activity_discounts": [],
						"activity_discounts_types": "",
						"activity_discounts_tags": [],
						"dispatch_type_arr": [
							"express"
						]
					},

					{
						"id": 1444,
						"type": "normal",
						"title": "111",
						"subtitle": "222222222",
						"weigh": 0,
						"category_ids": "44",
						"image": "https://demo.shopro.top/uploads/20240308/3de27769f453c6ecb4b1e2498a39a7e4.png",
						"price": "19.9",
						"original_price": "29.90",
						"is_sku": 1,
						"likes": 0,
						"views": 11,
						"sales": 11,
						"show_sales": 11,
						"dispatch_type": "express,selfetch,store",
						"dispatch_ids": "1,3,2",
						"deletetime": null,
						"total_sales": 11,
						"activity": null,
						"activity_type": null,
						"buyers": [],
						"sku_price": [{
								"id": 2407,
								"goods_sku_ids": "1704,1707,1711",
								"goods_id": 1444,
								"weigh": 0,
								"image": "",
								"stock": 20,
								"stock_warning": 10,
								"sales": 0,
								"sn": "123456",
								"weight": 0,
								"price": "19.00",
								"goods_sku_text": "白色,M,日式",
								"status": "up",
								"goods_sku_id_arr": [
									"1704",
									"1707",
									"1711"
								]
							},
							{
								"id": 2408,
								"goods_sku_ids": "1704,1708,1711",
								"goods_id": 1444,
								"weigh": 0,
								"image": "",
								"stock": 20,
								"stock_warning": 10,
								"sales": 0,
								"sn": "123456",
								"weight": 0,
								"price": "19.00",
								"goods_sku_text": "白色,S,日式",
								"status": "up",
								"goods_sku_id_arr": [
									"1704",
									"1708",
									"1711"
								]
							},
							{
								"id": 2409,
								"goods_sku_ids": "1704,1709,1711",
								"goods_id": 1444,
								"weigh": 0,
								"image": "",
								"stock": 20,
								"stock_warning": 10,
								"sales": 0,
								"sn": "123456",
								"weight": 0,
								"price": "19.00",
								"goods_sku_text": "白色,L,日式",
								"status": "up",
								"goods_sku_id_arr": [
									"1704",
									"1709",
									"1711"
								]
							},
							{
								"id": 2410,
								"goods_sku_ids": "1705,1707,1711",
								"goods_id": 1444,
								"weigh": 0,
								"image": "",
								"stock": 20,
								"stock_warning": 10,
								"sales": 0,
								"sn": "123456",
								"weight": 0,
								"price": "19.00",
								"goods_sku_text": "红色,M,日式",
								"status": "up",
								"goods_sku_id_arr": [
									"1705",
									"1707",
									"1711"
								]
							},
							{
								"id": 2411,
								"goods_sku_ids": "1705,1708,1711",
								"goods_id": 1444,
								"weigh": 0,
								"image": "",
								"stock": 20,
								"stock_warning": 10,
								"sales": 0,
								"sn": "123456",
								"weight": 0,
								"price": "19.00",
								"goods_sku_text": "红色,S,日式",
								"status": "up",
								"goods_sku_id_arr": [
									"1705",
									"1708",
									"1711"
								]
							},
							{
								"id": 2412,
								"goods_sku_ids": "1705,1709,1711",
								"goods_id": 1444,
								"weigh": 0,
								"image": "",
								"stock": 20,
								"stock_warning": 10,
								"sales": 0,
								"sn": "123456",
								"weight": 0,
								"price": "19.00",
								"goods_sku_text": "红色,L,日式",
								"status": "up",
								"goods_sku_id_arr": [
									"1705",
									"1709",
									"1711"
								]
							},
							{
								"id": 2413,
								"goods_sku_ids": "1704,1707,1712",
								"goods_id": 1444,
								"weigh": 0,
								"image": "",
								"stock": 20,
								"stock_warning": 10,
								"sales": 0,
								"sn": "123456",
								"weight": 0,
								"price": "19.00",
								"goods_sku_text": "白色,M,韩式",
								"status": "up",
								"goods_sku_id_arr": [
									"1704",
									"1707",
									"1712"
								]
							},
							{
								"id": 2414,
								"goods_sku_ids": "1704,1708,1712",
								"goods_id": 1444,
								"weigh": 0,
								"image": "",
								"stock": 20,
								"stock_warning": 10,
								"sales": 0,
								"sn": "123456",
								"weight": 0,
								"price": "19.00",
								"goods_sku_text": "白色,S,韩式",
								"status": "up",
								"goods_sku_id_arr": [
									"1704",
									"1708",
									"1712"
								]
							},
							{
								"id": 2415,
								"goods_sku_ids": "1704,1709,1712",
								"goods_id": 1444,
								"weigh": 0,
								"image": "",
								"stock": 20,
								"stock_warning": 10,
								"sales": 0,
								"sn": "123456",
								"weight": 0,
								"price": "19.00",
								"goods_sku_text": "白色,L,韩式",
								"status": "up",
								"goods_sku_id_arr": [
									"1704",
									"1709",
									"1712"
								]
							},
							{
								"id": 2416,
								"goods_sku_ids": "1705,1707,1712",
								"goods_id": 1444,
								"weigh": 0,
								"image": "",
								"stock": 20,
								"stock_warning": 10,
								"sales": 0,
								"sn": "123456",
								"weight": 0,
								"price": "19.00",
								"goods_sku_text": "红色,M,韩式",
								"status": "up",
								"goods_sku_id_arr": [
									"1705",
									"1707",
									"1712"
								]
							},
							{
								"id": 2417,
								"goods_sku_ids": "1705,1708,1712",
								"goods_id": 1444,
								"weigh": 0,
								"image": "",
								"stock": 20,
								"stock_warning": 10,
								"sales": 0,
								"sn": "123456",
								"weight": 0,
								"price": "19.00",
								"goods_sku_text": "红色,S,韩式",
								"status": "up",
								"goods_sku_id_arr": [
									"1705",
									"1708",
									"1712"
								]
							},
							{
								"id": 2418,
								"goods_sku_ids": "1705,1709,1712",
								"goods_id": 1444,
								"weigh": 0,
								"image": "",
								"stock": 20,
								"stock_warning": 10,
								"sales": 0,
								"sn": "123456",
								"weight": 0,
								"price": "19.00",
								"goods_sku_text": "红色,L,韩式",
								"status": "up",
								"goods_sku_id_arr": [
									"1705",
									"1709",
									"1712"
								]
							}
						],
						"stock": 240,
						"activity_discounts": [],
						"activity_discounts_types": "",
						"activity_discounts_tags": [],
						"dispatch_type_arr": [
							"express",
							"selfetch",
							"store"
						]
					},
					{
						"id": 1443,
						"type": "normal",
						"title": "货到付款",
						"subtitle": "111",
						"weigh": 0,
						"category_ids": "46",
						"image": "https://demo.shopro.top/uploads/20240301/bea7d7e3da7915c7a18d6534572d5613.jpg",
						"price": "12",
						"original_price": "12.00",
						"is_sku": 0,
						"likes": 0,
						"views": 29,
						"sales": 0,
						"show_sales": 0,
						"dispatch_type": "selfetch",
						"dispatch_ids": "328",
						"deletetime": null,
						"total_sales": 0,
						"activity": null,
						"activity_type": null,
						"buyers": [],
						"sku_price": [{
							"id": 2406,
							"goods_sku_ids": null,
							"goods_id": 1443,
							"weigh": 0,
							"image": null,
							"stock": 12,
							"stock_warning": null,
							"sales": 0,
							"sn": "",
							"weight": 0,
							"price": "12.00",
							"goods_sku_text": null,
							"status": "up",
							"goods_sku_id_arr": [
								""
							]
						}],
						"stock": 12,
						"activity_discounts": [],
						"activity_discounts_types": "",
						"activity_discounts_tags": [],
						"dispatch_type_arr": [
							"selfetch"
						]
					},
					{
						"id": 1438,
						"type": "normal",
						"title": "测试111",
						"subtitle": "vessel",
						"weigh": -1,
						"category_ids": "143",
						"image": "https://demo.shopro.top/uploads/20231225/71d305ebafba988fc523591e85c936ab.jpg",
						"price": "55.00",
						"original_price": "2.00",
						"is_sku": 1,
						"likes": 0,
						"views": 340,
						"sales": 0,
						"show_sales": 1,
						"dispatch_type": "express,selfetch",
						"dispatch_ids": "23,12",
						"deletetime": null,
						"total_sales": 1,
						"activity": {
							"id": 246,
							"title": "水果团",
							"type": "groupon",
							"richtext_id": 70,
							"richtext_title": "很好用的富文本",
							"starttime": 1709222400,
							"endtime": 1714406400,
							"rules": {
								"activity_auto_close": "5",
								"fictitious_num": "",
								"is_alone": "1",
								"is_fictitious": "1",
								"limit_buy": "1",
								"order_auto_close": "5",
								"team_card": "1",
								"team_num": "3",
								"valid_time": "24"
							},
							"status_code": "ing"
						},
						"activity_type": "groupon",
						"buyers": [],
						"groupon_price": "2.00",
						"sku_price": [{
								"id": 2398,
								"goods_sku_ids": "1698,1701",
								"goods_id": 1438,
								"weigh": 0,
								"image": "https://demo.shopro.top/uploads/20231225/71d305ebafba988fc523591e85c936ab.jpg",
								"stock": 1,
								"stock_warning": 1,
								"sales": 0,
								"sn": "；；",
								"weight": 0,
								"price": "55.00",
								"goods_sku_text": "11,222",
								"status": "up",
								"groupon_price": "2.00",
								"activity_type": "groupon",
								"activity_id": 246,
								"item_goods_sku_price": {
									"id": 744,
									"activity_id": 246,
									"sku_price_id": 2398,
									"goods_id": 1438,
									"stock": 1,
									"sales": 0,
									"price": "2.00",
									"status": "up"
								},
								"goods_sku_id_arr": [
									"1698",
									"1701"
								]
							},
							{
								"id": 2399,
								"goods_sku_ids": "1699,1701",
								"goods_id": 1438,
								"weigh": 0,
								"image": "https://demo.shopro.top/uploads/20231224/f0cdcd355124015973e1bb1d988b5df8.png",
								"stock": 2,
								"stock_warning": 0,
								"sales": 0,
								"sn": "；；",
								"weight": 0,
								"price": "55.00",
								"goods_sku_text": "222,222",
								"status": "up",
								"groupon_price": "4.00",
								"activity_type": "groupon",
								"activity_id": 246,
								"item_goods_sku_price": {
									"id": 745,
									"activity_id": 246,
									"sku_price_id": 2399,
									"goods_id": 1438,
									"stock": 2,
									"sales": 0,
									"price": "4.00",
									"status": "up"
								},
								"goods_sku_id_arr": [
									"1699",
									"1701"
								]
							},
							{
								"id": 2400,
								"goods_sku_ids": "1698,1702",
								"goods_id": 1438,
								"weigh": 0,
								"image": "",
								"stock": 5,
								"stock_warning": 0,
								"sales": 0,
								"sn": "；；",
								"weight": 0,
								"price": "55.00",
								"goods_sku_text": "11,333",
								"status": "up",
								"groupon_price": "5.00",
								"activity_type": "groupon",
								"activity_id": 246,
								"item_goods_sku_price": {
									"id": 746,
									"activity_id": 246,
									"sku_price_id": 2400,
									"goods_id": 1438,
									"stock": 5,
									"sales": 0,
									"price": "5.00",
									"status": "up"
								},
								"goods_sku_id_arr": [
									"1698",
									"1702"
								]
							},
							{
								"id": 2401,
								"goods_sku_ids": "1699,1702",
								"goods_id": 1438,
								"weigh": 0,
								"image": "",
								"stock": 6,
								"stock_warning": 0,
								"sales": 0,
								"sn": "；；",
								"weight": 0,
								"price": "55.00",
								"goods_sku_text": "222,333",
								"status": "up",
								"groupon_price": "12.00",
								"activity_type": "groupon",
								"activity_id": 246,
								"item_goods_sku_price": {
									"id": 747,
									"activity_id": 246,
									"sku_price_id": 2401,
									"goods_id": 1438,
									"stock": 6,
									"sales": 0,
									"price": "12.00",
									"status": "up"
								},
								"goods_sku_id_arr": [
									"1699",
									"1702"
								]
							}
						],
						"stock": 14,
						"activity_discounts": [],
						"activity_discounts_types": "",
						"activity_discounts_tags": [],
						"dispatch_type_arr": [
							"express",
							"selfetch"
						]
					}
				],
				options: [{
					text: this.$t("user.inquiry-del"),
					style: {
						backgroundColor: '#dd524d',
						color: '#fff'
					},
					onClick: (e) => {
						console.log('删除按钮被点击');
						// 在这里处理删除逻辑
					}
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
			};
		},

		methods: {
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
					if (this.current === 0) {
						this.list = this.allList
					} else if (this.current === 1) {
						this.list = this.allList.filter(item => {
							if (item.state === 0) {
								return item
							}
						})
					}
				}
			},
			back() {
				uni.navigateBack()
			},
			changeShow() {
				this.show = !this.show
			},
			onToInquiry(id) {
				this.$Router.push({
					path: '../goods/inquiry-item',
					query: {
						id
					}
				})
			}
		},
		mounted() {
			// if (this.current === 0) {
			// 	this.list = this.allList
			// }
		}
	};
</script>
<style lang="scss" scoped>
	/* 自定义导航栏样式 */
	.uni-navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: var(--status-bar-height) + 44px;
		/* 考虑到状态栏高度 */
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 7px 3px;
		background-color: #fff;
		z-index: 99;
	}

	.manage-button {
		padding: 5px 10px;
	}

	.segmented-control {
		background-color: #fff;
		height: 40px
	}

	:deep(.segmented-control__item) {
		width: 90px;
		flex: none;
	}
	.head{
		word-break:normal;
	}
	.fixed {
		position: fixed;
		bottom: 0;
		background-color: #fff;
		height: 40px;
		width: 100vw;
		left: 0;

		uni-button {
			margin: 0;
			border-radius: 20px;
			width: 76px;
			margin-left: 10px;
			font-size: 12px;
		}

		uni-button::after {
			border: none;
		}
	}

	.message-null :deep(.uni-card__content) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 12px;
		align-items: center;
		margin: 0 auto;
		background-color: #fff;
	}

	:deep(.uni-swipe) {
		margin-bottom: 10px;
	}

	:deep(.uni-grid) {
		justify-content: space-evenly;
	}

	.message-null {
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		align-items: center;
		background-color: #fff;
	}

	.btn {
		display: block;
		width: 70vw;
		border-radius: 20px;
	}

	.query-block {
		display: flex;
		justify-content: flex-start;
		padding: 10px;
		border-radius: 8px;
		position: relative;
	}

	.query-image {
		width: 100%;
		height: 100%;
		border-radius: 10px;
		border: 1px solid #eee;
	}

	.query-logo {
		width: 100%;
		height: 100%;
		border: 1px solid #eee;
		border-radius: 50%;
	}

	.query-description {
		font-size: 14px;
		width: 60vw;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-bottom: 10px;
		font-weight: bold;
	}

	.query-price {
		font-size: 16px;
		color: #D9001B;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.query-time {
		font-size: 12px;
		color: #999;
		margin-bottom: 10px;
	}

	.warn-btn {
		margin: 0;
		font-size: 14px;
		line-height: 30px;
		border-radius: 20px;
		height: 30px;
	}

	.query-inquiry {
		background-color: #fff;
	}

	.expired {
		color: #999;
	}

	.image-container {
		position: relative;
		width: 100px;
		height: 100px;
		border-radius: 10px;
		margin-right: 10px;
	}

	.mask-layer {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.mask-title {
		color: #fff;
		font-size: 18px;
		font-weight: bold;
		transform: rotate(-37deg);
		text-align: center;
	}

	.mask-logo-layer {
		border-radius: 50%;
		width: 50px;
		height: 50px;
	}

	.mask-logo-title {
		font-size: 14px;
	}

	.text {
		display: inline-block;
		width: 60vw;
		font-size: 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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
</style>