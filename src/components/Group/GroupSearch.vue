<template>
  <el-dialog title="查询结果" :visible.sync="visible" width="90%">
    <el-row>
      <el-col :span="12">ID:</el-col>
      <el-col :span="12">{{ searchResult.id }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">团队名:</el-col>
      <el-col :span="12">{{ searchResult.group_name }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">创建时间:</el-col>
      <el-col :span="12">{{ searchResult.create_time }}</el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-form :model="form" status-icon :rules="rules" ref="form" size="small"> 
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            maxlength="6"
            show-word-limit
            placeholder="请输入团队加入密码"
            show-password
            autocomplete="off"
          >
            <el-button slot="append" icon="el-icon-plus" @click="joinGroup('form')"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ['dialogVisible', 'searchInput'],
  watch: {
    dialogVisible(val) {
      this.visible = val
      if (this.visible) {
        this.searchGroup()
      }
    },
    visible(val) {
      this.$emit('update:dialogVisible', val)
    }
  },
  methods: {
    searchGroup() {
      this.axios({
        method: 'post',
        data: {
          action: 'searchGroup',
          data: {
            user_id: this.$store.state.user_id,
            user_token: this.$store.state.user_token,
            group_id: this.searchInput
          }
        }
      })
        .then(response => {
          if (response.data.state === 'success') {
            this.searchResult = response.data.result
          } else {
            console.log(response)
          }
        })
        .catch(response => {
          console.log(response)
        })
    },
    joinGroup(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios({
            method: 'post',
            data: {
              action: 'joinGroup',
              data: {
                user_id: this.$store.state.user_id,
                user_token: this.$store.state.user_token,
                group_id: this.searchInput,
                join_password: this.form.password
              }
            }
          })
            .then(response => {
              if (response.data.state === 'success') {
                this.$message({
                  showClose: true,
                  type: 'success',
                  message: '成功加入！'
                })
                this.visible = false
                this.$emit('update')
              } else if (response.data.message === 'in the group'){
                this.$message({
                  showClose: true,
                  type: 'error',
                  message: '您已在团队内！'
                })
              }else if (response.data.message === 'password error'){
                this.$message({
                  showClose: true,
                  type: 'error',
                  message: '密码错误！'
                })
              } else {
                this.$message({
                  showClose: true,
                  type: 'error',
                  message: '加入错误！'
                })
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
    var visible = false
    const rules = {
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 6, message: '长度在 6 个字符', trigger: 'blur' }
      ]
    }
    return {
      visible: this.dialogVisible,
      searchResult: '',
      rules,
      form: {
        password: ''
      }
    }
  }
}
</script>
<style>
</style>
