<template>
  <div id="root">
    <div class="layout-container">
      <div class="layout-content">
        <div class="user-layout-top">
          <div class="user-layout-header">
            <a href="javascript:0">
              <img alt="logo" class="user-layout-logo" src="../../../../assets/images/logo.svg">
              <span class="user-layout-title">Login</span>
            </a>
          </div>
        </div>
        <div class="user-login-main">
          <div class="components-login">
            <el-form :model="formModel" status-icon :rules="rules" ref="form">
              <el-form-item prop="account">
                <el-input prefix-icon="iconfont icon-yonghuming" placeholder="用户名" type="password" v-model="formModel.account" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" @keyup.enter.native="handleSubmit()" placeholder="密码" prefix-icon="iconfont icon-mima" v-model="formModel.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="login-btn" @click.native.prevent="handleSubmit()" :loading="logining">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { statusValid } from "../../../utils/status-valid";
import { client } from "../../../utils/utils";
import Cookies from "js-cookie";
import prompt from "../../../components/prompt/prompt";
import * as service from "./service";

export default {
  name: "Login",
  data() {
    return {
      logining: false,
      roles: [],
      mark: false,
      currentRole: null,
      formModel: {
        account: "",
        password: ""
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.baseStore.userInfo;
    }
  },
  components: {
    prompt: prompt
  },
  mounted() {
    let system = client();
    if (system.browser.chrome === 0) {
      this.$refs["prompt"].promptStatus = true;
    }
    if (Cookies.get("mallAccount")) {
      this.formModel.account = Cookies.get("mallAccount");
    }
    if (Cookies.get("mallPassword")) {
      this.formModel.checkPass = Cookies.get("mallPassword");
    }
  },
  methods: {
    /**@description 登录 */
    handleSubmit(ev) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.logining = true;
          let loginParams = {
            account: this.formModel.account,
            password: this.formModel.password
          };
          service.webLoigin(loginParams).then(res => {
            this.logining = false;
            let { data, status } = res;
            if (statusValid(this, status, data)) {
              localStorage.setItem("token", data.token);
              localStorage.setItem("user", JSON.stringify(data));
              this.$store.commit("setUserInfo",data);
              //将用户名密码存在cookie中
              //7天
              Cookies.set("mallAccount", loginParams.account, { expires: 7 });
              Cookies.set("mallPassword", loginParams.password, { expires: 7 });
              //往vuex中设置用户对象
              this.$store.commit("setUserInfo", data);
              this.$router.push({ path: "/orderList" });
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.icon-yonghuming,
.icon-mima {
  font-size: 20px;
}
</style>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: #f0f2f5;
  background-image: url(../../../../assets/images/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
}
.layout-content {
  padding: 72px 0 24px;
  flex: 1 1;
}
.user-layout-top {
  text-align: center;
}
.user-layout-header {
  height: 44px;
  line-height: 44px;
  margin-bottom: 40px;
}
.user-layout-logo {
  height: 44px;
  vertical-align: top;
  margin-right: 16px;
}
.user-layout-title {
  font-size: 33px;
  color: rgba(0, 0, 0, 0.85);
  font-family: Myriad Pro, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
}
.user-layout-main {
  width: 368px;
  margin: 0 auto;
}
.user-login-main {
  width: 368px;
  margin: 0 auto;
}
.login-btn {
  width: 100%;
}
</style>