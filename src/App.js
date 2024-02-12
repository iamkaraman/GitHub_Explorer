import React, { useState } from "react";
import {Octokit} from 'octokit';

function App() {

  const [searchInput, setSearchInput] = useState("");

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
      console.log(res);
    } catch(error){
      alert(`User's repository is not found`);
      setSearchInput("");
    };
  }

  return (
    <div>
      <header>
        <h1>GitHub Explorer</h1>
      </header>
      <form onSubmit={clickHandler}>
        <input type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}/>
        <input type="submit"
        value="Search"/>
      </form>
      
    </div>
  );
}

export default App;
