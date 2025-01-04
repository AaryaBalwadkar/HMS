import React, { useContext } from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import { Link } from "react-router-dom";
import { userContext } from "../App";
import { removeFromSession } from "@/common/session";

const UserNavigationPanel = () => {
    const { userAuth: { name }, setUserAuth } =useContext(userContext)

    const signOutUser = () => {
        removeFromSession("User")
        setUserAuth({ access_token: null })
    }
  return (
    <AnimationWrapper
        className="absolute top-[70px] right-0.5"
        transition={{ duration: 0.2 }}
    >
      <div className="bg-white border border-gray w-60 duration-200 z-50">
        <div className="link pl-8 py-2">
        <Link to={`/user/${name}`}>
            Profile
        </Link>
        </div>
        <div className="link pl-8 py-2">
        <Link to="/dashboard">
            Dashboard
        </Link>
        </div>

        <div className="absolute border-t border-grey h-[2px] w-[100%]"></div>

        <button className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
            onClick={signOutUser}
        >
            <h1 className="font-bold text-xl">Sign Out</h1>
            <p className="text-dark-grey">@{name}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;