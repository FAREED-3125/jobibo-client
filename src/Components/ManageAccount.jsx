import React, { createContext, useContext, useEffect, useState } from "react";
import { BsPersonCircle, BsBuildingsFill } from "react-icons/bs";
import { AiOutlineTrademarkCircle } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
import { UserContext, userDispatchOption } from "../Context/UserInfo";
import { BiLogOutCircle } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
import { SignIn, SignUp } from "./Header";
import axios from "axios";
const MangaeAccContext = createContext();
const ManageAccount = () => {
  const [accountDetails, setAccount] = useState(true);
  const [companyDetails, setCompanyDetails] = useState(false);
  const { userInfo, dispatch } = useContext(UserContext);
  return (
    <div className="w-screen min-h-screen make-center bg-blue-50 backdrop-blur-[2px] fixed z-[9999] top-0 ">
      {userInfo?.username ? (
        <div className="w-full h-screen lg:w-[70vw] lg:h-[85vh] rounded-lg bg-white ring-[1px] ring-gray-200 shadow-md z-[9999] pt-3 overflow-auto">
          <MangaeAccContext.Provider
            value={{
              accountDetails,
              companyDetails,
              setAccount,
              setCompanyDetails,
              userInfo,
              dispatch,
            }}
          >
            <NavLinksTop />
            {accountDetails && <AccountDetails />}
            {companyDetails && <CompanyDetails />}
          </MangaeAccContext.Provider>
        </div>
      ) : (
        <div className="w-full h-screen lg:w-[60vw] lg:h-[85vh] rounded-lg bg-white z-[9999] pt-3 grid place-items-center relative">
          <div>
            <p className="text-center w-[90%] mx-auto mb-[100px] text-gray-700 text-[25px] font-[600]">
              Unlock boundless opportunities with Jobibo – your gateway to a
              world of career possibilities! Sign in now to discover your next
              dream job
            </p>
            <div className="make-center gap-8">
              <NavLink
                to={"/register"}
                className="w-[150px] h-[50px] rounded-sm"
              >
                <SignIn />
              </NavLink>
              <NavLink
                to={"/register"}
                className="w-[150px] h-[50px] rounded-sm"
              >
                <SignUp />
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BlueLine = () => {
  return (
    <m.span
      layoutId="blueline"
      className="h-[2px] w-full bg-blue-400 absolute block bottom-0"
    ></m.span>
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
  const { userInfo, dispatch } = useContext(MangaeAccContext);
  const accountAuthstyle = {
    backgroundColor: "rgb(96 165 250)",
    color: "white",
  };

  const toggleRecruiter = () => {
    if (window.confirm("sure,You want to change")) {
      axios
        .post("/User/useraccounttype/" + userInfo?.UserID, {
          isRecruiter: !userInfo?.isRecruiter,
        })
        .then((result) => {
          console.log(result);
          dispatch({ type: userDispatchOption.Logout });
          dispatch({
            type: userDispatchOption.Login,
            payload: result.data.result,
          });
          alert("successfully changed");
        })
        .catch((err) => console.log(err));
    }
  };

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

      {/* account Type container start  */}
      <div
        className="w-[280px] ring-[1px] ring-gray-300 shadow-md h-[60px] p-1 flex items-center justify-between rounded-full mt-10 text-gray-600 text-[15px]"
        onClick={() => toggleRecruiter()}
      >
        <m.div
          layout
          className=" h-full  make-center w-[50%] rounded-full "
          style={!userInfo?.isRecruiter ? accountAuthstyle : {}}
          onClick={() => {}}
        >
          I'm Job seeker
        </m.div>
        <m.div
          layout
          className=" h-full  make-center w-[50%] rounded-full "
          style={userInfo?.isRecruiter ? accountAuthstyle : {}}
        >
          I'm a recruiter
        </m.div>
      </div>
      {/* account Type container ends */}

      {/* logout button start  */}
      <div
        className="bg-red-50 w-[250px] mx-auto h-[50px] mt-[50px] rounded-full text-red-400 make-center gap-2 mb-5 cursor-pointer"
        onClick={() => {
          if (window.confirm("Are you sure,want to logout?")) {
            dispatch({ type: userDispatchOption.Logout });
          }
        }}
      >
        <span className=" text-[20px]">
          <BiLogOutCircle />
        </span>{" "}
        log out
      </div>
      {/* logout button ends */}
    </div>
  );
};

export default ManageAccount;

const CompanyDetails = () => {
  const { userInfo } = useContext(UserContext);
  const [addCompany, setAddCompany] = useState(false);
  const [myCompany, setMyCompany] = useState(true);
  return (
    <div className="w-full h-full p-2">
      {userInfo?.isRecruiter ? (
        <div className="w-full h-full p-3 flex  flex-col lg:flex-row gap-3">
          <div className="w-full lg:w-[25%] lg:h-full flex lg:flex-col items-center justify-evenly lg:justify-start  gap-3">
            {" "}
            <NavLink className={"w-full"}>
              <div
                onClick={() => {
                  setMyCompany(true);
                  setAddCompany(false);
                }}
                className=" p-3 bg-blue-50 rounded-lg h-[60px] make-center  mx-auto  w-full"
              >
                <h3 className="flex items-center gap-2 text-[15px] text-gray-500 font-[500]">
                  <span>
                    <AiOutlineTrademarkCircle />
                  </span>
                  <span>my Company</span>
                </h3>
              </div>
            </NavLink>
            <NavLink className={"w-full"}>
              <div
                onClick={() => {
                  setMyCompany(false);
                  setAddCompany(true);
                }}
                className=" p-3 bg-blue-50 rounded-lg h-[60px] make-center  mx-auto   w-full"
              >
                <h3 className="flex items-center gap-2 text-[15px] text-gray-500 font-[500] ">
                  <span>
                    <GrAddCircle />
                  </span>
                  <span>add Company</span>
                </h3>
              </div>
            </NavLink>
          </div>
          <div className=" w-full lg:w-[75%] min-h-full overflow-auto ring-[2px] ring-gray-200 rounded-lg p-2">
            {myCompany && <Mycompany userInfo={userInfo} />}
            {addCompany && <AddCompany userInfo={userInfo} />}
          </div>
        </div>
      ) : (
        <div>hi</div>
      )}
    </div>
  );
};

const Mycompany = ({ userInfo }) => {
  const [CompanysAdded, setCompanyAdded] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(CompanysAdded);
  useEffect(() => {
    const FetchCompany = async () => {
      await axios
        .get(`/Company/getcompany/${userInfo?.UserID}`)
        .then((result) => {
          setCompanyAdded(result.data.result);
        })
        .catch((err) => console.log(err));
    };
    FetchCompany();
  }, []);

  // ..Deleteing Compnay fucnction

  const DeleteCompany = async (id) => {
    setLoading(true);
    if (window.confirm("Do you want to Delete it?")) {
      await axios
        .delete(`/Company/deletecompany/${id}`)
        .then((result) => {
          alert("successfully deleted.");
          const newCompanyArr = CompanysAdded.filter(
            (company) => company._id != id
          );
          setCompanyAdded(newCompanyArr);
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <div className="w-full min-h-full p-4">
      {CompanysAdded.length > 0 ? (
        <div className="w-full ">
          {CompanysAdded?.map((company, index) => (
            <div
              className="w-full min-h-[60px] flex items-center justify-between rounded-lg ring-[1px] ring-gray-200 shadow-md p-3 mb-4 flex-col md:flex-row"
              key={index}
            >
              <h3 className="h-[70px] md:h-[45px] flex items-center text-gray-600">
                {company?.company_name}
              </h3>
              <div className="flex gap-2 md:h-[45px]">
                <div
                  className="w-[120px] h-[45px] md:h-full make-center bg-blue-400 text-white rounded-md cursor-pointer"
                  onClick={() => navigate("/addjob", { state: company })}
                >
                  {" "}
                  view Details
                </div>
                <div
                  className="min-w-[120px] h-[45px] md:h-full make-center bg-red-400 text-white rounded-md cursor-pointer"
                  onClick={() => {
                    DeleteCompany(company?._id);
                  }}
                >
                  {" "}
                  Delete
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No company Added</div>
      )}
    </div>
  );
};

const AddCompany = ({ userInfo }) => {
  const [companyName, setCompanyName] = useState("");
  const [comnpanyOverview, setOverview] = useState("");
  const [companywebsite, setWebiste] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleAddCompany = async () => {
    if (!companyName || !comnpanyOverview || !companywebsite) {
      alert("all the fields are required.");
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("website", companywebsite);
      formData.append("overview", comnpanyOverview);
      formData.append("company_name", companyName);
      await axios
        .post(
          `/Company/createcompany/${userInfo?.UserID}`,
          Object.fromEntries(formData)
        )
        .then((result) => {
          alert(result.data.result.status + " ,Adding successfull.");
        })
        .catch((err) => {
          console.log(err);
          alert(err + " ,Company Adding.");
        })
        .finally(() => {
          setLoading(false);
          setCompanyName("");
          setOverview("");
          setWebiste("");
        });
    }
  };
  return (
    <div className="w-full h-full p-4">
      {/* Compnay Input starts here */}
      <div className="mt-3">
        <label
          htmlFor="companyname"
          className="text-[12px] text-gray-500 flex items-center gap-2 mb-1"
        >
          Company name :
        </label>
        <input
          type="text"
          value={companyName}
          className="w-full outline-none h-[50px] border-[2px] text-[16px] p-3 text-gray-600 rounded-md"
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
        />
      </div>

      <div className="mt-3">
        <label
          htmlFor="webisite"
          className="text-[12px] text-gray-500 flex items-center gap-2 mb-1"
        >
          website URL :
        </label>
        <input
          type="text"
          value={companywebsite}
          className="w-full outline-none h-[50px] border-[2px] text-[16px] p-3 text-gray-600 rounded-md"
          onChange={(e) => {
            setWebiste(e.target.value);
          }}
        />
      </div>
      <div className="mt-3">
        <label
          htmlFor="overview"
          className="text-[12px] text-gray-500 flex items-center gap-2 mb-1"
        >
          Overview :
        </label>
        <textarea
          type="text"
          value={comnpanyOverview}
          className="w-full outline-none min-h-[200px] border-[2px] text-[16px] p-3 text-gray-600 rounded-md resize-y"
          onChange={(e) => {
            setOverview(e.target.value);
          }}
        ></textarea>
      </div>
      {/* Compnay Input ends here */}
      <div
        className="bg-grad w-[250px] h-[50px] make-center text-white font-[500] rounded-md mx-auto mt-5"
        onClick={HandleAddCompany}
      >
        {loading ? "Loading..." : "Add company"}
      </div>
    </div>
  );
};
