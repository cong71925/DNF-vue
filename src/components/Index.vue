<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-divider content-position="left">登记须知</el-divider>
    <p>登记奶妈奶萝角色时，登记常驻buff数值即可，不需要加唱歌</p>
    <p>登记奶爸的buff则要叠满二觉</p>
    <el-divider content-position="left">提升率计算模板</el-divider>
    <p>人物模板为3000力智，2400三攻</p>
    <p>系统奶为8000力智</p>
    <el-divider content-position="left">三奶提升率计算说明</el-divider>
    <p>奶妈的提升率会计算常驻buff的圣歌30%加成（即默认穿着七宗罪，泰波尔斯防具）</p>
    <p>奶萝的提升率会计算常驻buff的圣歌25%和偏爱15%加成（即默认穿着七宗罪，泰波尔斯防具）</p>
    <p>奶爸由于各装备差距过大，难以量化，故要登记叠满二觉的buff和太阳</p>
    <el-divider content-position="left">系统说明</el-divider>
    <p>目前本网站的团本次数并不会随着刷新日期到来而随之刷新，预计下版本会加入这一功能（咕咕咕）</p>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      msg: 'Welcome to My Vue.js App'
    }
  }
}
</script>
<style>
</style>
