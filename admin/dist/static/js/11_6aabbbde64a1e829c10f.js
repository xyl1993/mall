(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{615:function(e,t,a){"use strict";a.r(t);var r=a(925),l=a(684);for(var n in l)"default"!==n&&function(e){a.d(t,e,function(){return l[e]})}(n);a(807);var s=a(140),o=Object(s.a)(l.default,r.a,r.b,!1,null,"39c31190",null);o.options.__file="src/app/views/orderManage/orderList.vue",t.default=o.exports},622:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.timeoutText=t.timeFormat=t.dateFormat=t.pageSize=void 0;t.pageSize=10;t.dateFormat="YYYY-MM-DD";t.timeFormat="YYYY-MM-DD HH:mm:ss";t.timeoutText="登录过期，请重新登录"},625:function(e,t,a){"use strict";var r=a(91);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=r(a(632)),n=r(a(633)),s=r(a(634)),o=a(318),i=new RegExp(o.apiConfig.allowUrls),u=new RegExp(o.apiConfig.noJsonTypeUrls);function c(e){if(!i.test(e)){var t=localStorage.getItem("malltoken");return u.test(e)?{token:t}:{token:t,"Content-Type":"application/json;charset=UTF-8"}}return u.test(e)?{}:{"Content-Type":"application/json;charset=UTF-8"}}function d(e){return s.default.done(),{data:{status:e.status,data:e.data}}}l.default.interceptors.request.use(function(e){return s.default.start(),e},function(e){return Promise.reject(e)}),l.default.interceptors.response.use(function(e){return e},function(e){return Promise.resolve(e.response)});var f={post:function(e,t){return(0,l.default)({method:"post",url:o.apiConfig.base_api_host+e,data:JSON.stringify(t),timeout:3e4,headers:c(e)}).then(d).catch(function(e){return e})},get:function(e,t){return(0,l.default)({method:"get",url:o.apiConfig.base_api_host+e,params:t,timeout:3e4,headers:c(e)}).then(d).catch(function(e){return console.log(e),e})},delete:function(e,t){return(0,l.default)({method:"delete",url:o.apiConfig.base_api_host+e,params:t,timeout:3e4,headers:c(e)}).then(d).catch(function(e){return console.log(e),e})},put:function(e,t){return(0,l.default)({method:"put",url:o.apiConfig.base_api_host+e,data:JSON.stringify(t),timeout:3e4,headers:c(e)}).then(d).catch(function(e){return console.log(e),e})},formPost:function(e,t){return(0,l.default)({method:"post",url:o.apiConfig.base_api_host+e,data:n.default.stringify(t),timeout:3e4,headers:c(e)}).then(d)}};t.default=f},626:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.statusValid=void 0;var r=a(622),l=a(635);t.statusValid=function(e,t,a){return e.actionStatus&&(e.actionStatus=!1),!(t!==l.OK&&(t===l.NOT_FOUND?(e.$message({message:"请求不存在",type:"error"}),1):t===l.UNAUTHORIZED?(e.$message({message:a,type:"error"}),1):t===l.FORBIDDEN?(e.$message({message:r.timeoutText,type:"warning",duration:2e3,onClose:function(){localStorage.removeItem("malluser"),localStorage.removeItem("malltoken"),localStorage.removeItem("mallfilePath"),e.$router.replace({path:"/login"})}}),1):(e.$message({message:"服务器出错",type:"error"}),1)))}},627:function(e,t){e.exports=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,a):{};r.get||r.set?Object.defineProperty(t,a,r):t[a]=e[a]}return t.default=e,t}},684:function(e,t,a){"use strict";a.r(t);var r=a(685),l=a.n(r);for(var n in r)"default"!==n&&function(e){a.d(t,e,function(){return r[e]})}(n);t.default=l.a},685:function(e,t,a){"use strict";var r=a(627);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=r(a(686)),n=a(626),s=a(622),o={data:function(){return{listLoading:!0,total:0,pageSize:s.pageSize,formStatus:!1,current:1,dataTable:[],searchModel:{start_time:"",end_time:"",collect_status:"",pay_status:"",order_number:""},payStatus:[{label:"待支付",value:1},{label:"已支付",value:2},{label:"已退款",value:3}],collectStatus:[{label:"待发货",value:1},{label:"待收货",value:2},{label:"已收货",value:3}]}},mounted:function(){this.findlist()},filters:{tagFilter:function(e){return{1:"",2:"success",3:"danger"}[e]||""},payStatusFilter:function(e){return{1:"待支付",2:"已支付",3:"已退款"}[e]||""},collectStatusFilter:function(e){return{1:"待发货",2:"待收货",3:"已收货"}[e]||"未发货"}},methods:{findlist:function(){var e=this;this.listLoading=!0;var t=Object.assign({},this.searchModel);t.current=this.current,t.pageSize=s.pageSize,l.getOrderList(t).then(function(t){var a=t.data,r=t.status;(0,n.statusValid)(e,r,a)&&(e.dataTable=a.data,e.total=a.totalItems,e.listLoading=!1)})},search:function(){this.current=1,this.findlist(this)},handleSizeChange:function(e){},handleCurrentChange:function(e){this.current=e,this.findlist(this)},handleEdit:function(e,t){this.$router.push({path:"/orderDetail",query:{scree:"".concat(t.order_number)}})}}};t.default=o},686:function(e,t,a){"use strict";var r=a(91);Object.defineProperty(t,"__esModule",{value:!0}),t.getOrderDetail=t.getOrderList=void 0;var l=r(a(625));t.getOrderList=function(e){return l.default.get("admin/order",e).then(function(e){return e.data})};t.getOrderDetail=function(e){return l.default.get("order/".concat(e)).then(function(e){return e.data})}},687:function(e,t,a){},807:function(e,t,a){"use strict";var r=a(687);a.n(r).a},925:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"cointer-box"},[a("div",{staticClass:"toolbar el-col el-col-24"},[a("el-form",{staticClass:"demo-form-inline basetable-search-form",attrs:{inline:!0}},[a("div",{staticClass:"el-col-6"},[a("el-form-item",{staticClass:"el-col-6",attrs:{label:"支付状态"}},[a("el-select",{attrs:{clearable:"",placeholder:"支付状态"},on:{change:e.search},model:{value:e.searchModel.pay_status,callback:function(t){e.$set(e.searchModel,"pay_status",t)},expression:"searchModel.pay_status"}},e._l(e.payStatus,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),a("div",{staticClass:"el-col-6"},[a("el-form-item",{staticClass:"el-col-6",attrs:{label:"收货状态"}},[a("el-select",{attrs:{clearable:"",placeholder:"收货状态"},on:{change:e.search},model:{value:e.searchModel.collect_status,callback:function(t){e.$set(e.searchModel,"collect_status",t)},expression:"searchModel.collect_status"}},e._l(e.collectStatus,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),a("div",{staticClass:"el-col-6"},[a("el-form-item",{attrs:{label:"创建日期"}},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},on:{change:e.search},model:{value:e.searchModel.start_time,callback:function(t){e.$set(e.searchModel,"start_time",t)},expression:"searchModel.start_time"}})],1)],1),e._v(" "),a("div",{staticClass:"el-col-6"},[a("el-form-item",{attrs:{label:"至"}},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},on:{change:e.search},model:{value:e.searchModel.end_time,callback:function(t){e.$set(e.searchModel,"end_time",t)},expression:"searchModel.end_time"}})],1)],1),e._v(" "),a("div",{staticClass:"el-col-6",staticStyle:{"margin-top":"10px"}},[a("el-form-item",{attrs:{label:"订单编号"}},[a("el-input",{attrs:{placeholder:"订单编号"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.search(t):null}},model:{value:e.searchModel.order_number,callback:function(t){e.$set(e.searchModel,"order_number",t)},expression:"searchModel.order_number"}})],1)],1),e._v(" "),a("div",{staticClass:"el-col-6",staticStyle:{"margin-top":"10px"}},[a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(t){return t.preventDefault(),e.search(t)}}},[e._v("查询")])],1)],1)])],1),e._v(" "),a("div",{staticClass:"my-table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%","margin-top":"0"},attrs:{data:e.dataTable,height:"250"}},[a("el-table-column",{staticStyle:{width:"35px"},attrs:{type:"index"}}),e._v(" "),a("el-table-column",{attrs:{prop:"order_number",align:"center",width:"250",label:"订单编号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"nikename",align:"center",label:"顾客昵称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"should_price",align:"center",label:"合计"}}),e._v(" "),a("el-table-column",{attrs:{prop:"pay_status",align:"center",label:"支付状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:e._f("tagFilter")(t.row.pay_status),"disable-transitions":""}},[e._v(e._s(e._f("payStatusFilter")(t.row.pay_status)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"collect_status",align:"center",label:"收货状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:e._f("tagFilter")(t.row.collect_status),"disable-transitions":""}},[e._v(e._s(e._f("collectStatusFilter")(t.row.collect_status)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"create_time",width:"160",align:"center",label:"创建日期"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(e._f("dateTimeFilter")(t.row.create_time))+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("查看详情")])]}}])})],1),e._v(" "),a("el-pagination",{staticStyle:{height:"31px"},attrs:{background:"","page-size":e.pageSize,total:e.total,layout:"total, prev, pager, next"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])},l=[];r._withStripped=!0,a.d(t,"a",function(){return r}),a.d(t,"b",function(){return l})}}]);