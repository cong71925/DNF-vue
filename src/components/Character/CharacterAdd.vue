<template>
  <el-dialog title="添加角色" :visible.sync="visible">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-position="top">
      <el-form-item label="角色名:" prop="character_name">
        <el-input size="mini" v-model="form.character_name" show-word-limit maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="职业:" required>
        <el-col :xs="11" :sm="10" :md="8" :lg="6">
          <el-form-item prop="job">
            <el-cascader
              v-model="form.job"
              :options="job"
              size="mini"
              :props="{ expandTrigger: 'hover' }"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: center;">-</el-col>
        <el-col :xs="11" :sm="10" :md="8" :lg="6">
          <el-form-item prop="class">
            <el-cascader
              v-model="form.class"
              :options="class_sub"
              size="mini"
              prop="class"
              :props="{ expandTrigger: 'hover' }"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-form-item>
      <div v-if="form.job=='奶'">
        <el-form-item label="常驻力智" prop="buff_default">
          <el-input size="mini" v-model.number="form.buff_default" show-word-limit maxlength="5"></el-input>
        </el-form-item>
        <el-form-item label="常驻三攻" prop="buff_atk">
          <el-input size="mini" v-model.number="form.buff_atk" show-word-limit maxlength="5"></el-input>
        </el-form-item>
        <el-form-item label="太阳" prop="buff_burst">
          <el-input size="mini" v-model.number="form.buff_burst" show-word-limit maxlength="5"></el-input>
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="15s伤害" prop="damage_15s">
          <el-input size="mini" v-model.number="form.damage_15s" show-word-limit maxlength="5">
            <template slot="append">e</template>
          </el-input>
        </el-form-item>
        <el-form-item label="20s伤害" prop="damage_20s">
          <el-input size="mini" v-model.number="form.damage_20s" show-word-limit maxlength="5">
            <template slot="append">e</template>
          </el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ['dialogVisible', 'job', 'class_sub'],
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
            data: {
              action: 'addCharacter',
              data: {
                user_id: this.$store.state.user_id,
                user_token: this.$store.state.user_token,
                character_name: this.form.character_name,
                job: this.form.job[0],
                class_0: this.form.class[0],
                class_1: this.form.class[1],
                damage_15s: this.form.damage_15s,
                damage_20s: this.form.damage_20s,
                buff_default: this.form.buff_default,
                buff_atk: this.form.buff_atk,
                buff_burst: this.form.buff_burst
              }
            }
          })
            .then(response => {
              if (response.data.state === 'success') {
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                })
                this.$refs[formName].resetFields()
                this.$emit('update')
                this.visible = false
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
      character_name: '',
      job: '',
      class: '',
      damage_15s: 0,
      damage_20s: 0,
      buff_default: 0,
      buff_atk: 0,
      buff_burst: 0
    }
    const rules = {
      character_name: [
        { required: true, message: '请输入角色名称', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
      ],
      job: [
        {
          type: 'array',
          required: true,
          message: '请选择职责',
          trigger: 'change'
        }
      ],
      class: [
        {
          type: 'array',
          required: true,
          message: '请选择职业',
          trigger: 'change'
        }
      ],
      buff_default: [
        { type: 'number', message: '请输入数字', trigger: 'blur' }
      ],
      buff_atk: [{ type: 'number', message: '请输入数字', trigger: 'blur' }],
      buff_burst: [{ type: 'number', message: '请输入数字', trigger: 'blur' }],
      damage_15s: [{ type: 'number', message: '请输入数字', trigger: 'blur' }],
      damage_20s: [{ type: 'number', message: '请输入数字', trigger: 'blur' }]
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
