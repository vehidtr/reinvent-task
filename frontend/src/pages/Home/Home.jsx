import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "api/index";
import logo from "assets/images/logo1.png";
import plusBtn from "assets/images/plus-icon.svg";
import closeBtn from "assets/images/close-icon.svg";
import searchIcon from "assets/images/search-icon.svg";
import synonymIcon from "assets/images/synonym-icon.png";
import Loading from "components/Loading/Loading";

export default function Home() {
  const navigate = useNavigate();
  const [word, setWord] = useState("");
  const [synonymsList, setSynonymsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearchSynonyms = async () => {
    try {
      setLoading(true);
      if (word) {
        const response = await api.getSynonyms(word || "");
        setSynonymsList(response?.synonyms || []);
      }
    } catch (error) {
      setErrorMsg("Error finding synonyms");
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    } finally {
      setLoading(true);
    }
  };

  const handleClearWord = () => {
    setWord("");
    setSynonymsList("");
  };

  return (
    <>
      <div
        className="absolute z-10 top-0 right-0 bg-white rounded-full p-[18px] mt-5 cursor-pointer ml-auto mr-5 text-3xl text-orange-500 font-bold shadow-lg leading-5 md:slide-bl md:rotate-45"
        onClick={() => navigate("/add")}
      >
        <img
          src={plusBtn}
          className="cursor-pointer leading-3 w-4 rotate-center"
          alt=""
        />
      </div>
      <img className="w-80 h-80 md:slide-right" src={logo} alt="logo" />
      <div className="flex gap-5 w-11/12 md:w-4/5 mx-auto">
        <div className="flex relative items-center w-full">
          <input
            type="text"
            placeholder="Find synonyms"
            className="border rounded-md p-2 md:p-4 pl-2 text-xl w-full outline-none"
            value={word || ""}
            onChange={(e) => setWord(e.target.value?.toLocaleLowerCase())}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearchSynonyms();
              }
            }}
          />
          {word ? (
            <img
              src={closeBtn}
              alt="close icon"
              className="absolute w-5 right-0 mr-4 cursor-pointer"
              onClick={handleClearWord}
            />
          ) : null}
        </div>
        <button
          className="flex justify-center items-center bg-[coral] rounded-md px-3 py-1 text-white w-32 cursor-pointer text-xl hover:rounded-[40px] shadow-md transition-border duration-500 ease-in-out"
          onClick={handleSearchSynonyms}
        >
          <p className="hidden md:block">Search</p>
          <img
            className="block md:hidden w-6 h-6"
            src={searchIcon}
            alt="search icon"
          />
        </button>
      </div>
      <div className="w-11/12 md:w-4/5 flex text-white text-xs mt-1 italic">
        Try typing strong or active
      </div>

      <div className="w-11/12 md:w-4/5  pb-10 mt-10">
        <div className="mt-5 text-2xl text-white font-medium text-center">
          SYNONYMS LIST
        </div>
        <ul className="flex flex-col mt-5 gap-4 mb-10">
          {synonymsList?.length ? (
            synonymsList.map((synon) => (
              <li
                key={synon}
                className="flex items-center bg-white rounded-xl shadow-md lowercase first-letter:capitalize"
              >
                <div className="rounded-l-xl bg-[#f2f2f2] p-3 mr-4">
                  <img
                    className="w-6 rotate-90 opacity-25"
                    src={synonymIcon}
                    alt="synonym"
                  />
                </div>
                {synon}
              </li>
            ))
          ) : (
            <div className="text-center mt-10 text-white italic">
              No synonyms to display...
            </div>
          )}
        </ul>
        <div className="flex justify-center items-center w-full">
          {loading ? (
            <Loading color={"white"} />
          ) : (
            <div className="inline-block h-4 w-4 mr-4 -ml-6"></div>
          )}
          {errorMsg ? (
            <span className="mb-6 -mt-10  text-center text-red-600 font-bold text-sm italic">
              {errorMsg}
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
}
