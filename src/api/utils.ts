import { HTTP_CODE } from "./httpConstants";
const { SUCCESS,CREATED, SERVER_ERROR, BAD_REQUEST } = HTTP_CODE;

export const handleResponse = (response:any) => {
  const { status, data, statusText } = response;  
  if (status == SUCCESS || status == CREATED) return data;
  if (status == SERVER_ERROR) {
    throw new Error(statusText);
  }
  if(status == BAD_REQUEST) {
    throw data;
  }
  throw new Error("Network response was not ok.");
};

export const handleError = (error:any) => {
  console.error("API call failed. ",error);
  throw error;
};
 
