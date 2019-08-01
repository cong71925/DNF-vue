<template>
  <div>
    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title">
          纯C
        </template>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          :default-sort="{prop: 'character_name', order: 'descending'}"
        >
          <el-table-column prop="character_name" label="角色名" width="180" sortable></el-table-column>
          <el-table-column prop="class_sub" label="职业" width="180" sortable></el-table-column>
          <el-table-column prop="name" label="所属成员" width="180" sortable></el-table-column>
          <el-table-column prop="name" label="15S" width="180" sortable></el-table-column>
          <el-table-column prop="name" label="20S" sortable></el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="辅C">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          :default-sort="{prop: 'character_name', order: 'descending'}"
        >
          <el-table-column prop="character_name" label="角色名" width="180" sortable></el-table-column>
          <el-table-column prop="class_sub" label="职业" width="180" sortable></el-table-column>
          <el-table-column prop="name" label="所属成员" width="180" sortable></el-table-column>
          <el-table-column prop="name" label="15S" width="180" sortable></el-table-column>
          <el-table-column prop="name" label="20S" sortable></el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="奶">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="character_name" label="角色名" width="180"></el-table-column>
          <el-table-column prop="class_sub" label="职业" width="180"></el-table-column>
          <el-table-column prop="name" label="所属成员" width="180"></el-table-column>
          <el-table-column prop="name" label="常驻力智" width="180"></el-table-column>
          <el-table-column prop="name" label="常驻三攻" width="180"></el-table-column>
          <el-table-column prop="name" label="爆发力智"></el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<style>
</style>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          character_name: "古灵井盖1",
          name: "120",
          class_sub: "古灵井盖"
        },
        {
          character_name: "古灵井盖2",
          name: "400",
          class_sub: "古灵井盖"
        },
        {
          character_name: "古灵井盖3",
          name: "300",
          class_sub: "古灵井盖"
        }
      ]
    };
  }
};
</script>

