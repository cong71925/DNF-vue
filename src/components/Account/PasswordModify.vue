<template>
  <div id="panel_info">
    <el-form status-icon :model="password" :rules="rules" ref="password">
      <el-form-item label="请输入当前登录的密码" prop="password_0">
        <el-input maxlength="20" v-model="password.password_0" show-word-limit show-password></el-input>
      </el-form-item>
      <el-form-item label="请输入要修改的密码" prop="password_1">
        <el-input maxlength="20" v-model="password.password_1" show-word-limit show-password></el-input>
      </el-form-item>
      <el-form-item label="请再次输入修改的密码" prop="password_2">
        <el-input maxlength="20" show-word-limit show-password v-model="password.password_2"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item>
        <el-button type="primary" style="float:right;" @click="submitForm('password')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import encrypt from "@/utils.js";
export default {
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios({
            method: "post",
            url: "/api/modifyPassword.php",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            data: {
              user_id: this.$store.state.user_id,
              user_token: this.$store.state.user_token,
              password_0: encrypt.EncryptSha1(this.password.password_0),
              password_1: encrypt.EncryptSha1(this.password.password_1)
            }
          })
            .then(response => {
              if (response.data == "success") {
                alert("修改成功");
                this.password.password_0 = null;
                this.password.password_1 = null;
                this.password.password_2 = null;
                
              } else {
                console.log(response.data);
                this.password.password_0 = null;
                this.password.password_1 = null;
                this.password.password_2 = null;
              }
            })
            .catch(response => {
              console.log(response);
              this.password.password_0 = null;
              this.password.password_1 = null;
              this.password.password_2 = null;
            });
        } else {
          alert("error submit!!");
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  data() {
    var password = {
      password_0: "",
      password_1: "",
      password_2: ""
    };
    const checkPass = (rule, value, callback) => {
      if (value !== this.password.password_1) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const rules = {
      password_0: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
      ],
      password_1: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
      ],
      password_2: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
        { validator: checkPass, trigger: "blur" }
      ]
    };
    return {
      password,
      rules
    };
  }
};
</script>
<style>
</style>
