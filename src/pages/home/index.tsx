import React, { useEffect, useState, useCallback, } from "react";
import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
import { useDispatch, useSelector } from "react-redux";

import { fetchFromGit as fetchFromGitAction, clearFetchedData as clearFetchedFromGitAction } from "../../store/actions/gitSearch";
import { TextInput, SelectInput } from "../../components/common";

import "./style.css";

interface RootState {
  gitSearchReducer: {
    data: Array<any>;
    isLoading: boolean;
  }
}

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [entity, setEntity] = useState('');
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state: RootState) => state.gitSearchReducer);
  console.log("sdjfdhsjfdsjfhjdshf", useSelector((state: RootState) => state));
  // console.log("data--->>", data, isLoading);
  const entities = [{
    text: 'User',
    value: 'user'
  }, {
    text: 'Repository',
    value: 'repository'
  }];
  const isEntityDefault = entity == 'default';
  const searchType = (entity && !isEntityDefault) ? (entity == 'user' ? 'users' : 'repositories') : '';
  
  const searchedData = searchType && data.find((ele: { searchType: string; searchText: string; data: any }) => ele.searchType == searchType && ele.searchText == searchText);
  // debugger;
  console.log("searchedData, isLoading---->>", searchedData, isLoading);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value)
  }

  const handleEntityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEntity(value)
  }

  const fetchFromGit = useCallback(debounce(async (searchText, searchType) => {
    if (searchText.length >= 3)
      dispatch(fetchFromGitAction(searchType, searchText))
  }, 1000), []);

  const clearData = debounce(() => {
    dispatch(clearFetchedFromGitAction())
  }, 1000);

  useEffect(() => {
    if (entity) {
      if (searchText.length >= 3 && !isEntityDefault) {
        if (!searchedData) {
          fetchFromGit(searchText, searchType)
        }

      } else {
        clearData()
      }
    }

  }, [searchText, entity]);


  const renderUsersCard = () => {
    const { data } = searchedData;
    return (
      <div className="cardsContainer">
        {
          data.map((item: any) => {
            return <div className="card">
              <img src={item.avatar_url} alt="Avatar" style={{ width: "100%" }} />
              <div className="container">
                <h4>User: <b>{item.login}</b></h4>
                <p>location: {item.location} </p>
                <a href={item.html_url} target="_blank" style={{ textDecoration: "none" }} >
                  Profile
                </a>
              </div>
            </div>
          })
        }
      </div>

    )
  }

  const renderReposCard = () => {
    const { data } = searchedData;
    return (
      <div className="cardsContainer">
        {
          data.map((item: any) => {
            return <div className="card">
              <div>
                <h4>Name: {item.name}</h4>
                <h4> Author: <b> {item.owner.login}</b></h4>
                <p>stars: {item.stargazers_count}</p>
                <p>Open Issues: {item.open_issues}</p>
                <a href={item.html_url} target="_blank" style={{ textDecoration: "none" }} >
                  Repository
                </a>
              </div>
            </div>
          })
        }
      </div>

    )
  }

  return (
    <div className={searchText.length && !isEntityDefault && entity ? "homeContainer" : "homeContainerCenter"}>
      <h1>Welcome to GitHub repository search application</h1>
      <div className={searchText.length && !isEntityDefault  && entity ? "inputsWrapper" : "inputsWrapperCenter"}  >

        <SelectInput
          name="entity"
          placeholder="Select entity"
          onChange={handleEntityChange}
          value={entity}
          defaultOption="Select entity"
          options={entities}
          className="selectWrapper"
          inputClass="inputSelect"
        />

        <TextInput
          name="search"
          placeholder="Search in github"
          onChange={handleSearchChange}
          value={searchText}
          inputClass="inputText"
          className='selectWrapper'
        />
      </div>

      { isLoading ? "Loading..." : isEmpty(searchedData?.data) ? "no content found" : (entity == "user" ? renderUsersCard() : renderReposCard())
        
      }
    </div>
  )

}

export default Home;