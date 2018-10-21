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
    const rows = await pool.query(_sql);
    if(rows.length === 0){
      //新增
      _sql = `insert into account(openid,create_time) values (?,?)`;
      params = [response.openid,new Date()];
      _sql = mysql.format(_sql,params);
      await pool.query(_sql);
    }
    const sessionid = jwt.sign({ openid: response.openid,session_key:response.session_key}, config.AppjwtEncryption);
    return res.status(status.OK).json({sessionid});
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
      console.log(data);
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
    const { openid,session_key } = req;
    const { encryptedData,iv } = req.body;
    const {nickName,city,province,country,avatarUrl} = decryptData(encryptedData,iv,config.AppID,session_key);
    let _sql = `update account set nikename = ?,city=?,provice=?,country=?,portrait=? where openid = ?`;
    let params = [
      nickName,
      city,
      province,
      country,
      avatarUrl,
      openid
    ];
    _sql = mysql.format(_sql,params);
    const rows = await pool.query(_sql);
    return res.status(status.OK).json(rows);
  }catch(err){
    return handleError(res, err);
  }
}

module.exports = {
  programLogin,
  updateAccountInfo
};
