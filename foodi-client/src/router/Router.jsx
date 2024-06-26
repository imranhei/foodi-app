import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import Cart from "../pages/shop/Cart";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRoute from "../PrivateRouter/PrivateRouter";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      }
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  // admin
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  }
]);

export default router;
