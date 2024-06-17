<template>
	<uni-card style="margin:0;margin-top:10px;">
		<view class="model_scrollx flex_row">
			<scroll-view class="uni-swiper-tab" scroll-x :style="'height:'+scrollH+'px'">
				<scroll-view class="uni-swiper-tab" scroll-x>
					<uni-segmented-control :current="current" :values="tagList" :style-type="styleType"
						:active-color="activeColor" @clickItem="tabClick" />
				</scroll-view>
			</scroll-view>
		</view>
		<view>
			<view class="query-block query-product u-m-b-20" v-for="(item,index) in productList" @click="onToProduct(item.productID)" :key="item.productID">
				<image :src="item.src" class="query-image"></image>
				<view style="width: 75%;">
					<uni-title type="h4" :title="item.title" class="query-title"></uni-title>
					<text class="price u-m-t-10">{{item.price}}/{{item.pieceOrSet}}</text>
					<view class="query-time">{{$t("detail.moq") }}：{{item.order}}</view>
				</view>
			</view>
			<!-- <loading :status="status"></loading> -->
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
		data() {
			return {
				scrollH: 30,
				styleType: 'text',
				status:'more',
				current: 0,
				activeColor: '#15b4fb',
				lastPage: 1,
				listParams: {
					cid: 0,
					pagesize:20,
					pageindex: 1
				},
				tagList: ['推荐'],
				recommendationList: [{name:'推荐',id:0}],
				productList:[]
			};
		},
		onReachBottom() {
			
		},
		mounted() {
			this.handleQuery()
		},
		beforeMount() {
			uni.$on('onReachBottom',()=>{
				this.status = "loading"
				if (this.listParams.pageindex < this.lastPage) {
					this.listParams.pageindex += 1;
					this.handlequeryProduct(Object.assign(this.listParams))
					this.status = "more"
				}else{
					this.status = "noMore"
				}
			})
		},
		destroyed() {
			uni.$off('onReachBottom')
		},
		methods: {
			async handleQuery(){
				await this.$request.get('api/home/getRecomCatList').then(res=>{
					if(res.type==='success'){
						for(let key in res.result){
							let obj = { 
								name:key,
								id:res.result[key]
							}
							this.tagList.push(key)
							this.recommendationList.push(obj)
						}
						this.handlequeryProduct(Object.assign(this.listParams))
					}
				})
			},
			async handlequeryProduct(data){
				await this.$request.get('api/home/getHotProductList',data).then(res=>{
					if(res.type==='success'){
						this.productList =[...this.productList, ...res.result.list]
						this.lastPage = res.result.pageCount
					}
				})
			},
			tabClick(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
					this.productList = []
					this.listParams = {
						cid: this.recommendationList[e.currentIndex].id,
						pagesize:20,
						pageindex: 1
					}
					// this.handlequeryProduct(Object.assign(this.listParams))
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