<template>
	<view style="width:100%;">
		<view class="u-flex u-row-between" style="width:100%;position: relative;">
			<uni-title type="h4" :title="title"></uni-title>
			<uni-icons type="right" class="right" size="24" @click="handleCurrent"></uni-icons>
		</view>
		<view class="content" v-if="type===0">
			<view>
				<uni-grid :column="2" :show-border="false">
					<uni-grid-item v-for="item in list" style="height:200px;width: 180px;" @click="toHref(item.pid)">
						<view style="width: 95%;height: 50%;">
							<image :src="item.picPath" style="width: 100%;height: 100%;"></image>
						</view>
						<view class="text1">{{item.productname}}</view>
						<text class="price u-m-t-10">{{item.m_Currency}}{{item.m_FobPrice}}/{{item.minOrderUnit}}</text>
						<text class="moq u-m-t-10">{{$t('detail.moq')}}：{{item.m_Minimum_Order}}{{item.minOrderUnit}}</text>
					</uni-grid-item>
				</uni-grid>
			</view>
		</view>
		<view v-if="type===1">
			<view class="bg-white u-p-20 u-flex u-m-b-20" v-for="item in list" @click="toHref(item.pid)">
				<view style="width: 30%;height: 80px;">
					<image :src="item.picPath" style="width: 100%;height: 100%;"></image>
				</view>
				<view style="width: 65%;" class="u-m-l-20">
					<view class="text1">{{item.productname}}</view>
					<text class="price u-m-t-10">{{item.m_Currency}}{{item.m_FobPrice}}/{{item.minOrderUnit}}</text>
					<view class="moq u-m-t-10 u-flex u-row-between">
						<view>{{$t('detail.moq')}}：{{item.m_Minimum_Order}}{{item.minOrderUnit}}</view>
						<view class="btn" @click="onToinquiry(item.pid)">{{$t('detail.inquiry')}}</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "product-grid",
		props: {
			list: {
				type: Array,
			},
			type: {
				type: Number,
				default: 0
			},
			title: {
				type: String,
			},
		},
		data() {
			return {

			};
		},
		methods: {
			onTo() {
				uni.navigateTo({
					url: this.path
				})
			},
			toHref(t) {
				this.$Router.push({
					path: '../../goods/detail',
					query: {
						id: t
					}
				})
			},
			handleCurrent(){
				this.$emit('change-current', 1);
			},
			onToinquiry(t) {
				this.$Router.push({
					path: '../../goods/inquiry-item',
					query: {
						id: t
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.right {
		position: absolute;
		right: 0;
		top: 8px;
	}

	.content {
		padding: 20px 0;
		background-color: white;
	}

	:deep(.uni-grid) {
		align-content: center;
		justify-content: center;
	}

	.text1 {
		display: -webkit-box;
		width: 100%;
		font-size: 12px;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.price {
		color: red;
		font-size: 14px;
	}

	.moq {
		color: #ccc;
		font-size: 12px;
	}

	.btn {
		width: 70px;
		height: 24px;
		line-height: 24px;
		font-size: 12px;
		color: #fff;
		text-align: center;
		border-radius: 10px;
		background-color: #ec652b;
	}
</style>