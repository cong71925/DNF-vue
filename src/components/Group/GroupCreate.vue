<template>
  <el-dialog title="创建团队" :visible.sync="visible">
    <el-form :label-width="'100px'" :model="form" status-icon :rules="rules" ref="form">
      <el-form-item label="团队名:" prop="group_name">
        <el-input size="mini" v-model="form.group_name" show-word-limit maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="允许加入">
        <el-switch v-model="form.attendable"></el-switch>
      </el-form-item>
      <el-form-item label="加入密码:" prop="join_password">
        <el-input size="mini" v-model="form.join_password" show-word-limit maxlength="6"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ['dialogVisible'],
  watch: {
    dialogVisible(val) {
      this.visible = val
    },
    visible(val) {
      this.$emit('update:dialogVisible', val)
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios({
            method: 'post',
            url: '/api/createGroup.php',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: {
              user_id: this.$store.state.user_id,
              user_token: this.$store.state.user_token,
              group_name: this.form.group_name,
              join_password: this.form.join_password,
              attendable: String(this.form.attendable)
            }
          })
            .then(response => {
              if (response.data === 'success') {
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                })
                this.$refs[formName].resetFields()
                this.$emit('update')
                this.visible = false
                console.log(response.data)
              } else {
                this.$message({
                  type: 'error',
                  message: '添加失败!'
                })
                console.log(response.data)
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
    var form = {
      group_name: '',
      join_password: null,
      attendable: true
    }
    const rules = {
      group_name: [
        { required: true, message: '请输入团队名称', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
      ],
      join_password: [
        { required: true, message: '请输入加入密码', trigger: 'blur' },
        { min: 6, max: 6, message: '长度在6个字符', trigger: 'blur' }
      ]
    }
    return {
      form,
      rules,
      visible: this.dialogVisible
    }
  }
}
</script>
<style>
.card {
  text-align: center;
}
.character_info {
  text-align: left;
}
</style>
