/**
 * 接口列表文件
 */
export default {
	// 登录注册
	sysAuth: {
		register: {
			url: "/api/sysAuth/register",
			auth: false,
			method: "POST",
			// desc: '用户注册'
		},
		emailCode: {
			url: "/api/sysAuth/emailCode",
			auth: false,
			method: "POST",
			// desc: '用户注册'
		},
	}
};