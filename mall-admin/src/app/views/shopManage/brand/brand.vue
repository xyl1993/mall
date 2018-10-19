<template>
  <div class="brand-cointer">
    <div class="cointer-box">
      <div class="brand-content">
        <div class="header">
          <div>品牌</div>
          <el-button @click.native.prevent="addBrand()" type="text" size="small">
            新增
          </el-button>
        </div>
        <div class="brand-table">
          <el-table :data="brandList" style="width: 100%" height="250" highlight-current-row @current-change="brandChange">
            <el-table-column prop="name" align="center" label="名称" width="150">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click.native.prevent="editBrand(scope.$index,scope.row)" type="text" size="small">
                  编辑
                </el-button>
                <el-button class="danger" @click.native.prevent="deleteBrand(scope.$index,scope.row, brandList)"  type="text" size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="type-content">
        <div class="header">
          <div>类型</div>
          <el-button @click.native.prevent="addType()" type="text" size="small">
            新增
          </el-button>
        </div>
        <div class="brand-table">
          <el-table :data="typeList" ref="brandTable"  style="width: 100%" height="250" highlight-current-row @current-change="typeChange">
            <el-table-column prop="name" label="名称" width="150" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click.native.prevent="editType(scope.$index,scope.row)" type="text" size="small">
                  编辑
                </el-button>
                <el-button class="danger" @click.native.prevent="deleteType(scope.$index,scope.row, typeList)" type="text" size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="goods-content">
        <div class="header">
          <div>商品</div>
          <el-button @click.native.prevent="editProduct()" type="text" size="small">
            新增
          </el-button>
        </div>
        <div class="goods-content">
          <ul class="goods-ul clear">
            <li v-for="(o, index) in productList" :key="index">
              <div class="card">
                <el-card :body-style="{ padding: '0px' }">
                  <div class="img-base" :style="{'background-image':`url(${filePath+o.cover})`}">
                    <i v-if="o.recommend === 1" class="el-icon-star-on"></i>
                  </div>
                  <div class="card-bottom">
                    <span>{{o.title}}</span>
                    <div class="bottom clear">
                      <time class="time">{{o.create_time|dateFilter}}</time>
                      <el-button type="text" @click.native.prevent="editProduct(o.id)" class="button">修改</el-button>
                    </div>
                  </div>
                </el-card>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog title="品牌编辑" width="60%" :visible.sync="brandStatus" v-on:close="formClose">
      <el-form :model="brandModel" class="dialog-form" ref="brandForm" :rules="brandRules">
        <el-form-item label="名称" label-width="120px" prop="name">
          <el-input style="width:70%;max-width:400px;" v-model="brandModel.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBrand()">取 消</el-button>
        <el-button type="primary" @click="sureBrand()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="类型编辑" width="60%" :visible.sync="typeStatus" v-on:close="formClose">
      <el-form :model="typeModel" :rules="typeRules" class="dialog-form" ref="typeForm" >
        <el-form-item label="品牌" label-width="120px" prop="name">
          <el-select v-model="typeModel.brand_id" filterable style="width:70%;max-width:400px;" placeholder="请选择">
            <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" label-width="120px" prop="name">
          <el-input style="width:70%;max-width:400px;" v-model="typeModel.name"></el-input>
        </el-form-item>
        <div class="formModel el-form-item clear" style="position:relative;padding-left:120px;">
            <label class="el-form-item__label" style="width: 120px;position: absolute;left: 0;">缩略图</label>
            <div class="">
              <el-upload 
                :headers="headers" 
                list-type="picture-card" 
                :limit="1" 
                accept="image/*"
                :action="sealImgAction" 
                :on-exceed="onExceed" 
                :file-list="fileList" 
                :on-preview="handlePictureCardPreview" 
                :on-remove="onSignImgRemove" 
                :on-success="signUploadSuccess">
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelType()">取 消</el-button>
        <el-button type="primary" @click="sureType()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import * as service from "./brand.service";
