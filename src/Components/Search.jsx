import React, { useEffect, useRef, useState } from "react";
import { HiOutlineBriefcase, HiOutlineLocationMarker } from "react-icons/hi";
import { motion as m } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [jobType, setType] = useState([]);
  const [jobMode, setMode] = useState([]);
  const [selected, setSelect] = useState(null);
  const [selectedJobs, setSelectedjobs] = useState([]);
  const [selectedcities, setSelectedcities] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-[100dvh]">
      <div className="resCont min-h-[99vh] make-center mt-2">
        <m.div
          layoutId="searchcontainer"
          className="w-full lg:w-[50%] ring-1 ring-gray-300 lg:ring-gray-400 rounded-lg overflow-hidden p-5 min-h-[99vh] lg:min-h-[80vh] md:h-[80%] flex flex-col gap-2 gap-y-6  md:w-[80%] mx-auto relative bg-white z-[9] cursor-pointer"
        >
          <JobTitle
            selectedJobs={selectedJobs}
            setSelectedjobs={setSelectedjobs}
          />
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
            }}
          >
            Search Job
          </div>
          {/* search box ends */}
        </m.div>
      </div>
    </div>
  );
};

export default Search;

export const JobTitle = ({ selectedJobs, setSelectedjobs }) => {
  const jobInitial = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "Marketing Coordinator",
    "Graphic Design Intern",
    "Human Resources Assistant",
    "Sales Representative",
    "Accounting Intern",
    "Web Developer",
    "Content Marketing Specialist",
    "Business Analyst",
    "Social Media Intern",
    "Customer Support Specialist",
    "UX/UI Designer",
    "Finance Intern",
    "Digital Marketing Manager",
    "Software Development Intern",
    "Project Manager",
    "Research Analyst Intern",
    "Operations Manager",
  ];
  const [jobTitlesAndInternships, setJandI] = useState(jobInitial);
  const [searchitems, setSearch] = useState(false);
  const jobref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (!jobref.current.contains(e.target)) {
        setSearch(false);
      } else return;
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return (
    <m.div
      layoutId="jobtitle"
      className="w-full     flex flex-col gap-[2px] mt-5 relative"
      ref={jobref}
    >
      <label
        htmlFor="job title"
        className="text-[12px] text-gray-500 flex items-center gap-2 mb-[2px]"
      >
        <span>
          <HiOutlineBriefcase />
        </span>{" "}
        job title
      </label>
      {selectedJobs && (
        <div className="flex gap-2 mt-1 flex-wrap">
          {selectedJobs.map((job, index) => (
            <h3
              key={index}
              className="w-max bg-blue-50 p-2 flex items-center text-blue-500  rounded-md h-[40px] gap-2"
              onClick={() => {
                setSelectedjobs((ps) => {
                  return ps.filter((jb) => jb !== job);
                });
              }}
            >
              {job}
              <span>
                <AiFillCloseCircle />
              </span>
            </h3>
          ))}
        </div>
      )}
      <input
        type="text"
        onFocus={() => setSearch(true)}
        onChange={(e) => {
          const caseIn = new RegExp(e.target.value, "i");

          setJandI(jobInitial.filter((job) => (caseIn.test(job) ? job : null)));
        }}
        className="w-full outline-none h-[50px] border-[2px] text-[18px] p-3 text-gray-600 mt-2 rounded-md"
      />
      {searchitems && (
        <div className="absolute bottom-[-305px] w-full h-[300px] bg-white rounded-md ring-[1px] ring-slate-200 shadow-xl overflow-auto p-2 z-[999]">
          <div
            className="p-2 text-[20px] mb-2 bg-blue-50 text-blue-500 rounded-full w-max ml-auto"
            onClick={() => setSearch(false)}
          >
            <AiFillCloseCircle />
          </div>
          {jobTitlesAndInternships.map((job, index) => (
            <h3
              key={index}
              className="w-full bg-blue-50 p-2 flex items-center text-blue-500 mb-2 rounded-md h-[40px]"
              onClick={() => {
                setSelectedjobs((ps) => [...new Set([...ps, job])]);
              }}
            >
              {job}{" "}
            </h3>
          ))}
        </div>
      )}
    </m.div>
  );
};

