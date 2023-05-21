/*
 Navicat Premium Data Transfer

 Source Server         : PC
 Source Server Type    : MySQL
 Source Server Version : 80033
 Source Host           : localhost:3306
 Source Schema         : wms

 Target Server Type    : MySQL
 Target Server Version : 80033
 File Encoding         : 65001

 Date: 21/05/2023 14:58:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for attendance
-- ----------------------------
DROP TABLE IF EXISTS `attendance`;
CREATE TABLE `attendance`  (
  `id` int(0) NOT NULL,
  `account` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '考勤打卡用户的工号',
  `time` datetime(0) NOT NULL COMMENT '考勤打卡的时间',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '姓名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of attendance
-- ----------------------------
INSERT INTO `attendance` VALUES (1, '2021304267', '2023-04-22 23:29:59', '饶炫');
INSERT INTO `attendance` VALUES (2, '2021304666', '2023-05-19 00:06:26', '小明');
INSERT INTO `attendance` VALUES (3, '2021304267', '2023-05-19 23:51:10', '饶炫');
INSERT INTO `attendance` VALUES (4, '2021304267', '2023-05-19 08:41:14', '饶炫');

-- ----------------------------
-- Table structure for evection
-- ----------------------------
DROP TABLE IF EXISTS `evection`;
CREATE TABLE `evection`  (
  `id` int(0) NOT NULL,
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '出差人账号',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '出差人姓名',
  `createtime` datetime(0) NULL DEFAULT NULL COMMENT '提交流程的时间',
  `planstarttime` datetime(0) NULL DEFAULT NULL COMMENT '计划出发时间',
  `planendtime` datetime(0) NULL DEFAULT NULL COMMENT '计划回来的时间',
  `starttime` datetime(0) NULL DEFAULT NULL COMMENT '出发时间',
  `endtime` datetime(0) NULL DEFAULT NULL COMMENT '回来的时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of evection
-- ----------------------------
INSERT INTO `evection` VALUES (1, '2021304267', '饶炫', '2023-05-16 14:58:18', '2023-05-16 18:05:52', '2023-05-21 18:06:01', '2023-05-17 07:56:34', '2023-05-20 16:56:39');
INSERT INTO `evection` VALUES (2, '2021304267', '饶炫', '2023-05-08 14:58:18', '2023-05-10 18:06:12', NULL, '2023-05-09 07:56:34', '2023-05-11 16:56:39');

-- ----------------------------
-- Table structure for overtime
-- ----------------------------
DROP TABLE IF EXISTS `overtime`;
CREATE TABLE `overtime`  (
  `id` int(0) NOT NULL,
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '加班人账号',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '加班人姓名',
  `createtime` datetime(0) NULL DEFAULT NULL COMMENT '提交流程的时间',
  `planstarttime` datetime(0) NULL DEFAULT NULL COMMENT '计划加班开始时间',
  `planendtime` datetime(0) NULL DEFAULT NULL COMMENT '计划加班结束时间',
  `endtime` datetime(0) NULL DEFAULT NULL COMMENT '实际加班结束时间',
  `flag` int(0) NULL DEFAULT NULL COMMENT '加班是否有效  0-无效  1-有效',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of overtime
-- ----------------------------
INSERT INTO `overtime` VALUES (1, '2021304267', '饶炫', '2023-05-15 16:58:18', '2023-05-16 18:05:52', '2023-05-16 21:06:01', '2023-05-16 23:56:39', 1);
INSERT INTO `overtime` VALUES (2, '2021304267', '饶炫', '2023-05-19 14:58:18', '2023-05-19 18:06:12', '2023-05-19 20:16:11', '2023-05-19 21:56:39', 0);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `account` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '职工工号',
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '名字',
  `password` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '密码',
  `age` int(0) NULL DEFAULT NULL,
  `sex` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '男女',
  `phone` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `role_id` int(0) NULL DEFAULT NULL COMMENT '角色 0-超级管理员，1-管理员，2-普通用户\r\n',
  `is_valid` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '是否有效 Y-有效，其他无效',
  `level` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '职称等级',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'sa', '超级管理员', '123', 18, '女', '111', 0, 'Y', '0');
INSERT INTO `user` VALUES (2, '2021304267', '饶炫', '123', 18, '女', '13155473547', 1, 'Y', '青铜');
INSERT INTO `user` VALUES (4, '2021304666', '小明', '123', 18, '女', NULL, 1, 'Y', '0');
INSERT INTO `user` VALUES (5, 'user', 'hg', '123', 32, '女', '124', 2, 'Y', '0');
INSERT INTO `user` VALUES (6, 'user1', '主力', '124', 31, '女', '123', 1, 'Y', '0');
INSERT INTO `user` VALUES (7, 'admin2', '马云', '1388888888', 55, '女', '13888888888', 0, 'Y', '0');
INSERT INTO `user` VALUES (8, 'user', '马化腾', '13666666666', 50, '女', '13666666666', 1, 'Y', '0');
INSERT INTO `user` VALUES (9, 'admin3', '任正非', '15999999999', 70, '女', '15999999999', 0, 'Y', '0');
INSERT INTO `user` VALUES (10, 'user', '柳青', '15888888888', 40, '女', '15888888888', 2, 'Y', '0');
INSERT INTO `user` VALUES (11, 'user', '孟晚舟', '123456', 45, '女', '13999999999', 2, 'Y', '0');
INSERT INTO `user` VALUES (12, 'admin4', '李彦宏', '123456', 50, '女', '18888888888', 1, 'Y', '0');
INSERT INTO `user` VALUES (13, 'sohu', '张朝阳', '123456', 55, '女', '13777777777', NULL, 'Y', '0');
INSERT INTO `user` VALUES (14, 'xiaomi', '雷军', '123456', 55, '女', '18999999999', NULL, 'Y', '0');
INSERT INTO `user` VALUES (15, 'brothers', '刘强东', '123456', 50, '女', '12345678910', 2, 'Y', '0');
INSERT INTO `user` VALUES (16, 'leshi', '贾跃亭', '123456', 54, '女', '12345678911', 2, 'Y', '0');
INSERT INTO `user` VALUES (17, 'admin5', '123', '456', 54, '女', '13012345678', NULL, 'Y', '0');
INSERT INTO `user` VALUES (18, 'superadmin', '黄钢', '123', 32, '女', '13063678382', NULL, 'Y', '钻石');

SET FOREIGN_KEY_CHECKS = 1;
