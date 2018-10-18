<template>
  <div class="cointer-box">
    <div class="cointer-scroll">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="components-charts">
              <div class="card-title">
                总销售额
              </div>
              <div class="card-total">
                ¥123,333
              </div>
            </div>
            <div class="card-index-content">
              <div class="content-fixed">
                <div class="trend-item">

                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="field-index-field">
                <span><span>日销售额</span></span><span>￥12,423</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="components-charts">
              <div class="card-title">
                访问量
              </div>
              <div class="card-total">
                ¥123,333
              </div>
            </div>
            <div class="card-index-content">
              <div class="content-fixed">
                <div class="trend-item">

                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="field-index-field">
                <span><span>日销售额</span></span><span>￥12,423</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="components-charts">
              <div class="card-title">
                支付笔数
              </div>
              <div class="card-total">
                ¥123,333
              </div>
            </div>
            <div class="card-index-content">
              <div class="content-fixed">
                <div class="trend-item">

                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="field-index-field">
                <span><span>日销售额</span></span><span>￥12,423</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="components-charts">
              <div class="card-title">
                运营活动效果
              </div>
              <div class="card-total">
                ¥123,333
              </div>
            </div>
            <div class="card-index-content">
              <div class="content-fixed">
                <div class="trend-item">

                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="field-index-field">
                <span><span>日销售额</span></span><span>￥12,423</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="seal-table">
        <el-tabs>
          <el-tab-pane label="销售额" name="first">销售额</el-tab-pane>
          <el-tab-pane label="访问量" name="second">访问量</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.grid-content {
  padding: 20px 24px 8px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
}
.card-title {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}
.card-total {
  color: rgba(0, 0, 0, 0.85);
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  margin-top: 4px;
  margin-bottom: 0;
  font-size: 30px;
  line-height: 38px;
  height: 38px;
}
.card-index-content {
  height: 46px;
  margin-bottom: 12px;
  position: relative;
  width: 100%;
}
.content-fixed {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.components-charts {
}
.trend-item {
  display: inline-block;
  font-size: 14px;
  line-height: 22px;
}
.card-footer {
  border-top: 1px solid #e8e8e8;
  padding-top: 9px;
  margin-top: 8px;
  color: rgba(0, 0, 0, 0.85);
  span:last-child {
    margin-left: 8px;
  }
}
.seal-table {
  width: 100%;
  height: 400px;
  margin-top: 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  padding: 0 20px;
}
.cointer-scroll {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  display: block;
  padding-right: 6px;
  margin-right: -20px;
}
</style>
