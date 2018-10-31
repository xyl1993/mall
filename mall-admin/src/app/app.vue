<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { apiConfig } from "./global/api.config";
const noAppToken = new RegExp(apiConfig.noAppToken, "g"); //'g'
export default {
  name: "app",
  components: {},
  mounted() {
    let currentRoute = this.$router.currentRoute;
    if (!noAppToken.test(currentRoute.path) && !localStorage.getItem("malltoken")) {
      this.$router.push({ path: "/login" });
    }
  },
  created() {}
};
</script>

<style lang="scss">
@import "./app.scss";
</style>