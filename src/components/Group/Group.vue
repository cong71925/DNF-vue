<template>
  <el-container>
    <el-main>
      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">创建团队</el-button>
        <el-button type="primary" icon="el-icon-search" @click="addVisible = !addVisible">查找团队</el-button>
      </el-button-group>
      <el-divider></el-divider>
      <el-collapse-transition>
        <div v-show="addVisible">
          <el-input placeholder="请输入要查找的团队ID" v-model.number="searchInput">
            <el-tooltip
              class="item"
              effect="dark"
              content="查找团队"
              placement="top-start"
              slot="append"
            >
              <el-button icon="el-icon-search" @click="searchVisible = true"></el-button>
            </el-tooltip>
          </el-input>
          <el-divider></el-divider>
        </div>
      </el-collapse-transition>
      <el-row :gutter="20">
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
    <el-footer height="30px">
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
        data: {
          action: 'getGroupList',
          data: {
            user_id: this.$store.state.user_id,
            user_token: this.$store.state.user_token,
            page: this.page
          }
        }
      })
        .then(response => {
          this.group = response.data.result.groupList
          this.nums = Number(response.data.result.groupNums)
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
        showClose: true,
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
      searchInput: '',
      addVisible: false
    }
  }
}
</script>
<style>
.card {
  text-align: center;
}
</style>
