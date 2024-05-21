<template>
	<view class="query-block" :class="typeClass">
		<image :src="image" class="query-image" v-if="typeClass === 'query-product'"></image>
		<view>
			<uni-title type="h4" :title="title" class="query-title"></uni-title>
			<text class="query-state0 absolute" v-if="state === 0">{{$t("user.inquiry-no")}}</text>
			<text class="query-state1 absolute" v-if="state === 1">{{$t("user.inquiry-has")}}</text>
			<text class="query-state2 absolute" v-if="state === 2">{{$t("user.inquiry-over")}}</text>
			<view class="query-description" :class="state === 2?'ccc':''">{{ description }}</view>
			<view class="query-time">{{$t("user.inquiry-time")}}：{{ time }}</view>
			<view class="query-count">{{$t("user.inquiry-shop")}}：{{ count }}</view>
			<!-- <view class="query-count"> 1</view> -->
			<view class="u-flex u-row-right btn">
				<view class="query-action" @click="handleActionClick">{{ state===2?$t("user.inquiry-del"):$t("user.inquiry-isOver") }}</view>
				<view class="query-action1" @click="onToDetails">{{$t("user.inquiry-info")}}</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: 'inquiry-type-card',
		props: {
			// 接收的props
			type: {
				type: String,
				required: true,
			},
			title: {
				type: String,
				required: true,
			},
			description: {
				type: String,
				required: true,
			},
			time: {
				type: String,
				required: true,
			},
			count: {
				type: Number,
				required: true,
			},
			action: {
				type: String,
				required: true,
			},
			image: {
				type: String
			},
			state: {
				type: Number,
				required: true,
			},
			id: {
				type: String,
				required: true,
			},
		},
		data() {
			return {}
		},
		computed: {
			typeClass() {
				return `query-${this.type}`;
			},
		},
		methods: {
			handleActionClick() {
				this.$emit('action-click', {
					state: this.state,
					id: this.id
				});
			},
			onToDetails() {
				uni.navigateTo({
					url: `/pages/user/details/inquiryInfo?id=${this.id}`,
				})
				this.saveAllPropsToStorage();
			},
			async saveAllPropsToStorage() {
				try {
					// 将props对象转换为字符串，考虑到可能包含复杂数据类型
					const propsString = JSON.stringify(this.$props);
					// 使用异步存储方法
					await uni.setStorage({
						key: 'productInquiryInfo',
						data: propsString
					});
				} catch (error) {
					console.error('存储props时出错:', error);
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

	.query-state0 {
		font-size: 12px;
		color: #F59A23;
	}

	.query-state1 {
		font-size: 12px;
		color: #03B915;
	}

	.query-state2 {
		font-size: 12px;
		color: #aaa;
	}

	.absolute {
		position: absolute;
		top: 17px;
		right: 20px
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

	.query-action {
		font-size: 12px;
		cursor: pointer;
		border-radius: 20px;
		width: 60px;
		text-align: center;
		height: 25px;
		line-height: 25px;
		background-color: red;
		color: #fff;
	}

	.query-action1 {
		margin-left: 20px;
		font-size: 12px;
		cursor: pointer;
		border-radius: 20px;
		width: 60px;
		text-align: center;
		height: 25px;
		line-height: 25px;
		background-color: orange;
		color: #fff;
	}

	.btn {
		position: absolute;
		bottom: 10px;
		right: 10px
	}

	.query-product {
		background-color: #fff;
	}

	.query-inquiry {
		background-color: #fff;
	}
</style>