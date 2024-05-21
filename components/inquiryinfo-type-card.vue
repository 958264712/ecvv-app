<template>
	<view class="query-block" :class="typeClass">
		<image :src="productObj.image" class="query-image" v-if="typeClass === 'query-product'"></image>
		<view>
			<uni-title type="h4" :title="productObj.title" class="query-title"></uni-title>
			<uni-icons type="right" class="absolute" size="24" @click="onToInfo"></uni-icons>
			<view class="query-description">{{ productObj.description }}</view>
			<view class="query-time">{{type === 'info' ? $t("user.inquiry-time") : $t("user.inquiry-buyNum") }}：{{ productObj.time }}</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: 'inquiryinfo-type-card',
		props: {
			// 接收的props
			type:{
				type:String,
				required:true
			}
		},
		data() {
			return {
				productObj: {}
			}
		},
		mounted() {
			const storedUserInfo = uni.getStorageSync('productInquiryInfo');
			if (storedUserInfo) {
				this.productObj = JSON.parse(storedUserInfo)
			}
		},
		computed: {
			typeClass() {
				return `query-${this.productObj.type}`;
			},
		},
		methods: {
			onToInfo() {
				if (this.typeClass === 'query-product') {
					uni.navigateTo({
						url: `/pages/user/details/info?id=${this.productObj.id}`,
					})
				} else {
					uni.navigateTo({
						url: `/pages/user/details/allInfo?id=${this.productObj.id}`,
					})
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	/* 样式部分 */
	.query-block {
		display: flex;
		justify-content: flex-start;
		padding: 10px;
		border-radius: 8px;
		margin-bottom: 10px;
		position: relative;
	}

	.query-image {
		width: 100px;
		height: 100px;
		border-radius: 10px;
		border: 1px solid #eee;
		margin-right: 10px;
	}


	.absolute {
		position: absolute;
		top: 10px;
		right: 5px
	}

	.query-description {
		font-size: 16px;
		width: 60vw;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-bottom: 10px;
	}

	.ccc {
		color: #999;
	}

	.query-time {
		font-size: 12px;
		color: #999;
		margin-bottom: 10px;
	}

	.query-count {
		font-size: 12px;
		color: #999;
		margin-bottom: 30px;
	}

	.query-product {
		background-color: #fff;
	}

	.query-inquiry {
		background-color: #fff;
	}
</style>