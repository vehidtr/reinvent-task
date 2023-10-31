import axios from "axios";

const proxy = process.env.REACT_APP_URL_API;

const options = (url, method, data = "") => {
  switch (method) {
    case "GET":
      return {
        method: "GET",
        baseURL: proxy,
        url: url,
      };
    case "POST":
      return {
        method: "POST",
        url: url,
        data: data,
        baseURL: proxy,
        headers: {
          "Content-Type": "application/json",
        },
      };
    case "DELETE":
      return {
        method: "DELETE",
        url: url,
      };
    default:
      return {};
  }
};

export const callAPI = async (url, method, data = "") => {
  const option = options(url, method, data);
  try {
    const response = await axios(option);
    return response;
  } catch (error) {
    return { data: error, error: true };
  }
};
