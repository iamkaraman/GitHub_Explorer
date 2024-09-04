import React, { useState } from "react";
import { Octokit } from 'octokit';
import { Link } from 'react-router-dom';
import gitHubImg from './assets/github.jpeg';

function App() {

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

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
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-4 text-center'>
          <img src={gitHubImg} alt='github-logo'/>
          <h1>GitHub Explorer</h1>
          <form onSubmit={clickHandler}>
            <div className='form-group row g-2'>
              <div className="col-8">
                <input type="text"
                className="form-control"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput}/>
              </div>
              <div className="col-4">
                <button  className='btn btn-dark w-100' data-toggle="button" type="submit">
                  Search
                </button>
              </div>
            </div> 
          </form>
          <ul class="list-group list-group-flush">
            {searchResult.map((repo) => (
              <Link to={`/repository-info/${repo.owner.login}/${repo.name}`} 
                key={repo.id}>
                  <li class="list-group-item mt-2 mb-2">
                    {repo.name}
                  </li>
              </Link>))
            }
          </ul>
        </div>
      </div>
    </div>

  );
}

export default App;
