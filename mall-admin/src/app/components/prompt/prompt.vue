<template>
  <div class="chrometips chromeTip" v-if="promptStatus">
    <a href="javascript:void(0);" class="btntips-close" id="chromeTipCloseBtn" @click="close()">×</a>
    <div class="inner-chrometips">
      <img class="warning" src="../../../assets/images/warning.png" />
      <p class="chrm-word">
        <span style="padding-right:11px;">推荐Chrome浏览器获得更好的用户体验</span>
        <img class="logo" src="../../../assets/images/google.jpg" />
        <a href="http://rj.baidu.com/soft/detail/14744.html?ald" target="_blank">chrome</a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      promptStatus:false
    }
  },
  mounted() {},
  methods:{
    close(){
      this.promptStatus = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.chrometips {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff8d4;
}

a:link,
a:visited {
  text-decoration: none;
}

.btntips-close {
  font-size: 30px;
  line-height: 30px;
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  color: #837955;
}

a {
  cursor: pointer;
  border: 0 none;
}

.inner-chrometips {
  font-size: 14px;
  width: 910px;
  margin: 0 auto;
  padding: 20px 0;
  color: #837955;
  .warning{
    width: 30px;
    position: absolute;
    top: 15px;
  }
}

.chrm-word {
  display: flex;
  display: -webkit-flex; /* Safari */
  flex-direction: row;
  align-items: center;
  padding-left: 43px;
  .logo{
    width: 20px;
  }
  a{
    color: #837955;
    padding-left: 3px;
  }
}
</style>
