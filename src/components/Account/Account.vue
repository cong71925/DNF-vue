<template>
  <el-container>
    <el-aside width="auto">
      <el-menu :router="true" :collapse="isCollapse" :default-active="activeName">
        <el-menu-item index="/account/info">
          <i class="el-icon-user"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="/account/infomodify">
          <i class="el-icon-info"></i>
          <span slot="title">信息修改</span>
        </el-menu-item>
        <el-menu-item index="/account/passwordmodify">
          <i class="el-icon-setting"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
<style>
</style>
<script>
export default {
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function() {
          if (that.screenWidth < 768) {
            that.isCollapse = true
          } else {
            that.isCollapse = false
          }
          that.timer = false
        }, 400)
      }
    }
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        this.screenWidth = window.screenWidth
      })()
    }
  },
  data() {
    var screenWidth = document.body.clientWidth
    var isCollapse = false
    if(screenWidth < 768){
      isCollapse = true
    }
    return {
      activeName: this.$route.path,
      screenWidth,
      isCollapse
    }
  }
}
</script>
