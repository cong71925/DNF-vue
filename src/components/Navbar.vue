<template>
  <div id="navbar">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item index="/index">首页</el-menu-item>
      <el-menu-item index="/group">我的小团体</el-menu-item>
      <el-menu-item index="/character">我的角色</el-menu-item>
      <el-submenu id="user" v-if="login">
        <template slot="title">
          <i class="el-icon-user"></i>
        </template>
        <el-menu-item index="/account">个人中心</el-menu-item>
        <el-menu-item>注销</el-menu-item>
      </el-submenu>
      <el-submenu id="user" v-else>
        <template slot="title">
          <i class="el-icon-user"></i>
        </template>
        <el-menu-item index="/login">登录</el-menu-item>
        <el-menu-item index="/register">注册</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  methods: {
    
  },
  data () {
    var login = this.$store.state.login
    console.log(login)
    return {
      login
    }
  }
}
</script>
<style>
#user {
  float: right;
}
</style>
