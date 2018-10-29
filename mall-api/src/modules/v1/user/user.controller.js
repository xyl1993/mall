const status = require('http-status');
const {
  handleError
} = require('../../../utils/handleUtilFun');
const log = require('log4js').getLogger("userController");
const mysql = require('mysql');

const pool = require('../../../utils/pool')



const getProgramUserList = async (req, res, next)=> {
  try {
    const pageSize = ~~req.query.pageSize || 10;
    const current = req.query.current || 1;
    const start = (current - 1) * pageSize;
    const { nikename } = req.query;
    let sql = `select * from account where 1 = 1`;
    const _countSql = `select count(*) as count from (${sql}) a`;
    if(nikename){
      sql = sql + ` and nikename like '%${nikename}%'`
    }
    sql = sql + ` order by create_time desc limit ${start}, ${pageSize}`;
    const rows = await pool.query(sql);
    const counts = await pool.query(_countSql);
    res.status(status.OK).json({ data:rows,
      totalItems: counts[0].count
    });
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};


const updateProgramUserAdmin = async (req, res, next)=> {
  try {
    let { id } = req.params;
    let sql = `update account 
              set is_admin= case when is_admin = 0 then 1  else 0 end 
              where id = ?`;
    let params = [id];
    sql = mysql.format(sql,params);
    await pool.query(sql);
    res.status(status.OK).json('操作成功');
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

const getProgramUserInfo = async (req, res, next)=> {
  try {
    const { account_id } = req;
    let sql = `select * from account where id = ${account_id}`;
    const rows = await pool.query(sql);
    res.status(status.OK).json(rows[0]);
  } catch(err) {
    log.error(err);
    return handleError(res, err);
  }
};

module.exports = {
  getProgramUserList,
  updateProgramUserAdmin,
  getProgramUserInfo
};
