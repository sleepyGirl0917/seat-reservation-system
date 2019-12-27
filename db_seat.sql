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
  `address` varchar(128) DEFAULT NULL COMMENT '店铺详细地址',
  PRIMARY KEY (`shop_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_shop
-- ----------------------------
INSERT INTO `t_shop` VALUES (1, '众独空间(大智无界店)', '13498476301', '湖北', '武汉', '江岸区', '武汉市江岸区大智路大智无界空中小镇1栋8楼804号铺');
INSERT INTO `t_shop` VALUES (2, '众独空间(昙华林店)', '13745454545', '湖北', '武汉', '武昌区', '武汉市武昌区中山路泛悦中心A栋1905室
（轨道交通2号线/7号线螃蟹站E出口步行10米）');

-- ----------------------------
-- Table structure for t_shop_seat
-- ----------------------------
DROP TABLE IF EXISTS `t_shop_seat`;
CREATE TABLE `t_shop_seat`  (
  `sid` int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '座位表id',
  `shop_id` int(4) UNSIGNED NOT NULL COMMENT '店铺id',
  `seat_id` varchar(8) DEFAULT NULL COMMENT '座位编号',
  `seat_info` varchar(8) DEFAULT NULL COMMENT '座位信息',
  `seat_type` int(4) DEFAULT NULL COMMENT '座位类别',   -- 0:单人座 1：双人座
  `seat_price` int(4) DEFAULT NULL COMMENT '座位单价',
  PRIMARY KEY (`sid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_shop_seat
-- ----------------------------
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,1,'单人座：1',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,2,'单人座：2',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,3,'单人座：3',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,4,'单人座：4',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,5,'单人座：5',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,6,'单人座：6',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,7,'单人座：7',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,8,'单人座：8',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,9,'单人座：9',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,10,'单人座：10',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,11,'单人座：11',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,12,'单人座：12',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,13,'单人座：13',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,14,'单人座：14',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,15,'单人座：15',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,16,'单人座：16',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,17,'单人座：17',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,18,'单人座：18',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,19,'单人座：19',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,20,'单人座：20',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,21,'单人座：21',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,22,'单人座：22',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,23,'单人座：23',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,24,'单人座：24',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,25,'单人座：25',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,26,'单人座：26',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,27,'单人座：27',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,28,'单人座：28',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,29,'单人座：29',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,30,'单人座：30',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,31,'单人座：31',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,32,'单人座：32',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,33,'单人座：33',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,34,'单人座：34',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,35,'单人座：35',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,36,'单人座：36',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,37,'单人座：37',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,38,'单人座：38',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,39,'单人座：39',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,40,'单人座：40',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,41,'单人座：41',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,42,'单人座：42',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,43,'单人座：43',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,44,'单人座：44',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,45,'单人座：45',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,46,'单人座：46',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,47,'单人座：47',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,48,'单人座：48',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,49,'单人座：49',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,50,'单人座：50',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,51,'单人座：51',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,52,'单人座：52',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,53,'单人座：53',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,54,'单人座：54',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,55,'单人座：55',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,56,'单人座：56',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,57,'单人座：57',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,58,'单人座：58',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,'V1','双人座：V1',1,20);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(1,'V2','双人座：V2',1,20);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,1,'单人座：1',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,2,'单人座：2',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,3,'单人座：3',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,4,'单人座：4',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,5,'单人座：5',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,6,'单人座：6',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,7,'单人座：7',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,8,'单人座：8',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,9,'单人座：9',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,10,'单人座：10',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,11,'单人座：11',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,12,'单人座：12',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,13,'单人座：13',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,14,'单人座：14',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,15,'单人座：15',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,16,'单人座：16',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,17,'单人座：17',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,18,'单人座：18',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,19,'单人座：19',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,20,'单人座：20',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,21,'单人座：21',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,22,'单人座：22',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,23,'单人座：23',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,24,'单人座：24',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,25,'单人座：25',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,26,'单人座：26',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,27,'单人座：27',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,28,'单人座：28',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,29,'单人座：29',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,30,'单人座：30',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,31,'单人座：31',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,32,'单人座：32',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,33,'单人座：33',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,34,'单人座：34',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,35,'单人座：35',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,36,'单人座：36',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,37,'单人座：37',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,38,'单人座：38',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,39,'单人座：39',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,40,'单人座：40',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,41,'单人座：41',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,42,'单人座：42',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,43,'单人座：43',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,44,'单人座：44',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,45,'单人座：45',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,46,'单人座：46',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,47,'单人座：47',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,48,'单人座：48',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,49,'单人座：49',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,50,'单人座：50',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,51,'单人座：51',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,52,'单人座：52',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,53,'单人座：53',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,54,'单人座：54',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,55,'单人座：55',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,56,'单人座：56',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,57,'单人座：57',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,58,'单人座：58',0,9);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,'V1','双人座：V1',1,20);
INSERT INTO `t_shop_seat`(shop_id,seat_id,seat_info,seat_type,seat_price) VALUES(2,'V2','双人座：V2',1,20);

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
  `balance` decimal(10,1) DEFAULT 0 COMMENT '用户所有储值卡余额', 
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES (1, 'Ann', '/img/avatar/default.png', '123456', '13414850282', '0','300.8');
INSERT INTO `t_user` VALUES (2, 'Tom', '/img/avatar/default.png', '123456', '13672606065', '1','644.9');
INSERT INTO `t_user` VALUES (3, 'Ali', '/img/avatar/default.png', '123456', '18162536357', '1','1300.0');

