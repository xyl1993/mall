(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{267:function(e,t,a){"use strict";a.d(t,"a",function(){return l}),a.d(t,"b",function(){return s});const l=10,s="登录过期，请重新登录"},270:function(e,t,a){"use strict";var l=a(276),s=a.n(l),r=a(277),n=a.n(r),o=a(278),i=a.n(o),c=a(49);const u=new RegExp(c.a.allowUrls),d=new RegExp(c.a.noJsonTypeUrls);function p(e){if(!u.test(e)){let t=localStorage.getItem("malltoken");return d.test(e)?{token:t}:{token:t,"Content-Type":"application/json;charset=UTF-8"}}return d.test(e)?{}:{"Content-Type":"application/json;charset=UTF-8"}}function h(e){return i.a.done(),{data:{status:e.status,data:e.data}}}s.a.interceptors.request.use(e=>(i.a.start(),e),e=>Promise.reject(e)),s.a.interceptors.response.use(e=>e,e=>Promise.resolve(e.response)),t.a={post:(e,t)=>s()({method:"post",url:c.a.base_api_host+e,data:JSON.stringify(t),timeout:3e4,headers:p(e)}).then(h).catch(function(e){return e}),get:(e,t)=>s()({method:"get",url:c.a.base_api_host+e,params:t,timeout:3e4,headers:p(e)}).then(h).catch(function(e){return console.log(e),e}),delete:(e,t)=>s()({method:"delete",url:c.a.base_api_host+e,params:t,timeout:3e4,headers:p(e)}).then(h).catch(function(e){return console.log(e),e}),put:(e,t)=>s()({method:"put",url:c.a.base_api_host+e,data:JSON.stringify(t),timeout:3e4,headers:p(e)}).then(h).catch(function(e){return console.log(e),e}),formPost:(e,t)=>s()({method:"post",url:c.a.base_api_host+e,data:n.a.stringify(t),timeout:3e4,headers:p(e)}).then(h)}},271:function(e,t,a){"use strict";a.d(t,"a",function(){return r});var l=a(267);const s=a(279),r=(e,t,a)=>(e.actionStatus&&(e.actionStatus=!1),t===s.OK||(t===s.NOT_FOUND?(e.$message({message:"请求不存在",type:"error"}),!1):t===s.UNAUTHORIZED?(e.$message({message:a,type:"error"}),!1):t===s.FORBIDDEN?(e.$message({message:l.b,type:"warning",duration:2e3,onClose:()=>{localStorage.removeItem("malluser"),localStorage.removeItem("malltoken"),localStorage.removeItem("mallfilePath"),e.$router.replace({path:"/login"})}}),!1):(e.$message({message:"服务器出错",type:"error"}),!1)))},311:function(e,t,a){"use strict";a.d(t,"b",function(){return s}),a.d(t,"a",function(){return r});var l=a(270);const s=e=>l.a.get("admin/order",e).then(e=>e.data),r=e=>l.a.get(`order/${e}`).then(e=>e.data)},312:function(e,t,a){},417:function(e,t,a){"use strict";var l=a(312);a.n(l).a},526:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"cointer-box"},[a("div",{staticClass:"toolbar el-col el-col-24"},[a("el-form",{staticClass:"demo-form-inline basetable-search-form",attrs:{inline:!0}},[a("div",{staticClass:"el-col-6"},[a("el-form-item",{staticClass:"el-col-6",attrs:{label:"支付状态"}},[a("el-select",{attrs:{clearable:"",placeholder:"支付状态"},on:{change:e.search},model:{value:e.searchModel.pay_status,callback:function(t){e.$set(e.searchModel,"pay_status",t)},expression:"searchModel.pay_status"}},e._l(e.payStatus,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),a("div",{staticClass:"el-col-6"},[a("el-form-item",{staticClass:"el-col-6",attrs:{label:"收货状态"}},[a("el-select",{attrs:{clearable:"",placeholder:"收货状态"},on:{change:e.search},model:{value:e.searchModel.collect_status,callback:function(t){e.$set(e.searchModel,"collect_status",t)},expression:"searchModel.collect_status"}},e._l(e.collectStatus,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),a("div",{staticClass:"el-col-6"},[a("el-form-item",{attrs:{label:"创建日期"}},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},on:{change:e.search},model:{value:e.searchModel.start_time,callback:function(t){e.$set(e.searchModel,"start_time",t)},expression:"searchModel.start_time"}})],1)],1),e._v(" "),a("div",{staticClass:"el-col-6"},[a("el-form-item",{attrs:{label:"至"}},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},on:{change:e.search},model:{value:e.searchModel.end_time,callback:function(t){e.$set(e.searchModel,"end_time",t)},expression:"searchModel.end_time"}})],1)],1),e._v(" "),a("div",{staticClass:"el-col-6",staticStyle:{"margin-top":"10px"}},[a("el-form-item",{attrs:{label:"订单编号"}},[a("el-input",{attrs:{placeholder:"订单编号"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.search(t):null}},model:{value:e.searchModel.order_number,callback:function(t){e.$set(e.searchModel,"order_number",t)},expression:"searchModel.order_number"}})],1)],1),e._v(" "),a("div",{staticClass:"el-col-6",staticStyle:{"margin-top":"10px"}},[a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(t){return t.preventDefault(),e.search(t)}}},[e._v("查询")])],1)],1)])],1),e._v(" "),a("div",{staticClass:"my-table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%","margin-top":"0"},attrs:{data:e.dataTable,height:"250"}},[a("el-table-column",{staticStyle:{width:"35px"},attrs:{type:"index"}}),e._v(" "),a("el-table-column",{attrs:{prop:"order_number",align:"center",width:"250",label:"订单编号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"nikename",align:"center",label:"顾客昵称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"should_price",align:"center",label:"应收款"}}),e._v(" "),a("el-table-column",{attrs:{prop:"pay_price",align:"center",label:"实收款"}}),e._v(" "),a("el-table-column",{attrs:{prop:"pay_status",align:"center",label:"支付状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:e._f("tagFilter")(t.row.pay_status),"disable-transitions":""}},[e._v(e._s(e._f("payStatusFilter")(t.row.pay_status)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"collect_status",align:"center",label:"收货状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:e._f("tagFilter")(t.row.collect_status),"disable-transitions":""}},[e._v(e._s(e._f("collectStatusFilter")(t.row.collect_status)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"create_time",width:"160",align:"center",label:"创建日期"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(e._f("dateTimeFilter")(t.row.create_time))+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("查看详情")])]}}])})],1),e._v(" "),a("el-pagination",{staticStyle:{height:"31px"},attrs:{background:"","page-size":e.pageSize,total:e.total,layout:"total, prev, pager, next"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])};l._withStripped=!0;var s=a(311),r=a(271),n=a(267),o={data:()=>({listLoading:!0,total:0,pageSize:n.a,formStatus:!1,current:1,dataTable:[],searchModel:{start_time:"",end_time:"",collect_status:"",pay_status:"",order_number:""},payStatus:[{label:"待支付",value:1},{label:"已支付",value:2},{label:"已退款",value:3}],collectStatus:[{label:"待发货",value:1},{label:"待收货",value:2},{label:"已收货",value:3}]}),mounted(){this.findlist()},filters:{tagFilter:function(e){return{1:"",2:"success",3:"danger"}[e]||""},payStatusFilter:function(e){return{1:"待支付",2:"已支付",3:"已退款"}[e]||""},collectStatusFilter:function(e){return{1:"待发货",2:"待收货",3:"已收货"}[e]||"未发货"}},methods:{findlist(){this.listLoading=!0;let e={current:this.current,pageSize:n.a};e={...e,...this.searchModel},console.log(e),s.b(e).then(e=>{let{data:t,status:a}=e;Object(r.a)(this,a,t)&&(this.dataTable=t.data,this.total=t.totalItems,this.listLoading=!1)})},search(){this.current=1,this.findlist(this)},handleSizeChange(e){},handleCurrentChange(e){this.current=e,this.findlist(this)},handleEdit(e,t){this.$router.push({path:"/orderDetail",query:{scree:`${t.order_number}`}})}}},i=(a(417),a(48)),c=Object(i.a)(o,l,[],!1,null,"39c31190",null);c.options.__file="src/app/views/orderManage/orderList.vue";t.default=c.exports}}]);