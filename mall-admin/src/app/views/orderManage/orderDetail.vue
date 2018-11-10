<template>
  <div class="cointer">
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="always">
          <div class="heade-cointer">
            <div class="header-index-logo">
              <img src="../../../assets/images/nxkuOJlFJuAUhzlMTCEe.png" class="tag-img" alt="">
            </div>
            <div class="header-detail">
              <h1 class="number-header">单号: {{orderInfo.order_number}}</h1>
              <div class="header-index-row">
                <div class="header-index-content">
                  <div class="profile-headerList">
                    <el-row :gutter="12">
                      <el-col :span="12">
                        <div class="list-index-term">创建人</div>
                        <div class="list-index-detail">{{orderInfo.nikename}}</div>
                      </el-col>
                      <el-col :span="12">
                        <div class="list-index-term">创建时间</div>
                        <div class="list-index-detail">{{orderInfo.create_time | dateTimeFilter}}</div>
                      </el-col>
                      <el-col :span="12">
                        <div class="list-index-term">付款金额</div>
                        <div class="list-index-detail">{{orderInfo.should_price}}</div>
                      </el-col>
                      <el-col :span="12">
                        <div class="list-index-term">付款状态</div>
                        <div class="list-index-detail">{{orderInfo.pay_status | payStatusFilter}}</div>
                      </el-col>
                      <el-col :span="12">
                        <div class="list-index-term">发货状态</div>
                        <div class="list-index-detail">{{orderInfo.collect_status | collectStatusFilter}}</div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="header-index-extraContent"></div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" style="margin-top:20px;">
      <el-col :span="24">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>收货信息</span>
          </div>
          <div class="heade-cointer">
            <div class="header-detail">
              <div class="header-index-row">
                <div class="header-index-content">
                  <div class="profile-headerList">
                    <el-row :gutter="12">
                      <el-col :span="12">
                        <div class="list-index-term">收货姓名</div>
                        <div class="list-index-detail">{{orderInfo.collect_name}}</div>
                      </el-col>
                      <el-col :span="12">
                        <div class="list-index-term">联系方式</div>
                        <div class="list-index-detail">{{orderInfo.phone}}</div>
                      </el-col>
                      <el-col :span="12">
                        <div class="list-index-term">联系地址</div>
                        <div class="list-index-detail">{{orderInfo.address}}</div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="header-index-extraContent"></div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" style="margin-top:20px;">
      <el-col :span="24">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>商品信息</span>
          </div>
          <div class="heade-cointer">
            <div class="header-detail">
              <el-table :data="orderInfo.productInfo" style="width: 100%">
                <el-table-column prop="title" label="标题" width="300">
                </el-table-column>
                <el-table-column prop="brand_name" label="品牌" width="180">
                </el-table-column>
                <el-table-column prop="type_name" label="分类" width="180">
                </el-table-column>
                <el-table-column prop="specifications_name" label="规格" width="180">
                </el-table-column>
                <el-table-column prop="number" label="数量" width="180">
                </el-table-column>
                <el-table-column prop="price" label="单价">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as service from "./service";
import { statusValid } from "../../utils/status-valid";
import { pageSize } from "../../global/base.config";

export default {
  data() {
    return {
      tableData: [],
      orderNumber: "",
      orderInfo: {
        productInfo: []
      }
    };
  },
  components: {},
  mounted() {
    this.orderNumber = this.$route.query.scree;
    this.getOrderDetail();
  },
  filters: {
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
    getOrderDetail() {
      service.getOrderDetail(this.orderNumber).then(res => {
        let { data, status } = res;
        if (statusValid(this, status, data)) {
          this.orderInfo = data;
        }
      });
    },
    handleEdit(index,row){
      this.$router.push({ path: "/shopDetail" ,query: { scree: `${row.product_id}` }});
    }
  }
};
</script>
<style lang="scss" scoped>
.cointer {
  padding-top: 20px;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.heade-cointer {
  position: relative;
  display: flex;
  .header-index-logo {
    margin-bottom: 16px;
    flex: 0 1 auto;
    margin-right: 16px;
    padding-top: 1px;
  }
  .tag-img {
    width: 28px;
    height: 28px;
    border-radius: 4px;
    display: block;
  }
}
.number-header {
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
.header-detail {
  width: 100%;
}
.header-index-row {
  display: flex;
  width: 100%;
  .header-index-content {
    flex: auto;
  }
  .header-index-extraContent {
    min-width: 242px;
  }
  .profile-headerList {
    margin-bottom: 4px;
  }
  .list-index-term {
    line-height: 20px;
    padding-bottom: 16px;
    margin-right: 8px;
    color: rgba(0, 0, 0, 0.85);
    white-space: nowrap;
    display: table-cell;
    padding-bottom: 8px;
    &:after {
      content: ":";
      margin: 0 8px 0 2px;
      position: relative;
      top: -0.5px;
    }
  }
  .list-index-detail {
    line-height: 20px;
    width: 100%;
    padding-bottom: 16px;
    color: rgba(0, 0, 0, 0.65);
    display: table-cell;
    padding-bottom: 8px;
  }
}
</style>
