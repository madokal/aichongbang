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
import serviceType from "./components/serviceType";
import ShopApply from "./components/shopApply";
import ShopManage from "./components/shopManage";
import ShopSys from "./components/shopSys";
import Supplier from "./components/supplier";
import UserSys from "./components/userSys";
import ManageCityServeTotal from "./components/statistics/manageCityServeTotal";
import ManageCityTradeTotal from "./components/statistics/manageCityTradeTotal";
import ManageServeTotal from "./components/statistics/manageServeTotal";
import ManageTradeTotal from "./components/statistics/manageTradeTotal";
import MapCityShopStatistics from "./components/statistics/mapCityShopStatistics";
import ShopServeTotal from "./components/statistics/shopServeTotal";
import ShopTradeTotal from "./components/statistics/shopTradeTotal";

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
      { path: "/shopManage/serviceType", component: serviceType },
      // { path: "/shopManage/order", component: Order },

      { path: "/shopManage/order/productOrder", component: ProductOrder },
      { path: "/shopManage/order/serveOrder", component: ServeOrder },
      { path: "/shopManage/statistics/manageCityServeTotal", component: ManageCityServeTotal },
      { path: "/shopManage/statistics/manageCityTradeTotal", component: ManageCityTradeTotal },
      { path: "/shopManage/statistics/manageServeTotal", component: ManageServeTotal },
      { path: "/shopManage/statistics/manageTradeTotal", component: ManageTradeTotal },
      { path: "/shopManage/statistics/mapCityShopStatistics", component: MapCityShopStatistics },
      { path: "/shopManage/statistics/shopServeTotal", component: ShopServeTotal },
      { path: "/shopManage/statistics/shopTradeTotal", component: ShopTradeTotal },
    ]
  }
];
const router = new VueRouter({
  mode: "history",
  routes
});
export default router;
