import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";

function Home() {
  const [userDetails, setUserDetails] = useState({});
  const [userRepos, setUserRepos] = useState([]);
  const [search, setSearch] = useState();

  const fetchDetails = async (user = "github") => {
    const { data } = await Axios.get(`https://api.github.com/users/${user}`);
    setUserDetails(data);
  };

  const fetchRepos = async (user = "github") => {
    const { data } = await Axios.get(
      `https://api.github.com/users/${user}/repos`
    );
    setUserRepos(data);
  };

  useEffect(() => {
    fetchDetails();
    fetchRepos();
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    fetchDetails(search);
    fetchRepos(search);
    setSearch("");
  };

  const context = useContext(UserContext);

  if (context.user?.uid) {
    if (userDetails && userRepos) {
      return (
        <>
          <div className="container my-5 red home">
            <div className="col-lg-8 col-md-10 mx-auto my-5 search">
              <div className="d-flex">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={onSearch} className="py-1 px-3 mx-2">
                  Search
                </button>
              </div>
            </div>
            <div className="col-lg-8 col-md-10 mx-auto red">
              <div className="row">
                <div className="col-md-6 red">
                  <div className="p-3 Pcard mx-auto text-center">
                    {/* <!-- image  --> */}
                    <img src={userDetails.avatar_url} width="100%" alt="" />
                    <br />
                    <br />
                    <h4>{userDetails.name}</h4>
                    <h6>{userDetails.company}</h6>
                    <p>{userDetails.bio}</p>
                  </div>
                </div>
                <div className="col-md-6 red Rcard  mt-md-0 mt-3">
                  <h3 className="text-center">Repos</h3>
                  {/* <!-- repos card  --> */}
                  {userRepos.map((repo) => {
                    return (
                      <div className="repo-card mx-auto my-1 p-2 red">
                        <p>
                          <a href={repo.html_url}>
                            <b>{repo.name}</b>
                          </a>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      <div>Search User</div>;
    }
  } else {
    return <Navigate to="/login" />;
  }
}

export default Home;
