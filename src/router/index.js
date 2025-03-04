// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import store from "../store";
import { useStore } from 'vuex';
import EstimatePage from "../views/EstimatePage.vue";
import Faq from "../views/Faq.vue";
import NotFound from "../views/NotFound.vue";



const routes = [
  {
    path: "/",
    name: "Home",
    component: Login,
    meta: { requiresAuth: false },
    beforeEnter: (to, from, next) => {
      store.dispatch("clearHistory");
      next(); // Continue navigation
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/estimate",
    name: "Estimate",
    component: EstimatePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/faq",
    name: "Faq",
    component: Faq,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      store.dispatch("clearHistory");
      next(); // Continue navigation
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      store.dispatch("clearHistory");
      next(); // Continue navigation
    }
  },
  {
    path: "/:pathMatch(.*)*", // Catch-all route for 404
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  mode:"history",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Global Navigation Guard
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // If route requires authentication
    if (!isAuthenticated) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      // Verify token with API before proceeding
      const isValid = await store.dispatch("checkAuth");
      if (!isValid) {
        next({
          path: "/login",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    }
  } else if (to.path === "/login" && isAuthenticated) {
    // If the user is authenticated, prevent access to the login page
    next({ path: "/dashboard" }); // Redirect to dashboard or another page
  } else {
    next();
  }
});


export default router;
