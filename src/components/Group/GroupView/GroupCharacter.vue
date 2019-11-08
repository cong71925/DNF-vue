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
          :default-sort="{prop: 'damage_20s', order: 'descending'}"
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
          :default-sort="{prop: 'damage_20s', order: 'descending'}"
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
        <el-row :gutter="20">
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2">
            <el-card class="el-card" :body-style="{ padding: '10px' }">
              <el-switch v-model="boost" active-text="唱歌"></el-switch>
            </el-card>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2">
            <el-card class="el-card" :body-style="{ padding: '10px' }">
              <el-switch v-model="favoritism" active-text="偏爱"></el-switch>
            </el-card>
          </el-col>
        </el-row>

        <el-table
          :data="bufferViewData"
          style="width: 100%"
          :default-sort="{prop: 'LiftRatioBurst', order: 'descending'}"
        >
          <el-table-column prop="character_name" label="角色名" sortable></el-table-column>
          <el-table-column
            prop="class_1"
            label="职业"
            :filters="[{text: '神思者', value: '神思者'}, {text: '炽天使', value: '炽天使'}, {text: '冥月女神', value: '冥月女神'}]"
            :filter-method="filterHandler"
          ></el-table-column>
          <el-table-column prop="nickname" label="所属成员" sortable></el-table-column>
          <el-table-column prop="buff_default" label="常驻力智" sortable></el-table-column>
          <el-table-column prop="buff_atk" label="常驻三攻" sortable></el-table-column>
          <el-table-column prop="buff_burst" label="太阳力智" sortable></el-table-column>
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
import adapter from '@/adapter.js'
import utils from '@/utils.js'
export default {
  created() {
    this.getCenterList()
    this.getSupportList()
    this.getBufferList()
  },
  watch: {
    boost() {
      this.bufferViewData = []
      this.$nextTick(() => {
        this.bufferViewData = this.getNewBuff(this.bufferData)
      })
    },
    favoritism(val) {
      this.bufferViewData = []
      this.$nextTick(() => {
        this.bufferViewData = this.getNewBuff(this.bufferData)
      })
    }
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
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
            }
            this.bufferViewData = this.getNewBuff(this.bufferData)
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
    getNewBuff(data) {
      let temp = []
      for (var i = 0; i < data.length; i++) {
        var buff = {}
        buff.strInt = data[i].buff_default
        buff.atk = data[i].buff_atk
        buff.burst = data[i].buff_burst
        temp[i] = adapter.BufferDataAdapter(
          data[i],
          data[i].class_1,
          this.boost,
          this.favoritism
        )
        temp[i].buff_burst = data[i].buff_burst
        temp[i].nickname = data[i].nickname
        temp[i].class_1 = data[i].class_1
        temp[i].character_name = data[i].character_name
        temp[i].LiftRatioBurst = utils.GetLiftRatio(
          buff,
          data[i].class_1,
          true,
          this.boost,
          this.favoritism
        )
        temp[i].LiftRatioDefault = utils.GetLiftRatio(
          buff,
          data[i].class_1,
          false,
          this.boost,
          this.favoritism
        )
      }
      return temp
    }
  },
  data() {
    return {
      centerData: [],
      supportData: [],
      bufferData: [],
      bufferViewData: [],
      boost: true,
      favoritism: true
    }
  }
}
</script>
<style scoped>
.el-card {
  text-align: center;
}
.el-card__body {
  padding: 5px;
}
</style>

