import App from './App'
import messages from './locale/index'
import Vuex from 'vuex'
import store from '@/shopro/store';
import http from '@/shopro/request/index.js';
import request from '@/libs/request/index.js';
import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'
import  router from '@/shopro/router/index.js';
let i18nConfig = {
	locale: uni.getLocale(),
	messages
}

// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import uView from "@/uview-ui";
import { SwipeAction, SwipeActionItem } from '@dcloudio/uni-ui'
Vue.use(VueI18n)
Vue.use(Vuex)
Vue.use(uView);
Vue.use(SwipeAction)
Vue.use(SwipeActionItem)
const i18n = new VueI18n(i18nConfig)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	i18n,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3

const i18n = createI18n(i18nConfig)

export function createApp() {
	const app = createSSRApp(App)
	app.config.globalProperties.$Router = router
	app.config.globalProperties.$http = http
	app.config.globalProperties.$request = request
	app.config.globalProperties.$store = store
	app.config.globalProperties.$IMG_URL = 'https://file.shopro.top'
	app.use(i18n)
	return {
		app
	}
}
// #endif