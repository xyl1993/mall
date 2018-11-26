/*创建数据库*/
DROP DATABASE IF EXISTS mall;
CREATE DATABASE IF NOT EXISTS mall DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE mall;


/*
* 用户表
*/
DROP TABLE IF EXISTS  `sys_users`;
CREATE TABLE `sys_users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account` varchar(32) DEFAULT NULL,
  `nike_name` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `login_time` datetime DEFAULT NULL,
  `portrait` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into sys_users (account,nike_name,password,create_time,login_time,portrait) values('admin','admin','admin',now(),now(),'');

/**基础数据表**/
DROP TABLE IF EXISTS  `base_data`;
CREATE TABLE `base_data` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,   /*名称*/
  `code` varchar(100) DEFAULT NULL,   /*类型*/
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*
* 轮播图表
*/
DROP TABLE IF EXISTS  `carousel`;
CREATE TABLE `carousel` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(1000) DEFAULT NULL,
  `sort` int DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*
* 商品品牌表
*/
DROP TABLE IF EXISTS  `goods_brand`;
CREATE TABLE `goods_brand` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cover` varchar(1000) DEFAULT NULL, /*缩略图*/
  `name` varchar(300) DEFAULT NULL,   /*商品名称*/
  `brand_status` int DEFAULT 1,  /* 品牌状态  1正常  -1删除 */
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*
* 品牌对应的类型
*/
DROP TABLE IF EXISTS  `goods_type`;
CREATE TABLE `goods_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `brand_id`bigint(20) NOT NULL,  
  `cover` varchar(1000) DEFAULT NULL, /*缩略图*/
  `name` varchar(300) DEFAULT NULL,   /*类型名称*/
  `type_status` int DEFAULT 1,  /* 品牌状态  1正常  -1删除 */
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*
* 商品
*/
DROP TABLE IF EXISTS  `product`;
CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type_id` bigint(20) NOT NULL,  /*类型*/
  `brand_id` bigint(20) NOT NULL,  /*品牌*/
  `title` varchar(300) DEFAULT NULL,   /*商品名称*/
  `cover` varchar(1000) DEFAULT NULL, /*缩略图*/
  `carousel` text DEFAULT NULL,  /*轮播图*/
  `detail` longtext DEFAULT NULL,  /*图文详情*/
  `read_number` int DEFAULT 0,  /*阅读次数*/
  `seal_num` int DEFAULT 0,  /*销量*/
  `create_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `create_id` bigint(20) DEFAULT NULL,
  `recommend` int DEFAULT 1,    /*0 不推荐 1推荐*/
  `product_status` int DEFAULT 1,  /*商品状态  1正常   -1删除*/
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/**
我的收藏
*/
DROP TABLE IF EXISTS  `collections`;
CREATE TABLE `collections` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) NOT NULL,   /*用户id*/
  `product_id` varchar(300) DEFAULT NULL,   /*商品id*/
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/**
规格表
*/
DROP TABLE IF EXISTS  `product_specifications`;
CREATE TABLE `product_specifications` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) NOT NULL,   /*商品id*/
  `name` varchar(300) DEFAULT NULL,   /*规格名称*/
  `original_price` double DEFAULT NULL, /*原价*/
  `current_price` double DEFAULT NULL,  /*现价*/
  `stock` int DEFAULT NULL,  /*库存*/
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/**
小程序用户表
*/
DROP TABLE IF EXISTS  `account`;
CREATE TABLE `account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) DEFAULT NULL,   
  `openid` varchar(50) DEFAULT NULL,  
  `nikename` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,  
  `provice` varchar(50) DEFAULT NULL,  
  `country` varchar(50) DEFAULT NULL,  
  `portrait` varchar(500) DEFAULT NULL,  
  `create_time` datetime DEFAULT NULL,  
  `status` int DEFAULT 1,     /*1 关注  0取消关注*/
  `is_admin` int DEFAULT 0,     /*1是管理员 拥有发货权限*/
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/**
小程序收货地址表
*/
DROP TABLE IF EXISTS  `account_address`;
CREATE TABLE `account_address` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20)  DEFAULT NULL,   /*用户*/
  `collect_name` varchar(500) DEFAULT NULL,      /*收货人*/
  `address` varchar(500) DEFAULT NULL,      /*收货地址*/
  `phone` varchar(30) DEFAULT NULL,      /*联系电话*/
  `default_status` tinyint DEFAULT 0,      /*是否是默认地址 默认0*/
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/**
订单编号表
*/
DROP TABLE IF EXISTS  `order_number`;
CREATE TABLE `order_number` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/**
订单表
*/
DROP TABLE IF EXISTS  `account_order`;
CREATE TABLE `account_order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20)  DEFAULT NULL,   /*用户*/
  `order_number` varchar(50) DEFAULT NULL,   /*编号*/
  `pay_price` double DEFAULT NULL,   /*实际支付价格*/
  `should_price` double DEFAULT NULL,   /*应该支付价格*/
  `collect_name` varchar(30) DEFAULT NULL,      /*收货人*/
  `address` varchar(200) DEFAULT NULL,      /*收货地址*/
  `phone` varchar(30) DEFAULT NULL,      /*联系电话*/
  `pay_status` int DEFAULT 1,      /*支付状态   1待支付  2支付 3退款*/
  `pay_time` datetime DEFAULT NULL,     /*支付时间*/
  `collect_status` int DEFAULT 1,      /*收货状态   1待发货 2待收货 3收货*/
  `ship_time` datetime DEFAULT NULL,      /*发货时间*/
  `receipt_time` datetime DEFAULT NULL,      /*收获时间*/
  `logistics_name` varchar(50) DEFAULT NULL,      /*物流名称*/
  `logistics_number` varchar(50) DEFAULT NULL,      /*物流单号*/
  `order_status` int DEFAULT 1,      /*记录状态 1 正常 0 删除 -1 禁用*/
  `create_time` datetime DEFAULT NULL,  
  `update_time` datetime DEFAULT NULL,  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/**
购物车表
*/ 
DROP TABLE IF EXISTS  `goods_shopcar`;
CREATE TABLE `goods_shopcar` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20)  DEFAULT NULL,   /*用户*/
  `product_id` bigint(20) DEFAULT NULL,   /*商品id*/
  `specifications_id` bigint(20) DEFAULT NULL,   /*规格id*/
  `number` int DEFAULT NULL,    /*数量*/
  `shopcar_status` int DEFAULT 1,      /*记录状态 1 正常 0 删除 -1 禁用 2已经加入订单*/
  `update_time` datetime DEFAULT NULL,  
  `create_time` datetime DEFAULT NULL,  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/**
订单商品表
*/ 
DROP TABLE IF EXISTS  `order_goods`;
CREATE TABLE `order_goods` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) DEFAULT NULL,   /*订单id*/
  `product_id` bigint(20) DEFAULT NULL,   /*商品id*/
  `specifications_name` varchar(100) DEFAULT NULL,   /*规格名称   防止规格表删除查不到数据*/
  `number` int DEFAULT NULL,    /*数量*/
  `price` double DEFAULT NULL,    /*价格*/
  `order_goods_status` int DEFAULT 1,      /*记录状态 1 正常 0 删除 -1 禁用*/
  `update_time` datetime DEFAULT NULL,  
  `create_time` datetime DEFAULT NULL,  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*模板form_id*/
