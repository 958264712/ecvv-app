<!-- 商品列表 -->
<template>
	<view class="list-box">
		<view class="head-box">
			<!-- 标题栏 -->
			<view class="u-flex u-row-between u-p-20">
				<uni-icons type="left" size="28" @click="back"></uni-icons>
				<view class="u-flex w85">
					<uni-search-bar style="width: 90%;padding:0;marginLeft:20px;" class="uni-mt-10" radius="100"
						cancelButton="none" @change="onSearch" @search="onSearch" @clear="clearSearch"
						v-model="searchVal" />
					<!-- <input :placeholder="$t('search.place-text-two')" @change="onSearch"  @search="onSearch" @clear="clearSearch" v-model="searchVal" :show-action="false"/> -->
					<view class="bg-f">
						{{$t('search.button')}}
					</view>
				</view>
			</view>
			<!-- <searchHead>
				<template v-slot:content>
					<uni-easyinput style="width: 95%;padding:0;" class="uni-mt-10" 
						 />
				</template>
				<template v-slot:right><button style="width:90px;">{{$t('search.button')}}</button>
				</template>
			</searchHead> -->
			<!-- 筛选栏 -->
			<sh-filter @change="onFilter"></sh-filter>
		</view>
		<view class="u-waterfall u-p-16" v-if="!isEmpty && listParams.order.filterIndex === 0">
			<view id="u-left-column" class="u-column">
				<view class="goods-item u-m-b-16 u-flex u-row-center u-col-center" v-for="leftGoods in leftList"
					:key="leftGoods.id">
					<shopro-goods-card :detail="leftGoods" :type="leftGoods.activity_type" :image="leftGoods.image"
						:title="leftGoods.title" :subtitle="leftGoods.subtitle" :price="leftGoods.price"
						:originPrice="leftGoods.original_price" :sales="leftGoods.sales"
						:tagTextList="leftGoods.activity_discounts_tags"
						@click="pushid('left',leftGoods.id)"></shopro-goods-card>
				</view>
			</view>
			<view id="u-right-column" class="u-column">
				<view class="goods-item u-m-b-16 u-flex u-row-center u-col-center" v-for="rightGoods in rightList"
					:key="rightGoods.id">
					<shopro-goods-card :detail="rightGoods" :type="rightGoods.activity_type" :image="rightGoods.image"
						:title="rightGoods.title" :subtitle="rightGoods.subtitle" :price="rightGoods.price"
						:originPrice="rightGoods.original_price" :sales="rightGoods.sales"
						:tagTextList="rightGoods.activity_discounts_tags"
						@click="pushid('right',rightGoods.id)"></shopro-goods-card>
				</view>
			</view>
		</view>
		<view class="u-waterfall" v-else-if="!isEmpty && listParams.order.filterIndex === 1">
			<view class="u-column">
				<view class="u-flex u-col-center" v-for="leftGoods in leftList" :key="leftGoods.id">
					<uni-card :thumbnail="leftGoods.image">
						<template v-slot:title>
							<view class="u-flex u-col-center u-row-between" @click="onClick(leftGoods.id)">
								<view style="width: 60px;margin-right: 10px;">
									<image :src="leftGoods.image"
										style="width: 50px;height:50px;border-radius: 50%;margin-top: 10px;"></image>
								</view>
								<view>
									<uni-title type="h4" title="深圳XXXXXXXX生态汽车有限公司"></uni-title>
									<view class="u-flex u-col-center u-row-between" style="width:40vw;font-size: 12px;">
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
							<uni-grid-item v-for="(item,index) in 3" style="height:150px" @click="onProduct(index)">
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
		<!-- 缺省页 -->
		<shopro-empty v-if="isEmpty" image="../../static/images/icon/empty.png" :title="$t('search.very-sorry')"
			:btnText="$t('search.empty-button')" :tipText="$t('search.empty-text')"></shopro-empty>
		<!-- 商品缺省推荐 -->
		<recommendation v-if="isEmpty&& listParams.order.filterIndex === 0" :list="recommendationList"></recommendation>
		<view v-if="isEmpty&& listParams.order.filterIndex === 1">
			<view class="u-column">
				<uni-title type="h4" :title="$t('search.recommended')"></uni-title>
				<view class="u-flex u-col-center" v-for="leftGoods in leftList" :key="leftGoods.id">
					<uni-card :thumbnail="leftGoods.image" @click="onClick(leftGoods.id)">
						<template v-slot:title>
							<view class="u-flex u-col-center u-row-between" @click="onClick(leftGoods.id)">
								<view style="width: 60px;margin-right: 10px;">
									<image :src="leftGoods.image"
										style="width: 50px;height:50px;border-radius: 50%;margin-top: 10px;"></image>
								</view>
								<view>
									<uni-title type="h4" title="深圳XXXXXXXX生态汽车有限公司"></uni-title>
									<view class="u-flex u-col-center u-row-between" style="width:40vw;font-size: 12px;">
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
		<!-- 加载更多 -->
		<loading :status="status"></loading>
		<!-- <u-loadmore v-show="!isEmpty" height="80rpx" :status="loadStatus" icon-type="flower" color="#ccc" /> -->
		<!-- 登录弹窗 -->
		<!-- <shopro-auth-modal></shopro-auth-modal> -->
	</view>
