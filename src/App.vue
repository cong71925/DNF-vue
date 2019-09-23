<template>
  <div>
    <el-container>
      <el-header>
        <navbar :key="$store.state.login" />
      </el-header>
      <el-main
        id="app"
        v-loading="$store.state.loading"
      >
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Navbar from './components/Navbar'
export default {
  components: { Navbar },
  methods: {},
  name: 'App',
  data() {
    this.getState()
    return {}
  }
}
</script>
<style>
.el-container {
  min-height: 86vh;
}
#app {
  background-color: rgba(255, 255, 255, 0.3);
}
.el-main {
  background-color: rgba(255, 255, 255, 0.8);
}
.el-footer {
  background-color: rgba(255, 255, 255, 0.8);
}
.el-aside {
  background-color: rgba(255, 255, 255, 0.8);
}
.el-menu {
  background-color: rgba(255, 255, 255, 0);
}
.el-divider__text {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
}
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
.el-pager li {
  background: rgba(255, 255, 255, 0);
}
.el-pagination button:disabled {
  background-color: rgba(255, 255, 255, 0);
}
.el-carousel__item,
.el-carousel__mask {
  min-width: 180px;
}
.el-card {
  background-color: rgba(255, 255, 255, 0.7);
}
.el-collapse {
  border-top: 1px solid #90939959;
}
.el-collapse-item__wrap {
  background-color: rgba(255, 255, 255, 0);
  border-bottom: 1px solid #90939959;
}
.el-collapse-item__header {
  background-color: rgba(255, 255, 255, 0);
  border-bottom: 1px solid #90939959;
}
.el-table,
.el-table__expanded-cell {
  background-color: rgba(255, 255, 255, 0);
}
.el-table th,
.el-table tr {
  background-color: rgba(255, 255, 255, 0);
}
body {
  margin: 0px;
}
.el-header {
  padding: 0px;
}
body::before {
  background-size: cover;
  content: '';
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  -webkit-filter: blur(2px);
  filter: blur(2px);
  background: url(/static/image/index.jpg) no-repeat;
}
</style>
