<template>
	<view class="query-block query-inquiry" >
		<image :src="image" class="query-image" ></image>
		<view>
			<uni-icons type="right" class="absolute" size="24" @click="onToInfo"></uni-icons>
			<view class="query-description" >{{ description }}</view>
			<view class="query-description query-time">{{$t("user.inquiry-recovery")}}：{{ back }}</view>
			<view class="query-time">{{$t("user.inquiry-recovery-time")}}：{{ time }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'inquiryinfo-type-card',
		props: {
			// 接收的props
			back: {
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
			id: {
				type: String,
				required: true,
			},
			image: {
				type: String
			}
		},
		data() {
			return {
			}
		},
		methods: {
			onToInfo() {
				uni.navigateTo({
					url:`../../public/chat/index?id=${this.id}`
				})
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
		width: 50px;
		height: 50px;
		border-radius: 50%;
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

	.query-time {
		font-size: 12px;
		color: #999;
		margin-bottom: 10px;
	}
	.query-inquiry {
		background-color: #fff;
	}
</style>