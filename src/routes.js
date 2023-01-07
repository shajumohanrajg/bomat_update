import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./auth/login";
import DashBoard from "./pages/dashboard";

import Profile from "./pages/profile";
import Team from "./pages/team";
import IAdd from "./pages/Invoices/invoices_form";
import Orders from "./pages/Invoices/invoices";
import Vendors from "./pages/Vendors/vendors";
import VAdd from "./pages/Vendors/vendors_add";
import VUpdate from "./pages/Vendors/vendors_update";
import Branches from "./pages/Branches/branches";
import BAdd from "./pages/Branches/branches_add";
import BUpdate from "./pages/Branches/branches_update";
import IUpdate from "./pages/Invoices/invoices_update";
import ROrders from "./pages/Release Orders/release_orders";
import Bomat from "./pages/Release Orders/bomat_add";
import BomatTable from "./pages/Release Orders/bomat_table";
//import BomatUpdate from "./pages/Release Orders/bomat_update";
//import BomatUpdate1 from "./pages/Release Orders/bomat_update1";
import RAdd from "./pages/Release Orders/release_orders_add";
import RUpdate from "./pages/Release Orders/release_orders_update";
import Register from "./auth/register";
import RequireAuth from "./routes/RequireAuth";
import ForgotPassword from "./auth/forgotpassword";
import Edition from "./pages/Edition/edition";
import Page404 from "./pages/404";

// import NotFound from "./pages/Page404";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          element:<RequireAuth />,
          children:[
            {
              path: "homepage",
              element: <DashBoard />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "profile/edit",
              element: <Team />,
            },
            
            {
              path: "bomat",
              element: <Bomat />,
            },
            {
              path: "bomat_table",
              element: <BomatTable />,
            },
           // {
           //   path: "bomat_update:/id",
           //   element: <BomatUpdate />,
           // },
           // {
           //   path: "bomat_update1:/id",
           //   element: <BomatUpdate1 />,
            //},
            {
              path: "vendors",
              element: <Vendors />,
            },
            {
              path: "vendors/add",
              element: <VAdd />,
            },
            {
              path: "vendors/update/:id",
              element: <VUpdate />,
            },
            {
              path: "branches",
              element: <Branches />,
            },
            {
              path: "branches/add",
              element: <BAdd />,
            },
            {
              path: "branches/update/:id",
              element: <BUpdate />,
            },
            {
              path: "po",
              element: <Orders />,
            },
            {
              path: "po/add",
              element: <IAdd />,
            },
            {
              path: "po/update/:id",
              element: <IUpdate />,
            },
            {
              path: "release_orders",
              element: <ROrders />,
            },
            {
              path: "release_orders/add",
              element: <RAdd />,
            },
            {
              path: "release_orders/update/:id",
              element: <RUpdate />,
            },
            {
              path: "edition",
              element: <Edition />,
            },
          ],
        }
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [

        { path: "/", element: <Navigate to="/dashboard/homepage" /> },
        { path: "/login", element: <Login /> },
        { path: "/bomat", element: <Bomat /> },
        { path: "/bomat_table", element: <BomatTable /> },
       // { path: "/bomat_update/:id", element: <BomatUpdate /> },
       // { path: "/bomat_update1/:id", element: <BomatUpdate1 /> },
        { path: "/register", element: <Register /> },
        { path: "/forgot_password", element: <ForgotPassword/>},
        // { path: "404", element: <NotFound /> },
        { path: "*", element: <Page404 /> },
      ],
    },
    { path: "*", element: <Page404 /> },
  ]);
}
