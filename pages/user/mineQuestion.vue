<template>
	<view class="u-p-20">
		<view class="u-flex u-row-between item" v-for="(item,index) in list" :key="index">
			<text>{{item.title}}</text>
			<uni-icons type="right" size="22" @click="onToDetails(item)"></uni-icons>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [{
						id: 1,
						title: 'APP怎么切换语言',
						content: '可以在可以在可以在可以在可以在可以在可以在XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX。'
					},
					{
						id: 2,
						title: '如何修改密码',
						content: '可以在可以在可以在可以在可以在可以在可以在XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX。'
					},
					{
						id: 3,
						title: '怎么注销账号',
						content: '可以在可以在可以在可以在可以在可以在可以在XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX。'
					},
					{
						id: 4,
						title: '怎么退出账号',
						content: '可以在可以在可以在可以在可以在可以在可以在XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX。'
					}
				]
			};
		},
		methods: {
			async saveAllPropsToStorage(data) {
				try {
					// 将props对象转换为字符串，考虑到可能包含复杂数据类型
					const propsString = JSON.stringify(data);
					// 使用异步存储方法
					await uni.setStorage({
						key: 'question',
						data: propsString
					});
				} catch (error) {
					console.error('存储props时出错:', error);
				}
			},
			onToDetails(item) {
				this.saveAllPropsToStorage(item)
				this.$Router.push({
					path: './details/question',
					query: {
						id: item.id
					}
				})
			}
		},

	};
</script>
<style lang="scss" scoped>
	.item {
		height: 50px;
		background-color: #fff;
		margin-bottom: 1px;
		padding: 0 10px;
	}
</style>