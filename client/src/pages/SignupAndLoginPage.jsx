import React, { useContext, useState } from "react";
import Select from "react-select";
import { Link, Navigate } from "react-router-dom";
import { userContext } from "@/App";
import axios from "axios";
import { storeInSession } from "@/common/session";
import { Toaster, toast } from "react-hot-toast";
import googleIcon from "../assets/google.png";
import { authWithGoogle } from "@/common/firebase";

const SignupAndLoginPage = ({ type }) => {
  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(userContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");

  const userAuthThroughServer = (serverRoute, formData) => {
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/api/auth" + serverRoute,
        formData
      )
      .then(({ data }) => {
        console.log(data)
        storeInSession("User", JSON.stringify(data));
        setUserAuth(data);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    let serverRoute = "/signup";

    let formData = { name, email, password, confirmPassword, status };

    if (!status) {
      return toast.error("Are you a doctor");
    }
    if (!password) {
      return toast.error("Enter Password");
    }
    if (!confirmPassword) {
      return toast.error("Confirm your password");
    }
    if (!name) {
      return toast.error("name must be at least 3 letters long");
    }
    if (!email.length) {
      return toast.error("Enter Email");
    }

    userAuthThroughServer(serverRoute, formData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let serverRoute = "/login";

    let formData = { email, password, status };

    if (!status) {
      return toast.error("Are you a doctor");
    }
    if (!password) {
      return toast.error("Enter Password");
    }
    if (!email.length) {
      return toast.error("Enter Email");
    }

    userAuthThroughServer(serverRoute, formData);
  };

  const status_options = [
    { value: "doctor", label: "Doctor" },
    { value: "patient", label: "Patient" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
    }),
  };

  const handleGoogleAuth = (e) => {
    e.preventDefault();

    authWithGoogle()
      .then((user) => {
        let serverRoute = "/google-auth";
        let formData = {
          access_token: user.accessToken,
        };

        userAuthThroughServer(serverRoute, formData);
      })
      .catch((err) => {
        toast.error("trouble login through google");
        return console.log(err);
      });
  };

  return access_token ? (
    <Navigate to="/home" />
  ) : (
    <section className="flex items-center place-content-center h-[100vh]">
      <Toaster />
      <form id="formElement" className="w-[80%] max-w-[400px]">
        <h1 className="text-4xl font-bold font-gelasio text-center mb-16">
          Join Us Today
        </h1>
        <div className="status-options">
          <Select
            options={status_options}
            styles={customStyles}
            className="relative w-[100%] mb-2"
            onChange={(option) => setStatus(option.value)}
          />
        </div>
        {type == "signup" ? (
          <input
            type="text"
            placeholder="name"
            className="relative w-[100%] mb-2 p-2 pl-6 bg-gray-100 rounded-[5px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          ""
        )}
        <input
          type="email"
          placeholder="email"
          className="relative w-[100%] mb-2 p-2 pl-4 bg-gray-100 rounded-[5px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="relative w-[100%] mb-2 p-2 pl-4 bg-gray-100 rounded-[5px]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {type == "signup" ? (
          <input
            type="password"
            placeholder="confirm password"
            className="relative w-[100%] mb-2 p-2 pl-4 bg-gray-100 rounded-[5px]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        ) : (
          ""
        )}

        <div className="w-[100%] place-content-center place-items-center">
          {type == "login" ? (
            <button
              className="center mt-5 rounded-full bg-[#2EC4C9] p-3 pl-8 pr-8 font-bold"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>
          ) : (
            <button
              className="center mt-5 rounded-full bg-[#2EC4C9] p-3 pl-8 pr-8 font-bold"
              type="submit"
              onClick={handleSignUp}
            >
              SignUp
            </button>
          )}
        

        <div className="relative w-full flex items-center gap-2 my-4 opacity-10 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>

        <button
          className="bg-black p-2 flex items-center justify-center gap-4 w-[80%] center text-white font-semibold rounded-full "
          onClick={handleGoogleAuth}
        >
          <img src={googleIcon} alt="" className="w-5" />
          continue with google
        </button>
        </div>

        {type == "login" ? (
          <p className="mt-3 text-dark-grey text-center">
            Don't have an account ?
            <Link to="/signup" className="font-bold text-[#E5227A] ml-1">
              Join us today
            </Link>
          </p>
        ) : (
          <p className="mt-3 text-dark-grey text-center">
            Already a member ?
            <Link to="/login" className="font-bold text-[#E5227A] ml-1">
              Sign in here.
            </Link>
          </p>
        )}
      </form>
    </section>
  );
};

export default SignupAndLoginPage;
