<template>
  <el-col :xs="24" :sm="22" :md="20" :lg="18">
    <el-form :label-position="'right'" label-width="80px">
      <el-form-item label="团队名称">
        <el-input type="text" maxlength="20" v-model="group_name" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="允许加入">
        <el-switch v-model="join"></el-switch>
      </el-form-item>
      <transition name="el-fade-in-linear">
        <el-form-item label="申请密码" v-show="join">
          <el-input show-password maxlength="6" v-model="password_join"></el-input>
        </el-form-item>
      </transition>
      <el-form-item>
        <el-button type="danger">删除团队</el-button>
        <el-button type="primary">提交修改</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>
<script>
export default {
  data() {
    var join;
    var group_name;
    var password_join;
    return {
      group_name,
      password_join,
      join
    };
  }
};
</script>

