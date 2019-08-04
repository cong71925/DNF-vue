<template>
  <div id="panel_info">
    <el-form :model="user" status-icon :rules="rules" ref="user">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="user.username" maxlength="12" show-word-limit placeholder="用于账户登录"></el-input>
      </el-form-item>
      <el-form-item label="昵称：" prop="nickname">
        <el-input v-model="user.nickname" maxlength="12" show-word-limit placeholder="可重复，可修改"></el-input>
      </el-form-item>
      <el-form-item label="冒险团名称：" prop="club">
        <el-input
          v-model="user.club"
          maxlength="20"
          show-word-limit
          placeholder="请填写真实冒险团名称，方便好友找到您"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属服务器：" prop="server_select">
        <span class="demonstration"></span>
        <el-cascader
          v-model="user.server_select"
          :options="server"
          :props="{ expandTrigger: 'hover' }"
          :key="user.server_select[1]"
        ></el-cascader>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item>
        <el-button type="primary" id="submit" style="float:right;" @click="submitForm('user')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios({
            method: "post",
            url: "/api/modifyUserInfo.php",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            data: {
              user_id: this.$store.state.user_id,
              user_token: this.$store.state.user_token,
              username: this.user.username,
              nickname: this.user.nickname,
              club: this.user.club,
              server_0: this.user.server_select[0],
              server_1: this.user.server_select[1]
            }
          })
            .then(response => {
              if (response.data == 'success') {
                alert('修改成功');
              }else{
                console.log(response.data);
              }
            })
            .catch(response => {
              console.log(response);
            });
        } else {
          alert("error submit!!");
          console.log("error submit!!");
          return false;
        }
      });
    },
    getServer() {
      this.axios
        .get("static/data/server.json")
        .then(response => {
          this.server = response.data.options;
        })
        .catch(response => {
          console.log(response);
        });
    },
    getUserInfo() {
      this.axios({
        method: "post",
        url: "/api/getUserInfo.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        data: {
          user_id: this.$store.state.user_id,
          user_token: this.$store.state.user_token
        }
      })
        .then(response => {
          if (response.data === "error") {
            console.log(response.data);
          } else {
            this.user.username = response.data.username;
            this.user.nickname = response.data.nickname;
            this.user.club = response.data.club;
            this.user.nickname = response.data.nickname;
            this.user.server_select[0] = response.data.server_0;
            this.user.server_select[1] = response.data.server_1;
          }
        })
        .catch(response => {
          console.log(response);
        });
    }
  },
  data() {
    var server;
    var user = {
      username: "",
      nickname: "",
      club: "",
      server_select: ["",""]
    };
    const rules = {
      username: [
        { required: true, message: "用户名", trigger: "blur" },
        { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
      ],
      nickname: [
        { required: true, message: "请输入昵称", trigger: "blur" },
        { min: 2, max: 12, message: "长度在 2 到 12 个字符", trigger: "blur" }
      ],
      server_select: [
        {
          type: "array",
          required: true,
          message: "请选择服务器",
          trigger: "change"
        }
      ],
      club: [
        { required: true, message: "请填写冒险团名称", trigger: "blur" },
        { max: 20, message: "长度在 0 到 20 个字符", trigger: "blur" }
      ]
    };
    this.getServer();
    this.getUserInfo();
    return {
      server,
      user,
      rules
    };
  }
};
</script>
<style>

</style>
