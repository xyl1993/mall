<template>
  <div class="cointer-box">
    <div class="toolbar el-col el-col-24">
      <el-form :inline="true" class="demo-form-inline basetable-search-form">
        <div class="el-col-6">
          <el-form-item label="支付状态" class="el-col-6">
            <el-select v-model="searchModel.pay_status" clearable=""  @change="search" placeholder="支付状态">
              <el-option
                v-for="item in payStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="el-col-6">
          <el-form-item label="收货状态" class="el-col-6">
            <el-select v-model="searchModel.collect_status" clearable=""  @change="search" placeholder="收货状态">
              <el-option
                v-for="item in collectStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="el-col-6">
          <el-form-item label="创建日期">
            <el-date-picker value-format="yyyy-MM-dd" v-model="searchModel.start_time" type="date" @change="search" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="el-col-6">
          <el-form-item label="至">
            <el-date-picker value-format="yyyy-MM-dd" v-model="searchModel.end_time" type="date" @change="search" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="el-col-6" style="margin-top:10px;">
          <el-form-item label="订单编号">
            <el-input v-model="searchModel.order_number" @keyup.enter.native="search" placeholder="订单编号"></el-input>
          </el-form-item>
        </div>
        <div class="el-col-6" style="margin-top:10px;">
          <el-form-item>
            <el-button type="primary" size="small" @click.native.prevent="search">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="my-table">
      <el-table :data="dataTable" v-loading="listLoading" height="250" style="width: 100%;margin-top:0;">
        <el-table-column type="index" style="width:35px">
        </el-table-column>
        <el-table-column prop="order_number" align="center" width="250" label="订单编号">
        </el-table-column>
        <el-table-column prop="nikename" align="center" label="顾客昵称">
        </el-table-column>
        <el-table-column prop="should_price" align="center" label="应收款">
        </el-table-column>
        <el-table-column prop="pay_price" align="center" label="实收款">
        </el-table-column>
        <el-table-column prop="pay_status" align="center" label="支付状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.pay_status|tagFilter" disable-transitions>{{scope.row.pay_status|payStatusFilter}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="collect_status" align="center" label="收货状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.collect_status|tagFilter" disable-transitions>{{scope.row.collect_status|collectStatusFilter}}</el-tag>
          </template>
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
      searchModel: {
        start_time: "",
        end_time: "",
        collect_status: "",
        pay_status:'',
        order_number:''
      },
      payStatus:[
        {
          label:'待支付',
          value:1,
        },{
          label:'已支付',
          value:2,
        },{
          label:'已退款',
          value:3,
        }
      ],
      collectStatus:[
        {
          label:'待发货',
          value:1,
        },{
          label:'待收货',
          value:2,
        },{
          label:'已收货',
          value:3,
        }
      ]
    };
  },

  mounted() {
    this.findlist();
  },
  filters: {
    tagFilter: function(value) {
      return (
        {
          1: "",
          2: "success",
          3: "danger"
        }[value] || ""
      );
    },
    payStatusFilter: function(value) {
      return (
        {
          1: "待支付",
          2: "已支付",
          3: "已退款"
        }[value] || ""
      );
    },
    collectStatusFilter: function(value) {
      return (
        {
          1: "待发货",
          2: "待收货",
          3: "已收货"
        }[value] || "未发货"
      );
    }
  },
  methods: {
    findlist() {
      this.listLoading = true;
      let params = {
        current: this.current,
        pageSize: pageSize
      };
      params = {...params,...this.searchModel};
      console.log(params);
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
    handleEdit(index, row) {
      this.$router.push({
        path: "/orderDetail",
        query: { scree: `${row.order_number}` }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
