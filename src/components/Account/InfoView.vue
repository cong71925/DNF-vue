<template>
  <div>
    <el-row>
      <el-col :span="12">
        <p>用户名:</p>
      </el-col>
      <el-col :span="12">
        <p>{{ user.username }}</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <p>昵称:</p>
      </el-col>
      <el-col :span="12">
        <p>{{ user.nickname }}</p>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="12">
        <p>冒险团名称:</p>
      </el-col>
      <el-col :span="12">
        <p>{{ user.club }}</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <p>所属服务器:</p>
      </el-col>
      <el-col :span="12">
        <p>{{ user.server_0 }} / {{ user.server_1 }}</p>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="12">
        <p>注册时间:</p>
      </el-col>
      <el-col :span="12">
        <p>{{ user.create_time }}</p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    getUserInfo() {
      this.axios({
        method: 'post',
        data: {
          action: 'getUserInfo',
          data: {
            user_id: this.$store.state.user_id,
            user_token: this.$store.state.user_token
          }
        }
      })
        .then(response => {
          if (response.data.state === 'success') {
            this.user = response.data.result
          } else {
            console.log(response.data.message)
          }
        })
        .catch(response => {
          console.log(response)
        })
    }
  },
  data() {
    this.getUserInfo()
    return { user: '' }
  }
}
</script>
<style>
</style>
