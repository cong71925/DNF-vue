<template>
  <el-col :xs="24" :sm="12" :md="8" :lg="6">
    <el-card class="card">
      <el-collapse accordion>
        <el-collapse-item style="text-align: left;">
          <template slot="title">角色信息：{{ character.character_name }}</template>
          <el-row>
            <el-col :span="12">职责:</el-col>
            <el-col :span="12">{{ character.job }}</el-col>
            <el-col :span="12">职业:</el-col>
            <el-col :span="12">{{ character.class_1 }}</el-col>
            <div v-if="character.job == '奶'">
              <el-col :span="12">常驻力智:</el-col>
              <el-col :span="12">{{ character.buff_default }}</el-col>
              <el-col :span="12">常驻三攻:</el-col>
              <el-col :span="12">{{ character.buff_atk }}</el-col>
              <el-col :span="12">常驻太阳:</el-col>
              <el-col :span="12">{{ character.buff_burst }}</el-col>
              <el-col :span="12">无系统奶提升率:</el-col>
              <el-col :span="12">{{ getLiftRatioDefault }}倍</el-col>
              <el-col :span="12">有系统奶提升率:</el-col>
              <el-col :span="12">{{ getLiftRatioBurst }}倍</el-col>
            </div>
            <div v-else>
              <el-col :span="12">15s绿纱袋:</el-col>
              <el-col :span="12">{{ character.damage_15s }}e</el-col>
              <el-col :span="12">20s绿纱袋:</el-col>
              <el-col :span="12">{{ character.damage_20s }}e</el-col>
            </div>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="已打团本次数" style="text-align: left;">
          <el-row>
            <el-col :span="12">卢克:</el-col>
            <el-col :span="12">{{ character.luke }}次</el-col>
            <el-col :span="12">泰波尔斯:</el-col>
            <el-col :span="12">{{ character.tayberrs }}次</el-col>
            <el-col :span="12">超时空漩涡:</el-col>
            <el-col :span="12">{{ character.fiend }}次</el-col>
            <el-col :span="12">普雷·伊西斯:</el-col>
            <el-col :span="12">{{ character.isis }}次</el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="修改信息">
          <el-form :model="form" ref="form" label-width="90px" :rules="rules">
            <el-form-item label="角色名:" prop="character_name">
              <el-input size="mini" v-model="form.character_name" :disabled="modify"></el-input>
            </el-form-item>
            <el-form-item label="职责" prop="job">
              <el-cascader
                v-model="form.job"
                :options="job"
                size="mini"
                :props="{ expandTrigger: 'hover' }"
                :disabled="modify"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="职业" prop="class">
              <el-cascader
                v-model="form.class"
                :options="class_sub"
                size="mini"
                :props="{ expandTrigger: 'hover' }"
                :disabled="modify"
              ></el-cascader>
            </el-form-item>
            <div v-if="job_select=='奶'">
              <el-form-item label="常驻力智" prop="buff_default">
                <el-input
                  size="mini"
                  v-model.number="form.buff_default"
                  :disabled="modify"
                  show-word-limit
                  maxlength="5"
                ></el-input>
              </el-form-item>
              <el-form-item label="常驻三攻" prop="buff_atk">
                <el-input
                  size="mini"
                  v-model.number="form.buff_atk"
                  :disabled="modify"
                  show-word-limit
                  maxlength="5"
                ></el-input>
              </el-form-item>
              <el-form-item label="太阳" prop="buff_burst">
                <el-input
                  size="mini"
                  v-model.number="form.buff_burst"
                  :disabled="modify"
                  show-word-limit
                  maxlength="5"
                ></el-input>
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item label="15s伤害" prop="damage_15s">
                <el-input
                  size="mini"
                  v-model.number="form.damage_15s"
                  :disabled="modify"
                  show-word-limit
                  maxlength="5"
                >
                  <template slot="append">e</template>
                </el-input>
              </el-form-item>
              <el-form-item label="20s伤害" prop="damage_20s">
                <el-input
                  size="mini"
                  v-model.number="form.damage_20s"
                  :disabled="modify"
                  show-word-limit
                  maxlength="5"
                >
                  <template slot="append">e</template>
                </el-input>
              </el-form-item>
            </div>
            <el-divider />
            <el-form-item label="卢克已打">
              <el-input-number
                v-model.number="form.luke"
                :min="0"
                :max="2"
                :step="1"
                step-strictly
                size="mini"
                :disabled="modify"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="泰波尔斯">
              <el-input-number
                v-model.number="form.tayberrs"
                :min="0"
                :max="2"
                :step="1"
                step-strictly
                size="mini"
                :disabled="modify"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="漩涡已打">
              <el-input-number
                v-model.number="form.fiend"
                :min="0"
                :max="2"
                :step="1"
                step-strictly
                size="mini"
                :disabled="modify"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="伊西斯已打">
              <el-input-number
                v-model.number="form.isis"
                :min="0"
                :max="2"
                :step="1"
                step-strictly
                size="mini"
                :disabled="modify"
              ></el-input-number>
            </el-form-item>
            <el-divider />
            <el-form-item v-if="modify">
              <el-button type="danger" @click="removeCharacter()">删除</el-button>
              <el-button type="primary" @click="setModifyFalse()">修改</el-button>
            </el-form-item>
            <el-form-item v-else>
              <el-button @click="setModifyTrue()">取消</el-button>
              <el-button type="primary" @click="submitForm('form')">提交</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </el-col>
