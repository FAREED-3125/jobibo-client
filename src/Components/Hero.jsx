import React from "react";
import rocket from "../Assets/rocket.png";
import mail from "../Assets/mail.png";
import face from "../Assets/face.png";
import star from "../Assets/star.png";
import linkedin from "../Assets/linkedin.png";
import { HiOutlineBriefcase, HiOutlineLocationMarker } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { motion as m } from "framer-motion";
const Hero = () => {
  return (
    <div className="w-screen h-[700px] overflow-clip">
      <div className="resCont h-full relative  pt-[60px]">
        {/* text-container starts  */}
        <div className="w-full make-center flex-col text-[28px] md:text-[42px] lg:text-[60px] lg:w-[85%] mx-auto font-[700] text-slate-700 text-center  relative ">
          <h3 className="z-[1]">
            Unlock Your Potential and Discover Your{" "}
            <span className="bg-grad bg-clip-text text-transparent">
              Dream Job
            </span>{" "}
            with{" "}
            <span className="bg-grad bg-clip-text text-transparent">
              Jobibo
            </span>
          </h3>
          <p className="text-[16px] text-gray-600 font-[400] mt-[15px] md:w-[70%] mx-auto z-[1]">
            Welcome to jobibo - your gateway to countless job opportunities.
            Find the job that suits you best and take the first step towards
            your dream career today!
          </p>
        </div>
        {/* text-container ends */} {/* search container starts  */}
        <Search />
        {/* search container ends */}
        {/* floating custom designs and pictures starts  */}
        <img
          src={rocket}
          className="absolute w-[100px] md:w-[200px] lg:w-[300px] rotate-[45deg] top-[10%] md:top-0 md:left-[-100px] left-[-200px] blur-[12px]"
          alt=""
        />
        {/* message container */}
        <div className="absolute w-[200px] h-[70px]  right-[-20%] top-[40%] hidden blur-[5px] lg:blur-[1px] md:right-[-10%] translate-y-[-50%] bg-white rounded-xl lg:right-0  shadow-lg ring-[1px] ring-gray-300 md:flex items-center p-2 gap-2">
          <img src={mail} className="w-[50px]" alt="" />
          <div className="h-full flex justify-center flex-col gap-1">
            <h3 className=" text-[12px]">1 message received</h3>
            <p className="text-[11px] text-gray-500">You got a job...</p>
          </div>
        </div>
        {/* //linkedin container  */}
        <div className="absolute w-[200px] h-[70px]  left-[-20%] md:bottom-[50px] lg:bottom-[100px] blur-[5px] lg:blur-[1px] md:left-[-10%] translate-y-[-50%] bg-white rounded-xl lg:left-0  shadow-lg ring-[1px] ring-gray-300 hidden  md:flex items-center p-2 gap-2">
          <img src={linkedin} className="w-[50px]" alt="" />
          <div className="h-full flex justify-center flex-col gap-1">
            <h3 className=" text-[12px]">1 Notification</h3>
            <p className="text-[11px] text-gray-500">You got a job...</p>
          </div>
        </div>
        {/* profile container  */}
        <div className="absolute w-[200px] h-[70px] bottom-0 right-[-20%] md:bottom-0 lg:bottom-[20px] blur-[3px] lg:blur-[1px] md:right-[-10%] translate-y-[-50%] bg-white rounded-xl lg:right-[30%]  shadow-lg ring-[1px] ring-gray-300 flex items-center p-2 gap-2">
          <img src={face} className="w-[50px]" alt="" />
          <div className="h-full flex justify-center flex-col gap-1">
            <h3 className=" text-[12px]">Alexander nolan</h3>
            <div className="flex ">
              {Array(5)
                .fill("*")
                .map((i, index) => (
                  <img key={index} src={star} className="w-[20px]" alt="" />
                ))}
            </div>
          </div>
        </div>
        {/* floating custom designs and pictures ends */}
      </div>
    </div>
  );
};

const Search = () => {
  return (
    <NavLink to="/search">
      <m.div
        layoutId="searchcontainer"
        className="w-full ring-1 ring-gray-300 lg:ring-gray-400 rounded-lg overflow-hidden p-2 grid grid-cols-2 md:grid-cols-3 gap-2 gap-y-6 mt-[100px] lg:w-[75%] md:w-[80%] mx-auto relative bg-white z-[9] cursor-pointer"
      >
        <m.div layoutId="jobtitle" className="w-full h-[50px]  overflow-hidden flex items-center gap-2 pl-2 text-gray-400 text-[14px] border-r-[2px]">
          <span className="text-[18px]">
            <HiOutlineBriefcase />
          </span>
          <span>Job title</span>
        </m.div>
        <m.div layoutId="location" className="w-full h-[50px]  overflow-hidden flex items-center gap-2 pl-2 text-gray-400 text-[14px] ">
          <span className="text-[18px]">
            <HiOutlineLocationMarker />
          </span>
          <span>location</span>
        </m.div>

        <div className="w-full h-[50px] bg-grad make-center col-start-1 col-end-3 md:col-start-3 md:col-end-4 text-white font-[600] rounded-md">
          Search Job
        </div>
      </m.div>{" "}
    </NavLink>
  );
};

export default Hero;
