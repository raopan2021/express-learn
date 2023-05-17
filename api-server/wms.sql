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

 Date: 18/05/2023 00:00:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for attendance
-- ----------------------------
DROP TABLE IF EXISTS `attendance`;
CREATE TABLE `attendance`  (
  `id` int(0) NOT NULL,
  `userId` int(0) NOT NULL COMMENT '考勤打卡用户的id',
  `time` datetime(0) NOT NULL COMMENT '考勤打卡的时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of attendance
-- ----------------------------
INSERT INTO `attendance` VALUES (1, 1, '2023-05-17 23:29:59');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `no` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '账号',
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '名字',
  `password` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '密码',
  `age` int(0) NULL DEFAULT NULL,
  `sex` int(0) NULL DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `role_id` int(0) NULL DEFAULT NULL COMMENT '角色 0-超级管理员，1-管理员，2-普通用户\r\n',
  `is_valid` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '是否有效 Y-有效，其他无效',
  `job` int(0) NOT NULL COMMENT '岗位0-老师，1-学生',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'sa', '超级管理员', '123', 18, 1, '111', 0, 'Y', 0);
INSERT INTO `user` VALUES (2, 'admin', '小明2', '123', 18, 1, NULL, 1, NULL, 0);
INSERT INTO `user` VALUES (4, 'admin1', '小明3', '123', 18, 2, NULL, 1, NULL, 0);
INSERT INTO `user` VALUES (5, 'user', 'hg', '123', 32, 1, '124', 2, NULL, 0);
INSERT INTO `user` VALUES (6, 'user1', '主力', '124', 31, 2, '123', 1, NULL, 0);
INSERT INTO `user` VALUES (7, 'admin2', '马云', '1388888888', 55, 1, '13888888888', 0, NULL, 0);
INSERT INTO `user` VALUES (8, 'user', '马化腾', '13666666666', 50, 1, '13666666666', 1, NULL, 0);
INSERT INTO `user` VALUES (9, 'admin3', '任正非', '15999999999', 70, 1, '15999999999', 0, NULL, 0);
INSERT INTO `user` VALUES (10, 'user', '柳青', '15888888888', 40, 2, '15888888888', 2, NULL, 0);
INSERT INTO `user` VALUES (11, 'user', '孟晚舟', '123456', 45, 2, '13999999999', 2, NULL, 0);
INSERT INTO `user` VALUES (12, 'admin4', '李彦宏', '123456', 50, 1, '18888888888', 1, NULL, 0);
INSERT INTO `user` VALUES (13, 'sohu', '张朝阳', '123456', 55, 1, '13777777777', NULL, NULL, 0);
INSERT INTO `user` VALUES (14, 'xiaomi', '雷军', '123456', 55, 1, '18999999999', NULL, NULL, 0);
INSERT INTO `user` VALUES (15, 'brothers', '刘强东', '123456', 50, 1, '12345678910', 2, NULL, 0);
INSERT INTO `user` VALUES (16, 'leshi', '贾跃亭', '123456', 54, 1, '12345678911', 2, NULL, 0);
INSERT INTO `user` VALUES (17, 'admin5', '123', '456', 54, 1, '13012345678', NULL, NULL, 0);
INSERT INTO `user` VALUES (18, 'superadmin', '黄钢', '123', 32, 1, '13063678382', NULL, NULL, 0);

SET FOREIGN_KEY_CHECKS = 1;
