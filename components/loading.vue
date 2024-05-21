<template>
	<uni-load-more :status="status" :content-text="contentText" />
</template>

<script>
	export default {
		name: "loading",
		props: {
			status: {
				type: String,
				default: 'more'
			}
		},
		data() {
			return {
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '~~加载中~~',
					contentnomore: '已加载全部'
				}
			};
		}
	}
</script>

<style>

</style>