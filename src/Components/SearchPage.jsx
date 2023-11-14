import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
import { JobMode, JobTitle, JobType, Loaction, MinimumSalary } from "./Search";
import Header from "./Header";
import axios from "axios";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import { format } from "date-fns";
import { calculateDayDiffernce } from "./Recomended";
import { BiEdit } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import UseDimension from "../Utils/UseDimension";
import { baseUrl } from "../App";
const SearchPage = () => {
  const location = useLocation();
  const [searchResult, setSearchResult] = useState([]);
  const [SelectOptions, setSelectedOptions] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const innerWidth = UseDimension();

  return (
    <>
      <Header />
      <div className="w-screen min-h-screen">
        <div className="resCont min-h-screen flex items-center lg:items-start gap-5 flex-col lg:flex-row">
          <m.div
            initial={
              innerWidth < 1024
                ? {
                    y: -2000,
                    transition: {
                      type: "tween",
                      duration: 1,
                    },
                  }
                : {
                    y: 0,
                  }
            }
            animate={
              innerWidth < 1024
                ? {
                    y: openSearch ? 0 : -2000,
                    transition: {
                      type: "tween",
                      duration: 1,
                    },
                  }
                : {
                    y: 0,
                  }
            }
            className="lg:w-[40%] w-full absolute lg:static top-0 right-0   lg:block  z-[999] overflow-auto p-1"
          >
            <FilterSearch
              state={location.state}
              setSearchResult={setSearchResult}
              setSelectedOptions={setSelectedOptions}
              setOpenSearch={setOpenSearch}
              openSearch={openSearch}
            />
          </m.div>
          <div
            className="w-full h-[50px] overflow-auto flex items-center lg:hidden mt-3 gap-3"
            onClick={() => setOpenSearch(true)}
          >
            <div className="text-blue-50 bg-blue-500 px-2 py-1 shrink-0 rounded-lg flex gap-[3px] items-center">
              <span>
                <BiEdit />
              </span>{" "}
              <span>Edit</span>
            </div>
            {SelectOptions?.map((options, index) => (
              <div
                key={index}
                className="bg-blue-50 text-blue-500 w-max px-2 py-1 shrink-0 rounded-lg"
              >
                {options}
              </div>
            ))}
          </div>
          <div className="lg:w-[60%] w-[95%] min-h-screen">
            {searchResult.length > 0 ? (
              searchResult?.map((job, index) => (
                <JobDetailsConponent key={index} index={index} product={job} />
              ))
            ) : (
              <div className="w-full h-[200px] make-center ring-[1px] ring-gray-200 shadow-md mt-5 rounded-md">
                No result Found
              </div>
            )}
          </div>
        </div>
      </div>{" "}
    </>
  );
};

const FilterSearch = ({
  state,
  setSearchResult,
  setSelectedOptions,
  setOpenSearch,
  openSearch,
}) => {
  const [jobType, setType] = useState(state?.jobType);
  const [jobMode, setMode] = useState(state?.jobMode);
  const [selected, setSelect] = useState(state?.selected);
  const [selectedJobs, setSelectedjobs] = useState(state?.selectedJobs);
  const [selectedcities, setSelectedcities] = useState(state?.selectedcities);
  const navigate = useNavigate();

  const handleJobFetch = () => {
    axios
      .post(baseUrl + "/Search", {
        keyword: selectedJobs,
        type: jobType,
        min: selected,
        mode: jobMode,
        location: selectedcities,
      })
      .then((result) => setSearchResult(result.data.result))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const options = [
      jobMode,
      jobType,
      selected,
      selectedJobs,
      selectedcities,
    ].flat();
    setSelectedOptions(options);
    handleJobFetch();
  }, [state]);
  return (
    <m.div
      layoutId="searchcontainer"
      className="w-full   lg:w-full ring-1 ring-gray-300 lg:ring-gray-400 rounded-lg overflow-auto p-5 min-h-[99vh] lg:min-h-[80vh] md:min-h-[80%] flex flex-col gap-2 gap-y-6   mx-auto lg:static bg-white z-[9] "
    >
      <div
        className="text-[28px] text-blue-500 ml-auto lg:hidden"
        onClick={() => setOpenSearch(false)}
      >
        <AiFillCloseCircle />
      </div>
      <JobTitle selectedJobs={selectedJobs} setSelectedjobs={setSelectedjobs} />
      <Loaction
        selectedcities={selectedcities}
        setSelectedcities={setSelectedcities}
      />
      <JobType jobType={jobType} setType={setType} />
      <JobMode jobMode={jobMode} setMode={setMode} />
      <MinimumSalary selected={selected} setSelect={setSelect} />
      <div
        className="w-full h-[50px] bg-grad make-center  mt-3 text-white font-[600] rounded-md"
        onClick={() => {
          handleJobFetch();
          navigate("/searchresults", {
            replace: true,
            state: {
              selectedJobs,
              selectedcities,
              jobType,
              jobMode,
              selected,
            },
          });
          setOpenSearch(false);
        }}
      >
        Search Job
      </div>
      {/* search box ends */}
    </m.div>
  );
};

export const JobDetailsConponent = ({ product, index }) => {
  const navigate = useNavigate();
  return (
    <div
      key={index}
      className="bg-blue-50 p-5 rounded-lg mt-4   flex flex-col w-full min-h-[200px]  lg:mt-5"
    >
      {/* heading container starts  */}
      <div>
        <h3 className=" capitalize font-[600] text-[18px]">
          {product?.Job_title}
        </h3>
        <h3 className="text-gray-600 text-[15px]">
          {product?.company_id?.company_name}
        </h3>
      </div>
      {/* heading container ends */}
      <div>
        <div className="px-3 py-2 bg-blue-200 text-slate-600 w-max rounded-md mt-2 text-[15px] inline-block">
          {product?.job_mode}
        </div>
        <div className="px-3 py-2 bg-blue-200 text-slate-600 w-max rounded-md mt-2 text-[15px] inline-block ml-3">
          {product?.job_type}
        </div>

        {/* stipend container starts  */}
        <h3 className="flex items-center gap-2 text-[15px] text-gray-500 mt-3">
          <span className="text-[18px]">
            <FaRegMoneyBillAlt />
          </span>
          {/* <span>{product?.job_type !== "Job" ? "stipend" : "salary"}</span> */}
          <span>
            rs.{product?.salary?.min} - rs.{product?.salary?.max}
          </span>
        </h3>
        {/* stipend container ends */}

        <p
          className=" w-max rounded-full  text-[14px] mt-3 flex gap-1 items-center"
          style={{
            color:
              calculateDayDiffernce(
                format(new Date(product?.createdAt), "yyyy-MM-dd"),
                format(new Date(Date.now()), "yyyy-MM-dd")
              ) > 3
                ? "#b5b5b5"
                : "rgb(34 197 94)",
          }}
        >
          <span className="text-[18px]">
            <HiClock />
          </span>
          <span className="mt-[1px]">
            {calculateDayDiffernce(
              format(new Date(product?.createdAt), "yyyy-MM-dd"),
              format(new Date(Date.now()), "yyyy-MM-dd")
            )}{" "}
            days
          </span>
        </p>
      </div>
      {/* details container start  */}
      <div
        className="flex-grow flex items-end justify-end"
        onClick={() => {
          navigate("/jobdetails", { state: product });
        }}
      >
        <h3 className="ring-[2px] ring-blue-400 rounded-md text-blue-400 w-max px-4 py-3  cursor-pointer">
          view details
        </h3>
      </div>
      {/* details container ends */}
    </div>
  );
};
export default SearchPage;