</template>
<script>
export default {
  props: ['job', 'class_sub', 'character'],
  computed: {
    getLiftRatioDefault() {
      var ratio = 0
      const template_atk = 2400
      const template_default = 3000
      if (this.character.class_1 === '炽天使') {
        ratio =
          ((Number(this.character.buff_default) * 1.3 +
            Number(this.character.buff_burst) +
            500 +
            template_default) *
            (Number(this.character.buff_atk) * 1.3 + template_atk)) /
          (template_atk * template_default)
      } else if (this.character.class_1 === '神思者') {
        ratio =
          ((Number(this.character.buff_default) +
            Number(this.character.buff_burst) +
            300 +
            template_default) *
            (Number(this.character.buff_atk) + template_atk)) /
          (template_atk * template_default)
      } else if (this.character.class_1 === '冥月女神') {
        ratio =
          ((Number(this.character.buff_default) * 1.25 * 1.15 +
            Number(this.character.buff_burst) +
            500 +
            template_default) *
            (Number(this.character.buff_atk) * 1.25 * 1.15 + template_atk)) /
          (template_atk * template_default)
      }
      return ratio.toFixed(2)
    },
    getLiftRatioBurst() {
      var ratio = 0
      const template_atk = 2400
      const template_default = 3000
      const system_buff = 8000
      if (this.character.class_1 === '炽天使') {
        ratio =
          ((Number(this.character.buff_default) * 1.3 +
            Number(this.character.buff_burst) +
            500 +
            system_buff +
            template_default) *
            (Number(this.character.buff_atk) * 1.3 + template_atk)) /
          (template_atk * (template_default + system_buff))
      } else if (this.character.class_1 === '神思者') {
        ratio =
          ((Number(this.character.buff_default) +
            Number(this.character.buff_burst) +
            300 +
            system_buff +
            template_default) *
            (Number(this.character.buff_atk) + template_atk)) /
          (template_atk * (template_default + system_buff))
      } else if (this.character.class_1 === '冥月女神') {
        ratio =
          ((Number(this.character.buff_default) * 1.25 * 1.15 +
            Number(this.character.buff_burst) +
            500 +
            system_buff +
            template_default) *
            (Number(this.character.buff_atk) * 1.25 * 1.15 + template_atk)) /
          (template_atk * (template_default + system_buff))
      }
      return ratio.toFixed(2)
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.modifyCharacter()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    setModifyFalse() {
      this.modify = false
    },
    setModifyTrue() {
      this.modify = true
    },
    removeCharacter() {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios({
            method: 'post',
            url: '/api/removeCharacter.php',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: {
              user_id: this.$store.state.user_id,
              user_token: this.$store.state.user_token,
              character_id: this.character.id
            }
          })
            .then(response => {
              if (response.data === 'success') {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.$emit('update')
                console.log(response.data)
              } else {
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
    modifyCharacter() {
      this.axios({
        method: 'post',
        url: '/api/modifyCharacter.php',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: {
          user_id: this.$store.state.user_id,
          user_token: this.$store.state.user_token,
          character_id: this.form.character_id,
          character_name: this.form.character_name,
          job: this.form.job[0],
          class_0: this.form.class[0],
          class_1: this.form.class[1],
          damage_15s: this.form.damage_15s,
          damage_20s: this.form.damage_20s,
          buff_default: this.form.buff_default,
          buff_atk: this.form.buff_atk,
          buff_burst: this.form.buff_burst,
          luke: this.form.luke,
          tayberrs: this.form.tayberrs,
          fiend: this.form.fiend,
          isis: this.form.isis
        }
      })
        .then(response => {
          if (response.data === 'success') {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.setModifyTrue()
            this.$emit('update')
            console.log(response.data)
          } else {
            console.log(response.data)
          }
        })
        .catch(response => {
          console.log(response)
        })
    }
  },
  data() {
    var modify = true
    var class_select = new Array()
    var job_select = new Array()
    class_select[0] = this.character.class_0
    class_select[1] = this.character.class_1
    job_select[0] = this.character.job
    var form = {
      character_id: this.character.id,
      character_name: this.character.character_name,
      job: job_select,
      class: class_select,
      damage_15s: this.character.damage_15s,
      damage_20s: this.character.damage_20s,
      buff_default: this.character.buff_default,
      buff_atk: this.character.buff_atk,
      buff_burst: this.character.buff_burst,
      luke: this.character.luke,
      tayberrs: this.character.tayberrs,
      fiend: this.character.fiend,
      isis: this.character.isis
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
      ]
    }
    return {
      modify,
      class_select,
      job_select,
      rules,
      form
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

