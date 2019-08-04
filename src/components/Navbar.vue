<template>
  <div id="navbar">
    <el-menu class="el-menu-demo" mode="horizontal" :router="true">
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/group">我的小团体</el-menu-item>
      <el-menu-item index="/character">我的角色</el-menu-item>
      <el-submenu index id="user" v-if="$store.state.isLogin">
        <template slot="title">
          <i class="el-icon-user"></i>
        </template>
        <el-menu-item index="/account/info">个人中心</el-menu-item>
        <el-menu-item @click="logout()">注销</el-menu-item>
      </el-submenu>
      <el-submenu index id="user" v-else>
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
  name: "Navbar",
  methods: {
    logout(){
      if (
        localStorage.getItem("user_id") &&
        localStorage.getItem("user_token")
      ){
      this.axios({
          method: "post",
          url: "/api/logout.php",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          data: {
            user_id: localStorage.getItem("user_id")
          }
        })
          .then(response => {
            if (response.data == "logout success") {
              this.$store.commit("setLogoutState");
              alert('注销成功');
            } else {
              console.log(response.data);
            }
          })
          .catch(response => {
            console.log(response);
          });
      }else {
        this.$store.commit("setLogoutState");
      }
    }
  },
  data() {
    return {};
  }
};
</script>
<style>
#user {
  float: right;
}
</style>
