DROP DATABASE IF EXISTS db_seat;
CREATE DATABASE db_seat CHARSET=UTF8;
USE db_seat;

SET NAMES UTF8;
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_shop
-- ----------------------------
DROP TABLE IF EXISTS `t_shop`;
CREATE TABLE `t_shop`  (
  `shop_id` int(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '店铺id',
  `shop_name` varchar(128) DEFAULT NULL COMMENT '店铺名称',
  `shop_phone` varchar(16) DEFAULT NULL COMMENT '店铺电话',
  `province` varchar(8) DEFAULT NULL COMMENT '店铺所在省份',
  `city` varchar(8) DEFAULT NULL COMMENT '店铺所在市',
  `district` varchar(8) DEFAULT NULL COMMENT '店铺所在区县',
  `specified_address` varchar(128) DEFAULT NULL COMMENT '店铺详细地址',
  PRIMARY KEY (`shop_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_shop
-- ----------------------------
INSERT INTO `t_shop` VALUES (1, '众独空间（大智无界店）', '13498476301', '湖北', '武汉', '江岸区', '武汉市江岸区大智路大智无界空中小镇1栋8楼804号铺');
INSERT INTO `t_shop` VALUES (2, '众独空间（昙华林店）', '13745454545', '湖北', '武汉', '武昌区', '武汉市武昌区中山路泛悦中心A栋1905室
（轨道交通2号线/7号线螃蟹站E出口步行10米）');

-- ----------------------------
-- Table structure for t_shop_seat
-- ----------------------------
DROP TABLE IF EXISTS `t_shop_seat`;
CREATE TABLE `t_shop_seat`  (
  `sid` int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '座位表id',
  `shop_id` int(4) UNSIGNED NOT NULL COMMENT '店铺id',
  `seat_info` varchar(8) DEFAULT NULL COMMENT '座位信息',
  `seat_id` varchar(8) DEFAULT NULL COMMENT '座位编号',
  `seat_type` varchar(8) DEFAULT NULL COMMENT '座位类别',   -- 0:单人座 1：双人座
  `seat_price` int(4) DEFAULT NULL COMMENT '座位单价',
  PRIMARY KEY (`sid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_shop_seat
-- ----------------------------
INSERT INTO `t_shop_seat` VALUES (null, '1','双人座：V1','V1','1','20');
INSERT INTO `t_shop_seat` VALUES (null, '1','双人座：V2','V2','1','20');
INSERT INTO `t_shop_seat` VALUES (null, '1','单人座：1','1','0','9');
INSERT INTO `t_shop_seat` VALUES (null, '1','单人座：55','55','0','9');
INSERT INTO `t_shop_seat` VALUES (null, '2','双人座：V1','V1','1','20');
INSERT INTO `t_shop_seat` VALUES (null, '2','双人座：V2','V2','1','20');
INSERT INTO `t_shop_seat` VALUES (null, '2','单人座：1','1','0','9');
INSERT INTO `t_shop_seat` VALUES (null, '2','单人座：64','64','0','9');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `user_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_name` varchar(32) DEFAULT NULL COMMENT '用户名',
  `avatar` varchar(255) DEFAULT '/img/avatar/default.png' COMMENT '用户头像',
  `password` varchar(32) DEFAULT NULL COMMENT '用户密码',
  `phone` varchar(20) DEFAULT NULL COMMENT '用户手机号码',
  `gender` int(4) DEFAULT NULL COMMENT '用户性别',
  `balance` decimal(10,1) DEFAULT 0 COMMENT '用户账户余额',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES (1, 'Ann', '/img/avatar/default.png', '123456', '13414850282', '0', '300.8');
INSERT INTO `t_user` VALUES (2, 'Tom', '/img/avatar/default.png', '123456', '13672606065', '1', '644.9');
INSERT INTO `t_user` VALUES (3, 'Ali', '/img/avatar/default.png', '123456', '18162536357', '9', '1644.9');

-- ----------------------------
-- Table structure for t_recharge
-- ----------------------------
DROP TABLE IF EXISTS `t_recharge`;
CREATE TABLE `t_recharge`(
  `recharge_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '充值id',
  `recharge_num` varchar(32) DEFAULT NULL COMMENT '订单编号（18位）',
  `user_id` int(8) UNSIGNED NULL DEFAULT NULL COMMENT '用户id',
  `recharge_type` int(4) DEFAULT NULL COMMENT '充值类型', -- 0:储值卡 1：包时卡
  `recharge_money` int(8) UNSIGNED NULL DEFAULT NULL COMMENT '充值（金额）',
  `recharge_send` int(8) UNSIGNED NULL DEFAULT NULL COMMENT '赠送金额',
  `recharge_time` int(8) DEFAULT NULL COMMENT '充值（时长）',
  `recharge_date` datetime DEFAULT NULL COMMENT '充值日期',
  `deadline` datetime DEFAULT NULL COMMENT '有效期',
  `pay_money` int(8) UNSIGNED NULL DEFAULT NULL COMMENT '支付金额',
   PRIMARY KEY (`recharge_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_recharge
-- ----------------------------
INSERT INTO `t_recharge` VALUES (1,'CZ2019010100000001','1','0','500','200',null,'2019-1-3 15:03:00','2020-1-3 15:03:00','500');
INSERT INTO `t_recharge` VALUES (2,'CZ2019010100000002','2','0','1000','400',null,'2019-2-9 16:27:15','2021-2-9 16:27:15','1000');
INSERT INTO `t_recharge` VALUES (3,'CZ2019010100000003','3','1',null,null,'365','2019-2-9 16:10:00','2020-2-9 16:10:00','4566');

-- ----------------------------
-- Table structure for t_order
-- ----------------------------
DROP TABLE IF EXISTS `t_order`;
CREATE TABLE `t_order`  (
  `order_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `user_id` int(8) UNSIGNED NULL DEFAULT NULL COMMENT '用户id',
  `shop_id` int(8) UNSIGNED NULL DEFAULT NULL COMMENT '店铺id',
  `order_num` varchar(32) DEFAULT NULL COMMENT '订单编号（18位）',
  `order_phone` varchar(20) DEFAULT NULL COMMENT '下单手机',
  `seat_info` varchar(8) DEFAULT NULL COMMENT '座位信息',
  `order_date`  date DEFAULT NULL COMMENT '订座日期',
  `start_time` datetime DEFAULT NULL COMMENT '订座开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '订座结束时间',
  `pay_time` varchar(32) DEFAULT NULL COMMENT '支付时间',
  `pay_type` int(4) DEFAULT NULL COMMENT '支付方式',  -- 0：体验卡 1：储值卡 2：包时卡
  PRIMARY KEY (`order_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_order
-- ----------------------------
INSERT INTO `t_order` VALUES (1, 1, 1, '20190000000000001','13414850282','单人座：25', '2019-5-6','2019-5-6 09:15','2019-5-6 19:15','2019-5-6 09:00','1');
INSERT INTO `t_order` VALUES (2, 1, 2, '20190000000000002','13414850282', '单人座：36', '2019-5-7','2019-5-7 09:30','2019-5-7 18:00','2019-5-7 09:00','1');
INSERT INTO `t_order` VALUES (3, 2, 2, '20190000000000003','13672606065', '双人座：V1', '2019-5-9','2019-5-9 10:30','2019-5-9 18:30','2019-5-9 09:00','2');
INSERT INTO `t_order` VALUES (4, 3, 2, '20190000000000004','18162536357', '双人座：V1', '2019-12-5','2019-12-5 12:30','2019-12-5 18:30','2019-12-5 09:00','2');
INSERT INTO `t_order` VALUES (5, 3, 2, '20190000000000005','18162536357', '单人座：1', '2019-12-5','2019-12-5 19:30','2019-12-5 21:30','2019-12-5 09:00','2');
INSERT INTO `t_order` VALUES (6, 3, 2, '20190000000000006','18162536357', '单人座：25', '2019-12-6','2019-12-6 9:30','2019-12-6 18:30','2019-12-5 09:00','2');
INSERT INTO `t_order` VALUES (7, 3, 2, '20190000000000007','18162536357', '双人座：V2', '2019-12-7','2019-12-7 12:30','2019-12-7 18:30','2019-12-6 09:00','2');

-- ----------------------------
-- Table structure for t_admin
-- ----------------------------
DROP TABLE IF EXISTS `t_admin`;
CREATE TABLE `t_admin`  (
  `admin_id` int(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '管理员id',
  `name` varchar(32) DEFAULT NULL COMMENT '管理员姓名',
  `password` varchar(128) DEFAULT NULL COMMENT '管理员密码',
  `gender` int(4) DEFAULT NULL COMMENT '管理员性别',  -- 0:女 1：男
  `phone` varchar(20) DEFAULT NULL COMMENT '管理员联系电话',
  `avatar` varchar(255) DEFAULT '/img/default.png' COMMENT '管理员头像',
  PRIMARY KEY (`admin_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_admin
-- ----------------------------
INSERT INTO `t_admin` VALUES (1, 'admin', 'admin', '1', '13414850215', '/img/default.png' );