-- ----------------------------
-- Table structure for t_recharge
-- ----------------------------
DROP TABLE IF EXISTS `t_recharge`;
CREATE TABLE `t_recharge`(
  `recharge_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '充值id',
  `recharge_num` varchar(32) DEFAULT NULL COMMENT '订单编号（18位）/会员卡号',
  `user_id` int(8) UNSIGNED NULL DEFAULT NULL COMMENT '用户id',
  `recharge_type` int(4) DEFAULT NULL COMMENT '充值类型', -- 0：体验卡 1：储值卡 2：包时卡
  `recharge_money` int(8) UNSIGNED NULL DEFAULT NULL COMMENT '充值（金额）',
  `recharge_send` int(8) UNSIGNED NULL DEFAULT NULL COMMENT '赠送金额',
  `balance` decimal(10,1) DEFAULT 0 COMMENT '储值卡余额',
  `recharge_time` int(8) DEFAULT NULL COMMENT '充值（时长）',
  `recharge_date` datetime DEFAULT NULL COMMENT '充值日期',
  `deadline` datetime DEFAULT NULL COMMENT '有效期',
  `pay_money` int(8) UNSIGNED NULL DEFAULT NULL COMMENT '支付金额',
   PRIMARY KEY (`recharge_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_recharge
-- ----------------------------
INSERT INTO `t_recharge` VALUES (1,'CZ2019010100000001','1','1','500','200','300.8',null,'2019-1-3 15:03:00','2020-1-3 15:03:00','500');
INSERT INTO `t_recharge` VALUES (2,'CZ2019010100000002','2','1','1000','400','644.9',null,'2019-2-9 16:27:15','2021-2-9 16:27:15','1000');
INSERT INTO `t_recharge` VALUES (3,'CZ2019010100000003','3','2',null,null,null,'365','2019-2-9 16:10:00','2020-2-9 16:10:00','4566');
INSERT INTO `t_recharge` VALUES (4,'CZ2019010100000004','3','1','1000','400','1000.0',null,'2019-2-9 16:11:00','2020-2-9 16:11:00','1000');
INSERT INTO `t_recharge` VALUES (5,'CZ2019010100000005','3','1','500','200','300.8',null,'2019-2-9 16:22:00','2020-2-9 16:22:00','500');

-- ----------------------------
-- Table structure for t_order
-- ----------------------------
DROP TABLE IF EXISTS `t_order`;
CREATE TABLE `t_order`  (
  `order_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `user_id` int(8) UNSIGNED NULL DEFAULT NULL COMMENT '用户id',
  `shop_id` int(8) UNSIGNED NULL DEFAULT NULL COMMENT '店铺id',
  `order_num` varchar(32) DEFAULT NULL COMMENT '订单编号（18位）',
  `sid` int(8) UNSIGNED NULL DEFAULT NULL COMMENT '座位id',
  `seat_info` varchar(8) DEFAULT NULL COMMENT '座位信息',
  `order_date`  date DEFAULT NULL COMMENT '订座日期',
  `start_time` varchar(32) DEFAULT NULL COMMENT '订座开始时间',
  `end_time` varchar(32) DEFAULT NULL COMMENT '订座结束时间',
  `status_change_time` datetime DEFAULT NULL COMMENT '状态改变时间',
  `order_cost` decimal(10,1) DEFAULT 0  COMMENT '订座费用',
  `order_refund` decimal(10,1) DEFAULT 0  COMMENT '订座退款',
  `is_delay` int(4) DEFAULT 0 COMMENT '是否为延长时段', -- 0：不是 1：是
  `order_status` int(4) DEFAULT 0 COMMENT '订单状态',  -- 0：未开始或进行中 1：取消 2：结束 3：逾期
  `pay_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '支付时间',
  `pay_type` int(4) DEFAULT NULL COMMENT '支付方式',  -- 0：体验卡 1：储值卡 2：包时卡
  `pid` int(4) DEFAULT NULL COMMENT '支付会员卡id', 
  PRIMARY KEY (`order_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_order
-- ----------------------------

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

-- ----------------------------
-- Table structure for order_history 
-- 创建对order表操作历史表
-- ----------------------------
DROP TABLE IF EXISTS `order_history`;
CREATE TABLE `order_history` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) NOT NULL,
  `operatetype` varchar(200) NOT NULL,
  `operatetime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tri_insert_order 
-- 创建order表插入事件对应的触发器
-- ----------------------------
DROP TRIGGER IF EXISTS `tri_insert_order`;
DELIMITER ;;
CREATE TRIGGER `tri_insert_order` AFTER INSERT ON `t_order` FOR EACH ROW begin
    INSERT INTO order_history(order_id, operatetype, operatetime) VALUES (new.order_id, '订座',  now());
end
;;
DELIMITER ;