import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// Vue.prototype.url = 'https://www.imovietrailer.com/superhero/'
App.mpType = 'app'
Vue.prototype.getGolbalUser = function(key){
		let userInfo = uni.getStorageSync(key);
		if(userInfo!= null && userInfo!= undefined && userInfo!=''){
			return userInfo
	}else{
		return null
	}
}
const app = new Vue({
    ...App
})
app.$mount()
