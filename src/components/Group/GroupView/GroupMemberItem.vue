<template>
  <el-collapse-item>
    <template slot="title">
      <h3>{{ memberInfo.nickname }}</h3>
      <el-badge type="info" :value="memberInfo.characterList.length" />
    </template>
    <el-carousel :interval="4000" type="card" height="350px" v-if="memberInfo.characterList!=null">
      <div v-for="item in memberInfo.characterList" :key="item.index">
        <el-carousel-item>
          <CharacterCard :characterInfo="item" @getHistoricalData="getHistoricalData" />
        </el-carousel-item>
      </div>
    </el-carousel>
    <div style="text-align: center;color:#C0C0C0;" v-else>暂无数据</div>
  </el-collapse-item>
</template>
<script>
import CharacterCard from './CharacterCard.vue'
export default {
  props: ['memberInfo'],
  components: { CharacterCard },
  methods: {
    getHistoricalData(id, job, class1) {
      this.$emit('getHistoricalData', id, job, class1)
    }
  },
  data() {
    return {}
  }
}
</script>