<template>
	<view class="page_box">
		<!-- 搜索框 -->
		<view class="u-flex u-row-between u-p-20">
			<uni-icons type="left" size="28" @click="back"></uni-icons>
			<view class="u-flex w85">
				<uni-search-bar style="width: 90%;padding:0;marginLeft:20px;" class="uni-mt-10" radius="100"
					cancelButton="none" @change="onSearch" @search="onSearch" @clear="clearSearch" v-model="searchVal"
					:placeholder="$t('search.place-text')" />
				<!-- <input :placeholder="$t('search.place-text-two')" @change="onSearch"  @search="onSearch" @clear="clearSearch" v-model="searchVal" :show-action="false"/> -->
				<view class="bg-f" @click="onSearch">
					{{$t('search.button')}}
				</view>
			</view>
		</view>
		<!-- 	<view class="head_box">
			<uni-search-bar style="width: 85%;padding:0;margin:20px;" class="uni-mt-10" radius="100" cancelButton="none"
				v-model="searchVal"  @search="onSearch" @custom="onSearch" @clear="clearSearch" />
		</view> -->

		<view v-if="searchVal.length < 1">
			<view class="content_box">
				<!-- 搜索历史 -->
				<view class="search-history">
					<view class="title-box u-flex u-row-between u-m-b-40">
						<view class="title">{{$t('search.local-search')}}</view>
						<uni-icons type="trash" size="30" v-if="!ifDel" @click="ifDel=true"></uni-icons>
						<view v-else>
							<text class="u-reset-button clear-history-btn"
								@tap="messageToggle">{{$t('search.all-del')}}</text>
							<span>|</span>
							<text class="u-reset-button clear-history-btn"
								@click="ifDel=false">{{$t('search.success')}}</text>
						</view>
					</view>

					<view class="content u-flex u-col-center u-row-left u-flex-wrap">
						<view class="item u-reset-button u-m-b-20 u-m-r-20 u-flex u-ellipsis-1"
							v-for="(item, index) in historyTag" :key="index">
							<view @tap="onSearch(item)">{{ item }}</view>
							<uni-icons class="u-m-l-10" type="close" size="16" v-if="ifDel"
								@tap="onDel(index)"></uni-icons>
						</view>
					</view>
				</view>
			</view>
			<view class="content_box">
			</view>
			<!--  热门搜索 -->
			<view class="search-history">
				<view class="title-box u-flex u-row-between u-m-b-40">
					<view class="title"> {{$t('search.hot-search')}}</view>
				</view>
				<view class="content u-flex u-col-center u-row-left u-flex-wrap">
					<button class="item u-reset-button u-m-b-20 u-m-r-20  u-ellipsis-1" @tap="onSearch(item)"
						v-for="(item, index) in historyTag" :key="index">{{ item }}</button>
				</view>
			</view> 
		</view>
		<view v-else>
			<searchResults :keyword="searchVal" @changeSearchVal="changeSearchVal"> </searchResults>
		</view>
		<recommendation :list="recommendationList"></recommendation>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="info" :cancelText="$t('search.cancel')" :confirmText="$t('search.confirm')"
				:title="$t('search.confirm-del')" :content="$t('search.always-del')" @confirm="clearSearchHistory"
				@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="success" :message="$t('search.success-del')" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
	<!-- v-if="historyTag.length" -->
</template>

<script>
	import recommendation from '@/components/recommendation/recommendation.vue';
	import searchResults from '@/components/searchResults/searchResults.vue';
	export default {
		components: {},
		data() {
			return {
				searchVal: '',
				historyTag: [],
				showModal: false,
				ifDel: false,
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
		computed: {},
		onShow() {
			this.historyTag = uni.getStorageSync('searchHistoryArr') ? JSON.parse(uni.getStorageSync('searchHistoryArr')) :
				[];
		},
		methods: {
			// 搜索
			onSearch(e) {
				if (e && !this.historyTag.includes(e)) {
					let searchHistoryArr = JSON.stringify(this.getArr(this.historyTag, this.searchVal));
					uni.setStorageSync('searchHistoryArr', searchHistoryArr);
					uni.navigateTo({
						url: `/pages/goods/list?keywords=${this.searchVal}`,
					})
					uni.setStorageSync('searchVal', this.searchVal)
				} else {
					uni.navigateTo({
						url: `/pages/goods/list?keywords=${this.searchVal}`,
					})
					uni.setStorageSync('searchVal', e)
				}
				this.searchVal = '';
			},
			// 清除输入框
			clearSearch() {
				this.searchVal = '';
			},
			changeSearchVal(item){
				console.log(item);
				this.searchVal = item
			},
			// 队列
			getArr(list, item) {
				let arr = list;
				let length = 10; //队列长度
				arr.length < length ? arr.unshift(item) : arr.pop();
				return arr;
			},
			// 清除历史记录
			clearSearchHistory() {
				this.historyTag = [];
				uni.removeStorageSync('searchHistoryArr');
				this.$refs.message.open()
			},
			onDel(index) {
				this.historyTag.splice(index, 1)
				let searchHistoryArr = JSON.stringify(this.historyTag);
				uni.setStorageSync('searchHistoryArr', searchHistoryArr);
			},
			dialogToggle() {
				this.$refs.alertDialog.close()
			},
			messageToggle() {
				this.$refs.alertDialog.open()
			},
			back() {
				uni.navigateBack()
			},
		}
	};
</script>

<style lang="scss">
	.page_box {
		background-color: #fff;
	}

	.u-flex {
		display: flex;
	}

	.u-row-between {
		justify-content: space-between;
	}


	.search-history {
		padding: 30rpx;

		.title-box {
			.title {
				font-size: 30rpx;
				font-weight: bold;
				color: #333333;
			}

			.clear-history-btn {
				font-size: 28rpx;
				font-weight: 500;
				color: #999999;
			}
		}

		.content {
			width: 100%;

			.item {
				padding: 0 20rpx;
				line-height: 60rpx;
				background: #f5f6f8;
				border-radius: 30rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #333333;
				max-width: 690rpx;
			}
		}
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