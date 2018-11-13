<template>
  <div>
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
      </el-col>
      <el-col :span="8">
        <div class="tools" @click.prevent="collapse">
          <i class="iconfont icon-caidan"></i>
        </div>
      </el-col>
      <el-col :span="6" class="userinfo">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <!-- <img src="../../../assets/images/user.png" /> -->
            <img src="../../../assets/images/an6.png" />&nbsp;欢迎您:{{sysUserName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息</el-dropdown-item>
            <el-dropdown-item divided @click.native="showSetting">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-dialog title="修改密码" :closeOnClickModal="false" :visible.sync="formStatus" v-on:close="formClose">
      <el-form :model="formModel" :rules="rules" ref="passForm">
        <el-form-item label="新密码" label-width="120px" prop="newPassword">
          <el-input style="width:480px;max-width:100%;" type="password" v-model="formModel.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="120px" prop="surePassword">
          <el-input style="width:480px;max-width:100%;" type="password" v-model="formModel.surePassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button type="primary" @click="handleSure()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { updatePassword, logOut } from "../../views/system/system.service";
import { statusValid } from "../../utils/status-valid";

export default {
  name: "AppHeader",
  computed: {
    collapsed() {
      return this.$store.state.baseStore.collapsed;
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.formModel.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      sysName: "ELEMENT",
      formModel: {
        password: "",
        newPassword: "",
        surePassword: ""
      },
      sysUserName: "",
      userRole: "",
      formStatus: false,
      sysUserAvatar: "",
      rules: {
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" }
        ],
        surePassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {},
    
    logout: function() {
      var _this = this;
      localStorage.removeItem("malluser");
      localStorage.removeItem("mallfilePath");
      localStorage.removeItem("malltoken");
      _this.$router.push("/login");
    },
    //折叠导航栏
    collapse: function() {
      this.$store.commit("changeCollapsed");
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    showSetting() {
      this.formStatus = true;
    },
    formClose() {
      this.formModel = {
        password: "",
        newPassword: "",
        surePassword: ""
      };
      this.$refs["passForm"].clearValidate();
    },
    handleCancel() {
      this.formStatus = false;
    },
    handleSure() {
      let _this = this;
      this.$refs["passForm"].validate(valid => {
        if (valid) {
          let pdata = {
            password: this.formModel.newPassword
          };
          updatePassword(pdata).then(res => {
            let { data, status } = res;
            if (statusValid(_this, status, data)) {
              _this.formStatus = false;
              _this.$message({
                message: "保存成功",
                type: "success"
              });
            }
          });
        }
      });
    }
  },
  mounted() {
    let user = localStorage.getItem("malluser");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.nike_name || "";
    }
  }
};
</script>
<style scoped lang="scss">
@import "./app-header.scss";
</style>