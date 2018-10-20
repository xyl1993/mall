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
  const {search,type_id,brand_id,recommendStatus} = req.query;
  let _sql = `select a.id,a.type_id,a.brand_id,a.title,a.cover,a.carousel,a.read_number,a.create_time,a.recommend,
    b.name as type,c.name as brand,d.current_price,d.original_price from product a 
    left join goods_type b on a.type_id = b.id
    left join goods_brand c on c.id = a.brand_id 
    left join (
      select a.* from 
      (select product_id,min(current_price) current_price from product_specifications GROUP BY product_id ) b
      JOIN product_specifications a ON a.product_id = b.product_id AND a.current_price = b.current_price
    ) d on d.product_id = a.id
    where 1 = 1`;
  if (search) _sql = _sql + ` and a.title like '%${search}%'`;
  if (type_id) _sql = _sql + ` and a.type_id = ${type_id}`;
  if (brand_id) _sql = _sql + ` and a.brand_id = ${brand_id}`;
  if (recommendStatus) _sql = _sql + ` and a.recommend = ${recommendStatus}`;
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
  
  let _sql = `delete from product where id =${productId}`;
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
    _sql = `delete from product_specifications where product_id = ${productId}`;
    await pool.query(_sql);
    _sql = specificationsSql(productId,specifications);
    await pool.query(_sql);
    res.status(status.OK).json('操作成功');
  } catch(err){
    log.error(err);
    return handleError(res, err);
  }
}
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
module.exports = {
  getProductList,
  addProduct,
  deleteProduct,
  getProductDetail,
  editProduct,
  updateRecommend
};
