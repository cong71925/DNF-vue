<template>
  <div id="panel_info">
    <div id="face">
      <P>
        <el-avatar :size="100" :src="url" :fit="'cover'"></el-avatar>
      </P>
    </div>
    <el-divider></el-divider>
    <div>
      <p>用户名</p>
      <p>昵称</p>
      <p>ID</p>
    </div>
    <el-divider></el-divider>
    <div>
      <p>冒险团名称</p>
      <p>所属服务器</p>
    </div>
    <el-divider></el-divider>
    <div>
      <p>注册时间</p>
      <p>上次登录时间</p>
    </div>
  </div>
</template>
<script>
export default {
  methods: {},
  data () {
    var url = '../../../static/image/face/dja6.png'
    return {
      url
    }
  }
}
</script>
<style>
#panel_info {
  margin-left: 50px;
}
#face{
  margin: auto;
  text-align: center;
}
</style>