import { getProductList } from "../shop/service";
import { statusValid } from "../../../utils/status-valid";
import { apiConfig } from "../../../global/api.config";
import { pageSize } from "../../../global/base.config";
const moment = require("moment");
var loading;
export default {
  data() {
    return {
      filePath:'',
      brandList: [],
      typeList: [],
      shopList: [],
      fileList: [],
      imgArray:[],
      productList:[],
      brandStatus: false,
      typeStatus: false,
      brandModel: {
      },
      typeModel: {
        brand_id: ''
      },
      selBrandId: "",
      selTypeId: "",
      headers:{},
      dialogVisible:false,
      dialogImageUrl:'',
      sealImgAction: `${apiConfig.base_api_host}admin/uploadDisk`,
      brandRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      typeRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        brand_id: [{ required: true, message: "请选择品牌", trigger: "blur" }]
      }
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.baseStore.userInfo;
    }
  },
  components: {},
  mounted() {
    loading = this.$loading({
      target:'.content-container',
      lock: true,
      background: "rgba(255, 255, 255, 0.74)"
    });
    this.filePath = this.userInfo.filePath;
    const token = localStorage.getItem("token");
    this.headers = { "token": token };
    this.getBrandList();
    this.getTypeList();
    this.getProductList();
  },
  filters: {
    data: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  methods: {
    getBrandList() {
      const _this = this;
      service.getBrandList().then(function(res) {
        const { data, status } = res;
        if (statusValid(_this, status, data)) {
          _this.brandList = data;
        }
      });
    },
    deleteBrand(index, item, rows) {
      const _this = this;
      this.$confirm("将同时删除对应的商品，确认删除吗?", "提示", {
      })
      .then(() => {
        service.deleteBrand(item.id).then(function(res) {
          const { data, status } = res;
          if (statusValid(_this, status, data)) {
            rows.splice(index, 1);
          }
        });
      })
    },
    deleteType(index, item, rows) {
      const _this = this;
      this.$confirm("将同时删除对应的商品，确认删除吗?", "提示", {
      })
      .then(() => {
        service.deleteType(item.id).then(function(res) {
          const { data, status } = res;
          if (statusValid(_this, status, data)) {
            rows.splice(index, 1);
          }
        });
      })
    },
    getTypeList() {
      const _this = this;
      let params = {
        brand_id:this.selBrandId
      };
      service.getTypeList(params).then(function(res) {
        const { data, status } = res;
        if (statusValid(_this, status, data)) {
          loading.close();
          _this.typeList = data;
        }
      });
    },
    getProductList(){
      const _this = this;
      let params = {
        brand_id:this.selBrandId,
        type_id:this.selTypeId
      };
      getProductList(params).then(function(res) {
        const { data, status } = res;
        if (statusValid(_this, status, data)) {
          _this.productList = data.data;
        }
      });
    },
    addBrand() {
      this.brandStatus = true;
      this.brandModel = {};
    },
    editBrand(index,item){
      this.brandModel = item;
      this.brandStatus = true;
    },
    addType() {
      this.typeModel = {
        brand_id: this.selBrandId
      };
      this.typeStatus = true;
    },
    editType(index,item){
      this.imgArray = [];
      this.fileList = [];
      if(item.cover){
        item.cover.split(',').map((item,index)=>{
          this.fileList.push({
            url:this.filePath + item
          });
          this.imgArray.push(item);
        });
      }
      this.typeModel = item;
      this.typeStatus = true;
    },
    cancelBrand() {
      this.brandStatus = false;
    },
    sureBrand() {
      const _this = this;
      this.$refs["brandForm"].validate(valid => {
        if (valid) {
          let pdata = _this.brandModel;
          if (pdata.id) {
            service.updateBrand(pdata.id, pdata).then(res => {
              const { data, status } = res;
              if (statusValid(_this, status, data)) {
              }
            });
          } else {
            service.addBrand(pdata).then(res => {
              const { data, status } = res;
              if (statusValid(_this, status, data)) {
                _this.getBrandList();
              }
            });
          }
          _this.brandStatus = false;
        }
      });
    },
    cancelType() {
      this.typeStatus = false;
    },
    sureType() {
      const _this = this;
      this.$refs["typeForm"].validate(valid => {
        if (valid) {
          let pdata = _this.typeModel;
          pdata.cover = this.imgArray.join();
          if (pdata.id) {
            service.updateType(pdata.id, pdata).then(res => {
              const { data, status } = res;
              if (statusValid(_this, status, data)) {
              }
            });
          } else {
            service.addType(pdata).then(res => {
              const { data, status } = res;
              if (statusValid(_this, status, data)) {
                _this.getTypeList();
              }
            });
          }
          _this.typeStatus = false;
        }
      });
    },
    brandChange(val) {
      if(val){
        this.selBrandId = val.id;
        this.$refs.brandTable.setCurrentRow();
      }else{
        this.selBrandId = '';
      }
      this.getTypeList();
    },
    typeChange(val) {
      if(val){
        this.selTypeId = val.id;
      }else{
        this.selTypeId = '';
      }
      this.getProductList();
    },
    onExceed() {
      this.$notify({
        title: "提示",
        message: "每项最多上传1张图片",
        type: "warning"
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onSignImgRemove(res, list) {
      this.imgArray = [];
      for (let l of list) {
        this.imgArray.push(l.response.data);
      }
      console.log(this.imgArray);
    },
    signUploadSuccess(res, list) {
      this.imgArray.push(res);
    },
    formClose(){
      this.$refs["typeForm"] && this.$refs["typeForm"].clearValidate();
      this.$refs["brandForm"] && this.$refs["brandForm"].clearValidate();
    },
    editProduct(id){
      if(id){
        this.$router.push({ path: "/shopDetail" ,query: { scree: id }});
      }else{
        this.$router.push({ path: "/shopDetail" });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-table{
  margin-bottom: 0;
}
.cointer-box {
  display: flex;
  flex-direction: row;
  height: 100%;
  border: 1px solid #ddd;
}
.brand-content,.goods-content,.type-content{
  display: flex;
  flex-direction: column;
}
.brand-content,.type-content {
  width: 300px;
}
.goods-content{
  flex: 1;
  overflow: auto;
}
.danger{
  color:#F56C6C;
}
.header {
  height: 35px;
  background: #157fcc;
  color: #fff;
  display: flex;
  align-items: center;
  padding-left: 15px;
  border-right: 1px solid #ddd;
  justify-content: space-between;
  padding-right: 15px;
  .el-button--text {
    color: #fff;
  }
}
.brand-cointer {
  padding-top: 20px;
  width: 100%;
}
.brand-table {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
}
.goods-cointer{
  flex: 1;
  width: 100%;
  overflow: auto;
}
.goods-ul{
  li{
    list-style: none;
    width: 190px;
    height: auto;
    float: left;
  }
  .card{
    padding: 15px;
  }
  .img-base{
    width: 100%;
    height: 160px;
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    background-size: cover;
    position: relative;
    img{
      width: 100%;
      height: auto;
      max-height: 100%;
    }
  }
  .card-bottom{
    padding: 10px 15px 15px 5px;
    span{
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
}
.el-icon-star-on{
  color: #F56C6C;
  position: absolute;
  font-size: 26px;
  top: 0;
  right: 0;
}
</style>
