<template>
  <div>
    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title">
          纯C
          <el-badge type="info" :value="centerData.length" />
        </template>
        <el-table
          :data="centerData"
          style="width: 100%"
          :default-sort="{prop: 'character_name', order: 'descending'}"
        >
          <el-table-column prop="character_name" label="角色名" sortable></el-table-column>
          <el-table-column prop="class_1" label="职业" sortable></el-table-column>
          <el-table-column prop="nickname" label="所属成员" sortable></el-table-column>
          <el-table-column prop="damage_15s" label="15S" sortable></el-table-column>
          <el-table-column prop="damage_20s" label="20S" sortable></el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          辅C
          <el-badge type="info" :value="supportData.length" />
        </template>
        <el-table
          :data="supportData"
          style="width: 100%"
          :default-sort="{prop: 'character_name', order: 'descending'}"
        >
          <el-table-column prop="character_name" label="角色名" sortable></el-table-column>
          <el-table-column prop="class_1" label="职业" sortable></el-table-column>
          <el-table-column prop="nickname" label="所属成员" sortable></el-table-column>
          <el-table-column prop="damage_15s" label="15S" sortable></el-table-column>
          <el-table-column prop="damage_20s" label="20S" sortable></el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          奶
          <el-badge type="info" :value="bufferData.length" />
        </template>
        <el-table
          :data="bufferData"
          style="width: 100%"
          :default-sort="{prop: 'character_name', order: 'descending'}"
        >
          <el-table-column prop="character_name" label="角色名" sortable></el-table-column>
          <el-table-column prop="class_1" label="职业" sortable></el-table-column>
          <el-table-column prop="nickname" label="所属成员" sortable></el-table-column>
          <el-table-column prop="buff_default" label="常驻力智" sortable></el-table-column>
          <el-table-column prop="buff_atk" label="常驻三攻" sortable></el-table-column>
          <el-table-column prop="buff_burst" label="爆发力智" sortable></el-table-column>
          <el-table-column prop="LiftRatioDefault" label="无系统奶提升率" sortable></el-table-column>
          <el-table-column prop="LiftRatioBurst" label="有系统奶提升率" sortable></el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<style>
</style>
<script>
import utils from '@/utils.js'
export default {
  computed: {},
  methods: {
    getCenterList() {
      this.axios({
        method: 'post',
        data: {
          action: 'getCenterList',
          data: {
            user_id: this.$store.state.user_id,
            user_token: this.$store.state.user_token,
            group_id: this.$route.params.id
          }
        }
      })
        .then(response => {
          if (response.data.state === 'success') {
            this.centerData = response.data.result
            for (var i = 0; i < this.centerData.length; i++) {
              this.centerData[i].damage_15s = Number(
                this.centerData[i].damage_15s
              )
              this.centerData[i].damage_20s = Number(
                this.centerData[i].damage_20s
              )
            }
          } else {
            this.$message({
              type: 'error',
              message: '获取数据错误！'
            })
          }
        })
        .catch(response => {
          console.log(response.data)
        })
    },
    getSupportList() {
      this.axios({
        method: 'post',
        data: {
          action: 'getSupportList',
          data: {
            user_id: this.$store.state.user_id,
            user_token: this.$store.state.user_token,
            group_id: this.$route.params.id
          }
        }
      })
        .then(response => {
          if (response.data.state === 'success') {
            this.supportData = response.data.result
            for (var i = 0; i < this.supportData.length; i++) {
              this.supportData[i].damage_15s = Number(
                this.supportData[i].damage_15s
              )
              this.supportData[i].damage_20s = Number(
                this.supportData[i].damage_20s
              )
            }
          } else {
            this.$message({
              type: 'error',
              message: '获取数据错误！'
            })
          }
        })
        .catch(response => {
          console.log(response.data)
        })
    },
    getBufferList() {
      this.axios({
        method: 'post',
        data: {
          action: 'getBufferList',
          data: {
            user_id: this.$store.state.user_id,
            user_token: this.$store.state.user_token,
            group_id: this.$route.params.id
          }
        }
      })
        .then(response => {
          if (response.data.state === 'success') {
            this.bufferData = response.data.result
            for (var i = 0; i < this.bufferData.length; i++) {
              this.bufferData[i].buff_default = Number(
                this.bufferData[i].buff_default
              )
              this.bufferData[i].buff_atk = Number(this.bufferData[i].buff_atk)
              this.bufferData[i].buff_burst = Number(
                this.bufferData[i].buff_burst
              )
              this.bufferData[i].LiftRatioDefault = Number(
                utils.GetLiftRatioDefault(
                  this.bufferData[i].buff_default,
                  this.bufferData[i].buff_atk,
                  this.bufferData[i].buff_burst,
                  this.bufferData[i].class_1
                )
              )
              this.bufferData[i].LiftRatioBurst = Number(
                utils.GetLiftRatioBurst(
                  this.bufferData[i].buff_default,
                  this.bufferData[i].buff_atk,
                  this.bufferData[i].buff_burst,
                  this.bufferData[i].class_1
                )
              )
            }
          } else {
            this.$message({
              type: 'error',
              message: '获取数据错误！'
            })
          }
        })
        .catch(response => {
          console.log(response.data)
        })
    }
  },
  data() {
    this.getCenterList()
    this.getSupportList()
    this.getBufferList()
    return {
      centerData: [],
      supportData: [],
      bufferData: []
    }
  }
}
</script>

