import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/account",
    component: () => import("../views/Main.vue"),
    children: [
      {
        // 账号管理
        path: "/account",
        name: "account",
        component: () => import("../views/Account.vue"),
      },
      {
        // 我的考勤
        path: "/myAttendance",
        name: "myAttendance",
        component: () => import("../views/MyAttendance.vue"),
      },
      {
        // 考勤管理
        path: "/attendance",
        name: "attendance",
        component: () => import("../views/Attendance.vue"),
      },
      {
        path: "/userinfo",
        component: () => import("../views/UserInfo.vue"),
      },
      {
        path: "/user",
        name: "user",
        component: () => import("../views/UserManage.vue"),
      },
    ],
  },
  // {
  //   path: "/home",
  //   name: "home",
  //   component: () => import("../components/Index.vue"),
  //   // chirdren:[
  //   //   {
  //   //     path: '/userinfo',
  //   //     name: 'userinfo',
  //   //     meta: '首页'
  //   //     // component
  //   //   }
  //   // ]
  // },
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
