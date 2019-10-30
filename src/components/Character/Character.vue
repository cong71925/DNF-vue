<template>
  <el-container>
    <el-main>
      <characterAdd
        :dialogVisible.sync="addVisible"
        @update="getCharacter"
        :job="job"
        :class_sub="class_sub"
      />
      <characterHistoricalData
        :dialogVisible.sync="historicalVisible"
        :job="historicalJob"
        :id="characterID"
        :class_1="class1"
        @update="getCharacter"
      />
      <el-row :gutter="20">
        <el-col :xs="8" :sm="6" :md="4" :lg="3">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addVisible = true"
            style="width:100%;"
          >添加角色</el-button>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3">
          <el-card class="el-card" :body-style="{ padding: '10px' }">
            <div>
              <el-switch v-model="boost" active-text="唱歌"></el-switch>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3">
          <el-card class="el-card" :body-style="{ padding: '10px' }">
            <div>
              <el-switch v-model="favoritism" active-text="偏爱"></el-switch>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-divider />
      <el-row :gutter="20">
        <div v-for="item in character" :key="item.id">
          <characterItem
            :job="job"
            :class_sub="class_sub"
            :boost="boost"
            :favoritism="favoritism"
            :character="item"
            @update="getCharacter"
            @getHistoricalData="getHistoricalData"
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
import characterHistoricalData from './CharacterHistoricalData.vue'
export default {
  components: { characterItem, characterAdd, characterHistoricalData },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getCharacter()
    },
    getHistoricalData(id, job, class1) {
      this.characterID = id
      this.historicalVisible = true
      this.historicalJob = job
      this.class1 = class1
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
        showClose: true,
        type: 'error',
        message: '请先登录！'
      })
      this.$router.push('/')
    }
    this.getCharacter()
    return {
      addVisible: false,
      historicalVisible: false,
      job,
      class_sub,
      character,
      nums: 0,
      page,
      value: true,
      historicalJob: null,
      characterID: null,
      class1: null,
      boost: true,
      favoritism:true
    }
  }
}
</script>
<style scoped>
.el-card{
  text-align: center;
}
.character_info {
  text-align: left;
}
</style>
