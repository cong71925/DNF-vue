// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import Vue from 'vue'
import 'vue-g2'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueAxios, axios)

axios.defaults.baseURL = '/api/index.php'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
// axios拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  store.commit('setLoadingState')
  return config
}, function (error) {
  // 对请求错误做些什么
  store.commit('setLoadedState')
  Vue.prototype.$message({
    showClose: true,
    type: 'error',
    message: '请求失败！'
  })
  return Promise.reject(error)
})
axios.interceptors.response.use(function (config) {
  // 对响应数据做处理
  store.commit('setLoadedState')
  if (config.data.state !== 'success') {
    Vue.prototype.$message({
      showClose: true,
      type: 'error',
      message: '获取数据失败！'
    })
  }
  return config
}, function (error) {
  // 对响应错误做处理
  store.commit('setLoadedState')
  Vue.prototype.$message({
    type: 'error',
    message: '响应错误！'
  })
  return Promise.reject(error)
})
Vue.prototype.getState = function () {
  if (
    localStorage.getItem('user_id') &&
    localStorage.getItem('user_token')
  ) {
    const userID = localStorage.getItem('user_id')
    const userToken = localStorage.getItem('user_token')
    if (userID === 'null' && userToken === 'null') {
      store.commit('setLogoutState')
    } else {
      store.commit('setLoginState', {
        userID: userID,
        userToken: userToken
      })
    }
    axios({
      method: 'post',
      data: {
        action: 'checkUserState',
        data: {
          user_id: userID,
          user_token: userToken
        }
      }
    })
      .then(response => {
        if (response.data.state === 'success') {
          store.commit('setLoginState', {
            userID: userID,
            userToken: userToken
          })
        } else {
          store.commit('setLogoutState')
        }
      })
      .catch(response => {
        console.log(response)
      })
  } else {
    store.commit('setLogoutState')
  }
}

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    isLogin: false,
    user_id: '',
    user_token: '',
    loading: true
  },
  mutations: {
    setLoginState (state, data) {
      state.isLogin = true
      state.user_id = data.userID
      state.user_token = data.userToken
      localStorage.setItem('user_id', data.userID)
      localStorage.setItem('user_token', data.userToken)
    },
    setLogoutState (state) {
      state.isLogin = false
      state.user_id = null
      state.user_token = null
      localStorage.setItem('user_id', null)
      localStorage.setItem('user_token', null)
    },
    setLoadingState (state) {
      state.loading = true
    },
    setLoadedState (state) {
      state.loading = false
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
