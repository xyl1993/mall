<template>
  <div class="cointer-box">
    <div class="toolbar el-col-24 clear">
      <el-form :inline="true" class="search-form">
        <div class="el-col-6">
          <el-form-item label="订单编号" label-width="120">
            <el-input v-model="searchModel.order_number" @keyup.enter.native="search" placeholder="订单编号"></el-input>
          </el-form-item>
        </div>
        <div class="el-col-6">
          <el-form-item label="创建日期" label-width="120">
            <el-date-picker value-format="yyyy-MM-dd" 
              v-model="searchModel.start_time" type="date" @change="search" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="el-col-6">
          <el-form-item label="至" label-width="120">
            <el-date-picker value-format="yyyy-MM-dd"
             v-model="searchModel.end_time" type="date" @change="search" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="el-col-6" style="margin-top:0px;">
          <el-form-item>
            <el-button type="primary" size="small" @click.native.prevent="search">查询</el-button>
          </el-form-item>
        </div>
        <div class="d-clear"></div>
      </el-form>
    </div>
    <div class="my-table">
      <el-table :data="dataTable" v-loading="listLoading" height="250" style="width: 100%;margin-top:0;">
        <el-table-column type="index" style="width:35px">
        </el-table-column>
        <el-table-column prop="order_number" align="center" width="250" label="订单编号">
        </el-table-column>
        <el-table-column prop="transaction_id" align="center" label="微信支付编号">
        </el-table-column>
        <el-table-column prop="nikename" align="center" label="用户昵称">
        </el-table-column>
        <el-table-column prop="wx_price" align="center" label="微信返回金额(分)">
        </el-table-column>
        <el-table-column prop="pay_price" align="center" label="系统换算金额">
        </el-table-column>
        <el-table-column prop="create_time" width="160" align="center" label="创建日期">
          <template slot-scope="scope">
            {{scope.row.create_time|dateTimeFilter}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" style="height:31px;" :page-size="pageSize" :total="total" layout="total, prev, pager, next">
      </el-pagination>
    </div>
    <el-dialog title="JSON数据" :visible.sync="formStatus">
      <pre>{{jsonData}}</pre>
    </el-dialog>
  </div>
</template>
<script>
import * as service from "./service";
import { statusValid } from "../../utils/status-valid";
import { pageSize } from "../../global/base.config";

export default {
  data() {
    return {
      listLoading: true,
      total: 0,
      pageSize: pageSize,
      formStatus: false,
      current: 1,
      dataTable: [],
      jsonData:{},
      searchModel: {
        start_time: "",
        end_time: "",
        order_number:''
      },
    };
  },

  mounted() {
    this.findlist();
  },
  filters: {},
  methods: {
    findlist() {
      this.listLoading = true;
      const params = Object.assign({},this.searchModel);
      params.current= this.current;
      params.pageSize= pageSize;
      service.getPayList(params).then(res => {
        let { data, status } = res;
        if (statusValid(this, status, data)) {
          this.dataTable = data.data;
          this.total = data.totalItems;
          this.listLoading = false;
        }
      });
    },
    search() {
      this.current = 1;
      this.findlist(this);
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.current = val;
      this.findlist(this);
    },
    handleEdit(index, row) {
      //微信返回对象
      this.jsonData = JSON.parse(row.pay_result);
      this.formStatus = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0;
}

</style>
