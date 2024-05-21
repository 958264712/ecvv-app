<template>
	<view class="">
		<view class="img u-p-50">
			<view>热销排行榜</view>
			<uni-title type="h1" :title="title"></uni-title>
		</view>
		<view class="u-flex u-row-right u-p-10">
			<view @click="showSort=!showSort">
				<svg v-if="!showSort" t="1714381858769" class="icon" viewBox="0 0 1024 1024" version="1.1"
					xmlns="http://www.w3.org/2000/svg" p-id="4794" width="16" height="16">
					<path
						d="M381.814491 34.742857h-264.045714C72.859063 34.742857 36.214491 71.168 36.214491 115.858286V378.148571c0 44.617143 36.644571 81.042286 81.554286 81.042286h264.045714c44.909714 0 81.554286-36.425143 81.554286-81.042286V115.858286C463.368777 71.168 426.724206 34.742857 381.814491 34.742857zM369.74592 366.226286H129.837349v-238.445715h239.908571v238.445715zM381.814491 533.430857h-264.045714C72.859063 533.430857 36.214491 569.856 36.214491 614.546286v262.363428c0 44.617143 36.644571 81.042286 81.554286 81.042286h264.045714c44.909714 0 81.554286-36.425143 81.554286-81.042286V614.546286c0-44.690286-36.644571-81.115429-81.554286-81.115429z m-12.068571 331.483429H129.837349v-238.445715h239.908571v238.445715zM622.235063 459.337143h264.045714c44.909714 0 81.554286-36.498286 81.554286-81.188572V115.931429c0-44.690286-36.644571-81.115429-81.627429-81.115429H622.235063c-44.909714 0-81.554286 36.425143-81.554286 81.115429V378.148571c0 44.617143 36.571429 81.042286 81.554286 81.042286z m12.068571-331.556572h239.908572v238.445715h-239.908572v-238.445715zM973.39392 906.093714l-52.370286-52.077714c24.868571-34.304 39.497143-76.288 39.497143-121.709714a209.481143 209.481143 0 0 0-209.92-208.676572 209.481143 209.481143 0 0 0-209.92 208.676572 209.481143 209.481143 0 0 0 209.92 208.603428c36.132571 0 70.070857-8.996571 99.766857-25.234285l56.758857 56.32a46.957714 46.957714 0 0 0 33.133715 13.604571 46.665143 46.665143 0 0 0 33.206857-79.506286zM634.523063 732.306286c0-63.853714 52.150857-115.638857 116.370286-115.638857s116.297143 51.785143 116.297142 115.565714c0 63.853714-52.077714 115.712-116.297142 115.712a116.297143 116.297143 0 0 1-116.297143-115.638857z"
						p-id="4795" fill="#8a8a8a"></path>
				</svg>
				<svg v-if="showSort" t="1714382040006" class="icon" viewBox="0 0 1024 1024" version="1.1"
					xmlns="http://www.w3.org/2000/svg" p-id="5254" width="16" height="16">
					<path
						d="M388.759406 463.798857H68.027977a65.024 65.024 0 0 1-64.146286-65.828571V65.828571A65.024 65.024 0 0 1 68.027977 0h320.731429a65.024 65.024 0 0 1 64.146285 65.828571v331.044572a65.170286 65.170286 0 0 1-64.146285 66.925714zM371.71712 640.731429v303.616H77.31712V640.731429h294.4m13.165714-79.725715H64.151406a65.024 65.024 0 0 0-64.146286 65.828572V958.171429a65.024 65.024 0 0 0 64.146286 65.828571h320.731428a65.024 65.024 0 0 0 64.146286-65.828571V627.126857a65.024 65.024 0 0 0-64.146286-65.828571zM1024.00512 102.765714a40.155429 40.155429 0 0 1-39.424 40.667429h-424.228571a40.155429 40.155429 0 0 1-39.350858-40.667429V40.667429A40.155429 40.155429 0 0 1 560.279406 0h424.228571a40.228571 40.228571 0 0 1 39.497143 40.667429z m0 439.881143a40.228571 40.228571 0 0 1-39.424 40.667429h-424.228571a40.155429 40.155429 0 0 1-39.350858-40.667429v-61.293714a40.155429 40.155429 0 0 1 39.350858-40.667429h424.228571a40.228571 40.228571 0 0 1 39.424 40.667429z m-15.433143 440.685714a40.228571 40.228571 0 0 1-39.424 40.667429h-424.228571a40.228571 40.228571 0 0 1-39.424-40.667429V921.6a40.228571 40.228571 0 0 1 39.424-40.667429h424.228571a40.228571 40.228571 0 0 1 39.424 40.667429z m0 0"
						p-id="5255" fill="#8a8a8a"></path>
				</svg>
			</view>
		</view>
		<view class="content u-m-20" v-if="showSort">
			<view>
				<uni-grid :column="2" :show-border="false">
					<uni-grid-item v-for="(item,index) in productList" style="height:200px;width: 180px;"
						@click="onToProduct(item)">
						<view style="width: 95%;height: 50%;position: relative;">
							<view style="" class="topTag">
								<view class="top">
									TOP
								</view>
								<view class="tag">
									{{(index + 1)>9 ? index+1 : '0' + (index+1)}}
								</view>
								<view class="left"></view>
								<view class="right"></view>
							</view>
							<image :src="item.src" style="width: 100%;height: 100%;"></image>
						</view>
						<view class="text1">{{item.title}}</view>
						<text class="price u-m-t-10">${{item.minPrice}}-{{item.maxPrice}}/{{item.unit}}</text>
						<text class="moq u-m-t-10">{{$t("detail.moq") }}：{{item.moq}}{{item.unit}}</text>
					</uni-grid-item>
				</uni-grid>
			</view>
		</view>
		<view class="u-m-20" v-if="!showSort">
			<view class="bg-white u-p-20 u-flex u-m-b-20" v-for="(item,index) in productList" >
				<view style="width: 30%;height: 80px;position: relative;" @click="onToProduct(item)">
					<view  class="topTag">
						<view class="top">
							TOP
						</view>
						<view class="tag">
							{{(index + 1)>9 ? index+1 : '0' + (index+1)}}
						</view>
						<view class="left"></view>
						<view class="right"></view>
					</view>
					<image :src="item.src" style="width: 100%;height: 100%;"></image>
				</view>
				<view class="u-m-l-20">
					<view class="text1" @click="onToProduct(item)">{{item.title}}</view>
					<text class="price u-m-t-10" @click="onToProduct(item)">${{item.minPrice}}-{{item.maxPrice}}/{{item.unit}}</text>
					<view class="moq u-m-t-10 u-flex u-row-between">
						<view @click="onToProduct(item)">{{$t("detail.moq") }}：{{item.moq}}{{item.unit}}</view>
						<view class="btn" @click="onToinquiry(item.id)">{{$t("detail.inquiry") }}</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showSort: true,
				title: this.$route.query.title,
				productList: [{
						src: 'https://images.pexels.com/photos/19036832/pexels-photo-19036832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						title: '新能源汽车 比亚迪海豚四轮电动车 廉价SUV12312312321',
						minPrice: '39000.00',
						maxPrice: '45000.00',
						unit: '件',
						moq: 5000
					},
					{
						src: 'https://images.pexels.com/photos/19036832/pexels-photo-19036832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						title: '新能源汽车 比亚迪海豚四轮电动车 廉价SUV12312312321',
						minPrice: '39000.00',
						maxPrice: '45000.00',
						unit: '件',
						moq: 5000
					},
					{
						src: 'https://images.pexels.com/photos/19036832/pexels-photo-19036832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						title: '新能源汽车 比亚迪海豚四轮电动车 廉价SUV12312312321',
						minPrice: '39000.00',
						maxPrice: '45000.00',
						unit: '件',
						moq: 5000
					},
					{
						src: 'https://images.pexels.com/photos/19036832/pexels-photo-19036832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						title: '新能源汽车 比亚迪海豚四轮电动车 廉价SUV12312312321',
						minPrice: '39000.00',
						maxPrice: '45000.00',
						unit: '件',
						moq: 5000
					}

				]
			}
		},
		methods: {
			onToinquiry(id){
				uni.navigateTo({
					url:`/pages/goods/inquiry-item?id=${id}`
				})
			},
			onToProduct(data){
				uni.navigateTo({
					url:`/pages/goods/detail?id=${data}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.topTag {
		position: absolute;
		top: 0;
		left: 5px;
		background-color: red;
		width: 30px;
		height: 37px;
		z-index: 9;
		text-align: center;
		color: white;

		.top {
			font-size: 12px;
		}

		.tag {
			font-size: 14px;
			font-weight: bold;
		}

		.left {
			width: 0px;
			height: 0px;
			display: inline-block;
			border-color: transparent red;
			border-width: 0 0 15px 15px;
			border-style: solid;
		}
		.right {
			width: 0px;
			height: 0px;
			display: inline-block;
			border-color: transparent red;
			border-width: 0 15px 15px 0;
			border-style: solid;
		}
	}

	.img {
		width: 100vw;
		height: 120px;
		background-color: #ec652b;
	}

	.content {
		padding: 20px 0;
		background-color: white;
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
		width: 60px;
		line-height: 30px;
		font-size: 12px;
		color: #fff;
		text-align: center;
		border-radius: 15px;
		background-color: #ec652b;
	}

	:deep(.uni-grid) {
		align-content: center;
		justify-content: center;
	}
</style>