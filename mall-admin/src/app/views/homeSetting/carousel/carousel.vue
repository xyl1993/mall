<template>
  <div class="cointer carousel-cointer">
    <el-upload
      :headers="headers" 
      list-type="picture-card" 
      accept="image/*"
      :action="sealImgAction" 
      :file-list="fileList" 
      :on-preview="handlePictureCardPreview" 
      :on-remove="onSignImgRemove" 
      :on-success="signUploadSuccess">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import * as service from "./carousel.service";
import { statusValid } from "../../../utils/status-valid";
import { apiConfig } from "../../../global/api.config";
import { pageSize } from "../../../global/base.config";
var loading;
export default {
  data() {
    return {
      carouselList: [],
      fileList: [],
      headers:{},
      token:'',
      dialogImageUrl:'',
      dialogVisible:false,
      sealImgAction: `${apiConfig.base_api_host}admin/uploadDisk`,
    };
  },
  computed: {
    
    
  },
  components: {},
  mounted() {
    const token = localStorage.getItem("malltoken");
    this.headers = { "token": token };
    this.filePath = localStorage.getItem('mallfilePath');
    this.getCarouselList();
  },
  methods: {
    getCarouselList() {
      loading = this.$loading({
        target:'.content-container',
        lock: true,
        background: "rgba(255, 255, 255, 0.74)"
      });
      const _this = this;
      service.getCarouselList().then(res => {
        const { data, status } = res;
        if (statusValid(_this, status, data)) {
          _this.carouselList = data;
          data.map((item,index)=>{
            _this.fileList.push({
              url:this.filePath + item.url
            });
          })
          loading.close();
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onSignImgRemove(res,list) {
      // var test = /\/([^\/]*?\.)/i;
      var url = res.url.split('/');
      var img = url[url.length-1].split('.')[0];
      console.log(img);
      service.deleteCarousel(img).then(res => {});
    },
    signUploadSuccess(res, list){
      let form = {
        url:res
      }
      service.addCarousel(form).then(res => {
        const { data, status } = res;
        if (statusValid(this, status, data)) {
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.cointer{
  padding-top: 20px;
  height: 100%;
  width: 100%;
  overflow: auto;
}

</style>
<style lang="scss">
.carousel-cointer{
  .el-upload-list--picture-card .el-upload-list__item{
    width: 376px;
    height: 200px;
  }
}
</style>
