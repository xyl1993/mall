<template>
  <div class="cointer-box">
    <el-row class="row">
      <el-col :span="16">
        <el-form ref="form" :model="form" label-width="80px" status-icon :rules="rules">
          <el-form-item label="商品标题" prop="title">
            <el-input v-model="form.title" style="max-width:480px;"></el-input>
          </el-form-item>
          <el-form-item label="品牌" prop="brand_id">
            <el-select v-model="form.brand_id" filterable @change="selBrand()" style="width:180px;" placeholder="请选择">
              <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类" prop="type_id">
            <el-select v-model="form.type_id" filterable  style="width:180px;" placeholder="请选择">
              <el-option v-for="item in chooseTypeList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="specification-content el-form--inline ">
            <div class="sp-div">规格</div>
            <div v-for="(item,index) of form.specifications" :key="index">
              <el-form-item label="规格" :prop="'specifications.' + index + '.name'" :rules="{
                required: true, message: '规格不能为空', trigger: 'blur'
              }">
                <el-input v-model="item.name" type="text" style="width:180px;"></el-input>
              </el-form-item>
              <el-form-item label="原价"
                :prop="'specifications.' + index + '.original_price'"
                :rules="{
                  required: true, message: '原价不能为空', trigger: 'blur'
                }"
              >
                <el-input v-model="item.original_price" type="number" style="width:180px;"></el-input>
              </el-form-item>
              <el-form-item label="现价"
                :prop="'specifications.' + index + '.current_price'"
                :rules="{
                  required: false, message: '现价不能为空', trigger: 'blur'
                }"
              >
                <el-input v-model="item.current_price" type="number" style="width:180px;"></el-input>
              </el-form-item>
              <el-form-item label="库存"
                :prop="'specifications.' + index + '.stock'"
                :rules="{
                  required: true, message: '库存不能为空', trigger: 'blur'
                }"
              >
                <el-input v-model="item.stock" type="number" style="width:180px;"></el-input>
              </el-form-item>
              <el-form-item label=" ">
                <el-button @click.native.prevent="addRow()" type="text" size="small">
                  增行
                </el-button>
                <el-button v-if="index!==0" class="danger" @click.native.prevent="deleteRow(index, form.specifications,item)"  type="text" size="small">
                  删行
                </el-button>
              </el-form-item>
            </div>
          </div>
          <div class="formModel el-form-item clear" style="position:relative;padding-left:80px;">
            <label class="el-form-item__label" style="width: 80px;position: absolute;left: 0;">缩略图</label>
            <div class="">
              <el-upload 
                class="avatar-uploader"
                :headers="headers" 
                :show-file-list="false"
                accept="image/*"
                :action="sealImgAction" 
                :on-success="handleAvatarSuccess">
                <img v-if="imgUrl" :src="imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
          <div class="formModel el-form-item clear" style="position:relative;padding-left:80px;">
            <label class="el-form-item__label" style="width: 80px;position: absolute;left: 0;">轮播图片</label>
            <div class="">
              <el-upload 
                :headers="headers" 
                list-type="picture-card" 
                :limit="6" 
                accept="image/*"
                :action="sealImgAction" 
                :on-exceed="onExceed" 
                :file-list="fileList" 
                :on-preview="handlePictureCardPreview" 
                :on-remove="onSignImgRemove" 
                :on-success="signUploadSuccess">
                <i v-if="fileList.length<7" class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
          <el-form-item label="商品详情" style="margin-bottom:0;">

          </el-form-item>
          <div class="quill-main">
            <el-upload
              class="quill-uploader"
              :action="sealImgAction" 
              :headers="headers"
              :show-file-list="false"
              :on-success="quillUloadSuccess"
              :on-error="quilUploadError"
              :before-upload="quillBeforeUpload">
            </el-upload>
            <!--富文本编辑器组件-->
            <el-row v-loading="uillUpdateImg">
              <quill-editor v-model="form.detail" ref="myQuillEditor" :options="editorOption">
              </quill-editor>
            </el-row>
          </div>
          <el-form-item>
            <el-button type="primary" :disabled="actionStatus" @click="onSubmit">立即创建</el-button>
            <el-button @click="cancel()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">
        <div class="phone">
          <div class="phone-cointer">
            <swiper :options="phoneSwiperOption">
              <swiper-slide class="text">
                <swiper :options="swiperOption">
                  <swiper-slide v-for="(slide, index) in fileList" :key="index">
                    <img class="carousel-img" :src="slide.url" alt="">
                  </swiper-slide>
                  <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
                <div class="shop-header">
                  <div class="title-content">
                    <div class="title">
                      {{form.title}}
                    </div>
                    <div class="share">
                      <i class="iconfont icon-fenxiang"></i>
                      <div>分享</div>
                    </div>
                  </div>
                  <div class="header-other">
                    <p class="price">
                      <span class="now">￥{{form.current_price}}</span>
                      <span class="old">原价:{{form.current_price}}</span>
                    </p>
                    <div class="seal-content">
                      <p class="left">销量：0件</p>
                      <p class="right">库存：{{form.stock}}件</p>
                    </div>
                  </div>
                </div>
                <div class="list-content">
                  <div class="list-item">
                    <span class="gui">商品规格</span>
                    <span class="sp">></span>
                  </div>
                  <div class="list-item">
                    <span class="gui">商品评价</span>
                    <span class="sp">></span>
                  </div>
                </div>
                <div class="detail-content">
                  图文详情
                  <div class="detail" v-html="form.detail"></div>
                </div>
                
              </swiper-slide>
              <div class="swiper-scrollbar" slot="scrollbar"></div>
            </swiper>
            <div class="shop-footer">
              <div class="footer-tag">
                <i class="iconfont icon-gouwuche1"></i>
                购物车
              </div>
              <div class="footer-tag">
                <i class="iconfont icon-kefu"></i>
                客服
              </div>
              <div class="footer-tag">
                <i class="iconfont icon-shoucang"></i>
                收藏
              </div>
              <div class="footer-btn join">
                加入购物车
              </div>
              <div class="footer-btn buy">
                立即购买
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import * as service from "./service";
import { getTypeList,getBrandList } from "../brand/brand.service";
import { statusValid } from "../../../utils/status-valid";
import { apiConfig } from "../../../global/api.config";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
var loading;
export default {
  data() {
    var checkName = (rule, value, callback) => {
      let _this = this;
      console.log(value);
      callback();
      // if (value < 0) {
      //   callback(new Error("金额不能小于0"));
      // } else {
      //   var str = new Number(value);
      //   this.formModel.money = str.toFixed(2);
      //   callback();
      // }
    };
    return {
      form: {
        brand_id:'',
        type_id:'',
        cover:'',
        specifications:[
          {
            name:'均码',
            original_price:'',
            current_price:'',
            stock:''
          }
        ]
      },
      sealImgAction: `${apiConfig.base_api_host}admin/uploadDisk`,
      fileList: [],
      imgUrl:'',
      typeList:[],
      brandList:[],
      chooseTypeList:[],
      filePath:'',
      actionStatus:false,
      headers:{},
      dialogVisible:false,
      imgArray:[],
      uillUpdateImg:false,
      dialogImageUrl:'',
      productId:'',
      editorOption: {
        modules: {
          toolbar: {
            container:[
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video'],
            ],
            handlers: {
              'image': function (value) {
                if (value) {
                  document.querySelector('.quill-uploader input').click()
                } else {
                  this.quill.format('image', false);
                }
              }
            }
          },
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      },
      swiperOption: {
        autoplay:true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      phoneSwiperOption:{
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar'
        },
        mousewheel: true
      },
      rules:{
        title: [
          { required: true, message: "请输入标题", trigger: "blur" }
        ],
        brand_id: [
          { required: true, message: "请输入品牌", trigger: "blur" }
        ],
        type_id: [
          { required: true, message: "请输入分类", trigger: "blur" }
        ],
        
      }
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.baseStore.userInfo;
    }
  },
  components: {
    quillEditor,
    swiper,
    swiperSlide
  },
  mounted() {
    
    this.filePath = this.userInfo.filePath;
    let token = localStorage.getItem("token");
    this.productId = this.$route.query.scree;
    if(this.productId){
      loading = this.$loading({
        target:'.content-container',
        lock: true,
        background: "rgba(255, 255, 255, 0.74)"
      });
    }
    this.headers = { "token": token };
    this.getBrandList();
    
  },
  methods: {
    getBrandList(){
      let _this = this;
      getBrandList().then(function(res) {
        const { data, status } = res;
        if (statusValid(_this, status, data)) {
          _this.brandList = data;
          _this.getTypeList();
        }
      });
    },
    getTypeList(){
      let _this = this;
      getTypeList().then(function(res) {
        const { data, status } = res;
        if (statusValid(_this, status, data)) {
          _this.typeList = data;
          _this.chooseTypeList = Object.assign({},data);
          if(_this.productId) {
            _this.getProductDetail();
          }
        }
      });
    },
    getProductDetail(){
      service.getProductDetail(this.productId).then(res=>{
        let { data, status } = res;
        if (statusValid(this, status, data)) {
          this.form = data;
          this.imgUrl = data.cover?this.filePath+data.cover:'';
          if(data.carousel){
            data.carousel.split(',').map((item,index)=>{
              this.fileList.push({
                url:this.filePath + item
              });
              this.imgArray.push(item);
            });
          }
          loading.close();
        }
      })
    },
    onExceed(val) {
      this.$notify({
        title: "提示",
        message:`每项最多上传6张图片`,
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
    },
    signUploadSuccess(res, list) {
      this.imgArray.push(res);
    },
    handleAvatarSuccess(res, file){
      this.imgUrl = URL.createObjectURL(file.raw);
      this.form.cover = res;
    },
    onSubmit(){
      let _this = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          this.actionStatus = true;
          if(this.productId){
            //修改
            let params = Object.assign({},this.form);
            service.editProductDetail(this.productId,params).then(res => {
              let { data, status } = res;
              if (statusValid(this, status, data)) {
                this.$message({
                  message: '保存成功',
                  type: 'success',
                  onClose:function(){
                    _this.actionStatus = false;
                     _this.$router.push({ path: "/shopList"});
                  }
                });
              }
            });
          }else{
            //新增
            let params = Object.assign({},this.form);
            params.carousel = this.imgArray.join();
            service.addProduct(params).then(res => {
              let { data, status } = res;
              if (statusValid(this, status, data)) {
                this.$message({
                  message: '保存成功',
                  type: 'success',
                  onClose:function(){
                    _this.actionStatus = false;
                    _this.$router.push({ path: "/shopList"});
                  }
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    cancel(){
      this.$router.push({ path: "/shopList" });
    },
    selBrand(){
      const _this = this;
      this.form.type_id = '';
      this.chooseTypeList = this.typeList.filter((item,index)=>{
        return item.brand_id === _this.form.brand_id;
      })
    },
    addRow(){
      this.form.specifications.push({
        name:'',
        original_price:'',
        current_price:'',
        stock:''
      })
    },
    deleteRow(index,row,item){
      if(this.productId && item.id){
        //修改状态下 删除规格调用接口
        service.deleteSpecifications(item.id).then(res => {
          let { data, status } = res;
          if (statusValid(this, status, data)) {
          }
        });
      }
      row.splice(index,1);
    },


    //富文本上传图片
    quillUloadSuccess(res, file){
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      // 获取光标所在位置
      let length = quill.getSelection().index;
      // 插入图片  res.info为服务器返回的图片地址
      quill.insertEmbed(length, 'image', this.filePath+res);
      // 调整光标到最后
      quill.setSelection(length + 1)
      
      // loading动画消失
      this.quillUpdateImg = false
    },
    quilUploadError(){
      // loading动画消失
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
    },
    quillBeforeUpload(){
      // 显示loading动画
      this.quillUpdateImg = true
    }
  }
};
</script>
<style lang="scss" scoped>
.cointer-box {
  padding-top: 20px;
}
.detail-box {
}
.row {
  overflow: auto;
}
.quill-main{
  margin-bottom:25px;
}
.phone {
  margin: 0 auto;
  position: relative;
  background: #111;
  border-radius: 55px;
  box-shadow: 0px 0px 0px 2px #aaa;
  width: 320px;
  height: 568px;
  padding: 105px 25px;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  height: 578px;
  &:before {
    content: "";
    width: 60px;
    height: 10px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    margin-left: -30px;
    background: #333;
    top: 50px;
  }
  &:after {
    content: "";
    position: absolute;
    width: 60px;
    height: 60px;
    left: 50%;
    margin-left: -30px;
    bottom: 20px;
    border-radius: 100%;
    box-sizing: border-box;
    border: 5px solid #333;
  }
  .phone-cointer {
    padding-bottom: 50px;
    .cointer{
      height: 100%;
      position: relative;
      overflow: hidden;
    }
    position: relative;
    height: 100%;
    display: block;
    width: 100%;
    margin-top: 20px;
    background: #F7F7F7;
    overflow: hidden;
    .swiper-container {
      height: 100%;
      width: 100%;
    }
    .text{
      height: auto;
      box-sizing: border-box;
      position: relative;
    }
  }
}
.carousel-img{
  height: 200px;
  width: 100%;
}
.danger{
  color:#F56C6C;
}
.shop-header{
  padding: 0 15px;
  background: #fff;
  font-size: 12px;
  .title-content{
    display: flex;
    .title{
      flex: 1;
      height: 40px;
      display: flex;
      font-size: 14px;
      align-items: center;
    }
    .share{
      width: 30px;
      height: 40px;
      text-align: center;
      color: #ddd;
      .icon-fenxiang{
        font-size: 20px;
      }
    }
  }
  .header-other{
    .price{
      padding: 10px 0;
      .now{
        color: #F14D59;
        font-size: 16px;
        padding-right: 5px;
      }
      .old{
        color: #ccc;
        text-decoration:line-through;
      }
    }
    .seal-content{
      color: #ccc;
      padding-bottom: 10px;
      .left{
        float: left;
      }
      .right{
        float: right;
      }
      &:after{
        clear: both;
        content: '';
        display: table;
      }
    }
  }
}
.list-content{
  padding: 20px 0;
}
.list-item{
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #eee;
  &:last-of-type{
    border-bottom: none;
  }
  .gui{
    padding-left: 15px;
    flex: 1;
  }
  .sp{
    width: 30px;
    text-align: center;
    color: #ccc;
  }
}
.detail-content{
  padding: 15px;
  background: #fff;
  .detail{
    padding-top: 15px;
  }
}
.shop-footer{
  position: absolute;
  bottom: 0;
  height: 45px;
  display: flex;
  background:#fff;
  width: 100%;
  z-index: 9;
  .footer-tag{
    flex-direction: column;
    justify-content: center;
    flex: 1;
    font-size: 12px;
    display: flex;
    align-items: center;
    i{
      color: #ccc;
    }
  }
  .footer-btn{
    color: #fff;
    text-align: center;
    line-height: 45px;
    width: 80px;
    height: 100%;
    &.join{
      background: #FDB549;
    }
    &.buy{
      background: #FE5E24;
    }
  }
}
.el-form-item{
  margin-bottom: 20px;
}
.specification-content{
  border: 1px solid #ddd;
  padding-top: 20px;
  margin-bottom: 20px;
  position: relative;
}
.sp-div{
  width: 40px;
  background: #fff;
  height: 25px;
  line-height: 25px;
  position: absolute;
  top: -14px;
  left: 25px;
  text-align: center;
  font-weight: 700;
}

</style>
<style lang="scss">
.phone{
  .detail-content{
    img{
      max-width: 100% !important;
    }
  }
}
.specification-content{
  .el-form-item__content{
    margin-left: 0 !important;
  }
} 

</style>
