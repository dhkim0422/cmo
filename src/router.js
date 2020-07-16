import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(Router);

//lazy Loading
const Login = () => {
  return import("@/views/Login.vue");
};
const ResistanceGenes = () => {
  return import("@/views/ResistanceGenes.vue");
};
const ResistanceGenesDetail = () => {
  return import("@/views/ResistanceGenesDetail.vue");
};
const ResistanceGenesRegister = () => {
  return import("@/views/ResistanceGenesRegister.vue");
};
const VueTree = () => {
  return import("@/views/VueTree.vue");
};

const requireAuth = (returnPath) => (from, to, next) => {
  const isAuthenticated = false;

  if (isAuthenticated) return next();
  next("/login");
};

export default new Router({
  mode: "history",
  base: "/cmo",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/index.html",
      name: "indexHome",
      component: Home,
    },

    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/analysis/analysis",
      name: "analysis",
      component: () => import("./views/Analysis.vue"),
    },
    {
      path: "/targets/targetList",
      name: "targets list",
      component: () => import("./views/targets/TargetsList.vue"),
    },
    {
      path: "/targets/targetsDetail/:id",
      name: "targets-detail",
      component: () => import("./views/targets/TargetDetail.vue"),
    },
    {
      path: "/project/projectList",
      name: "project list",
      component: () => import("./views/project/ProjectList.vue"),
    },
    {
      path: "/project/projectsDetail/:id",
      name: "projects-detail",
      component: () => import("./views/project/projectsDetail"),
    },
    {
      path: "/project/ProjectRegist",
      name: "projects regist",
      component: () => import("./views/project/ProjectRegist"),
    },
    {
      path: "/samples/SamplesList",
      name: "Samples List",
      component: () => import("./views/samples/SamplesList"),
    },
    {
      path: "/samples/SamplesDetail/:id",
      name: "Samples-detail",
      component: () => import("./views/samples/SamplesDetail"),
    },

    {
      path: "/omics/omics/",
      name: "omics",
      component: () => import("./views/omics/OmicsMain"),
    },
    {
      path: "/storage/storageList",
      name: "storageList",
      component: () => import("./views/storage/StorageList"),
    },
    {
      path: "/storage/storageDetail/:id?",
      name: "storageDetail",
      component: () => import("./views/storage/StorageDetail"),
    },
    {
      path: "/storage/storagePosition/:id",
      name: "storagePosition",
      component: () => import("./views/storage/StoragePosition"),
    },
  ],
});
