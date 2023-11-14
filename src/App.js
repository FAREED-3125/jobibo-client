import React, { useEffect } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./Components/Register";
import Home from "./Components/Home";
import UserInfoProvider from "./Context/UserInfo";
import Search from "./Components/Search";
import { LayoutGroup } from "framer-motion";
import SearchPage from "./Components/SearchPage";
import AddJob from "./Components/AddCompany";
import AdJob from "./Components/AdJob";
import ManageAccount from "./Components/ManageAccount";
import JobDetails from "./Components/JobDetails";
import axios from "axios";

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
  {
    path: "/searchresults",
    element: <SearchPage />,
  },
  {
    path: "/addcompany",
    element: <AddJob />,
  },
  {
    path: "/addjob",
    element: <AdJob />,
  },
  {
    path: "/manageaccount",
    element: <ManageAccount />,
  },
  {
    path: "/jobdetails",
    element: <JobDetails />,
  },
]);
const App = () => {
  if (document.cookie) {
    const access_token = document.cookie
      .split("; ")
      .find((cook) => cook.startsWith("access_token="))
      .replace("access_token=", "");

    var baseString = access_token.split(".")[1];
    var payload = JSON.parse(atob(baseString));
  }
  useEffect(() => {
    console.log(payload?.exp * 1000 < Date.now());
    if (payload?.exp * 1000 < Date.now()) {
      axios
        .post("/User/refresh")
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
          window.confirm(err.data);
        });
    }
  }, []);
  return (
    <UserInfoProvider>
      <LayoutGroup>
        <RouterProvider router={router}></RouterProvider>
      </LayoutGroup>
    </UserInfoProvider>
  );
};

export default App;
