const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const log = require('log4js').getLogger("programAuthController");
const config = require('../../../config/environment');
const { jscode2session,decryptData } = require('../../../config/programApi');
var axios = require('axios');
const pool = require('../../../utils/pool')
const mysql = require('mysql');

const jwt = require('jsonwebtoken');

const accountAction = async (req, res, response)=> {
  try{
    let _sql = `select * from account where openid = ?`;
    let params = [response.openid];
    _sql = mysql.format(_sql,params);
    let account_id = '';
    let mall_user = {};
    const rows = await pool.query(_sql);
    if(rows.length === 0){
      //新增
      _sql = `insert into account(openid,create_time) values (?,?)`;
      params = [response.openid,new Date()];
      _sql = mysql.format(_sql,params);
      const rows = await pool.query(_sql);
      account_id = rows.insertId;
    }else{
      account_id = rows[0].id;
      mall_user = rows[0]
    }
    const sessionid = jwt.sign({ openid: response.openid,session_key:response.session_key,account_id:account_id}, config.AppjwtEncryption);
    return res.status(status.OK).json({sessionid,...mall_user});
  }catch(err){
    return handleError(res, err);
  }
}

const programLogin = async (req, res, next)=> {
  try {
    const { code } = req.params;
    axios({
      method: 'get',
      url: jscode2session(config.AppID,config.AppSecret,code)
    }).then((response) => {
      const data = response.data;
      if(data.errcode){
        return handleError(res, data.errMsg);
      }else{
        return accountAction(req, res, data);
      }
    })
  } catch (err) {
    log.error(err);
    return handleError(res, err);
  }
};

const updateAccountInfo = async(req, res)=> {
  try{
    const { openid,session_key,account_id } = req;
    const { encryptedData,iv } = req.body;
    const {nickName,city,province,country,avatarUrl} = decryptData(encryptedData,iv,config.AppID,session_key);
    let _sql = `update account set nikename = ?,city=?,provice=?,country=?,portrait=? where id = ?`;
    let params = [
      nickName,
      city,
      province,
      country,
      avatarUrl,
      account_id
    ];
    _sql = mysql.format(_sql,params);
    const rows = await pool.query(_sql);
    return res.status(status.OK).json(rows);
  }catch(err){
    return handleError(res, err);
  }
};

const insertAccountAddress = async(req, res)=> {
  try{
    const { account_id } = req;
    const {collect_name,address,phone,default_status} = req.body;
    let _sql;
    let params;
    if(default_status){
      //将其他地址设为非默认
      _sql = `update account_address set default_status = 0 where account_id = ?`;
      params = [
        account_id,
      ];
      _sql = mysql.format(_sql,params);
      await pool.query(_sql);
    }
    _sql = `insert into account_address (account_id,collect_name,address,phone,default_status) values (?,?,?,?,?)`;
    params = [
      account_id,
      collect_name,
      address,
      phone,
      default_status
    ];
    _sql = mysql.format(_sql,params);
    const rows = await pool.query(_sql);
    return res.status(status.OK).json(rows);
  }catch(err){
    return handleError(res, err);
  }
};

const updateAccountAddress = async(req, res)=> {
  try{
    const { account_id } = req;
    const { id } = req.params;
    const {collect_name,address,phone,default_status} = req.body;
    let _sql,params;
    if(default_status){
      //将其他地址设为非默认
      _sql = `update account_address set default_status = 0 where account_id = ?`;
      params = [
        account_id,
      ];
      _sql = mysql.format(_sql,params);
      await pool.query(_sql);
    }
    _sql = `update account_address set collect_name=?,address=?,phone=?,default_status=? where id = ?`;
    params = [
      collect_name,
      address,
      phone,default_status,
      id
    ];
    _sql = mysql.format(_sql,params);
    const rows = await pool.query(_sql);
    return res.status(status.OK).json(rows);
  }catch(err){
    return handleError(res, err);
  }
};

const deleteAccountAddress = async(req, res)=> {
  try{
    const { account_id } = req;
    const { id } = req.params;
    let _sql = `delete from account_address where id = ? and account_id = ?`;
    let params = [
      id,
      account_id,
    ];
    _sql = mysql.format(_sql,params);
    const rows = await pool.query(_sql);
    return res.status(status.OK).json(rows);
  }catch(err){
    return handleError(res, err);
  }
};

const getAccountAddressList = async(req, res)=> {
  try{
    const { account_id } = req;
    const { address_status } = req.query;
    let _sql = `select * from account_address where account_id = ?`;
    if(address_status){
      _sql = _sql + ` and default_status = ${address_status}`
    }
    let params = [
      account_id,
    ];
    _sql = mysql.format(_sql,params);
    const rows = await pool.query(_sql);
    return res.status(status.OK).json(rows);
  }catch(err){
    return handleError(res, err);
  }
};


const getAccountAddressDetail = async(req, res)=> {
  try{
    const { id } = req.params;
    let _sql = `select * from account_address where id = ?`;
    let params = [
      id,
    ];
    _sql = mysql.format(_sql,params);
    const rows = await pool.query(_sql);
    return res.status(status.OK).json(rows[0]);
  }catch(err){
    return handleError(res, err);
  }
};

module.exports = {
  programLogin,
  updateAccountInfo,
  insertAccountAddress,
  updateAccountAddress,
  deleteAccountAddress,
  getAccountAddressList,
  getAccountAddressDetail
};
