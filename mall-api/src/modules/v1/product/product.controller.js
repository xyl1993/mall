const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const mysql = require('mysql');
const log = require('log4js').getLogger("productController");

const pool = require('../../../utils/pool')

const getProductList = async (req, res)=> {
  const pageSize = ~~req.query.pageSize || 10;
  const current = req.query.current || 1;
  const start = (current - 1) * pageSize;
  const {search,type_id,brand_id,recommendStatus,sort_type,sort_des} = req.query;
  let _sql = `select a.id,a.type_id,a.brand_id,a.title,a.cover,a.carousel,a.read_number,a.create_time,a.recommend,
    b.name as type,c.name as brand,d.current_price,d.original_price from product a 
    left join goods_type b on a.type_id = b.id
    left join goods_brand c on c.id = a.brand_id 
    left join (
      select id,product_id,name,min(current_price) current_price,stock,original_price from product_specifications GROUP BY product_id
    ) d on d.product_id = a.id
    where product_status = 1`;
  if (search) _sql = _sql + ` and a.title like '%${search}%'`;
  if (type_id) _sql = _sql + ` and a.type_id = ${type_id}`;
  if (brand_id) _sql = _sql + ` and a.brand_id = ${brand_id}`;
  if (recommendStatus) _sql = _sql + ` and a.recommend = ${recommendStatus}`;
  const _countSql = `select count(*) as count from (${_sql}) a`;
  if(sort_type == 1){
    //综合
    _sql = _sql + ` order by recommend desc,seal_num desc,create_time desc`;
  }else if(sort_type == 2){
    //价格
    if(sort_des == 1){
      _sql = _sql + ` order by current_price asc`;
    }else{
      _sql = _sql + ` order by current_price desc`;
    }
  }else if(sort_type == 3){
    //销量
    if(sort_des == 1){
      _sql = _sql + ` order by seal_num asc`;
    }else{
      _sql = _sql + ` order by seal_num desc`;
    }
  }else if(sort_type == 4){
    //日期
    if(sort_des == 1){
      _sql = _sql + ` order by create_time asc`;
    }else{
      _sql = _sql + ` order by create_time desc`;
    }
  }else{
    _sql = _sql + ` order by create_time desc`;
  }
  _sql = _sql + ` limit ${start}, ${pageSize}`;
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

//新增
const specificationsSql = (insertId,specifications)=>{
  //新增规格表
  let values = [];
  specifications.map((item,index)=>{
    values.push([
      insertId,
      item.name,
      item.original_price,
      item.current_price,
      item.stock
    ])
  })
  _sql = `insert into product_specifications(product_id,name,original_price,current_price,stock)
  values ?`;
  _sql = mysql.format(_sql, [values]);
  log.info(_sql);
  return _sql;
}
//修改
const editSpecificationsSql = async(updateData)=>{
  let _update = `update product_specifications set name=?,original_price=?,current_price=?,stock=? where id = ?`;
  _update = mysql.format(_update, updateData);
  log.info(_update);
  await pool.query(_update);
}

const addProduct = async (req, res)=> {
  const {type_id,brand_id,title,cover,carousel,detail,specifications} = req.body;
  let _sql = `insert into product(type_id,brand_id,title,cover,carousel,detail,create_time,create_id)
    values(?,?,?,?,?,?,?,?)`;
  const params = [
    type_id,
    brand_id,
    title,
    cover,
    carousel,
    detail,
    new Date(),
    req.userId
  ]
  _sql = mysql.format(_sql, params);
  log.info(_sql);
  try {
    const rows = await pool.query(_sql);

    _sql = specificationsSql(rows.insertId,specifications);
    await pool.query(_sql);

    res.status(status.OK).json(rows.insertId);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

const deleteProduct = async (req, res)=> {
  
  const productId = req.params.id;
  
  let _sql = `update product set product_status = -1 where id =${productId}`;
  log.info(_sql);
  try{
    await pool.query(_sql);
    res.status(status.OK).json('操作成功');
  } catch(err){
    log.error(err);
    return handleError(res, err);
  }
};
const getProductDetail = async (req, res, next)=>{
  const productId = req.params.id;
  let _sql = `select * from product where id=${productId}`;
  log.info(_sql);
  try{
    const rows = await pool.query(_sql);
    _sql = `select * from product_specifications where product_id = ${productId}`;
    const specifications = await pool.query(_sql);
    if(rows && rows.length>0){
      const result = {...rows[0],specifications:specifications};
      res.status(status.OK).json(result);
    }else{
      res.status(status.GONE).json('资源不存在');
    }
  } catch(err){
    log.error(err);
    return handleError(res, err);
  }
};
const editProduct = async(req, res, next)=>{
  const { type_id,brand_id,title,cover,carousel,detail,specifications } = req.body;
  const productId = req.params.id;
  let _sql = `update product set type_id=?,brand_id=?,
    title=?,cover=?,carousel=?,detail=?,modify_time=? where id= ?`;
  const params = [
    type_id,
    brand_id,
    title,
    cover,
    carousel,
    detail,
    new Date(),
    productId
  ];
  _sql = mysql.format(_sql,params);
  log.info(_sql);
  try{
    //修改主表
    await pool.query(_sql);
    //修改规格表
    let updateData = [];
    let insertData = [];
    specifications.map((item,index)=>{
      if(item.id){
        updateData=[
          item.name,
          item.original_price,
          item.current_price,
          item.stock,
          item.id
        ];
        editSpecificationsSql(updateData);
        updateData = [];
      }else{
        insertData.push([
          productId,
          item.name,
          item.original_price,
          item.current_price,
          item.stock
        ])
      }
    })
    if(insertData.length>0){
      _sql = `insert into product_specifications(product_id,name,original_price,current_price,stock)
      values ?`;
      _sql = mysql.format(_sql, [insertData]);
      log.info(_sql);
      await pool.query(_sql);
    }
    res.status(status.OK).json('操作成功');
  } catch(err){
    log.error(err);
    return handleError(res, err);
  }
}

const deleteSpecifications = async (req, res, next)=> {
  const id = Number(req.params.id);
  let _sql = `delete from product_specifications where id= ?`;
  let params = [
    id
  ];
  _sql = mysql.format(_sql, params);
  try {
    await pool.query(_sql);
    res.status(status.OK).json('操作成功');
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

const updateRecommend = async (req, res, next)=> {
  const id = Number(req.params.id);
  const { recommendStatus } = req.body;
  let _sql = `update product set recommend = ? where id= ?`;
  let params = [
    recommendStatus,
    id
  ];
  _sql = mysql.format(_sql, params);
  try {
    await pool.query(_sql);
    res.status(status.OK).json('操作成功');
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

const updatereadNumber = async (req, res, next)=> {
  const id = Number(req.params.id);
  let _sql = `update product set read_number = read_number + 1 where id= ?`;
  let params = [
    id
  ];
  _sql = mysql.format(_sql, params);
  try {
    await pool.query(_sql);
    res.status(status.OK).json(id);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};
module.exports = {
  getProductList,
  addProduct,
  deleteProduct,
  getProductDetail,
  editProduct,
  updateRecommend,
  deleteSpecifications,
  updatereadNumber
};
