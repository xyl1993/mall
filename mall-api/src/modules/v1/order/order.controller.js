const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const log = require('log4js').getLogger("orderController");
const mysql = require('mysql');
const config = require('../../../config/environment');
const pool = require('../../../utils/pool');
const programApi = require('../../../utils/programApi');
const updateUsed = require('../tplConfig/tplConfig.controller').updateUsed;
const moment = require('moment');
/**
 * 后台获取所有订单
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getOrderList = async (req, res, next)=> {
  const pageSize = ~~req.query.pageSize || 10;
  const current = req.query.current || 1;
  const start = (current - 1) * pageSize;
  const {start_time,end_time,collect_status,pay_status,order_number} = req.query;
  let _sql = `select a.*,b.nikename,b.city,b.provice,b.country,b.portrait from account_order a left join account b on a.account_id = b.id where 1 = 1`;
  if(start_time){
    _sql = _sql+` and a.create_time >= '${start_time}'`
  }
  if(end_time){
    _sql = _sql+` and a.create_time <= '${end_time} 23:59:59'`
  }
  if(collect_status){
    _sql = _sql+` and a.collect_status = '${collect_status}'`
  }
  if(pay_status){
    _sql = _sql+` and a.pay_status = '${pay_status}'`
  }
  if(order_number){
    _sql = _sql+` and a.order_number = '${order_number}'`
  }
  const _countSql = `select count(*) as count from (${_sql}) a`;
  _sql = _sql + ` order by a.create_time desc limit ${start}, ${pageSize}`;
  log.info(_sql);
  try {
    const rows = await pool.query(_sql);
    const counts = await pool.query(_countSql);
    res.status(status.OK).json({ data:rows,
      totalItems: counts[0].count
    });
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};
//修改库存
const spitStockSql = async(num,id)=>{
  let _update = `update product_specifications set stock= stock - ${num} where id = ${id}`;
  log.info(_update);
  await pool.query(_update);
}


/**
 * 小程序用 生成订单
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const insertOrder = async (req, res, next)=> {
  const { openid } = req;
  const {allPrice,collect_name,address,phone,productList,chooseId,addressId,form_id,account_id} = req.body;

  // const {specifications_name,number,price} = productList;
  try {
    const orderNumberRows = new Date().getTime()+''+Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,8-1));
    _sql = `insert into account_order(account_id,order_number,should_price,
      collect_name,address,phone,create_time,pay_status)
      values(?,?,?,?,?,?,?,?)`;
    const params = [
      account_id,
      orderNumberRows,
      allPrice,
      collect_name,
      address,
      phone,
      new Date(),
      1
    ]
    _sql = mysql.format(_sql, params);
    log.info(_sql);
    const orderRows = await pool.query(_sql);   //订单id
    //批量新增商品订单表
    let values = [];
    let date = new Date();
    let productIdArr = [];
    productList.map((item,index)=>{
      values.push([
        orderRows.insertId,
        item.product_id,
        item.name,
        item.number,
        item.current_price,
        date
      ]);
      productIdArr.push(item.product_id);
      spitStockSql(item.number,item.specifications_id);
    })
    _sql = `insert into order_goods (order_id,product_id,specifications_name,number,price,create_time) values ?`;
    _sql = mysql.format(_sql, [values]);
    log.info(_sql);
    await pool.query(_sql);
   
    //更新购物车状态
    _sql = `update goods_shopcar set shopcar_status = 2 where id in (${chooseId.replace(/-/g,',')})`;
    log.info(_sql);
    await pool.query(_sql);

    //更新商品的销售数量
    // _sql = `update product set seal_num = seal_num + 1 where id in (${productIdArr.join()})`
    // log.info(_sql);
    // await pool.query(_sql);

    //更新收貨地址
    _sql = `update account_address set collect_name = ?,address=?,phone = ? where id = ?`;
    let addressParam = [collect_name,address,phone,addressId];
    _sql = mysql.format(_sql,addressParam);
    await pool.query(_sql);

    //获取支付签名
    programApi.payAction(req,openid,orderNumberRows,allPrice).then((payParamsObj)=>{
      const { code,data } = payParamsObj;
      if(code===status.OK){
        const resultData = programApi.getPayParams(data.prepayId,data.tradeId);
        resultData.orderNumber = orderNumberRows;
        console.log("====================");
        console.log(resultData);
        res.status(status.OK).json(resultData);
      }else{
        return handleError(res, data);
      }
    })
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

/**
 * 小程序获取所有订单
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getProgramOrderList = async (req, res, next)=> {
  const pageSize = ~~req.query.pageSize || 10;
  const current = req.query.current || 1;
  const start = (current - 1) * pageSize;
  const {type} = req.query;
  const {account_id} = req;
  //获取用户角色
  let userSql = `select is_admin from account where id = ${account_id}`;
  let isAdmin = await pool.query(userSql);

  let _sql = `SELECT
                *
              FROM
                (
                  SELECT
                    a.*, GROUP_CONCAT(c.cover) AS cover,
                    count(order_number) AS count,
                    d.openid
                  FROM
                    account_order a
                  LEFT JOIN account d ON d.id = a.account_id
                  LEFT JOIN order_goods b ON a.id = b.order_id
                  LEFT JOIN product c ON c.id = b.product_id
                  GROUP BY
                    a.order_number
                ) a 
              where order_status = 1`;
  if(isAdmin === 0){
    _sql = _sql + ` and account_id = ${account_id}`;
  }
  if(type ==1){
    //带付款
    _sql = _sql + ` and pay_status = 1`
  }else if(type ==2){
    //待发货
    _sql = _sql + ` and pay_status = 2 and collect_status = 1`
  }
  else if(type ==3){
    //待收货
    _sql = _sql + ` and pay_status = 2 and collect_status = 2`
  }
  const _countSql = `select count(*) as count from (${_sql}) a`;
  _sql = _sql + ` order by create_time desc limit ${start}, ${pageSize}`;
  log.info(_sql);
  try {
    const rows = await pool.query(_sql);
    const counts = await pool.query(_countSql);
    res.status(status.OK).json({ data:rows,
      totalItems: counts[0].count
    });
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

const getOrderDetail =  async (req, res, next)=> {
  const {order_number} = req.params;  
  try {
    let sql =  `SELECT
                  a.*, 
                  d.nikename,
                  d.city,
                  d.provice,
                  d.country,
                  d.portrait
                FROM
                  account_order a
                LEFT JOIN account d ON d.id = a.account_id
                WHERE
                order_number = ?`;
    let params = [order_number];
    sql = mysql.format(sql,params);
    const rows = await pool.query(sql);
    let orderObj = rows[0];
    let productIdArr = [];
 
    sql = `select 
      a.specifications_name,
      a.number,
      a.price,
      a.order_goods_status,
      a.product_id,
      b.title,
      b.cover,
      c.name as brand_name,
      d.name as type_name
      from order_goods a left join product b on a.product_id = b.id 
      left join goods_brand c on c.id = b.brand_id
      left join goods_type d on d.id = b.type_id
      where a.order_id = ${orderObj.id}`;
    const p_rows = await pool.query(sql);
    log.info(sql);
    orderObj.productInfo = p_rows;
    res.status(status.OK).json(orderObj);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};
//确认收货
const collectGoods =  async (req, res, next)=> {
  const {order_number} = req.params;  
  try {
    let sql =  `update account_order set collect_status = 3,receipt_time=? where order_number = ?`;
    let params = [new Date(),order_number];
    sql = mysql.format(sql,params);
    await pool.query(sql);
    res.status(status.OK).json(order_number);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};
//删除订单
const deleteOrder =  async (req, res, next)=> {
  const {order_number} = req.params;  
  try {
    let sql =  `update account_order set order_status = 0 where order_number = ?`;
    let params = [order_number];
    sql = mysql.format(sql,params);
    await pool.query(sql);
    res.status(status.OK).json(order_number);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};
//发货
const deliverGoods =  async (req, res, next)=> {
  const {order_number} = req.params;  
  const {logistics_name,logistics_number,form_id} = req.body;  
  try {
    let sql =  `update account_order set
      collect_status = 2,
      pay_status = 2,
      logistics_name=?,
      logistics_number=? ,
      ship_time=?
      where order_number = ?`;
    let params = [logistics_name,logistics_number,new Date(),order_number];
    sql = mysql.format(sql,params);
    log.info(sql);
    await pool.query(sql);

    //获取收货人基本信息
    sql = `select a.*,b.openid from account_order a left join account b on a.account_id = b.id where order_number = ${order_number}`;
    const rows = await pool.query(sql);
    res.status(status.OK).json(order_number);
    if(rows){
      const user = rows[0];
      _sql = `select * from tpl_config where account_id = ${user.account_id} and invalid_time > now() and used = 0 limit 1`;
      const tplRows = await pool.query(_sql);
      if(tplRows){
        const tplConfig = tplRows[0];
        //获取accessToken
        programApi.getAccessToken().then((access_token)=>{
          const tempData = {
            "touser":tplConfig.openid,
            "template_id":config.programTemplate.deliverTemplateId,
            "page":`pages/orderRecordDetail/orderRecordDetail?order_number=${order_number}`,
            "form_id":tplConfig.form_id,
            "data": {
              "keyword1": {
                "value": order_number, 
              }, 
              "keyword2": {
                "value": logistics_name 
              }, 
              "keyword3": {
                "value": logistics_number
              } , 
              "keyword4": {
                "value": user.collect_name
              } ,
              "keyword5": {
                "value": user.phone
              } ,
              "keyword6": {
                "value": user.address
              } 
            }
          }
          //发送消息
          programApi.sendMessage(access_token,tempData).then((message)=>{
            updateUsed(tplConfig.id);
            log.info('模板消息返回');
            log.info(message);
          })
        })
      }
    }
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

/**
 * 获取支付签名
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const payAction = async (req, res, next)=> {
  try {
    const { orderNumber,allPrice } = req.body; 
    const { openid } = req;
    //获取支付签名
    programApi.payAction(req,openid,orderNumber,allPrice).then((payParamsObj)=>{
      const { code,data } = payParamsObj;
      if(code===status.OK){
        const resultData = programApi.getPayParams(data.prepayId,data.tradeId);
        console.log("====================");
        console.log(resultData);
        res.status(status.OK).json(resultData);
      }else{
        return handleError(res, data);
      }
    })
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
}

/**
 * 支付(待处理)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const payOrder = async (req, res, next)=> {
  try {
    const { orderNumber,allPrice,formId,address } = req.body;  
    const { openid } = req;
    const payTime = new Date();
    let sql = `update account_order set pay_status = 2,pay_time = ?,pay_price=? where order_number = ?`;
    let params = [payTime,allPrice,orderNumber];
    sql = mysql.format(sql,params);
    await pool.query(sql);
    //往支付记录表插入一条记录
    // sql =  `insert into pay_order_info(code,order_number,user_id,pay_money,status,create_time,order_request,order_result,pay_result) values(?,?,?,?,?,?,?,?,?)`;

    res.status(status.OK).json(orderNumber);
    //假设支付成功
    //更新订单状态

    /*******************支付成功通知*************** */
    //获取accessToken
    programApi.getAccessToken().then((access_token)=>{
      const tempData = {
        "touser":openid,
        "template_id":config.programTemplate.paySuccessTemplateId,
        "page":`pages/allorder/allorder?type = 2`,
        "form_id":formId,
        "data": {
          "keyword1": {
            "value": allPrice,    //金额
          }, 
          "keyword2": {
            "value": orderNumber   //编号
          }, 
          "keyword3": {
            "value": moment(payTime).format('YYYY-MM-DD HH:mm:ss')
          } , 
          "keyword4": {
            "value": address
          } ,
        }
      }
      
      //发送消息
      programApi.sendMessage(access_token,tempData).then((message)=>{
        console.log(message);
        log.info('模板消息返回');
        log.info(message);
      })
    })
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};
//后台获取支付记录
const getPayRecord =  async (req, res, next)=> {
  const pageSize = ~~req.query.pageSize || 10;
  const current = req.query.current || 1;
  const start = (current - 1) * pageSize;
  const {order_number} = req.query;
  try {
    let sql =  `SELECT
        a.*, c.nikename
      FROM
        pay_order_info a
      LEFT JOIN account_order b ON b.order_number = a.order_number
      LEFT JOIN account c ON c.id = a.user_id`;
    const _countSql = `select count(*) as count from (${sql}) a`;
    sql = sql + ` order by a.create_time desc limit ${start}, ${pageSize}`;
    log.info(sql);
    let params = [];
    sql = mysql.format(sql,params);
    const rows = await pool.query(sql);
    res.status(status.OK).json(rows);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

//取消订单
const cancelOrder =  async (req, res, next)=> {
  const {order_number} = req.params;
  try {
    let sql =  `update account_order set order_status = 0 where order_number = ?`;
    let params = [order_number];
    sql = mysql.format(sql,params);
    log.info(sql);
    await pool.query(sql);
    res.status(status.OK).json(order_number);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

//查询与我相关的订单信息
const getAllOrderInfo =  async (req, res, next)=> {
  try {
    const { account_id } = req;
    //查询待支付的订单数
    let sql =  `select count(*) as count from (select 1 from account_order where account_id = ? and pay_status = 1) a`;
    let params = [account_id];
    sql = mysql.format(sql,params);
    let rows = await pool.query(sql);
    let pendingPayment = rows[0].count;
    //待发货
    sql =  `select count(*) as count from (select 1 from account_order where account_id = ? and pay_status = 2 and collect_status = 1) a`;
    sql = mysql.format(sql,params);
    rows = await pool.query(sql);
    let beShipped = rows[0].count;
    //待收货
    sql =  `select count(*) as count from (select 1 from account_order where account_id = ? and pay_status = 2 and collect_status = 2) a`;
    sql = mysql.format(sql,params);
    rows = await pool.query(sql);
    let beReceived = rows[0].count;
    res.status(status.OK).json({pendingPayment,beShipped,beReceived});
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

module.exports = {
  getOrderList,
  insertOrder,
  getProgramOrderList,
  getOrderDetail,
  collectGoods,
  deleteOrder,
  deliverGoods,
  payOrder,
  getPayRecord,
  payAction,
  cancelOrder,
  getAllOrderInfo
};
