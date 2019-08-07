<template>
  <el-container>
    <el-main>
      <el-input placeholder="请输入要查找的团队ID" v-model.number="searchInput" class="input-with-select">
        <el-button slot="prepend" icon="el-icon-plus" @click="dialogVisible = true">创建团队</el-button>
        <el-button slot="append" icon="el-icon-search" @click="searchVisible = true">查找团队</el-button>
      </el-input>
      <el-divider></el-divider>
      <el-row :gutter="20" v-loading="loading">
        <div v-for="item in group" :key="item.id">
          <groupItem :group="item" />
        </div>
      </el-row>
      <groupCreate :dialogVisible.sync="dialogVisible" @update="getGroup" />
      <groupSearch
        :dialogVisible.sync="searchVisible"
        :searchInput="searchInput"
        @update="getGroup"
      />
    </el-main>
    <el-footer>
      <el-pagination
        layout="prev, pager, next"
        :total="nums"
        @current-change="handleCurrentChange"
        :page-size="12"
      ></el-pagination>
    </el-footer>
  </el-container>
</template>
<script>
import groupItem from './GroupItem'
import groupCreate from './GroupCreate'
import groupSearch from './GroupSearch'
export default {
  components: { groupItem, groupCreate, groupSearch },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getGroup()
    },
    getGroup() {
      this.loading = true
      this.axios({
        method: 'post',
        url: '/api/getGroupList.php',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: {
          user_id: this.$store.state.user_id,
          user_token: this.$store.state.user_token,
          page: this.page
        }
      })
        .then(response => {
          this.group = response.data.groupList
          this.nums = Number(response.data.nums)
          this.loading = false
        })
        .catch(response => {
          console.log(response.data)
        })
    }
  },
  data() {
    var group
    if (!this.$store.state.isLogin) {
      this.$message({
        type: 'error',
        message: '请先登录！'
      })
      this.$router.push('/')
    }
    this.getGroup()
    return {
      dialogVisible: false,
      searchVisible: false,
      page: 1,
      nums: 0,
      group,
      loading: true,
      searchInput: ''
    }
  }
}
</script>
<style>
.card {
  text-align: center;
}
</style>
