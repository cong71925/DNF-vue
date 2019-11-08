<template>
  <div id="navbar">
    <el-menu class="el-menu-demo" mode="horizontal" :router="true" :default-active="activeName"
    style="background-color: rgba(255, 255, 255, 0.9);">
      <el-menu-item index="/">
        <div class="hidden-xs-only">
          <i class="el-icon-s-home"></i>首页
        </div>
        <el-tooltip
          class="item hidden-sm-and-up"
          effect="dark"
          content="首页"
          placement="bottom-start"
        >
          <i class="el-icon-s-home"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="/group">
        <div class="hidden-xs-only">
          <i class="el-icon-trophy"></i>我的小团体
        </div>
        <el-tooltip
          class="item hidden-sm-and-up"
          effect="dark"
          content="我的小团体"
          placement="bottom-start"
        >
          <i class="el-icon-trophy"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="/character">
        <div class="hidden-xs-only">
          <i class="el-icon-c-scale-to-original"></i>我的角色
        </div>
        <el-tooltip
          class="item hidden-sm-and-up"
          effect="dark"
          content="我的角色"
          placement="bottom-start"
        >
          <i class="el-icon-c-scale-to-original"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="/log">
        <div class="hidden-xs-only">
          <i class="el-icon-document"></i>更新日志
        </div>
        <el-tooltip
          class="item hidden-sm-and-up"
          effect="dark"
          content="更新日志"
          placement="bottom-start"
        >
          <i class="el-icon-document"></i>
        </el-tooltip>
      </el-menu-item>

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
  name: 'Navbar',
  methods: {
    logout() {
      if (this.$store.state.isLogin) {
        this.axios({
          method: 'post',
          data: {
            action: 'logout',
            data: {
              user_id: this.$store.state.user_id,
              user_token: this.$store.state.user_token
            }
          }
        })
          .then(response => {
            if (response.data.state == 'success') {
              this.$store.commit('setLogoutState')
              this.$message({
                showClose: true,
                type: 'success',
                message: '注销成功！'
              })
              this.$router.push({ name: 'Index' })
            } else {
              this.$message({
                showClose: true,
                type: 'success',
                message: '注销失败！'
              })
              console.log(response.data.message)
            }
          })
          .catch(response => {
            console.log(response)
          })
      } else {
        this.$store.commit('setLogoutState')
      }
    }
  },
  data() {
    return {
      activeName: this.$route.path
    }
  }
}
</script>
<style>
#user {
  float: right;
}
</style>
