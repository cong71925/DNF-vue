<template>
  <el-col :xs="24" :sm="12" :md="8" :lg="6">
    <el-card>
      <el-collapse accordion>
        <el-collapse-item style="text-align: left;">
          <template slot="title">
            <el-image style="width: 40px; height: 40px" :src="url" :fit="'fit'"></el-image>
            {{ character.character_name }}
          </template>
          <el-row>
            <el-col :span="12">职业:</el-col>
            <el-col :span="12">{{ character.class_1 }}</el-col>
            <el-col :span="12">职责:</el-col>
            <el-col :span="12">{{ character.job }}</el-col>
            <div v-if="character.job == '奶'">
              <el-col :span="12">常驻力智:</el-col>
              <el-col :span="12">{{ character.buff_default }}</el-col>
              <el-col :span="12">常驻三攻:</el-col>
              <el-col :span="12">{{ character.buff_atk }}</el-col>
              <el-col :span="12">太阳力智:</el-col>
              <el-col :span="12">{{ character.buff_burst }}</el-col>
              <el-col :span="12">无系统奶提升率:</el-col>
              <el-col :span="12">{{ liftRatioDefault }}倍</el-col>
              <el-col :span="12">有系统奶提升率:</el-col>
              <el-col :span="12">{{ liftRatioBurst }}倍</el-col>
            </div>
            <div v-else>
              <el-col :span="12">15s绿纱袋:</el-col>
              <el-col :span="12">{{ character.damage_15s }}e</el-col>
              <el-col :span="12">20s绿纱袋:</el-col>
              <el-col :span="12">{{ character.damage_20s }}e</el-col>
            </div>
          </el-row>
          <el-divider />
          <el-button type="primary" icon="el-icon-s-marketing" @click="setHistoricalDataVisible" style="width:100%;">历史数据</el-button>
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
          </el-form>
          <el-divider />
          <div v-if="modify">
            <el-button-group style="width:100%;">
              <el-button
                type="danger"
                @click="removeCharacter()"
                icon="el-icon-delete"
                style="width:50%;"
              >删除</el-button>
              <el-button
                type="primary"
                @click="setModifyFalse()"
                icon="el-icon-edit"
                style="width:50%;"
              >修改</el-button>
            </el-button-group>
          </div>
          <div v-else>
            <el-button-group style="width:100%;">
              <el-button @click="setModifyTrue()" style="width:50%;" icon="el-icon-refresh-left">取消</el-button>
              <el-button
                type="primary"
                @click="submitForm('form')"
                icon="el-icon-upload2"
                style="width:50%;"
              >提交</el-button>
            </el-button-group>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </el-col>
</template>
<script>
import utils from '@/utils.js'
export default {
  props: ['job', 'class_sub', 'character'],
  computed: {
    liftRatioDefault() {
      var ratio = utils.GetLiftRatioDefault(
        this.character.buff_default,
        this.character.buff_atk,
        this.character.buff_burst,
        this.character.class_1
      )
      return ratio
    },
    liftRatioBurst() {
      var ratio = utils.GetLiftRatioBurst(
        this.character.buff_default,
        this.character.buff_atk,
        this.character.buff_burst,
        this.character.class_1
      )
      return ratio
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
    setHistoricalDataVisible(){
      this.$emit('getHistoricalData',this.character.id,this.character.job,this.character.class_1)
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
            data: {
              action: 'removeCharacter',
              data: {
                user_id: this.$store.state.user_id,
                user_token: this.$store.state.user_token,
                character_id: this.character.id
              }
            }
          })
            .then(response => {
              if (response.data.state === 'success') {
                this.$message({
                  showClose: true,
                  type: 'success',
                  message: '删除成功!'
                })
                this.$emit('update')
              } else {
                this.$message({
                  showClose: true,
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
            showClose: true,
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    modifyCharacter() {
      this.axios({
        method: 'post',
        data: {
          action: 'modifyCharacter',
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
            buff_burst: this.form.buff_burst
          }
        }
      })
        .then(response => {
          if (response.data.state === 'success') {
            this.$message({
              showClose: true,
              type: 'success',
              message: '修改成功!'
            })
            this.setModifyTrue()
            this.url =
              'static/image/face/' +
              this.form.class[0] +
              '/' +
              this.form.class[1] +
              '.png'
            this.$emit('update')
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: '修改失败!'
            })
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
    var url =
      'static/image/face/' +
      this.character.class_0 +
      '/' +
      this.character.class_1 +
      '.png'
    var form = {
      character_id: this.character.id,
      character_name: this.character.character_name,
      job: job_select,
      class: class_select,
      damage_15s: this.character.damage_15s,
      damage_20s: this.character.damage_20s,
      buff_default: this.character.buff_default,
      buff_atk: this.character.buff_atk,
      buff_burst: this.character.buff_burst
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
      form,
      url
    }
  }
}
</script>
<style>
</style>

