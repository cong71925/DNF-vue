<template>
  <div>
    <h3>团队信息</h3>
    <el-divider></el-divider>
    <p>团队名称：</p>
    <p>id：</p>
    <p>创建日期</p>
    <p>人数</p>
    <h3>成员信息</h3>
    <el-divider></el-divider>
    <el-table :data="memberData" stripe style="width: 100%">
      <el-table-column prop="nickname" label="名称" width="180"></el-table-column>
      <el-table-column prop="group" label="冒险团" width="180"></el-table-column>
      <el-table-column prop="CharacterNum" label="角色数"></el-table-column>
    </el-table>
    <h3>Character</h3>
    <el-divider></el-divider>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="character_name" label="角色名" width="180"></el-table-column>
      <el-table-column prop="class_sub" label="职业" width="180"></el-table-column>
      <el-table-column prop="name" label="所属成员" width="180"></el-table-column>
      <el-table-column prop="name" label="冒险团"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    var memberData = [
      {
        nickname: "测试",
        group: "毛线团",
        CharacterNum: 7
      },
      {
        nickname: "测试",
        group: "毛线团",
        CharacterNum: 6
      }
    ];
    return {
      memberData,
      tableData: [
        {
          character_name: "古灵井盖",
          name: "测试",
          class_sub: "古灵井盖"
        }
      ]
    };
  }
};
</script>

