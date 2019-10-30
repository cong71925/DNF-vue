<template>
  <el-dialog title="历史数据" :visible.sync="visible" width="90%" :destroy-on-close="true">
    <div v-if="show">
      <g2-custom :option="g2Option"></g2-custom>
    </div>
    <div v-else>
      <h3>暂无数据</h3>
    </div>
    <el-row :gutter="20" v-if="job === '奶'">
      <el-col :span="12">
        <el-card class="el-card" :body-style="{ padding: '10px' }">
          <div>
            <el-switch v-model="boost" active-text="唱歌"></el-switch>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="el-card" :body-style="{ padding: '10px' }">
          <div>
            <el-switch v-model="favoritism" active-text="偏爱"></el-switch>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import utils from '@/utils.js'
import adapter from '@/adapter.js'
export default {
  props: ['dialogVisible', 'job', 'id', 'class_1'],
  watch: {
    dialogVisible(val) {
      this.visible = val
      if (val) {
        this.getdata()
      } else {
        this.show = false
      }
    },
    visible(val) {
      this.$emit('update:dialogVisible', val)
    },
    boost() {
      this.update()
    },
    favoritism() {
      this.update()
    }
  },
  methods: {
    update() {
      this.data = []
      this.show = false
      if (this.job === '奶') {
        for (var i = 0; i < this.historicalInfo.length; i++) {
          var buff = {}
          buff.strInt = Number(this.historicalInfo[i].buff_default)
          buff.atk = Number(this.historicalInfo[i].buff_atk)
          buff.burst = Number(this.historicalInfo[i].buff_burst)
          var result = adapter.BufferDataAdapter(
            this.historicalInfo[i],
            this.class_1,
            this.boost,
            this.favoritism
          )
          this.historicalInfo[i].ratio = utils.GetLiftRatio(
            buff,
            this.class_1,
            true,
            this.boost,
            this.favoritism
          )
          this.data[i] = {
            date: this.historicalInfo[i].create_time,
            strInt: Number(result.buff_default),
            atk: Number(result.buff_atk),
            burst: buff.burst,
            ratio: this.historicalInfo[i].ratio
          }
        }
      } else {
        for (var i = 0; i < this.historicalInfo.length; i++) {
          this.data[i] = {
            date: this.historicalInfo[i].create_time,
            damage_15s: this.historicalInfo[i].damage_15s,
            damage_20s: this.historicalInfo[i].damage_20s
          }
        }
      }
      this.$nextTick(() => {
        this.show = true
      })
    },
    getdata() {
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
            this.update()
          }
        })
        .catch(response => {
          console.log(response.data)
        })
    },
    g2Option(chart, dataset) {
      let data = this.data
      let dv = dataset.createView().source(data)
      if (this.job === '奶') {
        chart.scale('date', {
          type: 'timeCat'
        })
        chart.scale('ratio', {
          type: 'linear',
          alias: '提升率(倍)'
        })
        dv.transform({
          type: 'rename',
          map: {
            strInt: '常驻力智',
            atk: '常驻三攻',
            burst: '太阳力智'
          }
        })
        dv.transform({
          type: 'fold',
          fields: ['常驻力智', '常驻三攻', '太阳力智'],
          key: 'key',
          value: 'buff'
        })
        chart.source(dv)
        chart
          .intervalStack()
          .position('date*buff')
          .color('key')
        chart
          .line()
          .position('date*ratio')
          .size(2)
          .label('ratio')
        chart
          .point()
          .position('date*ratio')
          .size(4)
          .shape('circle')
          .style({
            stroke: '#fff',
            lineWidth: 1
          })
      } else {
        dv.transform({
          type: 'rename',
          map: {
            damage_15s: '15s绿纱袋伤害(亿)',
            damage_20s: '20s绿纱袋伤害(亿)'
          }
        })
        dv.transform({
          type: 'fold',
          fields: ['15s绿纱袋伤害(亿)', '20s绿纱袋伤害(亿)'],
          key: 'damageTime',
          value: 'damage'
        })
        chart.scale('date', {
          type: 'timeCat'
        })
        chart.source(dv)
        chart
          .line()
          .position('date*damage')
          .color('damageTime')
        chart
          .point()
          .position('date*damage')
          .size(4)
          .color('damageTime')
          .style({
            stroke: '#fff',
            lineWidth: 1
          })
          .label('damage')
      }
    }
  },
  data() {
    return {
      visible: this.dialogVisible,
      historicalInfo: [],
      data: [],
      favoritism: true,
      boost: true,
      show: false
    }
  }
}
</script>
<style>
</style>
