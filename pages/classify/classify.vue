<template>
	<view class="container">
		<view class="model_scrollx flex_row">
			<scroll-view class="uni-swiper-tab u-p-l-20" scroll-x>
				<uni-segmented-control :current="current" :values="tagList" :style-type="styleType"
					:active-color="activeColor" @clickItem="tabClick" />
			</scroll-view>
		</view>
		<uni-card style="margin: 0 10px;">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :interval="interval" :duration="duration"
				style="height: 200px;">
				<swiper-item v-for="(ite, index) in itemList[listIndex]">
					<uni-grid :column="4" :show-border="false">
						<uni-grid-item v-for="(item, index) in ite" :key="item.eCategoryID"
							@click="onClick(item,index)">
							<view class="grid-item-box u-flex u-flex-wrap  u-row-center u-m-b-10">
								<view class="img">
									{{ item.eCategoryName }}
								</view>
								<text class="text">{{ item.eCategoryName }}</text>
							</view>
						</uni-grid-item>
					</uni-grid>
				</swiper-item>
			</swiper>
		</uni-card>
		<recommendation style="margin: 0 10px;"></recommendation>
	</view>
</template>

<script>
	import recommendation from '@/components/recommendation/recommendation.vue';
	export default {
		components: {
			recommendation
		},
		data() {
			return {
				styleType: 'text',
				current: 0,
				activeColor: '#15b4fb',
				indicatorDots:true,
				id: 0,
				tagList: uni.getStorageSync('tagList') ? JSON.parse(uni.getStorageSync('tagList')) : [],
				idList: uni.getStorageSync('idList') ? JSON.parse(uni.getStorageSync('idList')) : [],
				itemList: [],
				ifHref: false,
				listIndex: 0,
			}
		},
		mounted() {
			this.getTagList(0)
		},
		onShow() {
			this.current = 0
			this.getTagList(0)
		},
		methods: {
			async tabClick(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
					this.listIndex = e.currentIndex
					await this.getTagList(this.idList[e.currentIndex])
				}
			},
			async onClick(data, index) {
				await this.getTagList(data.eCategoryID)
				if (!this.ifHref) {
					this.current++
					this.tagList.unshift(this.$t('index.mine-categories'))
				} else {
					this.$Router.push({
						path: `../goods/list?keywords=${data.eCategoryID}`
					})
					uni.setStorageSync('searchVal', data.eCategoryName)
				}
			},
			async getTagList(id) {
				await this.$request.get('api/home/getEcategoryRelateion', {
					eCategoryID: id
				}).then(res => {
					if (res.type === 'success') {
						if (id === 0) {
							this.tagList = []
							this.idList = []
							res.result?.map(item => {
								this.tagList.push(item.eCategoryName)
								this.idList.push(item.eCategoryID)
							})
							this.id = res.result[0].eCategoryID
							uni.setStorageSync('tagList', JSON.stringify(this.tagList))
							uni.setStorageSync('idList', JSON.stringify(this.idList))
							this.getTagList(this.id)
						} else {
							this.id = id
							this.itemList[this.listIndex] = []
							let arr = []
							let ind = 0
							if (res.result?.length === 0) {
								this.ifHref = true
							} else {
								res.result.map((item, index) => {
									if ((index % 8 === 0 || index + 1 === res.result?.length) &&
										index !== 0) {
										this.itemList[this.listIndex][ind] = arr;
										arr = [];
										ind++;
										arr.push(item)
									} else {
										arr.push(item)
									}
								})
							}
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-swiper-tab {
		white-space: nowrap;
		height: 50px;
		background-color: #fff;
		line-height: 50px;
	}

	.img {
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 12px;
		border-radius: 50%;
		background-color: #15b4fb;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.text {
		white-space: nowrap;
		width: 100%;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.model_scrollx {
		justify-content: space-between;
		margin-bottom: 10px;
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

	.line {
		height: 4rpx;
		background: transparent;
		position: absolute;
		bottom: 0;
		z-index: 2;
	}

	.line-active {
		background: rgba(213, 166, 90, 1);
	}

	.scrollx_items:last-child {
		margin-right: 30rpx;
	}

	.tgyx_title {
		font-size: 14px;
		color: #333333;
	}
</style>