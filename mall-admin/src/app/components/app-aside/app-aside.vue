<template>
  <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
    <div class="auto-aside" v-show="!collapsed">
      <!--导航菜单-->
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router>
        <template v-for="(item,index) in asideList" v-if="!item.hidden">
          <template v-if="!item.children.length>0">
            <el-menu-item :index="index+''" :key="item.index" :class="$route.path==item.path?'is-active':''" @click="$router.push(item.path)">
              <i :class="item.iconCls"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </template>
          <template v-else>
            <el-submenu :index="index+''" v-if="!item.leaf" :key="item.index">
              <template slot="title">
                <i :class="item.iconCls"></i>{{item.name}}</template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.index" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="item.path">
              <i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
    <div class="collapsed-aside-div"></div>
    <!--导航菜单-折叠后-->
    <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
      <li v-for="(item,index) in asideList" v-if="!item.hidden" :key="item.index" class="el-submenu item" @click="!item.children.length>0&&$router.push(item.path)">
        <template v-if="!item.leaf">
          <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
            <i :class="item.iconCls"></i>
          </div>
          <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
            <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
          </ul>
        </template>
        <template v-else>
          <li class="el-submenu">
            <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)">
              <i :class="item.iconCls"></i>
            </div>
          </li>
        </template>
      </li>
    </ul>
  </aside>
</template>
<script>
import { apiConfig } from "../../global/api.config";
import { statusValid } from "../../utils/status-valid";
import { asideTree } from '../../global/app-aside.config';
export default {
  data() {
    return {
      asideList: asideTree.roleFun
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.baseStore.userInfo;
    },
    collapsed() {
      return this.$store.state.baseStore.collapsed;
    }
  },
  mounted() {
    let _this = this;
  },
  methods: {
    handleopen() {
      //console.log('handleopen');
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function(a, b) {},
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    }
  }
};
</script>
<style lang="scss">
.menu-expanded{
  .el-submenu__icon-arrow{
      left: 187px !important;
      right: auto;
  }
}
</style>

<style lang="scss" scoped>
.main {
  aside {
    flex: 0 0 217px;
    width: 217px;
    height: 100%;
    .el-menu {
      height: 100%;
    }
    .collapsed {
      width: 60px;
      .item {
        position: relative;
      }
      .submenu {
        position: absolute;
        top: 0px;
        left: 60px;
        z-index: 99999;
        height: auto;
        display: none;
      }
    }
  }
  .menu-collapsed {
    flex: 0 0 60px;
    width: 60px;
    .auto-aside {
      overflow: hidden;
      position: absolute;
      width: 60px;
      left: 0;
      border-right: solid 1px #e6e6e6;
      top: 0;
      height: 100%;
    }
  }
  .menu-expanded {
    // flex:0 0 230px;
    // width: 230px;
    // overflow-y: auto;
    .auto-aside {
      overflow: hidden;
      position: absolute;
      width: 217px;
      left: 0;
      border-right: solid 1px #e6e6e6;
      top: 0;
      height: 100%;
      .el-menu {
        width: 237px;
      }
      .el-menu-vertical-demo {
        overflow-y: auto !important;
      }
    }
  }
}
.el-menu-item.is-active {
  color: #337ab7;
  background: #f5f7fa;
}

</style>

