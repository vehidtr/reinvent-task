import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "api/index";
import Loading from "components/Loading/Loading";
import logo from "assets/images/logo1.png";
import closeBtn from "assets/images/close-icon.svg";
import bulletinIcon from "assets/images/bulletin-icon.png";

export default function AddSynons() {
  const navigate = useNavigate();
  const [synonym, setSynonym] = useState();
  const [synonyms, setSynonyms] = useState({});
  const [word, setWord] = useState();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleAddSynonyms = () => {
    setSynonyms({ ...synonyms, [synonym]: synonym });
    setSynonym("");
  };

  const handleRemoveSynonym = (synon) => {
    const newSynonyms = synonyms;
    delete newSynonyms[synon];
    setSynonyms({ ...newSynonyms });
  };

  const handleSubmitSynonyms = async () => {
    try {
      if (word && synonyms) {
        setLoading(true);
        await api.addSynonyms({
          word: word,
          synonymsList: Object.keys(synonyms),
        });
        setWord("");
        setSynonyms("");
        setSuccessMsg("Successfully added synonyms");
        setTimeout(() => {
          setSuccessMsg("");
        }, 5000);
      }
    } catch (err) {
      setErrorMsg("Error adding synonyms");
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="absolute z-10 flex justify-center items-center top-0 right-0 bg-white rounded-full px-5 py-5 mt-5 cursor-pointer ml-auto mr-5 text-xl font-bold shadow-lg leading-5 md:slide-tr"
        onClick={() => navigate("/")}
      >
        <img
          src={closeBtn}
          className="rotate-center cursor-pointer leading-3 w-3"
          alt=""
        />
      </div>
      <img className="w-80 h-80 md:slide-left" src={logo} alt="logo" />

      <div className="flex flex-col gap-5 w-11/12 md:w-4/5">
        <input
          type="text"
          placeholder="Add word"
          className="border rounded-md pl-2 w-full text-xl p-2 md:p-4"
          value={word || ""}
          onChange={(e) => setWord(e.target.value?.toLocaleLowerCase())}
        />
        <div className="mt-5 text-2xl text-white font-medium">SYNONYMS:</div>
        <ul className="flex flex-col mt-5 gap-4 mb-10">
          {Object.keys(synonyms)?.length ? (
            Object.keys(synonyms)?.map((synon) => (
              <li
                key={synon}
                className="flex items-center bg-white rounded-xl py-3 pl-3"
              >
                <img
                  className="w-5 mr-2"
                  src={bulletinIcon}
                  alt="bulletin"
                />
                <p className="lowercase first-letter:capitalize">{synon}</p>
                <img
                  src={closeBtn}
                  alt="close icon"
                  className="relative z-10 ml-auto w-3 h-3 mr-5 cursor-pointer"
                  onClick={() => handleRemoveSynonym(synon)}
                />
              </li>
            ))
          ) : (
            <div className="text-white text-center italic">
              Please add synonyms...
            </div>
          )}
        </ul>
        <div className="flex gap-2 border-t border-solid border-[#13a396] pt-10">
          <input
            type="text"
            placeholder="Add synonym"
            value={synonym || ""}
            onChange={(e) => setSynonym(e.target.value?.toLocaleLowerCase())}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleAddSynonyms();
              }
            }}
            className="border rounded-md p2-lg p-3 pl-2 w-full"
          />

          <input
            type="button"
            value="+ Add"
            className="bg-gray-500 rounded-md px-3 py-1 text-white w-32 cursor-pointer text-xl shadow-md font-medium"
            onClick={handleAddSynonyms}
          />
        </div>
        <button
          className="bg-[coral] shadow-md rounded-md border-none px-3 py-3 text-white cursor-pointer mt-5 mb-10 font-semibold"
          onClick={handleSubmitSynonyms}
        >
          {loading ? (
            <Loading />
          ) : (
            <div className="inline-block h-4 w-4 mr-4 -ml-6"></div>
          )}
          Submit
        </button>
        {successMsg ? (
          <span className="mb-6 -mt-10 text-center text-white font-bold text-sm italic">
            {successMsg}
          </span>
        ) : null}
        {errorMsg ? (
          <span className="mb-6 -mt-10  text-center text-red-600 font-bold text-sm italic">
            {errorMsg}
          </span>
        ) : null}
      </div>
    </>
  );
}
