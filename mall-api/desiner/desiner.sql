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
* 商品品牌表
*/
DROP TABLE IF EXISTS  `goods_brand`;
CREATE TABLE `goods_brand` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) DEFAULT NULL,   /*商品名称*/
  `status` bit DEFAULT 1,    /*0 删除 1有效*/
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
  `status` bit DEFAULT 1,    /*0 删除 1有效*/
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
  `create_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `create_id` bigint(20) DEFAULT NULL,
  `status` bit DEFAULT 1,    /*0 删除 1有效*/
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
  `status` bit DEFAULT 1,     /*1 关注  0取消关注*/
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/**
小程序收货地址表
*/
DROP TABLE IF EXISTS  `account`;
CREATE TABLE `account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) DEFAULT NULL,   
  `collect_name` varchar(500) DEFAULT NULL,      /*收货人*/
  `address` varchar(500) DEFAULT NULL,      /*收货地址*/
  `phone` varchar(30) DEFAULT NULL,      /*联系电话*/
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/**
订单表
*/
DROP TABLE IF EXISTS  `order`;
CREATE TABLE `order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) DEFAULT NULL,   /*用户*/
  `collect_name` varchar(500) DEFAULT NULL,      /*收货人*/
  `address` varchar(500) DEFAULT NULL,      /*收货地址*/
  `phone` varchar(30) DEFAULT NULL,      /*联系电话*/
  `specifications_id` bigint(20) DEFAULT NULL,      /*规格*/
  `product_id` bigint(20) DEFAULT NULL,      /*商品*/
  `money` double DEFAULT NULL,      /*成交价*/
  `pay_status` int DEFAULT NULL,      /*支付状态   1待支付  2支付 3退款*/
  `collect_status` int DEFAULT NULL,      /*收货状态   1待发货 2待收货 3收货*/
  `logistics_name` varchar(50) DEFAULT NULL,      /*物流名称*/
  `logistics_number` varchar(50) DEFAULT NULL,      /*物流单号*/
  `create_time` datetime DEFAULT NULL,  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;