drop table if exists tpl_config;
CREATE TABLE `tpl_config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT, /*id*/
  `openid` varchar(32)  NOT NULL, /*用户openid*/
  `account_id` bigint(20) NOT NULL,   /*用户id*/
  `type` varchar(2), /*01表单提交   02支付场景*/
  `form_id` varchar(300),/*表单提交场景下，为 submit 事件带上的 formId；支付场景下，为本次支付的 prepay_id*/
  `create_time` datetime, /*创建时间*/
  `invalid_time` datetime, /*过期时间*/
  `used` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*订单信息*/
drop table if exists pay_order_info;
CREATE TABLE `pay_order_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT, /*订单id*/
  `code` varchar(32) NOT NULL,/*支付订单号*/
  `order_number` varchar(32) NOT NULL,/*商品订单号*/
  `user_id` bigint(20) NOT NULL,/*用户ID*/
  `pay_money` decimal(10,2) NOT NULL DEFAULT '0.00', /*付款金额*/
  `status` varchar(20) DEFAULT NULL, /*00未支付 01支付成功 02支付失败*/
  `create_time` datetime DEFAULT NULL, /*订单创建时间*/
  `order_request` varchar(1000) DEFAULT NULL, /*下单请求xml*/
  `order_result` varchar(1000) DEFAULT NULL, /*下单返回结果xml*/
  `pay_result` varchar(1000) DEFAULT NULL, /*用户支付返回结果xml*/
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;