export const Loaction = ({ selectedcities, setSelectedcities }) => {
  const citiesInIndia = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Trichy",
    "Salem",
    "Tirunelveli",
    "Vellore",
    "Erode",
    "Tiruppur",
    "Thanjavur",
  ];
  const [jobcities, setJobcities] = useState(citiesInIndia);
  const [searchitems, setSearch] = useState(false);
  const cityref = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (!cityref.current.contains(e.target)) {
        setSearch(false);
      } else return;
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return (
    <m.div
      layoutId="location"
      className="w-full     flex flex-col gap-[2px] mt-1 relative"
      ref={cityref}
    >
      <label
        htmlFor="location"
        className="text-[12px] text-gray-500 flex items-center gap-2 mb-[2px]"
      >
        <span>
          <HiOutlineBriefcase />
        </span>{" "}
        location
      </label>
      {selectedcities && (
        <div className="flex gap-2 mt-1 flex-wrap">
          {selectedcities.map((job, index) => (
            <h3
              key={index}
              className="w-max bg-blue-50 p-2 flex items-center text-blue-500  rounded-md h-[40px] gap-2"
              onClick={() => {
                setSelectedcities((ps) => {
                  return ps.filter((jb) => jb !== job);
                });
              }}
            >
              {job}
              <span>
                <AiFillCloseCircle />
              </span>
            </h3>
          ))}
        </div>
      )}
      <input
        type="text"
        onFocus={() => setSearch(true)}
        className="w-full outline-none h-[50px] border-[2px] text-[18px] p-3 text-gray-600 mt-2"
        onChange={(e) => {
          const caseIn = new RegExp(e.target.value, "i");

          setJobcities(
            citiesInIndia.filter((city) => (caseIn.test(city) ? city : null))
          );
        }}
      />
      {searchitems && (
        <div className="absolute bottom-[-305px] w-full h-[300px] bg-white  rounded-md ring-[1px] ring-slate-200 shadow-xl overflow-auto p-2 z-[999]">
          <div
            className="p-2 text-[20px] mb-2 bg-blue-50 text-blue-500 rounded-full w-max ml-auto"
            onClick={() => setSearch(false)}
          >
            <AiFillCloseCircle />
          </div>
          {jobcities.map((city, index) => (
            <h3
              key={index}
              className="w-full bg-blue-50 p-2 flex items-center text-blue-500 mb-2 rounded-md h-[40px]"
              onClick={() => {
                setSelectedcities((ps) => [...new Set([...ps, city])]);
              }}
            >
              {city}{" "}
            </h3>
          ))}
        </div>
      )}
    </m.div>
  );
};

export const JobMode = ({ jobMode, setMode }) => {
  const selectTheme = {
    color: "white",
    backgroundColor: "rgb(59 130 246)",
  };
  return (
    <div className="w-full ">
      <label
        htmlFor="jobMode"
        className="text-[12px] text-gray-500 flex items-center gap-2 mb-[2px]"
      >
        job mode
      </label>
      <div className="mt-3 flex items-center gap-3">
        <div
          className="px-4 py-3 text-blue-500 text-[15px] bg-blue-50 w-max rounded-full border-[1px] border-blue-400"
          onClick={() => {
            if (jobMode.includes("In-office")) {
              setMode(jobMode.filter((job) => job !== "In-office"));
            } else {
              setMode((ps) => [...ps, "In-office"]);
            }
          }}
          style={jobMode.includes("In-office") ? selectTheme : {}}
        >
          on site
        </div>
        <div
          className="px-4 py-3 text-blue-500 text-[15px] bg-blue-50 w-max rounded-full border-[1px] border-blue-400"
          onClick={() => {
            if (jobMode.includes("Work from home")) {
              setMode(jobMode.filter((job) => job !== "Work from home"));
            } else {
              setMode((ps) => [...ps, "Work from home"]);
            }
          }}
          style={jobMode.includes("Work from home") ? selectTheme : {}}
        >
          work from home
        </div>
      </div>
    </div>
  );
};

export const JobType = ({ jobType, setType }) => {
  const selectTheme = {
    color: "white",
    backgroundColor: "rgb(59 130 246)",
  };
  return (
    <div className="w-full ">
      <label
        htmlFor="jobMode"
        className="text-[12px] text-gray-500 flex items-center gap-2 mb-[2px]"
      >
        job type
      </label>
      <div className="mt-3 flex items-center gap-3">
        <div
          className="px-4 py-3 text-blue-500 text-[15px] bg-blue-50 w-max rounded-full border-[1px] border-blue-400"
          onClick={() => {
            if (jobType.includes("Internship")) {
              setType(jobType.filter((job) => job !== "Internship"));
            } else {
              setType((ps) => [...ps, "Internship"]);
            }
          }}
          style={jobType.includes("Internship") ? selectTheme : {}}
        >
          Internship
        </div>
        <div
          className="px-4 py-3 text-blue-500 text-[15px] bg-blue-50 w-max rounded-full border-[1px] border-blue-400"
          onClick={() => {
            if (jobType.includes("Job")) {
              setType(jobType.filter((job) => job !== "Job"));
            } else {
              setType((ps) => [...ps, "Job"]);
            }
          }}
          style={jobType.includes("Job") ? selectTheme : {}}
        >
          Job
        </div>
      </div>
    </div>
  );
};

export const MinimumSalary = ({ selected, setSelect }) => {
  const salary = [2000, 4000, 6000, 8000, 10000];
  return (
    <div className="w-full ">
      <label
        htmlFor="jobMode"
        className="text-[12px] text-gray-500 flex items-center gap-2 mb-[2px]"
      >
        job type
      </label>
      <div className="mt-3 flex items-center gap-3 flex-wrap">
        {salary.map((salary, index) => (
          <div
            key={index}
            className="px-4 py-3 text-blue-500 text-[15px] bg-blue-100 border-[1px] border-blue-500 w-max rounded-full"
            onClick={() => setSelect(salary)}
            style={{
              color: selected === salary && "white",
              backgroundColor: selected === salary && "rgb(59 130 246)",
            }}
          >
            {salary}
          </div>
        ))}
      </div>
    </div>
  );
};
