import React, { useState } from "react";
import rocket from "../Assets/rocket.png";
import mail from "../Assets/mail.png";
import face from "../Assets/face.png";
import star from "../Assets/star.png";
import linkedin from "../Assets/linkedin.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext, userDispatchOption } from "../Context/UserInfo";
import { useContext } from "react";
import { baseUrl } from "../App";
const Register = () => {
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen  max-h-[800px] overflow-clip">
      <div className="resCont h-full relative make-center  ">
        {isLogin ? (
          <Login setLogin={setLogin} navigate={navigate} />
        ) : (
          <SignUp setLogin={setLogin} navigate={navigate} />
        )}

        {/* floating custom designs and pictures starts  */}
        <img
          src={rocket}
          className="absolute w-[200px] md:w-[200px] lg:w-[300px] rotate-[45deg] top-[10%] md:top-0 md:left-[-100px] left-[-100px] blur-[12px]"
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
        <div className="absolute w-[200px] h-[70px] bottom-0 right-[-20%] md:bottom-0 lg:bottom-[0px] blur-[3px] lg:blur-[1px] md:right-[-10%] translate-y-[-50%] bg-white rounded-xl lg:right-[30%]  shadow-lg ring-[1px] ring-gray-300 flex items-center p-2 gap-2">
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

const Login = ({ setLogin, navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(UserContext);

  const LoginHandle = () => {
    axios
      .post(baseUrl + "/User/login", { email, password })
      .then((result) => {
        dispatch({
          type: userDispatchOption.Login,
          payload: result.data.result,
        });

        setEmail("");
        setPassword("");
        alert("successfully logged in.");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="bg-white/80 backdrop-blur-[2px] w-full h-full lg:h-[80%] shadow-xl ring-[1px] ring-gray-300 lg:w-[500px] rounded-lg flex items-center justify-center flex-col">
      <h3 className="mb-5 text-[24px] text-gray-600 font-[700]">Log in</h3>
      <div className="w-[80%] mx-auto mt-5">
        <label
          htmlFor="email"
          className=" font-mont text-[12px] text-gray-500 font-[600]"
        >
          email
        </label>
        <input
          type="text"
          className="w-full h-[40px] ring-[1px] ring-gray-300 outline-none p-2 text-[15px] font-[300] rounded-md"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="w-[80%] mx-auto mt-5">
        <label
          htmlFor="email"
          className=" font-mont text-[12px] text-gray-500 font-[600]"
        >
          password
        </label>
        <input
          type="password"
          className="w-full h-[40px] ring-[1px] ring-gray-300 outline-none p-2 text-[15px] font-[300] rounded-md"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div
        className="w-[80%] mx-auto  h-[50px] bg-grad rounded-md mt-[60px] make-center text-[20px] font-[700] text-white"
        onClick={LoginHandle}
      >
        Log in
      </div>
      <p className="text-[13px] text-gray-500 mt-5">
        Don't have an account?{" "}
        <span
          className="bg-grad bg-clip-text text-transparent"
          onClick={() => setLogin((ps) => !ps)}
        >
          sign up
        </span>
      </p>
    </div>
  );
};

const SignUp = ({ setLogin, navigate }) => {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  const { dispatch } = useContext(UserContext);

  const handleSignup = async () => {
    axios
      .post(baseUrl + "/User/create", { username, password, email })
      .then((result) => {
        dispatch({
          type: userDispatchOption.Login,
          payload: result.data.result,
        });
      })
      .catch((err) => console.log(err));

    setUsername("");
    setEmail("");
    setPass("");
    alert("successfully logged in.");
    navigate("/", { replace: true });
  };
  return (
    <div className="bg-white/80 backdrop-blur-[2px] w-full h-full lg:h-[80%] shadow-xl ring-[1px] ring-gray-300 lg:w-[500px] rounded-lg flex items-center justify-center flex-col ">
      <h3 className="mb-5 text-[24px] text-gray-600 font-[700]">Sign up</h3>
      <div className="w-[80%] mx-auto mt-5">
        <label
          htmlFor="email"
          className=" font-mont text-[12px] text-gray-500 font-[600]"
        >
          username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-[40px] ring-[1px] ring-gray-300 outline-none p-2 text-[15px] font-[300] rounded-md"
        ></input>
      </div>
      <div className="w-[80%] mx-auto mt-5">
        <label
          htmlFor="email"
          className=" font-mont text-[12px] text-gray-500 font-[600]"
        >
          email
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-[40px] ring-[1px] ring-gray-300 outline-none p-2 text-[15px] font-[300] rounded-md"
        />
      </div>
      <div className="w-[80%] mx-auto mt-5">
        <label
          htmlFor="pass"
          className=" font-mont text-[12px] text-gray-500 font-[600]"
        >
          password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          className="w-full h-[40px] ring-[1px] ring-gray-300 outline-none p-2 text-[15px] font-[300] rounded-md"
        />
      </div>
      <div
        className="w-[80%] mx-auto  h-[50px] bg-grad rounded-md mt-[60px] make-center text-[20px] font-[700] text-white"
        onClick={handleSignup}
      >
        Register
      </div>
      <p className="text-[13px] text-gray-500 mt-5">
        Already have an account ?{" "}
        <span
          className="bg-grad bg-clip-text text-transparent"
          onClick={() => setLogin((ps) => !ps)}
        >
          log in
        </span>
      </p>
    </div>
  );
};

export default Register;
