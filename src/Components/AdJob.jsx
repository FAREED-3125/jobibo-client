import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiOutlineBriefcase } from "react-icons/hi";
import { UserContext } from "../Context/UserInfo";
import AxiosInstance from '../Utils/AxiosInstance'
import { baseUrl } from "../App";

const AdJob = () => {
  const location = useLocation();
  const [state, setState] = useState({});

  useEffect(() => {
    setState(location.state);
  }, []);

  return (
    <>
      <Header />
      <div className="w-screen min-h-screen">
        <div className="resCont min-h-screen mt-5 ">
          {/* company details starts  */}
          <div className="text-gray-700 font-[500] p-5 md:w-[90%] mx-auto">
            <p className="text-[28px]">{state?.company_name}</p>
            <a
              href={state?.website}
              className="text-blue-500 text-[14px] mt-[2px] flex gap-[8px]"
            >
              {state?.website}{" "}
              <span>
                <BsBoxArrowUpRight />
              </span>
            </a>{" "}
            {state?.overview?.split("\n").map((lines, index) => {
              return (
                <p key={index} className="text-gray-600 mt-5">
                  {" "}
                  {lines}
                </p>
              );
            })}
          </div>
          {/* company details ends */}

          {/* company already added jon section start  */}
          <CompanyJobs state={location.state} />
          {/* company already added jon section ends */}

          {/* add job container starts */}
          <div className=" min-h-[500px]  md:w-[90%] mx-auto mt-5 p-5">
            <h3 className=" text-[28px] font-[500] text-gray-700">Add Job</h3>
            <AddJobForm state={state} />
          </div>
          {/* add job container ends */}
        </div>
      </div>
    </>
  );
};

