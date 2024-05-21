<template>
	<view class="container">
		<!-- 询价主题 -->
		<inquiryinfo-type-card type="info"/>
		<!-- 报价厂家 -->
		<view class="u-flex u-row-between u-m-t-40 u-m-b-10">
			<view class="manufacturerLeft">{{$t("user.inquiry-shop")}}</view>
			<view class="manufacturerRight">{{$t("user.inquiry-in")}}<text
					style="color: red;margin: 0 5px;font-weight: bold;">{{list.length}}</text>{{$t("user.inquiry-total")}}
			</view>
		</view>
		<manufacturer-card v-for="(item, index) in list" :key="index" :back="item.title" :description="item.description"
			:time="item.time" :image="item.image" :id="item.id" />
		<view class="fixed u-flex u-row-right">
			<button type="warn" class="u-m-r-20">{{$t("user.inquiry-del")}}</button>
			<button type="default" class="u-m-r-20" v-if="productObj.type !== 'product'">{{$t("user.inquiry-isOver")}}</button>
		</view>
	</view>
</template>

<script>
	import inquiryinfoTypeCard from '@/components/inquiryinfo-type-card.vue';
	import manufacturerCard from '@/components/manufacturer-card.vue';
	export default {
		components: {
			inquiryinfoTypeCard,
			manufacturerCard
		},
		data() {
			return {
				productObj: {},
				list: [{
						type: 'product',
						title: '询价主题',
						description: '询价描述111111111111111111111111111111111111111',
						state: 1,
						id: 1,
						time: '2024-04-17 14：22：05',
						count: 6,
						image: 'https://images.pexels.com/photos/20993833/pexels-photo-20993833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						action: '删除',
					},
					{
						type: 'inquiry',
						title: '公共询盘产品名称',
						description: '公共询盘描述1111111111111111111111111111111111111',
						state: 2,
						id: 1,
						time: '2024-04-17 14：22：05',
						count: 0,
						action: '结束',
					},
					{
						type: 'product',
						title: '询价主题',
						description: '询价描述111111111111111111111111111111111111111',
						state: 0,
						time: '2024-04-17 14：22：05',
						id: 1,
						count: 6,
						image: 'https://images.pexels.com/photos/20993833/pexels-photo-20993833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						action: '删除',
					},
					{
						type: 'inquiry',
						title: '公共询盘产品名称',
						description: '公共询盘描述1111111111111111111111111111111111111',
						state: 2,
						time: '2024-04-17 14：22：05',
						count: 0,
						action: '结束',
						id: 1,
					},
					{
						type: 'product',
						title: '询价主题',
						description: '询价描述111111111111111111111111111111111111111',
						state: 0,
						time: '2024-04-17 14：22：05',
						id: 1,
						count: 6,
						image: 'https://images.pexels.com/photos/20993833/pexels-photo-20993833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						action: '删除',
					},
					{
						type: 'inquiry',
						title: '公共询盘产品名称',
						description: '公共询盘描述1111111111111111111111111111111111111',
						state: 2,
						time: '2024-04-17 14：22：05',
						id: 1,
						count: 0,
						action: '结束',
					},
					{
						type: 'product',
						title: '询价主题',
						description: '询价描述111111111111111111111111111111111111111',
						state: 0,
						time: '2024-04-17 14：22：05',
						id: 1,
						count: 6,
						image: 'https://images.pexels.com/photos/20993833/pexels-photo-20993833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						action: '删除',
					},
					{
						type: 'inquiry',
						title: '公共询盘产品名称',
						description: '公共询盘描述1111111111111111111111111111111111111',
						state: 2,
						time: '2024-04-17 14：22：05',
						id: 1,
						count: 0,
						action: '结束',
					},
				],
			};
		},
		mounted() {
			const storedUserInfo = uni.getStorageSync('productInquiryInfo');
			if (storedUserInfo) {
				this.productObj = JSON.parse(storedUserInfo)
			}
		},
	};
</script>

<style scoped lang="scss">
	.container {
		padding: 10px;
	}


	.manufacturerLeft {
		font-weight: bold;
		font-size: 14px;
	}

	.manufacturerRihgt {
		font-size: 14px;
	}
	.fixed{
		position: fixed;
		bottom: 0;
		background-color: #fff;
		height: 40px;
		width: 100vw;
		left: 0;
		uni-button{
			margin: 0;
			border-radius: 20px;
			width: 76px;
			margin-left: 10px;
			font-size: 12px;
		}
		uni-button::after{
			border: none;
		}
	}
</style>