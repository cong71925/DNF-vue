<template>
  <el-collapse-item>
    <template slot="title">
      <h3>成员名称</h3>
    </template>
    <el-carousel :interval="4000" type="card" height="500px">
      <el-carousel-item>
        <CharacterCard />
      </el-carousel-item>
      <el-carousel-item>
        <CharacterCard />
      </el-carousel-item>
      <el-carousel-item>
        <CharacterCard />
      </el-carousel-item>
      <el-carousel-item>
        <CharacterCard />
      </el-carousel-item>
      <el-carousel-item>
        <CharacterCard />
      </el-carousel-item>
    </el-carousel>
  </el-collapse-item>
</template>
<script>
import CharacterCard from './CharacterCard.vue'
export default {
  components: { CharacterCard },
  methods: {
    
  },
  data() {
    return {
      
    };
  }
};
</script>