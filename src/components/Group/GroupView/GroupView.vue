<template>
  <el-container>
    <el-aside width="200px">
      <el-menu default-active="/groupview/info">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>团队总览</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="goto('GroupInfo')">概览</el-menu-item>
            <el-menu-item index="1-2" @click="goto('GroupMember')">成员</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2" @click="goto('GroupCharacter')">
          <i class="el-icon-user"></i>
          <span slot="title">角色总览</span>
        </el-menu-item>
        <el-menu-item index="3" @click="goto('GroupSetting')">
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
import groupSetting from './GroupSetting.vue'
export default {
  components: { groupSetting },
  methods: {
    goto(gotoName) {
      this.$router.push({
        name: gotoName,
        params: { id: this.$route.params.id }
      })
    }
  },
  data() {
    var id = this.$route.params.id
    return {
      activeName: '1'
    }
  }
}
</script>
<style>
</style>
