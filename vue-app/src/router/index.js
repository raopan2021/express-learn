import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/userManage",
    component: () => import("../views/Main.vue"),
    children: [
      {
        // 个人首页
        path: "/userManage",
        name: "userManage",
        component: () => import("../views/UserManage.vue"),
      },
      {
        // 我的考勤
        path: "/myAttendance",
        name: "myAttendance",
        component: () => import("../views/Attendance/MyAttendance/MyAttendance.vue"),
      },
      {
        // 考勤管理
        path: "/attendanceManagement",
        name: "attendanceManagement",
        component: () => import("../views/Attendance/AttendanceManagement.vue"),
      },
      {
        // 我的加班
        path: "/myOvertime",
        name: "myOvertime",
        component: () => import("../views/OverTime/MyOvertime.vue"),
      },
      {
        // 加班管理
        path: "/overtimeManagement",
        name: "overtimeManagement",
        component: () => import("../views/OverTime/OvertimeManagement.vue"),
      },
      {
        // 我的出差
        path: "/myEvection",
        name: "myEvection",
        component: () => import("../views/Evection/MyEvection.vue"),
      },
      {
        // 出差管理
        path: "/evectionManagement",
        name: "evectionManagement",
        component: () => import("../views/Evection/EvectionManagement.vue"),
      },
      {
        // 账号管理
        path: "/account",
        name: "account",
        component: () => import("../views/Account.vue"),
      },
      // {
      //   path: "/userinfo",
      //   component: () => import("../views/UserInfo.vue"),
      // },
      {
        path: "/user",
        name: "user",
        component: () => import("../views/UserManage.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 路由守卫
import jwt_decode from "jwt-decode";
router.beforeEach((to,from,next) => {
  const isLogin = localStorage.wmstoken ? true : false;
  if (isLogin) {
    const decode = jwt_decode(localStorage.wmstoken);
    const date = parseInt(new Date().getTime() / 1000);
    if (date - decode.iat > decode.exp - decode.iat) {
      localStorage.removeItem("wmstoken");
      next("/login");
    }
  }
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
});

export default router;
