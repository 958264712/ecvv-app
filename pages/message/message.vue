<template>
	<view class="container">
		<view class="tab-bar">
			<view class="tab-item" :class="{ active: activeTab === 'all' }" @click="switchTab('all')">
				{{$t("message.all")}}
				<span>{{ allCount }}</span>
			</view>
			<view class="tab-item" :class="{ active: activeTab === 'inquiry' }" @click="switchTab('inquiry')">
				{{$t("message.inquiry")}}
				<span>{{ inquiryCount }}</span>
			</view>
			<view class="tab-item" :class="{ active: activeTab === 'system' }" @click="switchTab('system')">
				{{$t("message.system")}}
				<span>{{ systemCount }}</span>
			</view>
		</view>
		<view class="message-list" v-if="messages?.length > 0">
			<view v-for="(item, index) in messages" :key="index" class="message-item" @click="handleDetail(item.id)">
				<view class="message-logo">{{ item.logo }}</view>
				<view class="message-text">
					<view class="message-content">
						<view class="message-title">{{ item.title }}</view>
						<view class="message-date">{{ item.date }}</view>
					</view>
					<view :class="item.type === 0 ?'message-info':'message-info1'">
						{{item.msg}}
					</view>
				</view>
			</view>
			<view class="load-more" v-if="loading">{{$t("index.loading")}}...</view>
		</view>
		<view class="message-null" v-if="messages?.length < 0">
			<image style="width: 100px;height: 70px" class="u-m-b-10" src="@/static/images/icon/no-message.png"></image>
			{{$t("message.no-message")}}
		</view>
		<authView v-if="activeTab === 'inquiry' && messages?.length < 0"></authView>
	</view>
</template>

<script>
	import authView from '@/components/auth-view.vue'
	export default {
		components: {
			authView
		},
		data() {
			return {
				activeTab: 'all',
				allCount: 0,
				inquiryCount: 0,
				systemCount: 0,
				messages: [],
				loading: true,
			};
		},
		methods: {
			switchTab(tab) {
				this.activeTab = tab;
			},
			handleDetail(id) {
				if (this.activeTab !== 'inquiry') {
					this.$Router.push({
						path: './detail/detail',
						query: {
							id
						}
					})
				} else {
					uni.navigateTo({
						url: `../public/chat/index?id=${id}`
					})
				}
			}
		},
		mounted() {
			// 在这里模拟数据请求
			setTimeout(() => {
				this.allCount = 2;
				this.inquiryCount = 1;
				this.systemCount = 1;
				this.messages = [{
						logo: '厂家LOGO',
						title: '厂家名称',
						date: '2024/04/17',
						type: 0,
						msg: 'ashbdahsdhaslkdjlasjdjas;dja;lsjkdlaks;ldkas;lkd;laksldkas;lkdlaksda',
						id: 1
					},
					{
						logo: '厂家LOGO',
						title: '厂家名称',
						date: '2024/04/17',
						type: 1,
						msg: 'ashbdahsdhaslkdjlasjdjas;dja;lsjkdlaks;ldkas;lkd;laksldkas;lkdlaksda',
						id: 1
					},
					{
						logo: '厂家LOGO',
						title: '厂家名称',
						date: '2024/04/17',
						type: 0,
						msg: 'ashbdahsdhaslkdjlasjdjas;dja;lsjkdlaks;ldkas;lkd;laksldkas;lkdlaksda',
						id: 1
					},
					{
						logo: '厂家LOGO',
						title: '厂家名称',
						date: '2024/04/17',
						type: 1,
						msg: 'ashbdahsdhaslkdjlasjdjas;dja;lsjkdlaks;ldkas;lkd;laksldkas;lkdlaksda',
						id: 1
					},
					{
						logo: '厂家LOGO',
						title: '厂家名称',
						date: '2024/04/17',
						type: 0,
						msg: 'ashbdahsdhaslkdjlasjdjas;dja;lsjkdlaks;ldkas;lkd;laksldkas;lkdlaksda',
						id: 1
					},
					{
						logo: '厂家LOGO',
						title: '厂家名称',
						date: '2024/04/17',
						type: 1,
						msg: 'ashbdahsdhaslkdjlasjdjas;dja;lsjkdlaks;ldkas;lkd;laksldkas;lkdlaksda',
						id: 1
					},
					{
						logo: '厂家LOGO',
						title: '厂家名称',
						date: '2024/04/17',
						type: 0,
						msg: 'ashbdahsdhaslkdjlasjdjas;dja;lsjkdlaks;ldkas;lkd;laksldkas;lkdlaksda',
						id: 1
					},
					{
						logo: '厂家LOGO',
						title: '厂家名称',
						date: '2024/04/17',
						type: 1,
						msg: 'ashbdahsdhaslkdjlasjdjas;dja;lsjkdlaks;ldkas;lkd;laksldkas;lkdlaksda',
						id: 1
					},
					{
						logo: '厂家LOGO',
						title: '厂家名称',
						date: '2024/04/17',
						type: 0,
						msg: 'ashbdahsdhaslkdjlasjdjas;dja;lsjkdlaks;ldkas;lkd;laksldkas;lkdlaksda',
						id: 1
					},
					{
						logo: '厂家LOGO',
						title: '厂家名称',
						date: '2024/04/17',
						type: 1,
						msg: 'ashbdahsdhaslkdjlasjdjas;dja;lsjkdlaks;ldkas;lkd;laksldkas;lkdlaksda',
						id: 1
					},
					// ...其他消息项
				];
				this.loading = false;
			}, 1000);
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		flex-direction: column;
		background-color: #f8f8f8;
		padding-bottom: 40px;
	}

	.tab-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		border-top: 1px solid #007aff;
		border-bottom: 1px solid #007aff;
	}

	.tab-item {
		padding: 10rpx;
		flex: 1;
		text-align: center;
		font-size: 26rpx;
		color: #007aff;
		position: relative;
		border-left: 1px solid #007aff;
	}

	.tab-item:first-child {
		border: none;
	}

	.tab-item span {
		position: absolute;
		font-size: 16upx;
		color: #fff;
		background-color: red;
		border-radius: 50%;
		width: 20px;
		height: 20px;
		line-height: 20px;
		top: 0px;
		right: 10px;
	}

	.tab-item.active {
		color: #fff;
		background-color: #007aff;
	}

	.message-list {
		flex: 1;
		padding: 20rpx;
	}

	.message-null {
		margin-top: 100px;
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 12px;
		align-items: center;
	}

	.message-item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #eee;
	}

	.message-logo {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		font-size: 12px;
		background-color: #999;
		margin-right: 20rpx;
	}

	.message-text {
		flex: 1;
	}

	.message-info {
		display: inline-block;
		position: relative;
		width: 76vw;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.message-info1 {
		width: 76vw;
		color: #ccc;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.message-info::after {
		position: absolute;
		top: 0;
		right: -30rpx;
		display: inline-block;
		margin-right: 20px;
		content: '';
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: red;
	}

	.message-content {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.message-title {
		font-size: 30rpx;
		color: #333;
		font-weight: bold;
	}

	.message-date {
		font-size: 16upx;
		color: #999;
	}

	.load-more {
		text-align: center;
		padding: 20rpx;
		font-size: 24rpx;
		color: #999;
	}
</style>