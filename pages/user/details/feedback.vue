<template>
	<view class="container" v-for="(item,index) in list" :key="index" @click="onToDetails(item)">
		<view class="title">
			<view class="text">
				{{$t("inquiryItem.description")}}：{{item.title}}
				<view class="no-read" v-if="!item.read && item.feedback?.length > 0"></view>
			</view>
			<view class="time">
				{{$t("user.feedback-time")}}：{{item.time}}
			</view>
			<view class="time">
				{{$t("user.feedback-type")}}：{{item.type===0 ? $t("user.feedback-type0") :item.type===1 ? $t("user.feedback-type1"):$t("inquiryItem.other")}}
			</view>
		</view>

		<view class="u-flex content u-row-between" v-if="item.feedback?.length > 0">
			<view class="text" style="font-size: 14px;">
				{{item.feedback}}
			</view>
			<uni-icons type="right" size="22"></uni-icons>
		</view>
	</view>
</template>

<script>
	// let obj = uni.getStorageSync('question')
	export default {
		data() {
			return {
				list: [{
					id:1,
					title: 'APP打开后快速点击时经常卡到退出，询价页面、消息列表页常常出现。',
					time:'2024-04-15 14:25 20',
					files:[],
					type:0,
					feedback:'非常感谢提交的反馈，您的反馈对我们来说非常重要，我们将认真对待，并作出针对性的改进。',
					read:false
				},
				{					
					id:2,
					title: 'APP打开后快速点击时经常卡到退出，询价页面、消息列表页常常出现。',
					time:'2024-04-15 14:25 20',
					files:[],
					type:1,
					feedback:'非常感谢提交的反馈，您的反馈对我们来说非常重要，我们将认真对待，并作出针对性的改进。',
					read:false
				},
				{
					id:3,
					title: 'APP打开后快速点击时经常卡到退出，询价页面、消息列表页常常出现。',
					time:'2024-04-15 14:25 20',
					files:[],
					type:2,
					feedback:'',
					read:false
				}]
			}
		},
		methods:{
			async saveAllPropsToStorage(data) {
				try {
					// 将props对象转换为字符串，考虑到可能包含复杂数据类型
					data.read = true
					const propsString = JSON.stringify(data);
					// 使用异步存储方法
					await uni.setStorage({
						key: 'feedback',
						data: propsString
					});
				} catch (error) {
					console.error('存储props时出错:', error);
				}
			},
			onToDetails(item) {
				this.saveAllPropsToStorage(item)
				this.$Router.push({
					path: './feedbackItem',
					query: {
						id: item.id
					}
				})
			}
		},
		mounted() {
			const storedUserInfo = uni.getStorageSync('question');
			if (storedUserInfo) {
				this.obj = JSON.parse(storedUserInfo)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		margin: 10px;
		padding: 10px;
		background-color: #fff;
	}

	.title {
		// font-size: 16px;
		// font-weight: bold;
		margin-bottom: 10px;
		position: relative;
	}

	.time {
		font-size: 14px;
		color: #999;
		margin-bottom: 10px;
	}

	.content {
		border-top: 1px solid #eee;
		padding-top: 10px;
		line-height: 1.8;
	}
	.text {
		display: inline-block;
		width: 80vw;
		font-size: 16px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.no-read{
		position: absolute;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color:#d9001b ;
		top: 0;
		right:0;
	}
</style>