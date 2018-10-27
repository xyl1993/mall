<template>
  <div class="cointer-box">
    <div class="toolbar el-col el-col-24">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="orderNumber" @keyup.enter.native="search" placeholder="订单编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="payStatus" placeholder="支付状态"></el-input>
        </el-form-item>
         <el-form-item>
          <el-input v-model="collectStatus" placeholder="收货状态"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click.native.prevent="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="my-table">
      <el-table :data="dataTable" v-loading="listLoading" height="250" style="width: 100%;margin-top:0;">
        <el-table-column type="index" style="width:35px">
        </el-table-column>
        <el-table-column prop="order_number" align="center" width="300" label="订单编号">
        </el-table-column>
        <el-table-column prop="nikename" align="center" label="顾客昵称">
        </el-table-column>
        <el-table-column prop="should_price" align="center" label="应收款">
        </el-table-column>
        <el-table-column prop="pay_price" align="center" label="实收款">
        </el-table-column>
        <el-table-column prop="pay_status" align="center" label="支付状态">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.pay_status|tagFilter"
              disable-transitions>{{scope.row.pay_status|payStatusFilter}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="collect_status" align="center" label="收货状态">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.collect_status|tagFilter"
              disable-transitions>{{scope.row.collect_status|collectStatusFilter}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
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
import { statusValid } from "../../utils/status-valid";
import { pageSize } from "../../global/base.config";

export default {
  data() {
    return {
      listLoading: true,
      total: 0,
      pageSize: pageSize,
      formStatus: false,
      payStatus: "",
      orderNumber:"",
      collectStatus:"",
      current: 1,
      dataTable: []
    };
  },
 
  mounted() {
    this.findlist();
  },
  filters: {
    tagFilter: function(value) {
      console.log(value);
      return {
        1:'',
        2:'success',
        3:'danger',
      }[value]||''
    },
    payStatusFilter: function(value) {
      return {
        1:'待支付',
        2:'已支付',
        3:'已退款',
      }[value]||''
    },
    collectStatusFilter: function(value) {
      return {
        1:'待发货',
        2:'待收货',
        3:'已收货',
      }[value]||'未发货'
    },
  },
  methods: {
    findlist() {
      this.listLoading = true;
      let params = {
        current: this.current,
        pageSize:pageSize,
        search: this.keyWord
      };
      service.getOrderList(params).then(res => {
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
      findlist(this);
    },
    handleEdit(index,row){
      this.$router.push({ path: "/orderDetail" ,query: { scree: `${row.order_number}` }});
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
