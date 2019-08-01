<template>
  <div id="characterItem">
    <el-col :xs="24" :sm="12" :md="8" :lg="6">
      <el-card class="card">
        <el-image :src="'../../../static/image/face/dja6.jpg'" :fit="'fit'"></el-image>
        <el-form ref="form" label-width="90px">
          <el-form-item label="角色名:">
            <el-input size="mini" v-model="character.character_name" :disabled="modify"></el-input>
          </el-form-item>
          <el-form-item label="职责">
            <el-cascader
              v-model="character.class_main"
              :options="class_main"
              @change="showData"
              size="mini"
              :props="{ expandTrigger: 'hover' }"
              :disabled="modify"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="职业">
            <el-cascader
              v-model="character.class_sub"
              :options="class_sub"
              @change="showData"
              size="mini"
              :props="{ expandTrigger: 'hover' }"
              :disabled="modify"
            ></el-cascader>
          </el-form-item>
          <div v-if="character.class_main=='buffer'">
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
          <el-form-item label="漩涡已打">
            <el-input-number
              v-model="character.demon"
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
      </el-card>
    </el-col>
  </div>
</template>
<script>
export default {
  props: ['class_main','class_sub'],
  methods: {
    setModifyFalse() {
      this.modify = false;
    },
    setModifyTrue() {
      this.modify = true;
    },
    showData() {
      console.log(this.character.class_sub);
    }
  },
  data() {
    var modify = true;
    var character = {
      id: 1,
      user_id: 1,
      character_name: "井盖",
      class_main: "buffer",
      class_sub: "",
      damage_15s: "200",
      damage_20s: "400",
      buff_default: "",
      buff_atk: "",
      buff_burst: "",
      luke: 0,
      demon: 0,
      isis: 0
    };
    return {
      modify,
      character
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
