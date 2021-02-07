import {
    GIT_FETCH,
    GIT_FETCH_CLEAR,
    GIT_FETCH_FAILURE,
    GIT_FETCH_SUCCESS,
  } from "./actionTypes";
  import * as gitApi from "../../api/gitSearchApis";

  export function fetchFromGitSuccess(result:any, searchType: string, searchText: string) {
    return { type: GIT_FETCH_SUCCESS, payload:{result, searchType, searchText} };
  }
  export function fetchFromGitFailure(error:any) {
    return { type: GIT_FETCH_FAILURE, payload: error };
  }

  export function fetchFromGitRequest() {
    return { type: GIT_FETCH };
  }

  export function clearFetchedData () {
    return { type: GIT_FETCH_CLEAR };
  }
  
  export function fetchFromGit(searchType:string, searchText:string) {
    //debugger;
    return (dispatch:Function) => {
      dispatch(fetchFromGitRequest());
      return gitApi
        .fetchFromGit(`${searchType}?q=${searchText}`)
        .then(result => dispatch(fetchFromGitSuccess(result,searchType, searchText)))
        .catch(error => {
          dispatch(fetchFromGitFailure(error));
          throw error;
        });
    };
  }

