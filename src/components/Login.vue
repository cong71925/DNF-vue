<template>
  <div id="panel_login">
    <el-container>
      <el-main>
        <el-form :model="login_form" status-icon :rules="rules" ref="login_form">
          <el-form-item label="用户名：" prop="username">
            <el-input
              v-model="login_form.username"
              maxlength="12"
              show-word-limit
              placeholder="用于账户登录"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input
              v-model="login_form.password"
              placeholder="请输入密码"
              maxlength="20"
              show-word-limit
              show-password
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" id="submit" @click="submitForm('login_form')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import encrypt from '@/utils.js'
export default {
  methods: {
    login() {
      this.$store.commit('login')
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios({
            method: 'post',
            url: '/api/login.php',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: {
              username: this.login_form.username,
              password: encrypt.EncryptSha1(this.login_form.password)
            }
          })
            .then(response => {
              if (response.data == 'error:username select failed') {
                console.log(response.data)
                this.login_form.username = null
                this.login_form.password = null
                this.$message({
                  type: 'error',
                  message: '用户名不存在！'
                })
              } else if (response.data == 'error:password error') {
                console.log(response.data)
                this.login_form.password = null
                this.$message({
                  type: 'error',
                  message: '密码错误！'
                })
              } else {
                this.$store.commit('setLoginState', response.data)
                this.$message({
                  type: 'success',
                  message: '成功登录！'
                })
                this.$router.push('/')
              }
            })
            .catch(response => {
              console.log(response)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  data() {
    if (this.$store.state.isLogin) {
      this.$message({
        type: 'error',
        message: '您已登录！'
      })
      this.$router.push('/')
    }
    var login_form = {
      username: '',
      password: ''
    }
    const rules = {
      username: [
        { required: true, message: '用户名', trigger: 'blur' },
        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
      ]
    }
    return {
      login_form,
      rules
    }
  }
}
</script>
<style>
#panel_login {
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
