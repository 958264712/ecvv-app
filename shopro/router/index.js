
class Router {
  constructor() {
    this.callBack = (name, data) => {
      // console.log("路由跳转✨🍎",name, data);
	  let qarams = ''
	  for(let key in data?.query){
		  qarams += key + '=' +data?.query[key]
	  }
	  // console.log(qarams)
      const options = {
        url: qarams?.length>0 ? data.path + '?' + qarams : data.path,
        success: (res) => {
          res.eventChannel.emit(
            data.options?.name || "options",
            encodeURIComponent(
              JSON.stringify(data.options?.params || data?.params)
            ) || {}
          );
        },
        fail: (res) => {
          console.log("fail", res);
        },
        complete: (res) => {},
        events: data.events ?? {},
      };
      uni[name](options);
    };
  }
 
  push(data) {
    this.callBack("navigateTo", data);
  }
 
  redirectTo(data) {
    this.callBack("navigateTo", data);
  }
 
  reLaunch(data) {
    this.callBack("navigateTo", data);
  }
 
  switchTab(data) {
    this.callBack("navigateTo", data);
  }
 
  back(num) {
    uni.navigateBack({ delta: num });
  }
}
 

export default new Router();
