import { lazy } from "react";
const NotFound = lazy(async () => await import("pages/NotFound/NotFound"));
const Home = lazy(async () => await import("pages/Home/Home"));
const AddSynons = lazy(async () => await import("pages/AddSynons/AddSynons"));

export const routes = [
  {
    path: "*",
    name: "NotFound",
    exact: false,
    component: NotFound,
    protected: true,
  },
  {
    path: "/",
    name: "Home",
    exact: true,
    component: Home,
    protected: true,
  },
  {
    path: "/add",
    name: "AddSynons",
    exact: true,
    component: AddSynons,
    protected: true,
  },
];

export default routes;