const CompanyJobs = ({ state }) => {
  const [companyAddedJobs, setCompanyAddesJobs] = useState([]);

  useEffect(() => {
    AxiosInstance
      .get(baseUrl + `/Job/getjob/${state?._id}`)
      .then((res) => {
        setCompanyAddesJobs(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const HandleDeleteJob = (id) => {
    if (window.confirm("Delete Job,Confirmation box")) {
      AxiosInstance
        .delete(`/Job/deletejob/${id}`)
        .then((res) => {
          alert("successfully deleted.");
          const newJobArr = companyAddedJobs.filter((job) => job._id !== id);
          setCompanyAddesJobs(newJobArr);
        })
        .catch((err) => {
          alert(err.data.result);
        });
    }
  };

  return (
    <div className="w-[90%] mx-auto">
      <h3 className=" text-[28px] font-[500] text-gray-700 mb-[20px]">
        Job added:{" "}
      </h3>
      {companyAddedJobs?.map((job, index) => (
        <div
          key={index}
          className="flex items-start md:items-center flex-col md:flex-row justify-between min-h-[200px] md:min-h-max p-3 ring-[1px] ring-gray-200 shadow-md rounded-sm mb-5"
        >
          <h3 className="text-[18px] text-gray-700 font-[500]">
            {job?.Job_title}
          </h3>
          <div className="text-[14px] text-gray-500 mb-auto md:mb-0 md:flex gap-3 md:ml-10 items-center">
            <p className="p-1 rounded-sm bg-gray-50 text-gray-500 mt-[5px]">
              {job?.job_mode}
            </p>
            <p className="p-1 w-max rounded-sm bg-gray-50 text-gray-500 mt-[5px]">
              {job?.job_type}
            </p>
          </div>
          <div className="flex ml-auto gap-2 md:gap-5 font-[500] text-[15px]">
            <p className=" p-2 make-center text-blue-500">show details</p>
            <p
              className=" p-2 make-center bg-red-50 rounded-md text-red-400"
              onClick={() => HandleDeleteJob(job?._id)}
            >
              delete
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Adding Job functionality container starts here

const AddJobForm = ({ state }) => {
  const [location, setLocation] = useState("");
  const [Job_title, setJob_title] = useState("");
  const [job_type, setjob_type] = useState("");
  const [job_mode, setjob_mode] = useState("");
  const [about_job, setabout_job] = useState("");
  const [salary, setsalary] = useState({
    min: 0,
    max: 0,
  });
  const jobSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C#",
    "HTML5",
    "CSS3",
    "Angular",
    "Vue.js",
    "SQL",
    "NoSQL",
    "MongoDB",
    "MySQL",
    "Git",
    "Agile",
    "Scrum",
    "AWS",
    "Azure",
    "Docker",
    "Kubernetes",
    "RESTful API",
    "GraphQL",
    "UI/UX Design",
    "Responsive Design",
    "Mobile App Development",
    "Machine Learning",
    "Data Science",
    "Artificial Intelligence",
    "Cybersecurity",
    "Blockchain",
    "DevOps",
    "CI/CD",
    "Jira",
    "Confluence",
    "Linux",
    "Windows Server",
    "Networking",
    "React Native",
    "Flutter",
    "Swift",
    "Kotlin",
    "Vue.js",
    "Redux",
    "TensorFlow",
    "Spring Boot",
    "ASP.NET",
    "Ruby on Rails",
    "PHP",
    "Unity",
    "C++",
    "C",
    "Objective-C",
    "Data Analysis",
    "Statistical Analysis",
    "Salesforce",
    "Customer Service",
    "Marketing",
    "Content Writing",
    "Social Media Management",
    "Search Engine Optimization (SEO)",
    "Project Management",
    "Agile",
    "Leadership",
    "Communication Skills",
    "Problem Solving",
    "Teamwork",
    "Time Management",
  ];
  const [skill_required, setskill_required] = useState([]);
  const [skillarr, setSkillarr] = useState(jobSkills);
  const [no_of_openings, setno_of_openings] = useState(0);
  const [skillopen, setSkillOpen] = useState(false);
  const skillref = useRef();
  const [loading, setLoading] = useState(false);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!skillref.current.contains(e.target)) {
        setSkillOpen(false);
      } else {
        return;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  //handle add job function
  const handleAddJob = () => {
    setLoading(true);
    AxiosInstance
      .post(baseUrl + `/Job/createjob/${state?._id}`, {
        Job_title,
        job_mode,
        no_of_openings,
        job_type,
        location,
        about_job,
        salary,
        skill_required,
      })
      .then((result) => {
        alert(result.data.result);
        setLoading(false);
        setLocation("");
        setJob_title("");
        setjob_type("");
        setjob_mode("");
        setabout_job("");
        setsalary({
          min: 0,
          max: 0,
        });
        setskill_required([]);
        setSkillarr(jobSkills);
        setno_of_openings("");
        setSkillOpen(false);
        window.location.reload();
      })
      .catch((err) => alert(err.data.result))
      .finally(() => {
        setLoading(false);
      });
    console.log({
      Job_title,
      job_mode,
      no_of_openings,
      job_type,
      location,
      about_job,
    });
  };
  return (
    <div className="w-full  min-h-[450px] mt-4 flex flex-col gap-5">
      {/* job title starts  */}
      <JobTitleComponent Job_title={Job_title} setJob_title={setJob_title} />
      {/* job title ends */}
      {/* job type starts  */}
      <div>
        <label className="text-[12px] text-gray-500 flex items-center gap-2 mb-1">
          Job type :
        </label>
        <div className="w-full outline-none h-[50px]  text-[16px]  text-gray-600 rounded-md">
          <select
            className="w-full outline-none h-[50px] bg-white border-2  text-[16px]  text-gray-600 rounded-md p-2"
            value={job_type}
            onChange={(e) => setjob_type(e.target.value)}
          >
            <option value="">Select Job Type</option>
            <option value="job">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
      </div>
      {/* job type ends */} {/* job mode starts  */}
      <div>
        <label className="text-[12px] text-gray-500 flex items-center gap-2 mb-1">
          Job mode :
        </label>
        <div className="w-full outline-none h-[50px]  text-[16px]  text-gray-600 rounded-md">
          <select
            className="w-full outline-none h-[50px] bg-white border-2  text-[16px]  text-gray-600 rounded-md p-2"
            value={job_mode}
            onChange={(e) => setjob_mode(e.target.value)}
          >
            <option value="">Select Job mode</option>
            <option value="In-office">In office</option>
            <option value="Work from home">work from home</option>
            <option value="remote">remote</option>
          </select>
        </div>
      </div>
      {/* job mode ends */} {/* salary starts  */}
      <div>
        <label className="text-[12px] text-gray-500 flex items-center gap-2 mb-1">
          salary :
        </label>
        <div className="flex gap-[10px]">
          <input
            placeholder="minimum salary"
            type="text"
            value={salary.min}
            className="w-full outline-none h-[50px] border-[2px] text-[16px] p-3 text-gray-600 rounded-md"
            onChange={(e) => {
              if (!e.target.value) {
                setsalary({
                  ...salary,
                  min: "",
                });
              } else {
                setsalary({ ...salary, min: parseInt(e.target.value) });
              }
            }}
          />
          <input
            type="text"
            placeholder="maximum salary"
            value={salary.max}
            className="w-full outline-none h-[50px] border-[2px] text-[16px] p-3 text-gray-600 rounded-md"
            onChange={(e) => {
              if (!e.target.value) {
                setsalary({
                  ...salary,
                  max: "",
                });
              } else {
                setsalary({
                  ...salary,
                  max: parseInt(e.target.value),
                });
              }
            }}
          />
        </div>
      </div>
      {/* salary ends */} {/* no fo openings starts  */}
      <div>
        <label className="text-[12px] text-gray-500 flex items-center gap-2 mb-1">
          no of openings :
        </label>
        <input
          type="text"
          value={no_of_openings}
          className="w-full outline-none h-[50px] border-[2px] text-[16px] p-3 text-gray-600 rounded-md"
          onChange={(e) => {
            if (!e.target.value) {
              setno_of_openings("");
            } else {
              setno_of_openings(Number.parseInt(e.target.value));
            }
          }}
        />
      </div>
      {/* no of openings ends */}
      {/* skill required container starts  */}
      <div ref={skillref} className="w-full flex flex-col mt-1 relative">
        <label
          htmlFor="location"
          className="text-[12px] text-gray-500 flex items-center gap-2 "
        >
          <span>
            <HiOutlineBriefcase />
          </span>{" "}
          skills required:
        </label>
        {skill_required && (
          <div className="flex gap-2 mt-1 flex-wrap">
            {skill_required.map((skill, index) => (
              <h3
                key={index}
                className="w-max bg-blue-50 p-2 flex items-center text-blue-500  rounded-md h-[40px] gap-2 cursor-pointer"
                onClick={() => {
                  setskill_required((ps) => {
                    return ps.filter((jb) => jb !== skill);
                  });
                }}
              >
                {skill}
                <span>
                  <AiFillCloseCircle />
                </span>
              </h3>
            ))}
          </div>
        )}
        <input
          type="text"
          onFocus={() => setSkillOpen(true)}
          className="w-full outline-none h-[50px] border-[2px] text-[18px] p-3 text-gray-600 mt-2"
          onChange={(e) => {
            const caseIn = new RegExp(e.target.value, "i");

            setSkillarr(
              jobSkills.filter((city) => (caseIn.test(city) ? city : null))
            );
          }}
        />
        {skillopen && (
          <div className="absolute bottom-[-305px] w-full h-[300px] bg-white  rounded-md ring-[1px] ring-slate-200 shadow-xl overflow-auto p-2 z-[999]">
            <div
              className="p-2 text-[20px] mb-2 bg-blue-50 text-blue-500 rounded-full w-max ml-auto relative top-0"
              onClick={() => setSkillOpen(false)}
            >
              <AiFillCloseCircle />
            </div>
            {skillarr.map((skill, index) => (
              <h3
                key={index}
                className="w-full bg-blue-50 p-2 flex items-center text-blue-500 mb-2 rounded-md h-[40px]"
                onClick={() => {
                  setskill_required((ps) => [...new Set([...ps, skill])]);
                }}
              >
                {skill}{" "}
              </h3>
            ))}
          </div>
        )}
      </div>
      {/* skill required container ends */}
      {/* job location starts  */}
      <LocationComponent location={location} setLocation={setLocation} />
      {/* job location ends */}
      {/* about job starts  */}
      <div>
        <label className="text-[12px] text-gray-500 flex items-center gap-2 mb-1">
          about job :
        </label>
        <textarea
          type="text"
          value={about_job}
          className="w-full outline-none min-h-[200px] border-[2px] text-[16px] p-3 text-gray-600 rounded-md resize-y"
          onChange={(e) => {
            setabout_job(e.target.value);
          }}
        ></textarea>
      </div>
      {/* about job  ends */}
      {/* submit job container starts  */}
      <div
        className="w-[200px] make-center bg-grad h-[50px] mx-auto rounded-md text-white font-[500]"
        onClick={handleAddJob}
      >
        {loading ? "loading..." : "Add job"}
      </div>
      {/* submit job container ends */}
    </div>
  );
};
// Adding Job functionality container ends here

const JobTitleComponent = ({ Job_title, setJob_title }) => {
  const [search, setSearch] = useState(false);
  const allJobTitles = [
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
  const [jobTitleArr, setJobTilteArr] = useState(allJobTitles);
  const jobref = useRef();

  //   close job title suggestion tab when clicked outsite
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!jobref.current.contains(e.target)) {
        setSearch(false);
      } else {
        return;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <div className="w-full     flex flex-col mt-5 relative" ref={jobref}>
      <label
        htmlFor="job title"
        className="text-[12px] text-gray-500 flex items-center gap-2 "
      >
        job title :
      </label>
      <input
        value={Job_title}
        type="text"
        onFocus={() => setSearch(true)}
        onChange={(e) => {
          const caseIn = new RegExp(e.target.value, "i");

          setJobTilteArr(
            allJobTitles.filter((job) => (caseIn.test(job) ? job : null))
          );
        }}
        className="w-full outline-none h-[50px] border-[2px] text-[18px] p-3 text-gray-600 rounded-md"
      />
      {search && (
        <div className="absolute bottom-[-305px] w-full h-[300px] bg-white rounded-md ring-[1px] ring-slate-200 shadow-xl overflow-auto p-2 z-[999]">
          <div
            className="p-2 text-[20px] mb-2 bg-blue-50 text-blue-500 rounded-full w-max ml-auto"
            onClick={() => setSearch(false)}
          >
            <AiFillCloseCircle />
          </div>
          {jobTitleArr.map((job, index) => (
            <h3
              key={index}
              className="w-full bg-blue-50 p-2 flex items-center text-blue-500 mb-2 rounded-md h-[40px]"
              onClick={() => {
                setJob_title(job);
                setSearch(false);
              }}
            >
              {job}{" "}
            </h3>
          ))}
        </div>
      )}
    </div>
  );
};

const LocationComponent = ({ location, setLocation }) => {
  const [search, setSearch] = useState(false);
  const allCities = [
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
  const [allCitiesArr, setAllcitiesArr] = useState(allCities);
  const cityref = useRef();

  //   close city array suggestion tab when clicked outsite
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!cityref.current.contains(e.target)) {
        setSearch(false);
      } else {
        return;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <div className="w-full     flex flex-col  mt-5 relative" ref={cityref}>
      <label
        htmlFor="job title"
        className="text-[12px] text-gray-500 flex items-center gap-2 "
      >
        location:
      </label>
      <input
        value={location}
        type="text"
        onFocus={() => setSearch(true)}
        onChange={(e) => {
          const caseIn = new RegExp(e.target.value, "i");

          setAllcitiesArr(
            allCities.filter((job) => (caseIn.test(job) ? job : null))
          );
        }}
        className="w-full outline-none h-[50px] border-[2px] text-[18px] p-3 text-gray-600  rounded-md"
      />
      {search && (
        <div className="absolute bottom-[-305px] w-full h-[300px] bg-white rounded-md ring-[1px] ring-slate-200 shadow-xl overflow-auto p-2 z-[999]">
          <div
            className="p-2 text-[20px] mb-2 bg-blue-50 text-blue-500 rounded-full w-max ml-auto"
            onClick={() => setSearch(false)}
          >
            <AiFillCloseCircle />
          </div>
          {allCitiesArr.map((job, index) => (
            <h3
              key={index}
              className="w-full bg-blue-50 p-2 flex items-center text-blue-500 mb-2 rounded-md h-[40px]"
              onClick={() => {
                setLocation(job);
                setSearch(false);
              }}
            >
              {job}{" "}
            </h3>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdJob;
