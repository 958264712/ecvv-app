<template>
	<view>
		<view class="bg-b">
			<!-- 表头搜索框 -->
			<view class="u-flex u-row-between u-p-20">
				<uni-icons type="left" size="28" @click="back"></uni-icons>
				<view class="u-flex w85">
					<uni-search-bar style="width: 90%;padding:0;marginLeft:20px;" class="uni-mt-10" radius="100"
						cancelButton="none" :placeholder="$t('company.search')" v-model="text" />
					<!-- <view class="bg-f">
						<uni-icons type="search" size="28"></uni-icons>
					</view> -->
				</view>
			</view>
			<!-- 商家标签 -->
			<view class="u-p-20">
				<view class="u-flex u-p-20 bg-w u-row-between">
					<view>logo</view>
					<view>
						<uni-title type="h4" title="深圳XXXXXXXX生态汽车有限公司" style="margin-bottom: 5px;"></uni-title>
						<view class="u-flex u-col-center u-row-between" style="width:40vw;font-size: 12px;">
							<view>{{$t("user.footmark-manage1")}}39{{$t("user.footmark-year")}}</view>
							<view>{{$t("user.footmark-authentication")}}</view>
						</view>
					</view>
					<view class="u-flex u-col-center w20 ">
						<svg v-if="!check" @click="onClick" style="margin-bottom: 15px;" t="1714442402659" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7079" width="32" height="32"><path d="M508.928 854.016c-6.656 0-12.8-2.56-17.92-7.168l-297.472-297.472c-43.008-43.008-66.56-100.352-66.56-160.768s23.552-117.76 66.56-160.768c42.496-42.496 102.4-58.368 169.984-44.544 57.344 11.264 115.712 43.52 160.256 87.552 9.728 9.728 9.728 25.6 0 35.328-9.728 9.728-25.6 9.728-35.328 0-72.704-72.704-192.512-109.568-259.072-43.008-33.28 33.28-51.712 77.824-51.712 125.44s18.432 92.16 51.712 125.44l297.472 297.472c9.728 9.728 9.728 25.6 0 35.328-5.12 4.608-11.264 7.168-17.92 7.168z" fill="#000000" p-id="7080"></path><path d="M513.024 854.016c-6.656 0-12.8-2.56-17.92-7.168-9.728-9.728-9.728-25.6 0-35.328l297.472-297.472c33.28-33.28 51.712-77.824 51.712-125.44s-18.432-92.16-51.712-125.44c-40.96-40.96-98.304-38.4-129.024-32.768-49.664 8.704-101.376 35.328-137.728 71.68-9.728 9.728-25.6 9.728-35.328 0-9.728-9.728-9.728-25.6 0-35.328 44.032-44.032 103.936-75.264 164.352-85.504 69.12-12.288 130.56 4.608 173.056 46.592 43.008 43.008 66.56 100.352 66.56 160.768 0 60.928-23.552 117.76-66.56 160.768l-297.472 297.472c-4.096 4.608-10.752 7.168-17.408 7.168z" fill="#000000" p-id="7081"></path></svg>
						<svg v-if="check" @click="onClick" style="margin-bottom: 15px;" t="1714442349374" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6825" width="32" height="32"><path d="M512 901.746939c-13.583673 0-26.122449-4.179592-37.093878-13.061225-8.881633-7.314286-225.697959-175.020408-312.424489-311.379592C133.746939 532.37551 94.040816 471.24898 94.040816 384.522449c0-144.718367 108.146939-262.269388 240.326531-262.269388 67.395918 0 131.657143 30.82449 177.632653 84.636735 45.453061-54.334694 109.191837-84.636735 177.110204-84.636735 132.702041 0 240.326531 117.55102 240.326531 262.269388 0 85.159184-37.093878 143.673469-67.395919 191.216327l-1.044898 1.567346c-86.726531 136.359184-303.542857 304.587755-312.424489 311.379592-10.44898 8.359184-22.987755 13.061224-36.571429 13.061225z" fill="#E5404F" p-id="6826"></path></svg>
						<!-- <uni-fav :checked="check" class="favBtn" circle="true" bgColorChecked="#007aff" @click="onClick"
							style="margin-bottom: 26px;" /> -->
						<uni-collapse ref="collapse" v-model="openCollapse" @change="change"
							style="position: absolute;bottom: 6px;right: 0;height:20px;background-color: transparent;">
							<uni-collapse-item :title="$t('company.more')" title-border="none" style="background-color: transparent;">
								<view class="u-p-20">
									<view class="u-flex  u-col-top u-row-between u-m-b-10">
										<text class="text-left">{{$t('company.main-product')}}</text>
										<text class="text">电动汽车、环保汽车、电动汽车经销商、清洁能源汽车、电动汽车销售、混合动力汽车、绿色汽车、可持续交通</text>
									</view>
									<view class="u-flex u-col-top u-row-between">
										<text class="text-left">{{$t('company.major-market')}}</text>
										<text class="text">北美洲,南美洲,东欧,东南亚,非洲,大洋洲,中东,东亚,西欧</text>
									</view>
								</view>
							</uni-collapse-item>
						</uni-collapse>
					</view>
				</view>
			</view>
			<!-- 选项卡 -->
			<view class="u-p-20 ">
				<uni-segmented-control :current="current" :values="items" :style-type="styleType"
					:active-color="activeColor" @clickItem="onClickItem" />
			</view>
		</view>
		<view>
			<view v-if="current === 0">
				<!-- 轮播图 -->
				<view class="uni-margin-wrap">
					<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
						:interval="interval" :duration="duration">
						<swiper-item>
							<view class="swiper-item bg-gradual-green">公司形象图</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item bg-gradual-blue">B</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item bg-gradual-orange">C</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="u-p-20">
					<productGrid title="电动汽车" @change-current="handleCurrent" :list="productList">
					</productGrid>
				</view>
				<view class="u-p-20">
					<productGrid :type="1" title="环保汽车" @change-current="handleCurrent"
						:list="productList"></productGrid>
				</view>
			</view>
			<view v-if="current === 1">
				<view style="position: relative;" class="type1">
					<uni-segmented-control :current="current1" :values="items1" :style-type="styleType"
						:active-color="activeColor1" @clickItem="onClickItem1" style="margin-right:50px" />
					<uni-collapse ref="collapse" v-model="openCollapse1" @change="change1"
						style="position: absolute;bottom: 40px;right:55px;height:0px;width:0px;background-color: transparent;">
						<uni-collapse-item title-border="none" style="background-color: transparent;">
							<view class="u-p-20">
								<view v-for="item in classifyList" class="u-m-b-20">
									{{item}}
								</view>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<view style="position: absolute;bottom: 3px;right: 15px;" @click="showSort=!showSort">
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
				<view class="content" v-if="showSort">
					<view>
						<uni-grid :column="2" :show-border="false">
							<uni-grid-item v-for="item in productList" style="height:200px;width: 180px;"
								@click="toHref(item.href)">
								<view style="width: 95%;height: 50%;">
									<image :src="item.src" style="width: 100%;height: 100%;"></image>
								</view>
								<view class="text1">{{item.title}}</view>
								<text class="price u-m-t-10">${{item.minPrice}}-{{item.maxPrice}}/{{item.unit}}</text>
								<text class="moq u-m-t-10">{{$t('detail.moq')}}：{{item.moq}}{{item.unit}}</text>
							</uni-grid-item>
						</uni-grid>
					</view>
				</view>
				<view v-if="!showSort">
					<view class="bg-white u-p-20 u-flex u-m-b-20" v-for="item in productList"
						@click="toHref(item.href)">
						<view style="width: 30%;height: 80px;">
							<image :src="item.src" style="width: 100%;height: 100%;"></image>
						</view>
						<view class="u-m-l-20">
							<view class="text1">{{item.title}}</view>
							<text class="price u-m-t-10">${{item.minPrice}}-{{item.maxPrice}}/{{item.unit}}</text>
							<view class="moq u-m-t-10 u-flex u-row-between">
								<view>{{$t('detail.moq')}}：{{item.moq}}{{item.unit}}</view>
								<view class="btn" @click="onToinquiry(item.id)">询价</view>
							</view>
						</view>

					</view>
				</view>
			</view>
			<view v-if="current === 2">
				<view class="u-p-20">
					<view>
						<uni-title type="h4" :title="$t('company.intro')"></uni-title>
						<uni-card class="u-p-5 u-m-0">
							欢迎来到 ECVV，您在深圳寻求环保交通解决方案的首选目的地。作为绿色未来的倡导者，我们独家提供全球清洁能源汽车领导者比亚迪的各种电动汽车。

							我们对可持续发展的承诺不仅限于我们的产品；它根植于我们业务运营的各个方面。从采购环保材料到最大限度地减少碳足迹，我们努力在汽车行业树立榜样。

							无论您正在寻找可靠的电动轿车还是宽敞的电动 SUV，ECVV
							都能提供适合您生活方式和预算的完美车辆。我们知识丰富的员工致力于提供卓越的客户服务，确保为每位客户提供无缝且愉快的购车体验。

							加入我们，共同实现交通运输革命，拥抱更清洁、更环保的明天。立即访问 ECVV，迈出迈向更可持续未来的第一步。

							立即联系我们，了解有关我们电动汽车产品线的更多信息并安排咨询。
						</uni-card>
						<uni-title type="h4" :title="$t('inquiryItem.basic-info')"></uni-title>
						<uni-card class="u-p-5 u-m-0">
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('inquiryItem.company-name')}}</text>
								<text class="text-right">深圳XXX生态汽车有限公司</text>
							</view>
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('company.main-product')}}</text>
								<text class="text-right">电动汽车、环保汽车、电动汽车经销商、清洁能源汽车、电动汽车销售、混合动力汽车、绿色汽车、可持续交通</text>
							</view>
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('company.major-market')}}</text>
								<text class="text-right">北美洲,南美洲,东欧,东南亚,非洲,大洋洲,中东,东亚,西欧</text>
							</view>
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('company.establishment-time')}}</text>
								<text class="text-right">1985年</text>
							</view>
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('company.ownership-type')}}</text>
								<text class="text-right">公司/有限责任公司</text>
							</view>
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('company.register-capital')}}</text>
								<text class="text-right">10000.00万美元</text>
							</view>
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('company.year-sales')}}</text>
								<text class="text-right">5000万美元~1亿美元</text>
							</view>
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('company.percentage-exports')}}</text>
								<text class="text-right">91%~100%</text>
							</view>
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('company.num-employees')}}</text>
								<text class="text-right">100-500人</text>
							</view>
						</uni-card>
						<uni-title type="h4" :title="$t('company.factory-info')"></uni-title>
						<uni-card class="u-p-5 u-m-0">
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('company.factory-size')}}</text>
								<text class="text-right">10000~30000平方米</text>
							</view>
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('company.assurance-control')}}</text>
								<text class="text-right">内部</text>
							</view>
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('company.production-lines')}}</text>
								<text class="text-right">10以上</text>
							</view>
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('company.rd-number')}}</text>
								<text class="text-right">100人以上</text>
							</view>
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('company.quality-inspection')}}</text>
								<text class="text-right">100人以上</text>
							</view>
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('company.manage-certification')}}</text>
								<text class="text-right">HACCP、ISO 9000/9001/9004/19011:2000、QS-9000、ISO
									14000/14001、ISO/TS 16949、SA8000、ISO 17799、OHASA 18001、TL9000</text>
							</view>
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('company.contract-drafting')}}</text>
								<text class="text-right">提供 OEM 服务、提供设计服务、提供买家标签</text>
							</view>
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('company.oem')}}</text>
								<text class="text-right">10</text>
							</view>
						</uni-card>
						<uni-title type="h4" :title="$t('company.authentication-information')"></uni-title>
						<uni-card class="u-p-5 u-m-0">
							<view class="u-flex u-col-top u-m-b-20">
								<text class="text-left">{{$t('user.footmark-authentication')}}</text>
								<text class="text-right">{{$t('user.authentication-ok')}}</text>
							</view>
						</uni-card>
					</view>
				</view>
			</view>
			<view v-if="current === 3">
				<view class="u-p-20">
					<uni-title type="h4" :title="$t('inquiryItem.contact-information')"></uni-title>
					<uni-card class="u-p-5 u-m-0">
						<view class="u-flex u-col-top u-m-b-20">
							<text class="text-left">{{$t('company.contact-man')}}</text>
							<text class="text-right">黄姚明 先生</text>
						</view>
						<view class="u-flex u-col-top u-m-b-20">
							<text class="text-left">{{$t('company.telephone')}}</text>
							<text class="text-right">+86-755-82468418</text>
						</view>
						<view class="u-flex u-col-top u-m-b-20">
							<text class="text-left">{{$t('company.fax')}}</text>
							<text class="text-right">+86-755-82468418</text>
						</view>
						<view class="u-flex u-col-top u-m-b-20">
							<text class="text-left">{{$t('company.address')}}</text>
							<text class="text-right">中国广东省深圳市XXX区XXX路XXX号XXX大厦XXXX室</text>
						</view>
						<view class="u-flex u-col-top u-m-b-20">
							<text class="text-left">{{$t('company.zip-code')}}</text>
							<text class="text-right">518000</text>
						</view>
						<view class="u-flex u-col-top u-m-b-20">
							<text class="text-left">{{$t('company.country-region')}}</text>
							<text class="text-right">中国</text>
						</view>
						<view class="u-flex u-col-top u-m-b-20">
							<text class="text-left">{{$t('company.province-state')}}</text>
							<text class="text-right">广东</text>
						</view>
						<view class="u-flex u-col-top u-m-b-20">
							<text class="text-left">{{$t('company.city')}}</text>
							<text class="text-right">深圳</text>
						</view>
						<view class="u-flex u-col-top u-m-b-20">
							<text class="text-left">{{$t('company.web-site')}}</text>
							<text class="text-right">https://www.ecvv.com</text>
						</view>
						<view class="u-flex u-col-top u-m-b-20">
							<text class="text-left">{{$t('company.ecvv-website')}}</text>
							<text class="text-right">https://www.ecvv.com/company/micheallence/index.html</text>
						</view>
					</uni-card>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import productGrid from '@/components/product-grid.vue'
	export default {
		components: {
			productGrid
		},
		data() {
			return {
				check: false,
				openCollapse: false,
				openCollapse1: false,
				showSort: true,
				items: [this.$t('index.home'), this.$t('search.filter-produce'), this.$t('company.name'), this.$t('company.call-me')],
				items1: ['全部分类', '电动汽车', '环保汽车', '清洁能源车'],
				classifyList: ['全部分类', '电动汽车', '环保汽车', '清洁能源车', '电动汽车经销商', '电动汽车销售', '混合动力汽车', '绿色汽车', '可持续交通'],
				current: 0,
				current1: 0,
				activeColor: 'white',
				activeColor1: '#ec652b',
				styleType: 'text',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
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
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			onClickItem1(e) {
				if (this.current1 !== e.currentIndex) {
					this.current1 = e.currentIndex
				}
			},
			onClick() {
				this.check = !this.check
				this.$forceUpdate()
			},
			change() {
				this.openCollapse = !this.openCollapse
				this.$forceUpdate()
			},
			change1() {
				this.openCollapse1 = !this.openCollapse1
				this.$forceUpdate()
			},
			back(){
				uni.navigateBack()
			},
			handleCurrent(num){
				this.current = num
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg-b {
		background-color: #ec652b;
	}

	.bg-w {
		background-color: #fff;
	}

	.bg-f {
		position: absolute;
		background-color: #f2f2f2;
		right: 20px;
	}

	.w85 {
		width: 85%
	}

	.w20 {
		width: 20%;
		flex-direction: column;
		position: relative;
	}

	.text {
		display: -webkit-box;
		width: 80%;
		font-size: 12px;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}

	.w20 :deep(.uni-collapse-item__wrap) {
		width: calc(100vw - 22px);
		position: absolute;
		top: 41px;
		left: -74.2vw;
		z-index: 9;
	}

	.type1 :deep(.uni-collapse-item__wrap) {
		width: 100vw;
		position: absolute;
		top: 47px;
		left: -87vw;
		z-index: 9;
	}

	:deep(.uni-collapse-item__title-box) {
		background-color: transparent;
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

	.uni-common-mt {
		margin-top: 30px;
	}

	.uni-padding-wrap {
		// width: 750rpx;
		padding: 0px 30px;
	}

	.content {
		padding: 20px 0;
		background-color: white;
	}

	.content1 {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		height: 150px;
		text-align: center;
	}

	.content-text {
		font-size: 14px;
		color: #666;
	}

	.uni-margin-wrap {
		width: 690rpx;
		width: 100vw;
	}

	.swiper {
		height: 300rpx;
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.btn {
		width: 50px;
		font-size: 12px;
		color: #fff;
		text-align: center;
		border-radius: 20px;
		background-color: #ec652b;
	}

	.text-left {
		width: 30%;
		text-align: left;
		font-weight: bold;
		color: #000;
	}

	.text-right {
		width: 70%;
		display: block;
		text-align: left;
	}
</style>