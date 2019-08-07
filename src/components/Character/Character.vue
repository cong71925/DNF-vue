<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-card class="card">
            <el-button icon="el-icon-plus" type="primary" @click="dialogVisible = true" circle></el-button>
            <h4>添加角色</h4>
          </el-card>
        </el-col>
      </el-row>
      <characterAdd
        :dialogVisible.sync="dialogVisible"
        @update="getCharacter"
        :job="job"
        :class_sub="class_sub"
      />
      <el-row :gutter="20" v-loading="loading">
        <div v-for="item in character" :key="item.id">
          <characterItem
            :job="job"
            :class_sub="class_sub"
            :character="item"
            @update="getCharacter"
          />
        </div>
      </el-row>
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
import characterItem from './CharacterItem.vue'
import characterAdd from './CharacterAdd.vue'
export default {
  components: { characterItem, characterAdd },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getCharacter()
    },
    getCharacter() {
      this.loading = true
      this.axios({
        method: 'post',
        url: '/api/getCharacterInfo.php',
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
          this.character = response.data.characterList
          this.nums = Number(response.data.nums)
          this.loading = false
        })
        .catch(response => {
          console.log(response.data)
        })
    },
    getClass() {
      this.axios
        .get('static/data/job.json')
        .then(response => {
          this.job = response.data.options
        })
        .catch(response => {
          console.log(response)
        })
    },
    getJob() {
      this.axios
        .get('static/data/class.json')
        .then(response => {
          this.class_sub = response.data.options
        })
        .catch(response => {
          console.log(response)
        })
    }
  },
  data() {
    var job
    var class_sub
    var page = 1
    var character
    if (!this.$store.state.isLogin) {
      this.$message({
        type: 'error',
        message: '请先登录！'
      })
      this.$router.push('/')
    }
    this.getClass()
    this.getJob()
    this.getCharacter()
    return {
      dialogVisible: false,
      job,
      class_sub,
      character,
      nums: 0,
      page,
      value: true,
      loading: true
    }
  }
}
</script>
<style>
.card {
  text-align: center;
}
.character_info {
  text-align: left;
}
</style>
