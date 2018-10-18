<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { apiConfig } from "./global/api.config";
const noAppToken = new RegExp(apiConfig.noAppToken); //'g'
export default {
  name: "app",
  components: {},
  computed: {
    userInfo() {
      return this.$store.state.baseStore.userInfo;
    }
  },
  mounted() {},
  created() {
    let currentRoute = this.$router.currentRoute;
    if (!noAppToken.test(currentRoute.path) && !localStorage.getItem("token")) {
      this.$router.push({ path: "/login" });
    }
    this.$store.commit("setUserInfo",localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {});
  }
};
</script>

<style lang="scss">
@import "./app.scss";
</style>