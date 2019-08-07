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
    getMemberInfo() {
      this.axios({
        method: 'post',
        url: '/api/getMemberInfo.php',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: {
          user_id: this.$store.state.user_id,
          user_token: this.$store.state.user_token,
          group_id: this.$route.params.id
        }
      })
        .then(response => {
          if (response.data !== 'error') {
            this.memberList = response.data.memberList
          } else {
            console.log(response.data)
          }
        })
        .catch(response => {
          console.log(response.data)
        })
    }
  },
  data() {
    this.getMemberInfo()
    return {
      memberList: ''
    }
  }
}
</script>

