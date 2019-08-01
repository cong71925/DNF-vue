<template>
  <div id="panel">
    <el-container>
      <el-main width="100px">
        <el-tabs v-model="activeName" :tab-position="'left'" :lazy="true">
          <el-tab-pane label="个人信息" name="1">
            <InfoShow />
          </el-tab-pane>
          <el-tab-pane label="修改信息" name="2">
            <InfoModify />
          </el-tab-pane>
          <el-tab-pane label="更改密码" name="3">
            <PasswordModify />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import InfoShow from './InfoShow.vue'
import InfoModify from './InfoModify.vue'
import PasswordModify from './PasswordModify.vue'
export default {
  components: { InfoShow, InfoModify, PasswordModify },
  methods: {},
  data () {
    var url = '../../../static/image/face/dja6.png'
    return {
      url,
      activeName: '1'
    }
  }
}
</script>
<style>

</style>
