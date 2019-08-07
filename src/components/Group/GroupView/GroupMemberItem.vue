<template>
  <el-collapse-item>
    <template slot="title">
      <h3>{{ memberInfo.nickname }}</h3>
    </template>
    <el-carousel :interval="4000" type="card" height="350px">
      <div v-for="item in memberInfo.characterList" :key="item.index">
        <el-carousel-item>
          <CharacterCard :characterInfo="item" />
        </el-carousel-item>
      </div>
    </el-carousel>
  </el-collapse-item>
</template>
<script>
import CharacterCard from './CharacterCard.vue'
export default {
  props: ['memberInfo'],
  components: { CharacterCard },
  methods: {},
  data() {
    return {}
  }
}
</script>