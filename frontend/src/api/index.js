import { callAPI as api } from "./callApi";

export const login = async (body) => {
  try {
    const response = await api("/users/login", "POST", body);
    if (response && response.data) {
      const { auth_token } = response.data;
      if (auth_token) localStorage.setItem("token", auth_token);
      return response.data;
    } else
      return { error: "Something went wrong. Please try again!", data: [] };
  } catch (err) {
    return err;
  }
};

export const addSynonyms = async (body) => {
  try {
    const response = await api("/add", "POST", body);
    if (response && response.data) {
      return response.data;
    } else
      return { error: "Something went wrong. Please try again!", data: [] };
  } catch (err) {
    return err;
  }
};

export const getSynonyms = async (word) => {
  try {
    const response = await api(`/synonyms/${word}`, "GET");
    if (response && response.data) {
      return response.data;
    } else return { error: "Something went wrong. Please try again!" };
  } catch (err) {
    return err;
  }
};
