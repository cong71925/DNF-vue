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
      <el-row :gutter="20">
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
      this.axios({
        method: 'post',
        data: {
          action: 'getUserCharacterList',
          data: {
            user_id: this.$store.state.user_id,
            user_token: this.$store.state.user_token,
            page: this.page
          }
        }
      })
        .then(response => {
          if (response.data.state === 'success') {
            this.character = response.data.result.characterList
            this.nums = Number(response.data.result.characterNums)
            this.loading = false
          }
        })
        .catch(response => {
          console.log(response.data)
        })
    }
  },
  data() {
    const job = require('../../../static/data/job.json').options
    const class_sub = require('../../../static/data/class.json').options
    var page = 1
    var character
    
    if (!this.$store.state.isLogin) {
      this.$message({
        type: 'error',
        message: '请先登录！'
      })
      this.$router.push('/')
    }
    this.getCharacter()
    return {
      dialogVisible: false,
      job,
      class_sub,
      character,
      nums: 0,
      page,
      value: true
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
