<template>
  <div id="app">
    <el-container>
      <el-header>
        <navbar :key="$store.state.login" />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Navbar from './components/Navbar'
export default {
  components: { Navbar },
  name: 'App'
}
</script>
<style>
</style>
