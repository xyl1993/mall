<template>
  <el-row class="container">
    <!-- head start -->
    <app-header></app-header>
    <!-- head end -->
    <el-col :span="24" class="main">
      <!-- aside start -->
      <app-aside></app-aside>
      <!-- aside end -->
      <section class="content-container el-row">
        <!-- sidebar start -->
        <app-sidebar></app-sidebar>
        <!-- sidebar end -->
        <div class="content-wrapper">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </section>
    </el-col>
  </el-row>
</template>
<script>
import AppHeader from "../../components/app-header/app-header";
import AppAside from "../../components/app-aside/app-aside";
import AppSidebar from "../../components/app-sidebar/app-sidebar";

export default {
  name: "FullLayout",
  components: {
    "app-header": AppHeader,
    "app-aside": AppAside,
    "app-sidebar": AppSidebar
  },
  data() {
    return {
    };
  },
  computed: {},
  created() {
    
  }
};
</script>
<style lang="scss" scoped>
@import "./full-layout.scss";
</style>


