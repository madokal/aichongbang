import Vue from "vue";
import VueRouter from "vue-router";

import Login from "./components/login";
import Register from "./components/register";
import Manage from "./components/manage";
// import Order from "./components/order";
import ProductOrder from "./components/order/productOrder";
import ServeOrder from "./components/order/serveOrder";
import PetMaster from "./components/petMaster";
import Product from "./components/product";
import Service from "./components/service";
import ShopApply from "./components/shopApply";
import ShopManage from "./components/shopManage";
import ShopSys from "./components/shopSys";
import Supplier from "./components/supplier";
import UserSys from "./components/userSys";

Vue.use(VueRouter);
const routes = [
  { path: "/", component: Manage },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/shopApply", component: ShopApply },
  {
    path: "/manage",
    component: Manage,
    children: [
      { path: "/manage/userSys", component: UserSys },
      { path: "/manage/petMaster", component: PetMaster },
      { path: "/manage/shopSys", component: ShopSys },
      { path: "/manage/supplier", component: Supplier }

    ]
  }, {
    path: "/shopManage",
    component: ShopManage,
    children: [
      { path: "/shopManage/product", component: Product },
      { path: "/shopManage/service", component: Service },
      {path: "/shopManage/order/productOrder", component: ProductOrder},
      {path: "/shopManage/order/serveOrder", component: ServeOrder},
    ]
  }
];
const router = new VueRouter({
  mode: "history",
  routes
});
export default router;
