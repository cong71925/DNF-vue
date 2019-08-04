// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueAxios, axios)

Vue.prototype.getState = function () {
  if (
    localStorage.getItem('user_id') &&
    localStorage.getItem('user_token')
  ) {
    const userId = localStorage.getItem('user_id')
    const userToken = localStorage.getItem('user_token')
    if (userId === 'null' && userToken === 'null') {
      store.commit('setLogoutState')
    } else {
      store.commit('setLoginState', {
        user_id: userId,
        user_token: userToken
      })
    }
    axios({
      method: 'post',
      url: '/api/checkUserState.php',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: {
        user_id: userId,
        user_token: userToken
      }
    })
      .then(response => {
        if (response.data === 'expire_time refresh success') {
          store.commit('setLoginState', {
            user_id: userId,
            user_token: userToken
          })
        } else {
          console.log(response.data)
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
    user_token: ''
  },
  mutations: {
    setLoginState (state, data) {
      state.isLogin = true
      state.user_id = data.user_id
      state.user_token = data.user_token
      localStorage.setItem('user_id', data.user_id)
      localStorage.setItem('user_token', data.user_token)
    },
    setLogoutState (state) {
      state.isLogin = false
      state.user_id = null
      state.user_token = null
      localStorage.setItem('user_id', null)
      localStorage.setItem('user_token', null)
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
