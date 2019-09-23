<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-image style="width: 40px; height: 40px" :src="url" :fit="'fit'"></el-image>
      <span>{{ characterInfo.character_name }}</span>
    </div>
    <div>
      <el-row>
        <el-col :span="12">职责:</el-col>
        <el-col :span="12">{{ characterInfo.job }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">职业:</el-col>
        <el-col :span="12">{{ characterInfo.class_1 }}</el-col>
      </el-row>
      <div v-if="characterInfo.job == '奶'">
        <el-row>
          <el-col :span="12">常驻力智</el-col>
          <el-col :span="12">{{ characterInfo.buff_default }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">常驻三攻</el-col>
          <el-col :span="12">{{ characterInfo.buff_atk }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">太阳力智</el-col>
          <el-col :span="12">{{ characterInfo.buff_burst }}</el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row>
          <el-col :span="12">15s</el-col>
          <el-col :span="12">{{ characterInfo.damage_15s }}e</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">20s</el-col>
          <el-col :span="12">{{ characterInfo.damage_20s }}e</el-col>
        </el-row>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  props: ['characterInfo'],
  data() {
    var url =
      'static/image/face/' +
      this.characterInfo.class_0 +
      '/' +
      this.characterInfo.class_1 +
      '.png'
    return {
      url
    }
  }
}
</script>
<style scoped>
.el-card__header {
  padding: 5px;
}
.el-image {
  overflow: unset;
}
.el-card__item--card {
  width: 50%;
  min-width: 170px;
}
</style>
