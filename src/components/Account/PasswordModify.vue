<template>
  <div id="panel_info">
    <h4>当前密码：</h4>
    <el-input v-model="password1" placeholder="请当前登录的密码" show-password></el-input>
    <h4>新密码：</h4>
    <el-input v-model="password2" placeholder="请输入要更改的密码" show-password></el-input>
    <h4>确认新密码：</h4>
    <el-input v-model="password3" placeholder="请再次输入要更改的密码" show-password></el-input>
    <el-divider></el-divider>
    <el-button type="primary" id="password_infoModify">提交</el-button>
  </div>
</template>
<script>
export default {
  methods: {},
  data () {
    var password1
    var password2
    var password3
    return {
      password1,
      password2,
      password3
    }
  }
}
</script>
<style>
#panel_info {
  margin-left: 50px;
}
#password_infoModify {
  float: right;
}
</style>
