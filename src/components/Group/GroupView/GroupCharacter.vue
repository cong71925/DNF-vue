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
          stripe
          style="width: 100%"
          :default-sort="{prop: 'character_name', order: 'descending'}"
        >
          <el-table-column prop="character_name" label="角色名" sortable></el-table-column>
          <el-table-column prop="class_1" label="职业" width="180" sortable></el-table-column>
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
          stripe
          style="width: 100%"
          :default-sort="{prop: 'character_name', order: 'descending'}"
        >
          <el-table-column prop="character_name" label="角色名" sortable></el-table-column>
          <el-table-column prop="class_1" label="职业" width="180" sortable></el-table-column>
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
          stripe
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
export default {
  computed: {},
  methods: {
    getCharacterInfo() {
      this.axios({
        method: 'post',
        url: '/api/getCharacterInfoJob.php',
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
          this.centerData = response.data.centerList
          this.supportData = response.data.supportList
          this.bufferData = response.data.bufferList
          for (var i = 0; i < this.bufferData.length; i++) {
            this.bufferData[i].LiftRatioDefault = this.getLiftRatioDefault(
              this.bufferData[i].class_1,
              this.bufferData[i].buff_default,
              this.bufferData[i].buff_atk,
              this.bufferData[i].buff_burst
            )
            this.bufferData[i].LiftRatioBurst = this.getLiftRatioBurst(
              this.bufferData[i].class_1,
              this.bufferData[i].buff_default,
              this.bufferData[i].buff_atk,
              this.bufferData[i].buff_burst
            )
          }
        })
        .catch(response => {
          console.log(response.data)
        })
    },
    getLiftRatioDefault(class_1, buff_default, buff_atk, buff_burst) {
      var ratio = 0
      const template_atk = 2400
      const template_default = 3000
      if (class_1 === '炽天使') {
        ratio =
          ((Number(buff_default) * 1.3 +
            Number(buff_burst) +
            500 +
            template_default) *
            (Number(buff_atk) * 1.3 + template_atk)) /
          (template_atk * template_default)
      } else if (class_1 === '神思者') {
        ratio =
          ((Number(buff_default) +
            Number(buff_burst) +
            300 +
            template_default) *
            (Number(buff_atk) + template_atk)) /
          (template_atk * template_default)
      } else if (class_1 === '冥月女神') {
        ratio =
          ((Number(buff_default) * 1.25 * 1.15 +
            Number(buff_burst) +
            500 +
            template_default) *
            (Number(buff_atk) * 1.25 * 1.15 + template_atk)) /
          (template_atk * template_default)
      }
      return ratio.toFixed(2)
    },
    getLiftRatioBurst(class_1, buff_default, buff_atk, buff_burst) {
      var ratio = 0
      const template_atk = 2400
      const template_default = 3000
      const system_buff = 8000
      if (class_1 === '炽天使') {
        ratio =
          ((Number(buff_default) * 1.3 +
            Number(buff_burst) +
            500 +
            system_buff +
            template_default) *
            (Number(buff_atk) * 1.3 + template_atk)) /
          (template_atk * (template_default + system_buff))
      } else if (class_1 === '神思者') {
        ratio =
          ((Number(buff_default) +
            Number(buff_burst) +
            300 +
            system_buff +
            template_default) *
            (Number(buff_atk) + template_atk)) /
          (template_atk * (template_default + system_buff))
      } else if (class_1 === '冥月女神') {
        ratio =
          ((Number(buff_default) * 1.25 * 1.15 +
            Number(buff_burst) +
            500 +
            system_buff +
            template_default) *
            (Number(buff_atk) * 1.25 * 1.15 + template_atk)) /
          (template_atk * (template_default + system_buff))
      }
      return ratio.toFixed(2)
    }
  },
  data() {
    this.getCharacterInfo()
    return {
      centerData: [],
      supportData: [],
      bufferData: []
    }
  }
}
</script>

