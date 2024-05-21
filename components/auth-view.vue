<template>
	<view>
		<view class="no-login" >
			<image style="width: 150px;height: 150px" src="@/static/images/icon/login.png"></image>
			<text class="span">{{$t("register.no-login")}}</text>
			<button  class="btn" type="primary" @click="handleLogin">{{$t("register.go-login")}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "auth-view",
		data() {
			return {

			};
		},
		methods:{
			handleLogin(){
				this.$Router.push({path:'../login/login'})
			}
		}
	}
</script>

<style  lang="less" scoped>
.no-login{
		margin-top: 100px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 12px;
		align-items: center;
	}
	.no-login .span{
		display: block;
		margin: 10px 0;
	}
	.no-login .btn{
			display: block;
			width:70vw;
			border-radius: 20px;
		}
</style>