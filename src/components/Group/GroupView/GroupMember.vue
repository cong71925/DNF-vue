<template>
  <div>
    <el-collapse accordion>
      <GroupMemberItem />
      <GroupMemberItem />
      <GroupMemberItem />
    </el-collapse>
  </div>
</template>
<style>
</style>
<script>
import GroupMemberItem from './GroupMemberItem.vue'
export default {
  components: { GroupMemberItem },
  data() {
    return {};
  }
};
</script>

