<template>
  <div>
    <characterHistoricalData
      :dialogVisible.sync="historicalVisible"
      :job="historicalJob"
      :id="characterID"
      :class_1="class1"
    />
    <el-collapse accordion>
      <div v-for="item in memberList" :key="item.index">
        <GroupMemberItem :memberInfo="item" @getHistoricalData="getHistoricalData" />
      </div>
    </el-collapse>
  </div>
</template>
<style>
</style>
<script>
import characterHistoricalData from './CharacterHistoricalData.vue'
import GroupMemberItem from './GroupMemberItem.vue'
export default {
  components: { characterHistoricalData, GroupMemberItem },
  methods: {
    getHistoricalData(id, job, class1) {
      this.characterID = id
      this.historicalVisible = true
      this.historicalJob = job
      this.class1 = class1
    },
    getMemberList() {
      this.axios({
        method: 'post',
        data: {
          action: 'getMemberList',
          data: {
            user_id: this.$store.state.user_id,
            user_token: this.$store.state.user_token,
            group_id: this.$route.params.id
          }
        }
      })
        .then(response => {
          if (response.data.state === 'success') {
            this.memberList = response.data.result
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: '获取数据错误！'
            })
            console.log(response.data)
          }
        })
        .catch(response => {
          console.log(response.data)
        })
    }
  },
  data() {
    this.getMemberList()
    return {
      memberList: '',
      historicalVisible: false,
      historicalJob: null,
      characterID: null,
      class1: null
    }
  }
}
</script>

