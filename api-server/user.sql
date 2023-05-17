/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : wms

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 14/02/2023 16:59:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `no` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '账号',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名字',
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `age` int NULL DEFAULT NULL,
  `sex` int NULL DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role_id` int NULL DEFAULT NULL COMMENT '角色 0-超级管理员，1-管理员，2-普通账号',
  `is_valid` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否有效 Y-有效，其他无效',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'sa', '超级管理员', '123', 18, 1, '111', 0, 'Y');
INSERT INTO `user` VALUES (2, 'admin', '小明2', '123', 18, 1, NULL, 1, NULL);
INSERT INTO `user` VALUES (4, 'admin1', '小明3', '123', 18, 2, NULL, 1, NULL);
INSERT INTO `user` VALUES (5, 'user', 'hg', '123', 32, 1, '124', 2, NULL);
INSERT INTO `user` VALUES (6, 'user1', '主力', '124', 31, 2, '123', 1, NULL);
INSERT INTO `user` VALUES (7, 'admin2', '马云', '1388888888', 55, 1, '13888888888', 0, NULL);
INSERT INTO `user` VALUES (8, 'user', '马化腾', '13666666666', 50, 1, '13666666666', 1, NULL);
INSERT INTO `user` VALUES (9, 'admin3', '任正非', '15999999999', 70, 1, '15999999999', 0, NULL);
INSERT INTO `user` VALUES (10, 'user', '柳青', '15888888888', 40, 2, '15888888888', 2, NULL);
INSERT INTO `user` VALUES (11, 'user', '孟晚舟', '123456', 45, 2, '13999999999', 2, NULL);
INSERT INTO `user` VALUES (12, 'admin4', '李彦宏', '123456', 50, 1, '18888888888', 1, NULL);
INSERT INTO `user` VALUES (13, 'sohu', '张朝阳', '123456', 55, 1, '13777777777', NULL, NULL);
INSERT INTO `user` VALUES (14, 'xiaomi', '雷军', '123456', 55, 1, '18999999999', NULL, NULL);
INSERT INTO `user` VALUES (15, 'brothers', '刘强东', '123456', 50, 1, '12345678910', 2, NULL);
INSERT INTO `user` VALUES (16, 'leshi', '贾跃亭', '123456', 54, 1, '12345678911', 2, NULL);
INSERT INTO `user` VALUES (17, 'admin5', '123', '456', 54, 1, '13012345678', NULL, NULL);
INSERT INTO `user` VALUES (18, 'superadmin', '黄钢', '123', 32, 1, '13063678382', NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
