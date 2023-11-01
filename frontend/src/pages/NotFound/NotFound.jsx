import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "assets/images/logo1.png";

const NotFound = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col justify-center items-center text-white">
      <img className="w-80 h-80 md:slide-right" src={logo} alt="logo" />
      <h1 className="mt-20 text-xl italic text-center">Looks like you got lost inside all these things.</h1>
      <button
        className="button-lotus redirect-btn font-bold mb-32"
        onClick={handleRedirect}
      >
        Click here to go to Home
      </button>
    </div>
  );
};

export default NotFound;