</template>

<script>
	import shFilter from './components/sh-filter.vue';
	import searchHead from '@/components/searchHead/searchHead.vue';
	import recommendation from '@/components/recommendation/recommendation.vue';
	import loading from '@/components/loading.vue';
	import {
		mapMutations,
		mapActions,
		mapState
	} from 'vuex';
	let systemInfo = uni.getSystemInfoSync();
	let historyTag = uni.getStorageSync('searchHistoryArr') ? JSON.parse(uni.getStorageSync('searchHistoryArr')) : [];
	export default {
		components: {
			shFilter,
			recommendation,
			loading
		},
		data() {
			return {
				isEmpty: false,
				goodsList: [],
				searchVal: '',
				status:'more',
				listParams: {
					category_id: 0,
					keywords: '',
					order: {
						filterIndex: 0
					},
					page: 1
				},
				lastPage: 1,
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
				// 瀑布流 350-330
				addTime: 100, //排序间隙时间
				leftHeight: 0,
				rightHeight: 0,
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
				rightList: [{
						"id": 1449,
						"type": "normal",
						"title": "111",
						"subtitle": "111",
						"weigh": 1,
						"category_ids": "46",
						"image": "https://demo.shopro.top/uploads/20240404/f378e4cc11ee5baec4654cd996dccfa9.jpg",
						"price": "22",
						"original_price": "121.00",
						"is_sku": 0,
						"likes": 0,
						"views": 227,
						"sales": 212,
						"show_sales": 212,
						"dispatch_type": "express",
						"dispatch_ids": "26",
						"deletetime": null,
						"total_sales": 212,
						"activity": null,
						"activity_type": null,
						"buyers": [],
						"sku_price": [{
							"id": 2425,
							"goods_sku_ids": null,
							"goods_id": 1449,
							"weigh": 0,
							"image": null,
							"stock": 212,
							"stock_warning": null,
							"sales": 0,
							"sn": "",
							"weight": 0,
							"price": "22.00",
							"goods_sku_text": null,
							"status": "up",
							"goods_sku_id_arr": [
								""
							]
						}],
						"stock": 212,
						"activity_discounts": [],
						"activity_discounts_types": "",
						"activity_discounts_tags": [],
						"dispatch_type_arr": [
							"express"
						]
					},
					{
						"id": 1427,
						"type": "virtual",
						"title": "1111",
						"subtitle": "1112",
						"weigh": 1,
						"category_ids": "44",
						"image": "https://demo.shopro.top/uploads/20231031/9df0b6b5534cf5383043942ea8409deb.jpg",
						"price": "10",
						"original_price": "10.00",
						"is_sku": 0,
						"likes": 0,
						"views": 25,
						"sales": 1,
						"show_sales": 1,
						"dispatch_type": "autosend",
						"dispatch_ids": "15",
						"deletetime": null,
						"total_sales": 1,
						"activity": null,
						"activity_type": null,
						"buyers": [],
						"sku_price": [{
							"id": 2379,
							"goods_sku_ids": null,
							"goods_id": 1427,
							"weigh": 0,
							"image": null,
							"stock": 10,
							"stock_warning": null,
							"sales": 0,
							"sn": "0",
							"weight": 1,
							"price": "10.00",
							"goods_sku_text": null,
							"status": "up",
							"goods_sku_id_arr": [
								""
							]
						}],
						"stock": 10,
						"activity_discounts": [],
						"activity_discounts_types": "",
						"activity_discounts_tags": [],
						"dispatch_type_arr": [
							"autosend"
						]
					},
					{
						"id": 1418,
						"type": "virtual",
						"title": "11",
						"subtitle": "11",
						"weigh": 1,
						"category_ids": "45",
						"image": "https://demo.shopro.top/uploads/20230905/87df098680437b24e89358735734ccfa.png",
						"price": "20",
						"original_price": "20.00",
						"is_sku": 0,
						"likes": 0,
						"views": 1188,
						"sales": 111,
						"show_sales": 111,
						"dispatch_type": "selfetch",
						"dispatch_ids": "9",
						"deletetime": null,
						"total_sales": 111,
						"activity": null,
						"activity_type": null,
						"buyers": [],
						"sku_price": [{
							"id": 2370,
							"goods_sku_ids": null,
							"goods_id": 1418,
							"weigh": 0,
							"image": null,
							"stock": 1010,
							"stock_warning": 1,
							"sales": 0,
							"sn": "",
							"weight": 0,
							"price": "20.00",
							"goods_sku_text": null,
							"status": "up",
							"goods_sku_id_arr": [
								""
							]
						}],
						"stock": 1010,
						"activity_discounts": [],
						"activity_discounts_types": "",
						"activity_discounts_tags": [],
						"dispatch_type_arr": [
							"selfetch"
						]
					},
				],
				tempList: []
			};
		},
		// 触底加载更多
		onReachBottom() {
			console.log('已触底');
			this.status = "loading"
			if (this.listParams.page < this.lastPage) {
				this.listParams.page += 1;
				this.getGoodsList();
				this.status = "more"
			}else{
				this.status = "noMore"
			}
		},
		mounted() {
			let searchVal = uni.getStorageSync('searchVal') ;
			this.searchVal = searchVal
			// if (this.$Route.query.id) {
			// 	this.listParams.category_id = this.$Route.query.id;
			// 	this.getGoodsList();
			// } else if (this.$Route.query.hasOwnProperty('keywords')) {
			// 	this.listParams.keywords = this.$Route.query.keywords;
			// 	this.searchVal = this.$Route.query.keywords;
			// 	!this.$Route.query.keywords && this.getGoodsList();
			// } else {
			// 	this.getGoodsList();
			// }
		},
		methods: {
			pushid(type, id) {
				// this?.$Router.push({ path: '/pages/goods/detail', query: { id: id } })

				uni.navigateTo({
					url: `/pages/goods/detail?id=${id}`
				})
			},
			// 瀑布流相关
			async splitData() {
				if (!this.tempList.length) return;
				let item = this.tempList[0];
				if (!item) return;

				// 分左右
				if (this.leftHeight < this.rightHeight) {
					this.leftHeight += item.activity_discounts_tags.length ? 350 : 330;
					this.leftList.push(item);
				} else if (this.leftHeight > this.rightHeight) {
					this.rightHeight += item.activity_discounts_tags.length ? 350 : 330;
					this.rightList.push(item);
				} else {
					this.leftHeight += item.activity_discounts_tags.length ? 350 : 330;
					this.leftList.push(item);
				}

				// 移除临时列表的第一项，如果临时数组还有数据，继续循环
				this.tempList.splice(0, 1);
				if (this.tempList.length) {
					setTimeout(() => {
						this.splitData();
					}, this.addTime);
				}
			},
			clear() {
				this.leftList = [];
				this.rightList = [];
				this.leftHeight = 0;
				this.rightHeight = 0;
				this.tempList = [];
			},

			onFilter(e) {
				this.listParams.order = e;
				this.goodsList = [];
				this.listParams.page = 1;
				this.lastPage = 1;
				// this.clear();
				this.$u.debounce(this.getGoodsList);
			},
			// 键盘搜索,输入搜索
			onSearch() {
				this.goodsList = [];
				this.listParams.page = 1;
				this.lastPage = 1;
				this.listParams.keywords = this.searchVal;
				this.clear();
				this.$u.debounce(this.getGoodsList);
			},

			// 队列
			getArr(list, item) {
				let arr = list;
				let length = 10; //队列长度
				arr.length < length ? arr.unshift(item) : arr.pop();
				return arr;
			},

			// 清除搜索框
			clearSearch() {
				this.searchVal = '';
				this.clear();
			},
			// 商品列表
			getGoodsList() {
				let that = this;
				that.loadStatus = 'loading';
				that.$http('goods.lists', that.listParams, '加载中...').then(res => {
					if (this.searchVal && !historyTag.includes(this.searchVal)) {
						let searchHistoryArr = JSON.stringify(this.getArr(historyTag, this.searchVal));
						uni.setStorageSync('searchHistoryArr', searchHistoryArr);
					}
					if (res.code === 1) {
						that.goodsList = [...that.goodsList, ...res.data.data];
						that.isEmpty = !that.goodsList.length;
						that.lastPage = res.data.last_page;
						that.loadStatus = that.listParams.page < res.data.last_page ? 'loadmore' : 'nomore';
						that.tempList = res.data.data;
						that.splitData();
					}
				});
			},
			back() {
				uni.navigateBack()
			},
			onClick(id) {
				uni.navigateTo({
					url: `../company/manufacturer/manufacturer?id=${id}`
				})
			},
			onProduct(id) {
				uni.navigateTo({
					url: `./detail?id=${id}`
				})
			},
		}
	};
</script>

<style lang="scss">
	@mixin vue-flex($direction: row) {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: $direction;
		/* #endif */
	}

	.u-waterfall {
		@include vue-flex;
		flex-direction: row;
		align-items: flex-start;
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

	.u-column {
		@include vue-flex;
		flex: 1;
		flex-direction: column;
		height: auto;
	}

	.head-box {
		position: -webkit-sticky;
		position: sticky;
		z-index: 998;
		background: #fff;
	}

	.w85 {
		width: 100%
	}

	.bg-f {
		position: absolute;
		background-color: #15b4fb;
		right: 12px;
		font-size: 14px;
		color: #fff;
		height: 35px;
		width: 60px;
		border-radius: 20px;
		text-align: center;
		line-height: 35px;
	}
</style>