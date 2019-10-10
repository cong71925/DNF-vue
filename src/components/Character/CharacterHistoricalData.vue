<template>
  <el-dialog title="历史数据" :visible.sync="visible" width="90%">
    <div v-if="loaded">
      <g2-custom v-if="job === '奶'" :option="bufferOption"></g2-custom>
      <g2-custom v-else :option="centerOption"></g2-custom>
      <el-divider />
      <el-table v-if="job === '奶'" :data="historicalInfo" style="width: 100%">
        <el-table-column prop="create_time" label="时间"></el-table-column>
        <el-table-column prop="buff_default" label="常驻力智"></el-table-column>
        <el-table-column prop="buff_atk" label="常驻三攻"></el-table-column>
        <el-table-column prop="buff_burst" label="太阳力智"></el-table-column>
        <el-table-column prop="ratio" label="有系统奶提升率"></el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="removeHistoricalInfo(scope.row.id)"
              icon="el-icon-close"
            >删除记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-else :data="historicalInfo" style="width: 100%">
        <el-table-column prop="create_time" label="时间"></el-table-column>
        <el-table-column prop="damage_15s" label="15s"></el-table-column>
        <el-table-column prop="damage_20s" label="20s"></el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="removeHistoricalInfo(scope.row.id)"
              icon="el-icon-close"
            >删除记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: center;" v-else>
      <h3>暂无数据</h3>
    </div>
  </el-dialog>
</template>
<script>
import utils from '@/utils.js'
export default {
  props: ['dialogVisible', 'job', 'id', 'class_1'],
  watch: {
    dialogVisible(val) {
      this.visible = val
      if (this.visible) {
        this.getdata()
      }
    },
    visible(val) {
      this.$emit('update:dialogVisible', val)
    }
  },
  mounted() {},
  methods: {
    getdata() {
      this.loaded = false
      this.axios({
        method: 'post',
        data: {
          action: 'getCharacterHistoricalInfo',
          data: {
            user_id: this.$store.state.user_id,
            user_token: this.$store.state.user_token,
            characterID: this.id
          }
        }
      })
        .then(response => {
          if (
            response.data.state === 'success' &&
            response.data.result.length > 0
          ) {
            this.historicalInfo = response.data.result
            this.data = []
            if (this.job === '奶') {
              for (var i = 0; i < this.historicalInfo.length; i++) {
                this.historicalInfo[i].ratio = Number(
                  utils.GetLiftRatioBurst(
                    this.historicalInfo[i].buff_default,
                    this.historicalInfo[i].buff_atk,
                    this.historicalInfo[i].buff_burst,
                    this.class_1
                  )
                )
                this.data[3 * i] = {
                  date: this.historicalInfo[i].create_time,
                  type: '常驻三攻',
                  value: Number(this.historicalInfo[i].buff_atk),
                  '提升率': this.historicalInfo[i].ratio
                }
                this.data[3 * i + 1] = {
                  date: this.historicalInfo[i].create_time,
                  type: '常驻力智',
                  value: Number(this.historicalInfo[i].buff_default),
                  '提升率': this.historicalInfo[i].ratio
                }
                this.data[3 * i + 2] = {
                  date: this.historicalInfo[i].create_time,
                  type: '太阳力智',
                  value: Number(this.historicalInfo[i].buff_burst),
                  '提升率': this.historicalInfo[i].ratio
                }
              }
            } else {
              for (var i = 0; i < this.historicalInfo.length; i++) {
                this.data[2 * i] = {
                  date: this.historicalInfo[i].create_time,
                  value: this.historicalInfo[i].damage_15s,
                  type: '15s'
                }
                this.data[2 * i + 1] = {
                  date: this.historicalInfo[i].create_time,
                  value: this.historicalInfo[i].damage_20s,
                  type: '20s'
                }
              }
            }
            this.loaded = true
          }
        })
        .catch(response => {
          console.log(response.data)
        })
    },
    centerOption(chart, dataset) {
      var data = this.data
      var dv = dataset.createView().source(data)
      chart.scale('date', {
        type: 'timeCat'
      })
      chart.scale('value', {
        type: 'linear'
      })
      chart.source(dv)
      chart
        .line()
        .position('date*value')
        .color('type')
      chart
        .point()
        .position('date*value')
        .size(4)
        .color('type')
        .style({
          stroke: '#fff',
          lineWidth: 1
        })
        .label('value')
    },
    bufferOption(chart, dataset) {
      let data = this.data
      let dv = dataset.createView().source(data)
      chart.scale('date', {
        type: 'timeCat'
      })
      chart.scale('提升率', {
        type: 'linear'
      })
      chart.source(dv)
      chart
        .intervalStack()
        .position('date*value')
        .color('type')
      chart.line().position('date*提升率')
      chart
        .point()
        .position('date*提升率')
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1
        })
        .label('提升率')
    },
    removeHistoricalInfo(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios({
            method: 'post',
            data: {
              action: 'removeCharacterHistoricalInfo',
              data: {
                user_id: this.$store.state.user_id,
                user_token: this.$store.state.user_token,
                historicalID: id
              }
            }
          })
            .then(response => {
              if (response.data.state === 'success') {
                this.$message({
                  type: 'success',
                  showClose: true,
                  message: '删除成功!'
                })
                this.getdata()
              } else {
                this.$message({
                  type: 'error',
                  showClose: true,
                  message: '删除失败!'
                })
              }
            })
            .catch(response => {
              console.log(response.data)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            showClose: true,
            message: '已取消删除'
          })
        })
    }
  },
  data() {
    return {
      visible: this.dialogVisible,
      loaded: false,
      historicalInfo: [],
      data: []
    }
  }
}
</script>
<style>
</style>
