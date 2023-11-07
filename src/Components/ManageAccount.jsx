import React, { createContext, useContext, useState } from "react";
import { BsPersonCircle, BsBuildingsFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { motion as m } from "framer-motion";
import { UserContext, userDispatchOption } from "../Context/UserInfo";
import { BiLogOutCircle } from "react-icons/bi";
const MangaeAccContext = createContext();
const ManageAccount = ({ setManageAccount }) => {
  const [accountDetails, setAccount] = useState(true);
  const [companyDetails, setCompanyDetails] = useState(false);
  const { userInfo,dispatch } = useContext(UserContext);
  return (
    <div className="w-screen min-h-screen make-center bg-black/40 backdrop-blur-[2px] fixed z-[9999] top-0 ">
      <div className="w-full h-screen lg:w-[60vw] lg:h-[85vh] rounded-lg bg-white z-[9999] pt-3">
        <div
          className="text-[30px] ml-auto w-max text-blue-400 mr-5 cursor-pointer"
          onClick={() => setManageAccount(false)}
        >
          <AiFillCloseCircle />
        </div>
        <MangaeAccContext.Provider
          value={{
            accountDetails,
            companyDetails,
            setAccount,
            setCompanyDetails,
            userInfo,
            dispatch
          }}
        >
          <NavLinksTop />
          {accountDetails && <AccountDetails />}
        </MangaeAccContext.Provider>
      </div>
    </div>
  );
};

const BlueLine = () => {
  return (
    <m.div
      layoutId="blueline"
      className="h-[2px] w-full bg-blue-400 absolute bottom-0"
    ></m.div>
  );
};

const NavLinksTop = () => {
  const { accountDetails, companyDetails, setCompanyDetails, setAccount } =
    useContext(MangaeAccContext);
  return (
    <div className="flex justify-evenly items-center">
      <NavLink>
        <p
          className="flex w-full gap-[5px] h-[40px] make-center text-[20px] text-blue-400 relative"
          onClick={() => {
            setCompanyDetails(false);
            setAccount(true);
          }}
        >
          <span>
            <BsPersonCircle />
          </span>
          <span className="text-[15px] text-gray-500">Account details</span>
          {accountDetails && <BlueLine />}
        </p>
      </NavLink>
      <NavLink>
        <p
          className="flex gap-[5px] h-[40px] make-center text-[20px] text-blue-400 w-max relative"
          onClick={() => {
            setCompanyDetails(true);
            setAccount(false);
          }}
        >
          <span>
            <BsBuildingsFill />
          </span>
          <span className="text-[15px] text-gray-500">Company details</span>
          {companyDetails && <BlueLine />}
        </p>
      </NavLink>
    </div>
  );
};

const AccountDetails = () => {
  const { userInfo,dispatch } = useContext(MangaeAccContext);
 
  return (
    <div className="w-full make-center pt-10 flex-col">
      <div className="text-[100px] text-gray-400">
        <BsPersonCircle />
      </div>
      <div className="text-center mt-5">
        <h3 className="text-[20px] font-[700] text-gray-700">
          {userInfo?.username}
        </h3>
        <p className="text-15px text-gray-500">{userInfo?.email}</p>
      </div>

      {/* delete button start  */}
      <div className="bg-red-50 w-[250px] mx-auto h-[50px] mt-[50px] rounded-full text-red-400 make-center gap-2 mb-5 cursor-pointer" onClick={() =>  dispatch({type:userDispatchOption.Logout})}>
        <span className=" text-[20px]">
          <BiLogOutCircle />
        </span>{" "}
        log out
      </div>
      {/* delete button ends */}
    </div>
  );
};

export default ManageAccount;
