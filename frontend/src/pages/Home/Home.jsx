import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "api/index";
import logo from "assets/images/logo1.png";
import plusBtn from "assets/images/plus-icon.svg";
import closeBtn from "assets/images/close-icon.svg";

export default function Home() {
  const navigate = useNavigate();
  const [word, setWord] = useState("");
  const [synonymsList, setSynonymsList] = useState([]);

  const handleSearchSynonyms = async () => {
    try {
      if (word) {
        const response = await api.getSynonyms(word || "");
        setSynonymsList(response?.synonyms || []);
      }
    } catch (error) {}
  };

  const handleClearWord = () => {
    setWord("");
    setSynonymsList("")
  };

  return (
    <>
      <div className="flex flex-col relative justify-center items-center lg:shadow-md lg:my-8 bg-[lightseagreen] lg:rounded-xl">
        <div
          className="absolute z-10 top-0 right-0 bg-white rounded-full p-[18px] mt-5 cursor-pointer ml-auto mr-5 rounded-full text-3xl text-orange-500 font-bold shadow-lg leading-5 slide-bl rotate-45"
          onClick={() => navigate("/add")}
        >
          <img
            src={plusBtn}
            className="cursor-pointer leading-3 w-4 rotate-center"
            alt=""
          />
        </div>
        <img className="w-80 h-80 slide-right" src={logo} alt="logo" />
        <div className="flex gap-5 w-4/5 mx-auto">
          <div className="flex relative items-center w-full">
            <input
              type="text"
              placeholder="Find synonyms"
              className="border rounded-md p-1 pl-2 w-full text-xl p-4 w-full outline-none"
              value={word || ""}
              onChange={(e) => setWord(e.target.value)}
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
          <input
            type="button"
            value="Search"
            className="bg-[coral] rounded-md px-3 py-1 text-white w-32 cursor-pointer text-xl hover:rounded-[40px] shadow-md transition-border duration-300 ease-in-out"
            onClick={handleSearchSynonyms}
          />
        </div>
        <div className="w-4/5 flex text-white text-xs mt-1 italic">
          Try typing strong or active
        </div>

        <div className="w-4/5  pb-10 mt-10">
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
                      src="https://cdn-icons-png.flaticon.com/512/7382/7382017.png"
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
        </div>
      </div>
    </>
  );
}
