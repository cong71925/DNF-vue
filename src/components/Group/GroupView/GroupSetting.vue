<template>
  <el-col :xs="24" :sm="22" :md="20" :lg="18">
    <el-form
      :label-position="'right'"
      label-width="80px"
      v-if="$store.state.user_id === groupSettingInfo.admin_id"
    >
      <el-form-item label="团队名称">
        <el-input type="text" maxlength="20" v-model="groupSettingInfo.group_name" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="允许加入">
        <el-switch v-model="attendable"></el-switch>
      </el-form-item>
      <transition name="el-fade-in-linear">
        <el-form-item label="申请密码">
          <el-input show-password maxlength="6" v-model="groupSettingInfo.join_password"></el-input>
        </el-form-item>
      </transition>
      <el-form-item>
        <el-button type="danger" @click="removeGroup">删除团队</el-button>
        <el-button type="primary" @click="modifyGroup">提交修改</el-button>
      </el-form-item>
    </el-form>
    <div v-else>
      <el-button type="danger" @click="quitGroup">退出团队</el-button>
    </div>
  </el-col>
</template>
<script>
export default {
  methods: {
    getGroupSetting() {
      this.axios({
        method: 'post',
        url: '/api/getGroupSetting.php',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: {
          user_id: this.$store.state.user_id,
          user_token: this.$store.state.user_token,
          group_id: this.$route.params.id
        }
      })
        .then(response => {
          this.groupSettingInfo = response.data
          if(response.data.attendable === 'true'){
            this.attendable = true
          }else {
            this.attendable = false
          }
        })
        .catch(response => {
          console.log(response.data)
        })
    },
    modifyGroup() {
      this.axios({
        method: 'post',
        url: '/api/modifyGroup.php',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: {
          user_id: this.$store.state.user_id,
          user_token: this.$store.state.user_token,
          group_id: this.$route.params.id,
          group_name: this.groupSettingInfo.group_name,
          attendable: String(this.attendable),
          join_password: this.groupSettingInfo.join_password
        }
      })
        .then(response => {
          if (response.data == 'success') {
            this.$message({
              type: 'success',
              message: '成功修改！'
            })
          }
        })
        .catch(response => {
          console.log(response.data)
        })
    },
    removeGroup() {
      this.$confirm('此操作将永久删除该团队, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios({
            method: 'post',
            url: '/api/removeGroup.php',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: {
              user_id: this.$store.state.user_id,
              user_token: this.$store.state.user_token,
              group_id: this.$route.params.id
            }
          })
            .then(response => {
              if (response.data === 'success') {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.$router.push({ name: 'Group' })
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败!'
                })
                console.log(response.data)
              }
            })
            .catch(response => {
              console.log(response)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    quitGroup() {
      this.$confirm('此操作将退出该团队, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios({
            method: 'post',
            url: '/api/quitGroup.php',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: {
              user_id: this.$store.state.user_id,
              user_token: this.$store.state.user_token,
              group_id: this.$route.params.id
            }
          })
            .then(response => {
              if (response.data === 'success') {
                this.$message({
                  type: 'success',
                  message: '退出成功!'
                })
                this.$router.push({ name: 'Group' })
              } else {
                this.$message({
                  type: 'error',
                  message: '退出失败!'
                })
                console.log(response.data)
              }
            })
            .catch(response => {
              console.log(response)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  },
  data() {
    this.getGroupSetting()
    return {
      groupSettingInfo: {},
      attendable: false,
      admin: false
    }
  }
}
</script>
