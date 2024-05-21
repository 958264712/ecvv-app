<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
			activeColor="#15b4fb" class="head"></uni-segmented-control>
		<view class="content">
			<inquiry-type-card v-for="(item, index) in list" :key="index" :type="item.type" :title="item.title"
				:description="item.description" :time="item.time" :count="item.count" :action="item.action"
				:image="item.image" :state="item.state" @action-click="handleActionClick" :id="item.id"
				 />
		</view>
		<uni-popup ref="alertDialog" type="center" class="alert">
			<text class="text">{{content}}</text>
			<view class="u-flex u-row-right">
				<button type="default" @click="dialogClose">{{$t("search.cancel")}}</button>
				<button type="primary" @click="dialogConfirm">{{$t("search.confirm")}}</button>
			</view>
		</uni-popup>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>
<script>
	import InquiryTypeCard from '@/components/inquiry-type-card.vue';
	export default {
		components: {
			InquiryTypeCard,
		},
		data() {
			return {
				items: [this.$t("user.inquiry-all"), this.$t("user.inquiry-no"),this.$t("user.inquiry-has"),this.$t("user.inquiry-over")],
				current: 0,
				show: false,
				productObj:{},
				messageText:'',
				msgType: 'success',
				content: this.$t("user.inquiry-content"),
				list: [],
				allList: [{
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

		methods: {
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
					if (this.current === 0) {
						this.list = this.allList
					} else if (this.current === 1) {
						this.list = this.allList.filter(item => {
							if (item.state === 0) {
								return item
							}
						})
					} else if (this.current === 2) {
						this.list = this.allList.filter(item => {
							if (item.state === 1) {
								return item
							}
						})
					} else if (this.current === 3) {
						this.list = this.allList.filter(item => {
							if (item.state === 2) {
								return item
							}
						})
					}
				}
			},
			handleActionClick(obj) {
				this.productObj = obj
				if(obj.state === 2){
					this.content = this.$t("user.inquiry-content1")
				}else{
					this.content = this.$t("user.inquiry-content")
				}
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				this.$refs.alertDialog.close()
				if(this.productObj.state === 2){
					this.messageText = this.$t("user.inquiry-messageText")
				}else{
					this.messageText = this.$t("user.inquiry-messageText1")
				}
				this.$refs.message.open()
			},
			dialogClose() {
				this.$refs.alertDialog.close()
			},
		},
		mounted() {
			if (this.current === 0) {
				this.list = this.allList
			}
		}
	};
</script>
<style lang="scss" scoped>
	.head {
		background-color: #fff;
		border-top: 1px #ccc solid;
	}

	.content {
		padding: 10px;
	}
	.alert{
		:deep(.uni-popup__wrapper){
			height: 140px;
			width: 70%;
			background-color: #fff !important;
			padding: 20px;
			text-align: center;
			display: flex !important;
			justify-content: space-between;
			flex-direction: column;
			border-radius: 5px;
			.text{
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
				display: block;
			}
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
	}
</style>