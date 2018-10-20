<template>
  <canvas id="canvas" width="300" height="300"></canvas>

</template>
<script>
import { fabric } from "fabric";
export default {
  name: "Login",
  data() {
    return {};
  },
  computed: {},
  components: {},
  mounted() {
    var canvas = new fabric.Canvas("canvas");

    var rect = new fabric.Rect({
      top: 100,
      left: 100,
      width: 60,
      height: 70,
      fill: "red"
    });

    canvas.add(rect);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>