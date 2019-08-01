<template>
  <div id="panel_register">
    <el-container>
      <el-main>
        <h4>用户名：</h4>
        <el-input v-model="username" placeholder="用于账户登录"></el-input>
        <h4>密码：</h4>
        <el-input v-model="password1" placeholder="请输入密码" show-password></el-input>
        <h4>确认密码：</h4>
        <el-input v-model="password2" placeholder="请再次输入密码" show-password></el-input>
        <h4>昵称：</h4>
        <el-input v-model="nickname" placeholder="可重复，可修改"></el-input>
        <h4>冒险团名称：</h4>
        <el-input v-model="group" placeholder="请填写真实冒险团名称，方便好友找到您"></el-input>
        <h4>所属服务器：</h4>
        <span class="demonstration"></span>
        <el-cascader
          v-model="server_select"
          :options="server"
          :props="{ expandTrigger: 'hover' }"
        ></el-cascader>
        <el-button type="primary" id="submit">注册</el-button>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  methods: {
    getServer () {
      this.axios
      .get("static/data/server.json")
      .then(response => {
        this.server = response.data.options
      })
      .catch(response => {
        console.log(response)
      });
    }
  },
  data() {
    var username;
    var password1;
    var password2;
    var nickname;
    var server;
    var server_select;
    var group;
    this.getServer()
    return {
      username,
      password1,
      password2,
      nickname,
      group,
      server_select,
      server
    };
  }
};
</script>
<style>
#panel_register {
  line-height: 200%;
  margin: auto;
  max-width: 600px;
}
#submit {
  margin-top: 30px;
  width: 100%;
  text-align: center;
}
</style>
