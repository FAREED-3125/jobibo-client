import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserInfo";
import { BsPersonCircle } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import { motion as m } from "framer-motion";
import ManageAccount from "./ManageAccount";
const Header = () => {
  const menus = ["Internships", "Jobs", "Courses", "About", "Help"];
  const { userInfo } = useContext(UserContext);
  const isUserLogged = !userInfo.username ? false : true;
  const [isMenu, setIsmenu] = useState(false);
  const [manageAccount, setManageAccount] = useState(false);
  return (
    <>
      <div className=" w-screen h-[50px] overflow-hidden bg-white border-b-2">
        <div className="resCont flex items-center justify-between">
          {/* heading container starts  */}
          <div className="h-full w-wax flex items-center justify-center">
            <h3 className="text-[24px] font-[700] bg-grad bg-clip-text text-transparent">
              Jobibo
            </h3>
          </div>
          {/* heading container ends */}

          {/* signin and menu container starts (smaller screens) */}
          <div className="flex gap-3 w-[50%] h-full items-center justify-end lg:hidden">
            {/* login button */}
            {!isUserLogged && (
              <NavLink to="/register" className="w-[60px] h-[75%]">
                <SignIn />
              </NavLink>
            )}

            <div
              className="w-[40px] flex flex-col gap-[6px] justify-center items-center h-[70%]"
              onClick={() => setIsmenu((ps) => !ps)}
            >
              <m.div className="w-[60%] mx-auto h-[3px]  bg-gray-500"></m.div>
              <m.div
                animate={{
                  scale: isMenu ? 0 : 1,
                }}
                className="w-[60%] mx-auto h-[3px]  bg-gray-500"
              ></m.div>
              <m.div className="w-[60%] mx-auto h-[3px]  bg-gray-500"></m.div>
            </div>
            <Menu
              isMenu={isMenu}
              setIsmenu={setIsmenu}
              setManageAccount={setManageAccount}
            />
          </div>
          {/* signin and menu container ends smaller screens) */}

          {/* menus and login and signup container starts (big screens) */}
          <div className="hidden lg:flex h-full    items-center justify-between flex-grow">
            {/* menus */}
            <div className="ml-[80px] flex gap-8 items-center h-full text-gray-500">
              {menus.map((menu, index) => (
                <div
                  className="hover:text-blue-500 hover:scale-[1.1] transition-all duration-[.2s] cursor-pointer"
                  key={index}
                >
                  {menu}
                </div>
              ))}
            </div>

            {/* login and signup  */}
            {!isUserLogged ? (
              <div className="flex items-center justify-center gap-3 h-full">
                <NavLink to="/register" className="w-[100px]  h-[75%]">
                  <SignIn />
                </NavLink>
                <NavLink to="/register" className="w-[100px]  h-[75%]">
                  <SignUp />
                </NavLink>
              </div>
            ) : (
              <div
                onMouseEnter={() => setIsmenu(true)}
                onMouseLeave={() => setIsmenu(false)}
                className="flex items-center justify-center gap-2 h-[60%] py-4 px-2 rounded-full border-[1px] border-gray-400"
              >
                <h3 className="text-[20px] text-blue-400">
                  <BsPersonCircle />
                </h3>
                <p className="text-[13px] text-gray-600">profile</p>
                <Menu
                  isMenu={isMenu}
                  setIsmenu={setIsmenu}
                  setManageAccount={setManageAccount}
                />
              </div>
            )}
          </div>
          {/* menus and login and signup container ends (big screens) */}
        </div>
      </div>
      {manageAccount && <ManageAccount setManageAccount={setManageAccount} />}
    </>
  );
};

const Menu = ({ isMenu, setIsmenu, setManageAccount }) => {
  return (
    <m.div
      animate={{
        scale: isMenu ? 1 : 0,
      }}
      className="fixed top-0 right-0 w-[70%] lg:w-[300px] lg:right-[7%] lg:top-[55px] lg:rounded-lg lg:h-[500px] lg:min-h-[500px] min-h-[100dvh]   md:w-[50%] lg:shadow-xl ring-[1px] ring-gray-300 bg-white z-[99] flex flex-col justify-between origin-top-right"
    >
      {/* Close button (mobile) start  */}
      <div
        className="w-[40px] flex flex-col gap-[6px] justify-center items-center  mt-5 mb-10 ml-auto mr-3 relative lg:hidden h-[40px]"
        onClick={() => setIsmenu(false)}
      >
        <m.div className="w-[70%] mx-auto h-[3px]  bg-gray-500 rotate-[45deg]   translate-y-[3px]"></m.div>

        <m.div className="w-[70%] mx-auto h-[3px]  bg-gray-500 rotate-[-45deg] translate-y-[-5px]"></m.div>
      </div>
      {/* Close button (mobile) ends */}
      <div
        className="ring-[1px] ring-gray-300 w-[90%] mx-auto h-[50px] mt-5 rounded-full text-gray-700 make-center gap-2 cursor-pointer"
        onClick={() => setManageAccount(true)}
      >
        <span className="text-blue-400 text-[20px]">
          <BsPersonCircle />
        </span>{" "}
        manage account
      </div>
      <div className="w-[80%] mx-auto mt-5 flex items-end flex-col gap-4 text-gray-700 mb-auto">
        <p>My applications</p>
        <p>Internships</p>
        <p>jobs</p>
        <p>Courses</p>
      </div>
      <div className="bg-red-50 w-[90%] mx-auto h-[50px] mt-5 rounded-full text-red-400 make-center gap-2 mb-5 cursor-pointer">
        <span className=" text-[20px]">
          <BiLogOutCircle />
        </span>{" "}
        log out
      </div>
    </m.div>
  );
};

const SignIn = () => {
  return (
    <div className="bg-grad h-full  flex items-center justify-center font-[600] text-white text-[16px] rounded-sm w-full cursor-pointer hover:scale-[1.01] transition-all duration-[.2s] ">
      <h3>Log in</h3>
    </div>
  );
};

const SignUp = () => {
  return (
    <div className=" ring-1 h-full flex bg-grad items-center justify-center rounded-sm w-full cursor-pointer p-[1px] hover:scale-[1.01] transition-all duration-[.2s] ">
      <h3 className="w-full h-full bg-white  make-center hover:scale-[1.01] transition-all duration-[.2s]">
        <span className="bg-grad text-transparent bg-clip-text font-[600] text-[16px] ">
          Sign up
        </span>
      </h3>
    </div>
  );
};

export default Header;
