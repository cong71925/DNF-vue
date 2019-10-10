<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item name="1">
      <template slot="title">
        <h3>团队信息</h3>
      </template>
      <el-row >
        <el-col :xs="12" :sm="8" :md="6" :lg="4">
          <p >团队名称：</p>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="4">
          <p>{{ groupInfo.group_name }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="12" :sm="8" :md="6" :lg="4">
          <p>id：</p>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="4">
          <p>{{ $route.params.id }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="12" :sm="8" :md="6" :lg="4">
          <p>创建日期：</p>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="4">
          <p>{{ groupInfo.create_time }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="12" :sm="8" :md="6" :lg="4">
          <p>人数：</p>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="4">
          <p>{{ groupInfo.nums }}</p>
        </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <h3>成员信息</h3>
        <el-badge type="info" :value="memberData.length" />
      </template>
      <el-table :data="memberData" style="width: 100%" >
        <el-table-column prop="nickname" label="名称"></el-table-column>
        <el-table-column prop="club" label="冒险团"></el-table-column>
        <el-table-column prop="server_1" label="服务器"></el-table-column>
        <el-table-column prop="nums" label="角色数"></el-table-column>
      </el-table>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <h3>角色信息</h3>
        <el-badge type="info" :value="characterData.length" />
      </template>
      <el-table :data="characterData" style="width: 100%">
        <el-table-column prop="character_name" label="角色名" sortable></el-table-column>
        <el-table-column prop="job" label="职责" sortable></el-table-column>
        <el-table-column prop="class_1" label="职业" sortable></el-table-column>
        <el-table-column prop="nickname" label="所属成员" sortable></el-table-column>
      </el-table>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
export default {
  methods: {
    getGroupInfo() {
      this.axios({
        method: 'post',
        data: {
          action: 'getGroupInfo',
          data: {
            user_id: this.$store.state.user_id,
            user_token: this.$store.state.user_token,
            group_id: this.$route.params.id
          }
        }
      })
        .then(response => {
          if (response.data.state === 'success') {
            this.groupInfo = response.data.result
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: '获取数据错误！'
            })
          }
        })
        .catch(response => {
          console.log(response.data)
        })
    },
    getMemberInfo() {
      this.axios({
        method: 'post',
        data: {
          action: 'getMemberInfo',
          data: {
            user_id: this.$store.state.user_id,
            user_token: this.$store.state.user_token,
            group_id: this.$route.params.id
          }
        }
      })
        .then(response => {
          if (response.data.state === 'success') {
            this.memberData = response.data.result
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
    },
    getCharacterInfo() {
      this.axios({
        method: 'post',
        data: {
          action: 'getCharacterInfo',
          data: {
            user_id: this.$store.state.user_id,
            user_token: this.$store.state.user_token,
            group_id: this.$route.params.id
          }
        }
      })
        .then(response => {
          if (response.data.state === 'success') {
            this.characterData = response.data.result
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
    this.getGroupInfo()
    this.getMemberInfo()
    this.getCharacterInfo()
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

