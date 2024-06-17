<template>
	<view class="ac_results">
		<ul>
			<li v-for="item in wordList" :key="item" @click="onSerach(item)">
				<span class="item">
					{{item}}
				</span>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		name: 'searchResults',
		data() {
			return {
				wordList:[]
			};
		},
		
		props: {
			keyword:{type:String}
		},
		
		watch: {
		    // 监听parentValue的变化
		    keyword: {
		      immediate: true, // 是否立即执行handler
		      handler(newValue, oldValue) {
		        this.getList(); // 值变化时调用接口函数
		      }
		    }
		  },
		methods: {
			goBack() {
				uni.navigateBack();
			},
			onSerach(item){
				uni.setStorageSync('searchVal', item)
				this.$emit('changeSearchVal',item)
			},
			async getList(){
				await this.$request.get('api/home/getSearchKeyWordList', {
					keyword: this.$props.keyword
				}).then(res => {
					if (res.type === 'success') {
						this.wordList = res.result
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.ac_results {
		display: block;
		width: 90%;
		padding: 0px;
		overflow: hidden;
	}

	.ac_results li {
		margin-bottom: 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid #ccc;
	}

	ul,
	li,
	ol {
		list-style: none;
	}
</style>