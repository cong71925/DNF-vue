<template>
  <div>
    <el-collapse accordion>
      <div v-for="item in memberList" :key="item.index">
        <GroupMemberItem :memberInfo="item" />
      </div>
    </el-collapse>
  </div>
</template>
<style>
</style>
<script>
import GroupMemberItem from './GroupMemberItem.vue'
export default {
  components: { GroupMemberItem },
  methods: {
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
      memberList: ''
    }
  }
}
</script>

