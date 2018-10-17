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

/*
* 商品
*/
DROP TABLE IF EXISTS  `product`;
CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(300) DEFAULT NULL,   /*商品名称*/
  `original_price` double DEFAULT NULL, /*原价*/
  `current_price` double DEFAULT NULL,  /*现价*/
  `stock` int DEFAULT NULL,  /*库存*/
  `classification` varchar DEFAULT NULL,  /*分类*/
  `carousel` text DEFAULT NULL,  /*轮播图*/
  `detail` longtext DEFAULT NULL,  /*图文详情*/
  `read_number` int DEFAULT NULL,  /*阅读次数*/
  `create_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `create_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;