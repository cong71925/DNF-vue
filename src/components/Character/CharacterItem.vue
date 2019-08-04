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
            <el-col :span="12">{{ character.luke }}</el-col>
            <el-col :span="12">泰波尔斯:</el-col>
            <el-col :span="12">{{ character.tayberrs }}</el-col>
            <el-col :span="12">超时空漩涡:</el-col>
            <el-col :span="12">{{ character.fiend }}</el-col>
            <el-col :span="12">普雷·伊西斯:</el-col>
            <el-col :span="12">{{ character.isis }}</el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="修改信息">
          <el-form ref="form" label-width="90px">
            <el-form-item label="角色名:">
              <el-input size="mini" v-model="character.character_name" :disabled="modify"></el-input>
            </el-form-item>
            <el-form-item label="职责">
              <el-cascader
                v-model="job_select"
                :options="job"
                @change="showData"
                size="mini"
                :props="{ expandTrigger: 'hover' }"
                :disabled="modify"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="职业">
              <el-cascader
                v-model="class_select"
                :options="class_sub"
                @change="showData"
                size="mini"
                :props="{ expandTrigger: 'hover' }"
                :disabled="modify"
              ></el-cascader>
            </el-form-item>
            <div v-if="job_select=='奶'">
              <el-form-item label="常驻力智">
                <el-input size="mini" v-model="character.buff_default" :disabled="modify"></el-input>
              </el-form-item>
              <el-form-item label="常驻三攻">
                <el-input size="mini" v-model="character.buff_atk" :disabled="modify"></el-input>
              </el-form-item>
              <el-form-item label="太阳">
                <el-input size="mini" v-model="character.buff_burst" :disabled="modify"></el-input>
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item label="15s伤害">
                <el-input size="mini" v-model="character.damage_15s" :disabled="modify">
                  <template slot="append">e</template>
                </el-input>
              </el-form-item>
              <el-form-item label="20s伤害">
                <el-input size="mini" v-model="character.damage_20s" :disabled="modify">
                  <template slot="append">e</template>
                </el-input>
              </el-form-item>
            </div>
            <el-divider />
            <el-form-item label="卢克已打">
              <el-input-number
                v-model="character.luke"
                :min="0"
                :max="2"
                size="mini"
                :disabled="modify"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="泰波尔斯">
              <el-input-number
                v-model="character.tayberrs"
                :min="0"
                :max="2"
                size="mini"
                :disabled="modify"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="漩涡已打">
              <el-input-number
                v-model="character.fiend"
                :min="0"
                :max="2"
                size="mini"
                :disabled="modify"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="伊西斯已打">
              <el-input-number
                v-model="character.isis"
                :min="0"
                :max="2"
                size="mini"
                :disabled="modify"
              ></el-input-number>
            </el-form-item>
            <el-divider />
            <el-form-item v-if="modify">
              <el-button type="danger">删除</el-button>
              <el-button type="primary" @click="setModifyFalse()">修改</el-button>
            </el-form-item>
            <el-form-item v-else>
              <el-button @click="setModifyTrue()">取消</el-button>
              <el-button type="primary">提交</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </el-col>
</template>
<script>
export default {
  props: ["job", "class_sub", "character"],
  methods: {
    setModifyFalse() {
      this.modify = false;
    },
    setModifyTrue() {
      this.modify = true;
    },
    showData() {
      console.log(this.character.class_1);
    }
  },
  data() {
    var modify = true;
    var class_select = new Array();
    var job_select = new Array();
    class_select[0] = this.character.class_0;
    class_select[1] = this.character.class_1;
    job_select[0] = this.character.job;
    return {
      modify,
      class_select,
      job_select
    };
  }
};
</script>
<style>
.card {
  text-align: center;
}
.character_info {
  text-align: left;
}
</style>
