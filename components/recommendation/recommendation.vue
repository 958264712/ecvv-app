<template>
	<uni-card style="margin:0;margin-top:10px;padding-bottom: 100px;">
		<view class="model_scrollx flex_row">
			<scroll-view class="uni-swiper-tab" scroll-x :style="'height:'+scrollH+'px'">
				<scroll-view class="uni-swiper-tab" scroll-x>
					<uni-segmented-control :current="current" :values="tagList" :style-type="styleType"
						:active-color="activeColor" @clickItem="tabClick" />
				</scroll-view>
				<!-- <view class="scrollx_items tg_zdtg" v-for="item in list">
					<view class="tgyx_title">{{item.name}}</view>
				</view> -->
			</scroll-view>
		</view>
		<view>
			<view class="query-block query-product u-m-b-20" v-for="(item,index) in 10" @click="onToProduct(item)">
				<image src="https://demo.shopro.top/uploads/20240308/3de27769f453c6ecb4b1e2498a39a7e4.png" class="query-image"></image>
				<view style="width: 75%;">
					<uni-title type="h4" title="高品质潜水服，潜水服，氯丁橡服，潜水装备 111111111111111111111111111111111111111111" class="query-title"></uni-title>
					<text class="price u-m-t-10">$99~199/件</text>
					<view class="query-time">{{$t("detail.moq") }}：5000件</view>
				</view>
			</view>
			<loading :status="status"></loading>
		</view>
	</uni-card>
</template>

<script>
	import loading from '@/components/loading.vue';
	export default {
		name: "recommendation",
		components: {
			loading
		},
		props: {
			list: {
				type: Array,
			}
		},
		data() {
			return {
				scrollH: 30,
				styleType: 'text',
				status:'more',
				current: 0,
				activeColor: '#15b4fb',
				lastPage: 1,
				listParams: {
					category_id: 0,
					keywords: '',
					order: {
						filterIndex: 0
					},
					page: 1
				},
				tagList: []
			};
		},
		onReachBottom() {
			this.status = "loading"
			if (this.listParams.page < this.lastPage) {
				this.listParams.page += 1;
				this.status = "more"
			}else{
				this.status = "noMore"
			}
		},
		onLoad() {
			// uni.getSystemInfo({
			// 	success: function(res) { // res - 各种参数
			// 		let info = uni.createSelectorQuery().select(".scrollx_items");
			// 		info.boundingClientRect(function(data) { //data - 各种参数
			// 			this.scrollH = data.height
			// 		}).exec()
			// 	}
			// });
		},
		created() {
			this.list.map((item) => {
				this.tagList.push(item.name)
			})
		},
		methods: {
			tabClick(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
					this.listIndex = e.currentIndex
				}
			},
			onToProduct(data){
				uni.navigateTo({
					url:`/pages/goods/detail?id=${data}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 左右滑动 */
	.uni-swiper-tab {
		white-space: nowrap;
	}

	.model_scrollx {
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.scrollx_items {
		text-align: center;
		display: inline-block;
		box-sizing: border-box;
		margin-left: 20px;
	}

	.scrollx_items:last-child {
		margin-right: 30rpx;
	}

	.tgyx_title {
		font-size: 14px;
		color: #333333;
	}

	.model_scrollx {
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.scrollx_items {
		text-align: center;
		display: inline-block;
		box-sizing: border-box;
		margin-left: 20px;
	}

	.model_scrollx :deep(.segmented-control) {
		display: block;
		overflow: inherit;

		.segmented-control__item {
			margin: 0 10px;
		}
	}
	/* 样式部分 */
	.query-block {
		display: flex;
		justify-content: flex-start;
		padding: 10px;
		border-radius: 8px;
		margin-bottom: 10px;
		position: relative;
		
	}
	.query-title{
		display: -webkit-box;
		width: 100%;
		font-size: 12px;
		height: 50px;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.query-image {
		width: 100px;
		height: 100px;
		border-radius: 10px;
		border: 1px solid #eee;
		margin-right: 10px;
	}
	
	.price {
		color: red;
		font-size: 14px;
	}
	
	.query-time {
		font-size: 12px;
		color: #999;
		margin-bottom: 10px;
	}
	


</style>