<template>
  <el-col :xs="24" :sm="12" :md="8" :lg="6">
    <el-card>
      <div slot="header" class="clearfix">
        <span>{{ group.group_name }}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="goto('GroupInfo')">进入</el-button>
      </div>
      <el-row>
        <el-col :span="12">id:</el-col>
        <el-col :span="12">{{ group.id }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">创建日期:</el-col>
        <el-col :span="12">{{ getDate }}</el-col>
      </el-row>
    </el-card>
  </el-col>
</template>
<script>
export default {
  props: ['group'],
  computed: {
    getDate() {
      var date = new Date(this.group.create_time)
      return date.toLocaleDateString()
    }
  },
  methods: {
    goto(gotoName) {
      this.$router.push({ name: gotoName, params: { id: this.group.id } })
    }
  },
  data() {
    return {}
  }
}
</script>
