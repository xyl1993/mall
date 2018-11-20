(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{593:function(t,e,a){"use strict";a.d(e,"a",function(){return n}),a.d(e,"b",function(){return r});const n=10,r="登录过期，请重新登录"},596:function(t,e,a){"use strict";var n=a(602),r=a.n(n),i=a(603),o=a.n(i),s=a(604),l=a.n(s),c=a(139);const u=new RegExp(c.a.allowUrls),d=new RegExp(c.a.noJsonTypeUrls);function p(t){if(!u.test(t)){let e=localStorage.getItem("malltoken");return d.test(t)?{token:e}:{token:e,"Content-Type":"application/json;charset=UTF-8"}}return d.test(t)?{}:{"Content-Type":"application/json;charset=UTF-8"}}function h(t){return l.a.done(),{data:{status:t.status,data:t.data}}}r.a.interceptors.request.use(t=>(l.a.start(),t),t=>Promise.reject(t)),r.a.interceptors.response.use(t=>t,t=>Promise.resolve(t.response)),e.a={post:(t,e)=>r()({method:"post",url:c.a.base_api_host+t,data:JSON.stringify(e),timeout:3e4,headers:p(t)}).then(h).catch(function(t){return t}),get:(t,e)=>r()({method:"get",url:c.a.base_api_host+t,params:e,timeout:3e4,headers:p(t)}).then(h).catch(function(t){return console.log(t),t}),delete:(t,e)=>r()({method:"delete",url:c.a.base_api_host+t,params:e,timeout:3e4,headers:p(t)}).then(h).catch(function(t){return console.log(t),t}),put:(t,e)=>r()({method:"put",url:c.a.base_api_host+t,data:JSON.stringify(e),timeout:3e4,headers:p(t)}).then(h).catch(function(t){return console.log(t),t}),formPost:(t,e)=>r()({method:"post",url:c.a.base_api_host+t,data:o.a.stringify(e),timeout:3e4,headers:p(t)}).then(h)}},597:function(t,e,a){"use strict";a.d(e,"a",function(){return i});var n=a(593);const r=a(605),i=(t,e,a)=>(t.actionStatus&&(t.actionStatus=!1),e===r.OK||(e===r.NOT_FOUND?(t.$message({message:"请求不存在",type:"error"}),!1):e===r.UNAUTHORIZED?(t.$message({message:a,type:"error"}),!1):e===r.FORBIDDEN?(t.$message({message:n.b,type:"warning",duration:2e3,onClose:()=>{localStorage.removeItem("malluser"),localStorage.removeItem("malltoken"),localStorage.removeItem("mallfilePath"),t.$router.replace({path:"/login"})}}),!1):(t.$message({message:"服务器出错",type:"error"}),!1)))},610:function(t,e,a){"use strict";a.d(e,"f",function(){return r}),a.d(e,"a",function(){return i}),a.d(e,"b",function(){return o}),a.d(e,"e",function(){return s}),a.d(e,"d",function(){return l}),a.d(e,"g",function(){return c}),a.d(e,"c",function(){return u});var n=a(596);const r=t=>n.a.get("product",t).then(t=>t.data),i=t=>n.a.post("admin/product",t).then(t=>t.data),o=t=>n.a.delete(`admin/product/${t}`).then(t=>t.data),s=t=>n.a.get(`product/${t}`).then(t=>t.data),l=(t,e)=>n.a.put(`admin/product/${t}`,e).then(t=>t.data),c=(t,e)=>n.a.put(`admin/product/${t}/updateRecommend`,e).then(t=>t.data),u=t=>n.a.delete(`admin/specifications/${t}`).then(t=>t.data)},629:function(t,e,a){},726:function(t,e,a){"use strict";var n=a(629);a.n(n).a},848:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cointer-box"},[a("div",{staticClass:"toolbar el-col el-col-24"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"请输入关键字"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.search(e):null}},model:{value:t.keyWord,callback:function(e){t.keyWord=e},expression:"keyWord"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){return e.preventDefault(),t.search(e)}}},[t._v("查询")])],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){return e.preventDefault(),t.add(e)}}},[t._v("新增")])],1)],1)],1),t._v(" "),a("div",{staticClass:"my-table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%","margin-top":"0"},attrs:{data:t.dataTable,height:"250"}},[a("el-table-column",{staticStyle:{width:"35px"},attrs:{type:"index"}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",align:"center",label:"标题"}}),t._v(" "),a("el-table-column",{attrs:{prop:"brand",align:"center",label:"品牌"}}),t._v(" "),a("el-table-column",{attrs:{prop:"type",align:"center",label:"分类"}}),t._v(" "),a("el-table-column",{attrs:{prop:"read_number",align:"center",label:"浏览次数"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"350"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(a){t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.handleDelete(e.$index,e.row)}}},[t._v("删除")]),t._v(" "),0===e.row.recommend?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.handleRecommend(e.$index,e.row,1)}}},[t._v("推荐商品")]):a("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(a){t.handleRecommend(e.$index,e.row,0)}}},[t._v("取消推荐")])]}}])})],1),t._v(" "),a("el-pagination",{staticStyle:{height:"31px"},attrs:{background:"","page-size":t.pageSize,total:t.total,layout:"total, prev, pager, next"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])};n._withStripped=!0;var r=a(610),i=a(597),o=a(593),s={data:()=>({listLoading:!0,total:0,pageSize:o.a,formStatus:!1,keyWord:"",current:1,dataTable:[]}),components:{},mounted(){this.findlist()},methods:{findlist(){this.listLoading=!0;let t={current:this.current,pageSize:o.a,search:this.keyWord};r.f(t).then(t=>{let{data:e,status:a}=t;Object(i.a)(this,a,e)&&(this.dataTable=e.data,this.total=e.totalItems,this.listLoading=!1)})},search(){this.current=1,this.findlist()},add(){this.$router.push({path:"/shopDetail"})},handleSizeChange(t){},handleCurrentChange(t){this.current=t,this.findlist()},handleEdit(t,e){this.$router.push({path:"/shopDetail",query:{scree:`${e.id}`}})},handleDelete(t,e){var a=this;this.$confirm("确认删除吗?","提示",{}).then(()=>{r.b(e.id).then(t=>{let{data:e,status:n}=t;Object(i.a)(a,n,e)&&(a.$message({message:"删除成功",type:"success"}),a.findlist())})}).catch(()=>{})},handleRecommend(t,e,a){r.g(e.id,{recommendStatus:a}).then(t=>{let{data:n,status:r}=t;Object(i.a)(this,r,n)&&(e.recommend=a)})}}},l=(a(726),a(138)),c=Object(l.a)(s,n,[],!1,null,"04c2f061",null);c.options.__file="src/app/views/shopManage/shop/shopList.vue";e.default=c.exports}}]);