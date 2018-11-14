(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{267:function(t,e,i){"use strict";i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s});const a=10,s="登录过期，请重新登录"},270:function(t,e,i){"use strict";var a=i(276),s=i.n(a),r=i(277),o=i.n(r),l=i(278),n=i.n(l),c=i(49);const d=new RegExp(c.a.allowUrls),u=new RegExp(c.a.noJsonTypeUrls);function p(t){if(!d.test(t)){let e=localStorage.getItem("malltoken");return u.test(t)?{token:e}:{token:e,"Content-Type":"application/json;charset=UTF-8"}}return u.test(t)?{}:{"Content-Type":"application/json;charset=UTF-8"}}function m(t){return n.a.done(),{data:{status:t.status,data:t.data}}}s.a.interceptors.request.use(t=>(n.a.start(),t),t=>Promise.reject(t)),s.a.interceptors.response.use(t=>t,t=>Promise.resolve(t.response)),e.a={post:(t,e)=>s()({method:"post",url:c.a.base_api_host+t,data:JSON.stringify(e),timeout:3e4,headers:p(t)}).then(m).catch(function(t){return t}),get:(t,e)=>s()({method:"get",url:c.a.base_api_host+t,params:e,timeout:3e4,headers:p(t)}).then(m).catch(function(t){return console.log(t),t}),delete:(t,e)=>s()({method:"delete",url:c.a.base_api_host+t,params:e,timeout:3e4,headers:p(t)}).then(m).catch(function(t){return console.log(t),t}),put:(t,e)=>s()({method:"put",url:c.a.base_api_host+t,data:JSON.stringify(e),timeout:3e4,headers:p(t)}).then(m).catch(function(t){return console.log(t),t}),formPost:(t,e)=>s()({method:"post",url:c.a.base_api_host+t,data:o.a.stringify(e),timeout:3e4,headers:p(t)}).then(m)}},271:function(t,e,i){"use strict";i.d(e,"a",function(){return r});var a=i(267);const s=i(279),r=(t,e,i)=>(t.actionStatus&&(t.actionStatus=!1),e===s.OK||(e===s.NOT_FOUND?(t.$message({message:"请求不存在",type:"error"}),!1):e===s.UNAUTHORIZED?(t.$message({message:i,type:"error"}),!1):e===s.FORBIDDEN?(t.$message({message:a.b,type:"warning",duration:2e3,onClose:()=>{localStorage.removeItem("malluser"),localStorage.removeItem("malltoken"),localStorage.removeItem("mallfilePath"),t.$router.replace({path:"/login"})}}),!1):(t.$message({message:"服务器出错",type:"error"}),!1)))},284:function(t,e,i){"use strict";i.d(e,"f",function(){return s}),i.d(e,"a",function(){return r}),i.d(e,"b",function(){return o}),i.d(e,"e",function(){return l}),i.d(e,"d",function(){return n}),i.d(e,"g",function(){return c}),i.d(e,"c",function(){return d});var a=i(270);const s=t=>a.a.get("product",t).then(t=>t.data),r=t=>a.a.post("admin/product",t).then(t=>t.data),o=t=>a.a.delete(`admin/product/${t}`).then(t=>t.data),l=t=>a.a.get(`product/${t}`).then(t=>t.data),n=(t,e)=>a.a.put(`admin/product/${t}`,e).then(t=>t.data),c=(t,e)=>a.a.put(`admin/product/${t}/updateRecommend`,e).then(t=>t.data),d=t=>a.a.delete(`admin/specifications/${t}`).then(t=>t.data)},304:function(t,e,i){"use strict";i.d(e,"e",function(){return s}),i.d(e,"a",function(){return r}),i.d(e,"c",function(){return o}),i.d(e,"g",function(){return l}),i.d(e,"f",function(){return n}),i.d(e,"b",function(){return c}),i.d(e,"d",function(){return d}),i.d(e,"h",function(){return u});var a=i(270);const s=t=>a.a.get("brand",t).then(t=>t.data),r=t=>a.a.post("admin/brand",t).then(t=>t.data),o=t=>a.a.delete(`admin/brand/${t}`).then(t=>t.data),l=(t,e)=>a.a.put(`admin/brand/${t}`,e).then(t=>t.data),n=t=>a.a.get("goods-type",t).then(t=>t.data),c=t=>a.a.post("admin/goods-type",t).then(t=>t.data),d=t=>a.a.delete(`admin/goods-type/${t}`).then(t=>t.data),u=(t,e)=>a.a.put(`admin/goods-type/${t}`,e).then(t=>t.data)},305:function(t,e,i){},306:function(t,e,i){},411:function(t,e,i){"use strict";var a=i(305);i.n(a).a},412:function(t,e,i){"use strict";var a=i(306);i.n(a).a},525:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"cointer-box"},[i("el-row",{staticClass:"row"},[i("el-col",{attrs:{span:16}},[i("el-form",{ref:"form",staticClass:"detail-form",attrs:{model:t.form,"label-width":"80px","status-icon":"",rules:t.rules}},[i("el-form-item",{attrs:{label:"商品标题",prop:"title"}},[i("el-input",{staticStyle:{"max-width":"480px"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"品牌",prop:"brand_id"}},[i("el-select",{staticStyle:{width:"180px"},attrs:{filterable:"",placeholder:"请选择"},on:{change:function(e){t.selBrand()}},model:{value:t.form.brand_id,callback:function(e){t.$set(t.form,"brand_id",e)},expression:"form.brand_id"}},t._l(t.brandList,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"分类",prop:"type_id"}},[i("el-select",{staticStyle:{width:"180px"},attrs:{filterable:"",placeholder:"请选择"},model:{value:t.form.type_id,callback:function(e){t.$set(t.form,"type_id",e)},expression:"form.type_id"}},t._l(t.chooseTypeList,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),i("div",{staticClass:"specification-content el-form--inline "},[i("div",{staticClass:"sp-div"},[t._v("规格")]),t._v(" "),t._l(t.form.specifications,function(e,a){return i("div",{key:a},[i("el-form-item",{attrs:{label:"规格",prop:"specifications."+a+".name",rules:{required:!0,message:"规格不能为空",trigger:"blur"}}},[i("el-input",{staticStyle:{width:"180px"},attrs:{type:"text"},model:{value:e.name,callback:function(i){t.$set(e,"name",i)},expression:"item.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"原价",prop:"specifications."+a+".original_price",rules:{required:!0,message:"原价不能为空",trigger:"blur"}}},[i("el-input",{staticStyle:{width:"180px"},attrs:{type:"number"},model:{value:e.original_price,callback:function(i){t.$set(e,"original_price",i)},expression:"item.original_price"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"现价",prop:"specifications."+a+".current_price",rules:{required:!1,message:"现价不能为空",trigger:"blur"}}},[i("el-input",{staticStyle:{width:"180px"},attrs:{type:"number"},model:{value:e.current_price,callback:function(i){t.$set(e,"current_price",i)},expression:"item.current_price"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"库存",prop:"specifications."+a+".stock",rules:{required:!0,message:"库存不能为空",trigger:"blur"}}},[i("el-input",{staticStyle:{width:"180px"},attrs:{type:"number"},model:{value:e.stock,callback:function(i){t.$set(e,"stock",i)},expression:"item.stock"}})],1),t._v(" "),i("el-form-item",{attrs:{label:" "}},[i("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(e){e.preventDefault(),t.addRow()}}},[t._v("\n                增行\n              ")]),t._v(" "),0!==a?i("el-button",{staticClass:"danger",attrs:{type:"text",size:"small"},nativeOn:{click:function(i){i.preventDefault(),t.deleteRow(a,t.form.specifications,e)}}},[t._v("\n                删行\n              ")]):t._e()],1)],1)})],2),t._v(" "),i("div",{staticClass:"formModel el-form-item clear",staticStyle:{position:"relative","padding-left":"80px"}},[i("label",{staticClass:"el-form-item__label",staticStyle:{width:"80px",position:"absolute",left:"0"}},[t._v("缩略图")]),t._v(" "),i("div",{},[i("el-upload",{staticClass:"avatar-uploader",attrs:{headers:t.headers,"show-file-list":!1,accept:"image/*",action:t.sealImgAction,"on-success":t.handleAvatarSuccess}},[t.imgUrl?i("img",{staticClass:"avatar",attrs:{src:t.imgUrl}}):i("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)]),t._v(" "),i("div",{staticClass:"formModel el-form-item clear",staticStyle:{position:"relative","padding-left":"80px"}},[i("label",{staticClass:"el-form-item__label",staticStyle:{width:"80px",position:"absolute",left:"0"}},[t._v("轮播图片")]),t._v(" "),i("div",{},[i("el-upload",{attrs:{headers:t.headers,"list-type":"picture-card",limit:6,accept:"image/*",action:t.sealImgAction,"on-exceed":t.onExceed,"file-list":t.fileList,"on-preview":t.handlePictureCardPreview,"on-remove":t.onSignImgRemove,"on-success":t.signUploadSuccess}},[t.fileList.length<7?i("i",{staticClass:"el-icon-plus"}):t._e()])],1)]),t._v(" "),i("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"商品详情"}}),t._v(" "),i("div",{staticClass:"quill-main"},[i("el-upload",{staticClass:"quill-uploader",attrs:{action:t.sealImgAction,headers:t.headers,"show-file-list":!1,"on-success":t.quillUloadSuccess,"on-error":t.quilUploadError,"before-upload":t.quillBeforeUpload}}),t._v(" "),i("el-row",{directives:[{name:"loading",rawName:"v-loading",value:t.uillUpdateImg,expression:"uillUpdateImg"}]},[i("quill-editor",{ref:"myQuillEditor",attrs:{options:t.editorOption},model:{value:t.form.detail,callback:function(e){t.$set(t.form,"detail",e)},expression:"form.detail"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"footer-submit"},[i("el-button",{attrs:{type:"primary",disabled:t.actionStatus},on:{click:t.onSubmit}},[t._v("立即创建")]),t._v(" "),i("el-button",{on:{click:function(e){t.cancel()}}},[t._v("取消")])],1)],1)],1),t._v(" "),i("el-col",{attrs:{span:8}},[i("div",{staticClass:"phone"},[i("div",{staticClass:"phone-cointer"},[i("swiper",{ref:"mySwiper",attrs:{options:t.phoneSwiperOption}},[i("swiper-slide",{staticClass:"text"},[i("swiper",{attrs:{options:t.swiperOption}},[t._l(t.fileList,function(t,e){return i("swiper-slide",{key:e},[i("img",{staticClass:"carousel-img",attrs:{src:t.url,alt:""}})])}),t._v(" "),i("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2),t._v(" "),i("div",{staticClass:"shop-header"},[i("div",{staticClass:"title-content"},[i("div",{staticClass:"title"},[t._v("\n                    "+t._s(t.form.title)+"\n                  ")]),t._v(" "),i("div",{staticClass:"share"},[i("i",{staticClass:"iconfont icon-fenxiang"}),t._v(" "),i("div",[t._v("分享")])])]),t._v(" "),i("div",{staticClass:"header-other"},[i("p",{staticClass:"price"},[i("span",{staticClass:"now"},[t._v("￥"+t._s(t.form.current_price))]),t._v(" "),i("span",{staticClass:"old"},[t._v("原价:"+t._s(t.form.current_price))])]),t._v(" "),i("div",{staticClass:"seal-content"},[i("p",{staticClass:"left"},[t._v("销量：0件")]),t._v(" "),i("p",{staticClass:"right"},[t._v("库存："+t._s(t.form.stock)+"件")])])])]),t._v(" "),i("div",{staticClass:"detail-content"},[t._v("\n                规格分类\n                "),i("div",{staticClass:"detail"},t._l(t.form.specifications,function(e,a){return i("div",{key:a,staticClass:"app-specifications-item"},[t._v(t._s(e.name))])}))]),t._v(" "),i("div",{staticClass:"detail-content"},[t._v("\n                图文详情\n                "),i("div",{staticClass:"detail",domProps:{innerHTML:t._s(t.form.detail)}})])],1),t._v(" "),i("div",{staticClass:"swiper-scrollbar",attrs:{slot:"scrollbar"},slot:"scrollbar"})],1),t._v(" "),i("div",{staticClass:"shop-footer"},[i("div",{staticClass:"footer-tag"},[i("i",{staticClass:"iconfont icon-gouwuche1"}),t._v("\n              购物车\n            ")]),t._v(" "),i("div",{staticClass:"footer-tag"},[i("i",{staticClass:"iconfont icon-kefu"}),t._v("\n              客服\n            ")]),t._v(" "),i("div",{staticClass:"footer-tag"},[i("i",{staticClass:"iconfont icon-shoucang"}),t._v("\n              收藏\n            ")]),t._v(" "),i("div",{staticClass:"footer-btn join"},[t._v("\n              加入购物车\n            ")]),t._v(" "),i("div",{staticClass:"footer-btn buy"},[t._v("\n              立即购买\n            ")])])],1)])])],1),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1)};a._withStripped=!0;var s,r=i(284),o=i(304),l=i(271),n=i(49),c=(i(196),i(402),i(403),i(404)),d=(i(408),i(409)),u={data:()=>({form:{brand_id:"",type_id:"",cover:"",specifications:[{name:"均码",original_price:"",current_price:"",stock:""}]},sealImgAction:`${n.a.base_api_host}admin/uploadDisk`,fileList:[],imgUrl:"",typeList:[],brandList:[],chooseTypeList:[],filePath:"",actionStatus:!1,headers:{},dialogVisible:!1,imgArray:[],uillUpdateImg:!1,dialogImageUrl:"",productId:"",editorOption:{modules:{toolbar:{container:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{font:[]}],[{color:[]},{background:[]}],[{align:[]}],["clean"],["link","image","video"]],handlers:{image:function(t){t?document.querySelector(".quill-uploader input").click():this.quill.format("image",!1)}}},syntax:{highlight:t=>hljs.highlightAuto(t).value}}},swiperOption:{autoplay:!0,pagination:{el:".swiper-pagination"}},phoneSwiperOption:{direction:"vertical",slidesPerView:"auto",freeMode:!0,scrollbar:{el:".swiper-scrollbar"},mousewheel:!0},rules:{title:[{required:!0,message:"请输入标题",trigger:"blur"}],brand_id:[{required:!0,message:"请输入品牌",trigger:"blur"}],type_id:[{required:!0,message:"请输入分类",trigger:"blur"}]}}),computed:{},components:{quillEditor:c.quillEditor,swiper:d.swiper,swiperSlide:d.swiperSlide},mounted(){this.filePath=localStorage.getItem("mallfilePath");let t=localStorage.getItem("malltoken");this.productId=this.$route.query.scree,this.productId&&(s=this.$loading({target:".content-container",lock:!0,background:"rgba(255, 255, 255, 0.74)"})),this.headers={token:t};this.getBrandList()},methods:{getBrandList(){let t=this;Object(o.e)().then(function(e){const{data:i,status:a}=e;Object(l.a)(t,a,i)&&(t.brandList=i,t.getTypeList())})},getTypeList(){let t=this;Object(o.f)().then(function(e){const{data:i,status:a}=e;Object(l.a)(t,a,i)&&(t.typeList=i,t.chooseTypeList=Object.assign({},i),t.productId&&t.getProductDetail())})},getProductDetail(){r.e(this.productId).then(t=>{let{data:e,status:i}=t;Object(l.a)(this,i,e)&&(this.form=e,this.imgUrl=e.cover?this.filePath+e.cover:"",e.carousel&&e.carousel.split(",").map((t,e)=>{this.fileList.push({url:this.filePath+t}),this.imgArray.push(t)}),s.close())})},onExceed(t){this.$notify({title:"提示",message:"每项最多上传6张图片",type:"warning"})},handlePictureCardPreview(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},onSignImgRemove(t,e){this.imgArray=[];for(let t of e)this.imgArray.push(t.response.data)},signUploadSuccess(t,e){this.imgArray.push(t)},handleAvatarSuccess(t,e){this.imgUrl=URL.createObjectURL(e.raw),this.form.cover=t},onSubmit(){let t=this;this.$refs.form.validate(e=>{if(!e)return!1;if(this.actionStatus=!0,this.productId){let e=Object.assign({},this.form);r.d(this.productId,e).then(e=>{let{data:i,status:a}=e;Object(l.a)(this,a,i)&&this.$message({message:"保存成功",duration:1e3,type:"success",onClose:function(){t.actionStatus=!1,t.$router.push({path:"/shopList"})}})})}else{let e=Object.assign({},this.form);e.carousel=this.imgArray.join(),r.a(e).then(e=>{let{data:i,status:a}=e;Object(l.a)(this,a,i)&&this.$message({message:"保存成功",type:"success",onClose:function(){t.actionStatus=!1,t.$router.push({path:"/shopList"})}})})}})},cancel(){this.$router.push({path:"/shopList"})},selBrand(){const t=this;this.form.type_id="",this.chooseTypeList=this.typeList.filter((e,i)=>e.brand_id===t.form.brand_id)},addRow(){this.form.specifications.push({name:"",original_price:"",current_price:"",stock:""})},deleteRow(t,e,i){this.productId&&i.id&&r.c(i.id).then(t=>{let{data:e,status:i}=t;Object(l.a)(this,i,e)}),e.splice(t,1)},quillUloadSuccess(t,e){let i=this.$refs.myQuillEditor.quill,a=i.getSelection().index;i.insertEmbed(a,"image",this.filePath+t),i.setSelection(a+1),this.quillUpdateImg=!1},quilUploadError(){this.quillUpdateImg=!1,this.$message.error("图片插入失败")},quillBeforeUpload(){this.quillUpdateImg=!0}}},p=(i(411),i(412),i(48)),m=Object(p.a)(u,a,[],!1,null,"69923058",null);m.options.__file="src/app/views/shopManage/shop/shopDetail.vue";e.default=m.exports}}]);