<template>
  <div id="app">
    <el-container>
      <el-header>
        <navbar :key="$store.state.login" />
      </el-header>
      <el-main>
        <transition name="el-zoom-in-top">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Navbar from './components/Navbar'
export default {
  components: { Navbar },
  methods: {
  },
  name: 'App',
  data () {
    this.getState();
    return {}
  }
}
</script>
<style>
</style>
