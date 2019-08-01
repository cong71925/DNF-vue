<template>
  <el-col :xs="24" :sm="12" :md="8" :lg="6">
    <el-card>
      <div slot="header" class="clearfix">
        <span>团队名称</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="goto('GroupInfo')">进入</el-button>
      </div>
      <p>id:</p>
      <p>管理员:</p>
      <p>创建日期:</p>
      <p>人数:</p>
    </el-card>
  </el-col>
</template>
<script>
export default {
  methods: {
    goto(gotoName) {
      this.$router.push({ name: gotoName });
    }
  },
  data() {
    return {};
  }
};
</script>
