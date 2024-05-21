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
				style="height: 155px;">
				<swiper-item v-for="(ite, index) in itemList[listIndex]" >
					<uni-grid :column="4" :show-border="false">
						<uni-grid-item v-for="(item, index) in ite" :index="index" :key="index" @click="onClick(item,index)">
							<view class="grid-item-box u-flex u-flex-wrap  u-row-center u-m-b-10">
								<view class="img">
									{{ item.itemName }}
								</view>
								<text class="text">{{ item.itemName }}</text>
							</view>
						</uni-grid-item>
					</uni-grid>
				</swiper-item>
			</swiper>
		</uni-card>
		<recommendation style="margin: 0 10px;" :list="recommendationList"></recommendation>
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
				tagList: ['机械', '电子设备和电子元件', '灯光与照明', '汽车摩托', 'xxxxxxxx', 'xxxxxxxx', 'xxxxxxxx', 'xxxxxxxx', ],
				itemList: [
					[
						[{
							itemName: '机械',
							img: '',
							list:[
								{
									itemName: '机械零件和制造商',
									img: ''
								},
								{
									itemName: '机械',
									img: ''
								},
								{
									itemName: '机械零件和制造商',
									img: ''
								},
								{
									itemName: '机械',
									img: ''
								},
							]
						},
						{
							itemName: '机械零件和制造商',
							img: ''
						},
						{
							itemName: '机械',
							img: ''
						},
						{
							itemName: '机械零件和制造商',
							img: ''
						},
						{
							itemName: '机械',
							img: ''
						},
						{
							itemName: '机械零件和制造商',
							img: ''
						},
						{
							itemName: '机械',
							img: ''
						},
						{
							itemName: '机械零件和制造商',
							img: ''
						},
						],
						[{
							itemName: '机械',
							img: ''
						},
						{
							itemName: '机械零件和制造商',
							img: ''
						},
						{
							itemName: '机械',
							img: ''
						},
						{
							itemName: '机械零件和制造商',
							img: ''
						},
						{
							itemName: '机械',
							img: ''
						},
						{
							itemName: '机械零件和制造商',
							img: ''
						}],
					],

					[[{
							itemName: '电子设备和电子元件',
							img: ''
						},
						{
							itemName: '电子设备',
							img: ''
						},]
					],
					[[{
							itemName: '灯光与照明',
							img: ''
						},
						{
							itemName: '灯光',
							img: ''
						},]
					],
					[[{
							itemName: '汽车摩托',
							img: ''
						},
						{
							itemName: '汽车',
							img: ''
						},]
					],
					[[{
							itemName: '汽车摩托',
							img: ''
						},
						{
							itemName: '汽车',
							img: ''
						},]
					]
				],
				listIndex: 0,
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
			}
		},
		methods: {
			tabClick(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
					this.listIndex = e.currentIndex
				}
			},
			onClick(data,index){
				
				if(data.list){
					this.itemList[index][this.listIndex] = data.list
					this.current++
					this.tagList.unshift('我的分类')
				}else{
					this.$Router.push({
						path:`../goods/list?keywords=${data.itemName}`
					})
					uni.setStorageSync('searchVal', data.itemName)
				}
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
		background-color: aquamarine;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.text{
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