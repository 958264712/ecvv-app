<template>
	<view class="ac_results">
		<ul>
			<li>
				<span class="item">
					<font style="color:#EE9A00">1</font>2v Battery
				</span>
			</li>
			<li>
				<span class="item">
					<font style="color:#EE9A00">1</font>2v Battery
				</span>
			</li>
			<li>
				<span class="item">
					<font style="color:#EE9A00">1</font>2v Battery
				</span>
			</li>
			<li>
				<span class="item">
					<font style="color:#EE9A00">1</font>2v Battery
				</span>
			</li>
			<li>
				<span class="item">
					<font style="color:#EE9A00">1</font>2v Battery
				</span>
			</li>
			<li>
				<span class="item">
					<font style="color:#EE9A00">1</font>2v Battery
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
			};
		},
		
		props: {
			
		},
		methods: {
			goBack() {
				uni.navigateBack();
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