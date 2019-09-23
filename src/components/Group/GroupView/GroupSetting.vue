<template>
  <div>
    <el-collapse
      v-model="activeName"
      v-if="$store.state.user_id === groupSettingInfo.admin_id"
      accordion
    >
      <el-collapse-item name="1">
        <template slot="title">
          <h3>成员管理</h3>
        </template>
        <el-table :data="memberData" style="width: 100%">
          <el-table-column prop="nickname" label="名称"></el-table-column>
          <el-table-column prop="club" label="冒险团"></el-table-column>
          <el-table-column label="操作" width="250px">
            <template slot-scope="scope">
              <el-button size="mini" @click="transferAdmin(scope.row.user_id)">转移管理员权限</el-button>
              <el-button size="mini" type="danger" @click="removeMember(scope.row.user_id)">移出团队</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <h3>团队信息修改</h3>
        </template>
        <el-form>
          <el-form-item label="团队名称">
            <el-input
              type="text"
              maxlength="20"
              v-model="groupSettingInfo.group_name"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="申请密码">
            <el-input show-password maxlength="6" v-model="groupSettingInfo.join_password"></el-input>
          </el-form-item>
          <el-form-item label="允许加入">
            <el-switch v-model="attendable"></el-switch>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item>
            <el-button type="danger" @click="removeGroup">删除团队</el-button>
            <el-button type="primary" @click="modifyGroupInfo">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div v-else>
      <el-button type="danger" @click="quitGroup">退出团队</el-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    transferAdmin(id) {
      this.$confirm('此操作将转移您的管理员权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios({
            method: 'post',
            data: {
              action: 'transferAdmin',
              data: {
                user_id: this.$store.state.user_id,
                user_token: this.$store.state.user_token,
                group_id: this.$route.params.id,
                member_id: id
              }
            }
          })
            .then(response => {
              if (response.data.state === 'success') {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getGroupSettingInfo()
                this.getMemberInfo()
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
            message: '已取消'
          })
        })
    },
    removeMember(id) {
      this.$confirm('您将要把该团员移出团队, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios({
            method: 'post',
            data: {
              action: 'removeMember',
              data: {
                user_id: this.$store.state.user_id,
                user_token: this.$store.state.user_token,
                group_id: this.$route.params.id,
                member_id: id
              }
            }
          })
            .then(response => {
              if (response.data.state === 'success') {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getGroupSettingInfo()
                this.getMemberInfo()
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
            message: '已取消'
          })
        })
    },
    getMemberInfo() {
      this.axios({
        method: 'post',
        data: {
          action: 'getMemberInfo',
          data: {
            user_id: this.$store.state.user_id,
            user_token: this.$store.state.user_token,
            group_id: this.$route.params.id
          }
        }
      })
        .then(response => {
          if (response.data.state === 'success') {
            this.memberData = response.data.result
          } else {
            this.$message({
              type: 'error',
              message: '获取数据错误！'
            })
            console.log(response.data)
          }
        })
        .catch(response => {
          console.log(response.data)
        })
    },
    getGroupSettingInfo() {
      this.axios({
        method: 'post',
        data: {
          action: 'getGroupSettingInfo',
          data: {
            user_id: this.$store.state.user_id,
            user_token: this.$store.state.user_token,
            group_id: this.$route.params.id
          }
        }
      })
        .then(response => {
          if (response.data.state === 'success') {
            this.groupSettingInfo = response.data.result
            if (response.data.result.attendable === 'true') {
              this.attendable = true
            } else {
              this.attendable = false
            }
          } else {
            this.$message({
              type: 'error',
              message: '获取数据错误！'
            })
            console.log(response.data)
          }
        })
        .catch(response => {
          console.log(response.data)
        })
    },
    modifyGroupInfo() {
      this.axios({
        method: 'post',
        data: {
          action: 'modifyGroupInfo',
          data: {
            user_id: this.$store.state.user_id,
            user_token: this.$store.state.user_token,
            group_id: this.$route.params.id,
            group_name: this.groupSettingInfo.group_name,
            attendable: String(this.attendable),
            join_password: this.groupSettingInfo.join_password
          }
        }
      })
        .then(response => {
          if (response.data.state == 'success') {
            this.$message({
              type: 'success',
              message: '成功修改！'
            })
          } else {
            this.$message({
              type: 'error',
              message: '修改失败！'
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
            data: {
              action: 'removeGroup',
              data: {
                user_id: this.$store.state.user_id,
                user_token: this.$store.state.user_token,
                group_id: this.$route.params.id
              }
            }
          })
            .then(response => {
              if (response.data.state === 'success') {
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
            data: {
              action: 'quitGroup',
              data: {
                user_id: this.$store.state.user_id,
                user_token: this.$store.state.user_token,
                group_id: this.$route.params.id
              }
            }
          })
            .then(response => {
              if (response.data.state === 'success') {
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
    this.getGroupSettingInfo()
    this.getMemberInfo()
    return {
      groupSettingInfo: {},
      attendable: false,
      admin: false,
      memberData: [],
      activeName: '1'
    }
  }
}
</script>
