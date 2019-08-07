<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <h3>团队信息</h3>
        </template>
        <p>团队名称：{{ groupInfo.group_name }}</p>
        <p>id：{{ $route.params.id }}</p>
        <p>创建日期：{{ groupInfo.create_time }}</p>
        <p>人数：{{ groupInfo.nums }}</p>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <h3>成员信息</h3>
        </template>
        <el-table :data="memberData" stripe style="width: 100%">
          <el-table-column prop="nickname" label="名称" width="180"></el-table-column>
          <el-table-column prop="club" label="冒险团" width="180"></el-table-column>
          <el-table-column prop="server_1" label="服务器" width="180"></el-table-column>
          <el-table-column prop="nums" label="角色数"></el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <h3>角色信息</h3>
        </template>
        <el-table :data="characterData" stripe style="width: 100%">
          <el-table-column prop="character_name" label="角色名"></el-table-column>
          <el-table-column prop="job" label="职责" sortable></el-table-column>
          <el-table-column prop="class_1" label="职业" sortable></el-table-column>
          <el-table-column prop="nickname" label="所属成员" sortable></el-table-column>
          <el-table-column prop="luke" label="卢克" sortable></el-table-column>
          <el-table-column prop="tayberrs" label="泰波尔斯" sortable></el-table-column>
          <el-table-column prop="fiend" label="超时空漩涡" sortable></el-table-column>
          <el-table-column prop="isis" label="伊西斯" sortable></el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  methods: {
    getGroupInfo() {
      this.axios({
        method: 'post',
        url: '/api/getGroupInfo.php',
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
          this.groupInfo = response.data.groupInfo
          this.memberData = response.data.memberList
          this.characterData = response.data.characterList
        })
        .catch(response => {
          console.log(response.data)
        })
    }
  },
  data() {
    this.getGroupInfo()
    var group_id = this.$route.params.id
    return {
      memberData: [],
      groupInfo: [],
      characterData: [],
      activeName: '1'
    }
  }
}
</script>

