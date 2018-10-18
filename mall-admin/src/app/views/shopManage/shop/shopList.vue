<template>
  <div class="cointer-box">
    <div class="toolbar el-col el-col-24">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="keyWord" @keyup.enter.native="search" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click.native.prevent="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click.native.prevent="add">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="my-table">
      <el-table :data="dataTable" v-loading="listLoading" height="250" style="width: 100%;margin-top:0;">
        <el-table-column type="index" style="width:35px">
        </el-table-column>
        <el-table-column prop="title" align="center" label="标题">
        </el-table-column>
        <el-table-column prop="brand" align="center" label="品牌">
        </el-table-column>
        <el-table-column prop="type" align="center" label="分类">
        </el-table-column>
        <el-table-column prop="read_number" align="center" label="浏览次数">
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" style="height:31px;" :page-size="pageSize" :total="total" layout="total, prev, pager, next">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import * as service from "./service";
import { statusValid } from "../../../utils/status-valid";
import { pageSize } from "../../../global/base.config";

export default {
  data() {
    return {
      listLoading: true,
      total: 0,
      pageSize: pageSize,
      formStatus: false,
      keyWord: "",
      current: 1,
      dataTable: []
    };
  },
  components: {},
  mounted() {
    this.findlist();
  },
  methods: {
    findlist() {
      this.listLoading = true;
      let params = {
        current: this.current,
        pageSize:pageSize,
        search: this.keyWord
      };
      service.getProductList(params).then(res => {
        this.listLoading = false;
        let { data, status } = res;
        if (statusValid(this, status, data)) {
          this.dataTable = data.data;
          this.total = data.totalItems;
        }
      });
    },
    search() {
      this.current = 1;
      this.findlist(this);
    },
    add() {
      this.$router.push({ path: "/shopDetail" });
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.current = val;
      findlist(this);
    },
    handleEdit(index, row) {
      this.$router.push({ path: "/shopDetail" ,query: { scree: `${row.id}` }});
    },
    handleDelete(index, row) {
      var _this = this;
      this.$confirm("确认删除吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          service.deleteProduct(row.id).then(res => {
            let { data, status } = res;
            if (statusValid(_this, status, data)) {
              _this.$message({
                message: "删除成功",
                type: "success"
              });
              _this.findlist();
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
