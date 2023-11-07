import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./Components/Register";
import Home from "./Components/Home";
import UserInfoProvider from "./Context/UserInfo";
import Search from "./Components/Search";
import { LayoutGroup } from "framer-motion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/search",
    element: <Search />,
  },
]);
const App = () => {
  return (
    <UserInfoProvider>
      <LayoutGroup>
        <RouterProvider router={router}></RouterProvider>
      </LayoutGroup>
    </UserInfoProvider>
  );
};

export default App;
