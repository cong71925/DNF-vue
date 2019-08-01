<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ character.character_name }}</span>
    </div>
    <div>
      <el-row>
        <el-col :span="12">
          <p>职责:</p>
        </el-col>
        <el-col :span="12">
          <p>纯C</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>职业</p>
        </el-col>
        <el-col :span="12">
          <p>古灵井盖</p>
        </el-col>
      </el-row>
      <div v-if="character.class_main == 'buffer'">
        <el-row>
          <el-col :span="12">
            <p>常驻力智</p>
          </el-col>
          <el-col :span="12">
            <p>300</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>常驻三攻</p>
          </el-col>
          <el-col :span="12">
            <p>400</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>太阳力智</p>
          </el-col>
          <el-col :span="12">
            <p>400</p>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row>
          <el-col :span="12">
            <p>15s</p>
          </el-col>
          <el-col :span="12">
            <p>300e</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>20s</p>
          </el-col>
          <el-col :span="12">
            <p>400e</p>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="12">
        <p>卢克已打次数:2</p>
      </el-col>
      <el-col :span="12">
        <p>泰波尔斯已打次数:2</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <p>伊西斯已打次数:2</p>
      </el-col>
      <el-col :span="12">
        <p>漩涡已打次数:2</p>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  data() {
    var character = {
      id: 1,
      user_id: 1,
      character_name: "井盖",
      class_main: "center",
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
      character
    };
  }
};
</script>
