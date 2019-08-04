<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="/account/info"
        :router="true"
      >
        <el-menu-item index="/account/info">
          <i class="el-icon-user"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="/account/infomodify">
          <i class="el-icon-setting"></i>
          <span slot="title">信息修改</span>
        </el-menu-item>
        <el-menu-item index="/account/passwordmodify">
          <i class="el-icon-setting"></i>
          <span slot="title">修改密码</span>
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
<style>
</style>
