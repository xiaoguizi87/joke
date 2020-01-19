import Vue from 'vue'
import App from './App'
import Bmob from "hydrogen-js-sdk"

Vue.config.productionTip = false
Bmob.initialize("ae9d0a96c19a50a5 ", "xgxsec")
Vue.prototype.Bmob = Bmob

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
