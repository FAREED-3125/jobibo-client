import React from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { BsBoxArrowUpRight } from "react-icons/bs";

const JobDetails = () => {
  const location = useLocation();
  const { state } = location;
  const { company_id, ...jobdesc } = location.state;

  return (
    <>
      <Header />
      <div className="w-screen min-h-screen">
        <div className="resCont min-h-screen">
          <div className="w-[95%] md:w-[90%] lg:w-[85%] mx-auto">
            <CompanyDetails company={company_id} />
            <JobDescription jobdesc={jobdesc} />
          </div>
        </div>
      </div>
    </>
  );
};

const CompanyDetails = ({ company }) => {
  return (
    <div className="w-full mt-5">
      <p className="text-[28px]">{company?.company_name}</p>
      <a
        href={company?.website}
        className="text-blue-500 text-[14px] mt-[2px] flex gap-[8px]"
      >
        {company?.website}{" "}
        <span>
          <BsBoxArrowUpRight />
        </span>
      </a>{" "}
      {company?.overview?.split("\n").map((lines, index) => {
        return (
          <p key={index} className="text-gray-600 mt-5">
            {" "}
            {lines}
          </p>
        );
      })}
    </div>
  );
};

const JobDescription = ({ jobdesc }) => {
  return (
    <div>
      <p className="text-[25px] mt-3 underline">{jobdesc?.Job_title}</p>
      <p className="mt-3 text-[18px]">About Job:</p>
      {jobdesc?.about_job?.split("\n").map((lines, index) => {
        return (
          <p key={index} className="text-gray-600 mt-3">
            {" "}
            {lines}
          </p>
        );
      })}
      <h3 className="mt-5">
        Salary:{" "}
        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-md">
          {" "}
          rs.{jobdesc?.salary?.min} - rs.{jobdesc?.salary?.max}
        </span>
      </h3>

      <h3 className="mt-5">Skills required:</h3>
      <div className="flex p-1 flex-wrap gap-2">
        {jobdesc?.skill_required?.map((skills, index) => (
          <div
            className="px-2 py-1 bg-blue-50 text-blue-500 rounded-md mt-2"
            key={index}
          >
            {skills}
          </div>
        ))}
      </div>
      <div className="w-[200px] h-[50px] rounded-md make-center mx-auto bg-blue-500 text-white font-[500] text-[18px] my-10">
        Appy now
      </div>
    </div>
  );
};

export default JobDetails;
