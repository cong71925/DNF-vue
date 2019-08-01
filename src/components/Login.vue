<template>
  <div id="panel_login">
    <el-container>
      <el-main>
        <h4>用户名：</h4>
        <el-input v-model="username" placeholder="请输入用户名"></el-input>
        <h4>密码：</h4>
        <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
        <el-button type="primary" id="submit" @click="login()">登录</el-button>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  methods: {
    login () {
      this.$store.commit('login')
      console.log(this.$store.state.login)
    }
  },
  data () {
    var username
    var password
    return {
      username, password
    }
  }
}
</script>
<style>
#panel_login {
  line-height: 200%;
  margin: auto;
  max-width: 600px;
}
#submit {
  margin-top:30px;
  width: 100%;
  text-align: center;
}
</style>
