<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-if="$route.path.indexOf('cointer')==-1" v-for="item in $route.matched" :key="item.path">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  mounted() {}
};
</script>
<style>
.el-breadcrumb__separator {
  margin: 0 6px 0 3px;
  font-weight: 400;
}
</style>

<style lang="scss" scoped>
.breadcrumb-container {
  .title {
    width: 200px;
    float: left;
    color: #475669;
  }
  .breadcrumb-inner {
    float: right;
  }
}
</style>

