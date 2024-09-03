import React, { useState } from "react";
import { Octokit } from 'octokit';
import { Link } from 'react-router-dom';
import gitHubImg from './assets/github.jpeg';

function App() {

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([])

  const handleChange = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  const clickHandler = async (event) => {
    try {
      event.preventDefault();
      const octokit = new Octokit({});
    
      const res = await octokit.request('GET /users/{username}/repos', {
        username: searchInput,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
      setSearchResult(res.data);
      
      console.log("Console the res.data", res.data);

    } catch(error){
      alert(`User's repository is not found`);
      setSearchInput("");
    };
  }

  return (
    <div class='container'>
      <div class='row justify-content-center'>
        <div class='col-4'>
          <img src={gitHubImg} alt='github logo'/>
          <h1>GitHub Explorer</h1>
          <form onSubmit={clickHandler}>
            <input type="text"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput}/>
            <input type="submit"
            value="Search"/>
          </form>
          <ul>
            {searchResult.map((repo) => (
              <Link to={`/repository-info/${repo.owner.login}/${repo.name}`}  key={repo.id}><li>{repo.name}</li></Link>))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
