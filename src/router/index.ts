import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },

    {
      path: "/artist",
      name: "artist",
      component: () => import("../views/artist/index.vue"),
    },
    {
      path: "/toplist",
      name: "toplist",
      component: () => import("../views/toplist/index.vue"),
    },
    {
      path: "/mv",
      name: "mv",
      component: () => import("../views/mv/index.vue"),
    },
    {
      path: "/playlist",
      name: "playlist",
      component: () => import("../views/play-list/index.vue"),
    },
    {
      path: "/playlist-detail/:id",
      name: "playlist-detail",
      component: () => import("../views/playlist-detail/index.vue"),
    },
    {
      path: "/singerlist-detail/:id",
      name: "singerlist-detail",
      component: () => import("../views/singerlist-detail/index.vue"),
    },
    {
      path: "/mv-detail/:id",
      name: "mv-detail",
      component: () => import("../views/mv-detail/index.vue"),
    },
    {
      path: "/album-detail/:id",
      name: "album-detail",
      component: () => import("../views/album-detail/index.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login/index.vue"),
    },
    {
      path: "/search-result/keyword=" +':keyword',
      name: "search-result",
      component: () => import("../views/search-result/index.vue"),
    },
    {
      path: "/personal-info/:id" ,
      name: "personal-info",
      component: () => import("../views/personal/index.vue"),
    },
  ],
});

export default router;
