import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FindHospitalComponent from "./FindHospitalComponent";

const SidebarButtonsComponent = ({ content, logo, sectionKey }) => {
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [isNavigated, setIsNavigated] = useState(false);
    const navigate = useNavigate()


    const handleOnClick = () => {
        if (isNavigated) {
            navigate(-1);
        } else {
            navigate(`/home/${sectionKey}`);
        }
        setIsNavigated(!isNavigated);
        setIsButtonClicked(isButtonClicked => !isButtonClicked)
    }

  return (
    <div>
    <button 
        className="flex hover:bg-purple-200 font-semibold w-full place-items-center border-b-gray-100 border-b-2"
        onClick={handleOnClick}
    >
        <span className="p-2 pl-4 w-[85%]">
            {content}
        </span>
      <span className="place-items-center content-end mr-3">
        {logo}
      </span>
    </button>
    { isButtonClicked && <FindHospitalComponent />}
    </div>
  );
};

export default SidebarButtonsComponent;
