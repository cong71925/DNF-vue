<template>
  <el-container>
    <el-aside width="auto">
      <el-menu :default-active="activeName" :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>团队总览</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="GroupInfo" @click="goto('GroupInfo')">概览</el-menu-item>
            <el-menu-item index="GroupMember" @click="goto('GroupMember')">成员</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="GroupCharacter" @click="goto('GroupCharacter')">
          <i class="el-icon-user"></i>
          <span slot="title">角色总览</span>
        </el-menu-item>
        <el-menu-item index="GroupSetting" @click="goto('GroupSetting')">
          <i class="el-icon-setting"></i>
          <span slot="title">团队管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <transition name="el-fade-in">
        <router-view />
      </transition>
    </el-main>
  </el-container>
</template>
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
  methods: {
    goto(gotoName) {
      this.$router.push({
        name: gotoName,
        params: { id: this.$route.params.id }
      })
    }
  },
  data() {
    var screenWidth = document.body.clientWidth
    var isCollapse = false
    if(screenWidth < 768){
      isCollapse = true
    }
    return {
      id: this.$route.params.id,
      activeName: this.$route.name,
      screenWidth,
      isCollapse
    }
  }
}
</script>
<style>
</style>
