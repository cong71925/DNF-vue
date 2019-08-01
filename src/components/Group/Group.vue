<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-card class="card">
            <el-button icon="el-icon-plus" type="primary" circle></el-button>
            <h4>创建团队</h4>
          </el-card>
        </el-col>
        <groupItem />
      </el-row>
    </el-main>
    
  </el-container>
</template>
<script>
import groupItem from './GroupItem'
export default {
  components: { groupItem },
  methods: {},
  data() {
    return {};
  }
};
</script>
<style>
.card {
  text-align: center;
}
</style>
