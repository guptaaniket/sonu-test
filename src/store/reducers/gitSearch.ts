import { stat } from "fs";
import get from "lodash/get"

import {GIT_FETCH, GIT_FETCH_FAILURE, GIT_FETCH_SUCCESS, GIT_FETCH_CLEAR} from "../actions/actionTypes";
import initialState from "./initialState";

export default function gitSearchReducer(state = initialState.gitSearch, actions:any) {
  // console.log("actions type------>>", actions.type);
  // console.log("actions payload------>>", actions.payload);
  const {payload,type} = actions;
  switch (type) {
    case GIT_FETCH_SUCCESS:
    return {
      ...state,
      isLoading:false,
      data : [...state.data,{
        searchType:payload.searchType,
        searchText:payload.searchText,
        data:get(payload.result,'items',[])}],
      
    };  
    case GIT_FETCH_FAILURE:
    return {
      ...state,
      isLoading:false,
      error:{}
    };  
    case GIT_FETCH:
      return {
        ...state,
        isLoading:true
      }; 
    case GIT_FETCH_CLEAR:
      return {
        ...state,
        data:[]
      }; 
    default:
      return state;
  }
}

export const GitSearchSelector = (state: { gitSearch: any; }) => state.gitSearch;