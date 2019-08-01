<template>
  <div id="panel_info">
    <div id="face">
      <P>
        <el-avatar :size="100" :src="url" :fit="'cover'"></el-avatar>
      </P>
      <P>
        <el-button type="primary" round>更改头像</el-button>
      </P>
    </div>
    <el-divider></el-divider>
    <div>
      <p>
        <el-row>
          <el-col :span="6">用户名</el-col>
          <el-col :span="18">
            <el-input v-model="input"></el-input>
          </el-col>
        </el-row>
      </p>
      <p>
        <el-row>
          <el-col :span="6">昵称</el-col>
          <el-col :span="18">
            <el-input v-model="input"></el-input>
          </el-col>
        </el-row>
      </p>
    </div>
    <el-divider></el-divider>
    <div>
      <p>
        <el-row>
          <el-col :span="6">冒险团名称</el-col>
          <el-col :span="18">
            <el-input v-model="server_select"></el-input>
          </el-col>
        </el-row>
      </p>
      <p>
        <el-row>
          <el-col :span="6">所属服务器</el-col>
          <el-col :span="18">
            <span class="demonstration"></span>
            <el-cascader
              v-model="server_select"
              :options="server"
              :props="{ expandTrigger: 'hover' }"
            ></el-cascader>
          </el-col>
        </el-row>
      </p>
    </div>
    <el-divider></el-divider>
    <el-button type="primary" id="submit_infoModify">提交</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    imgSetNull() {
      this.url = null;
    },
    getServer () {
      this.axios
      .get("static/data/server.json")
      .then(response => {
        this.server = response.data.options
      })
      .catch(response => {
        console.log(response)
      });
    }
  },
  data() {
    var url = "../../../static/image/face/dja6.png";
    var server
    var input
    var server_select
    this.getServer()
    return {
      url,server,input,server_select
    };
  }
};
</script>
<style>
#panel_info {
  margin-left: 50px;
}
#submit_infoModify {
  float: right;
}
#face {
  margin: auto;
  text-align: center;
}
</style>
