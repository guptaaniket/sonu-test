import axios from "axios";
import { handleResponse, handleError } from "./utils";

const baseURL = "https://api.github.com/search/"

const axiosInstance =  axios.create({
   baseURL,
  validateStatus: function (status) {
    return status >= 200 && status < 404; // default
  }});

export const fetchFromGit = (url: string) =>
axiosInstance
    .get(url)
    .then(handleResponse)
    .catch(handleError);