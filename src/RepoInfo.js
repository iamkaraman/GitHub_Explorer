import { useParams } from "react-router-dom";
import { Octokit } from 'octokit';
import { useEffect, useState } from 'react';

function RepoInfo () {
    const params = useParams();
    
    const [content, setContent] = useState("");
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        //The following block fetches readme of the repo from the API
        const octokit = new Octokit({});

        async function getReadMe() {
            try{
                const res = await octokit.request('GET /repos/{owner}/{repo}/readme', {
                    owner: params.owner,
                    repo: params.repo,
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28'
                    }
                })
                setContent(atob(res.data.content));
            } catch(error){
                alert('ReadMe is not found!')
            }
        }

        getReadMe();

        //The following block fetches languages of the repo from the API
        async function getLanguages(){
            try{
                const res = await octokit.request('GET /repos/{owner}/{repo}/languages', {
                    owner: params.owner,
                    repo: params.repo,
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28'
                    }
                })
                setLanguages(Object.keys(res.data));
            } catch(error){
                alert('Language is not found!')
            }
            
        }

        getLanguages();
    }, [])
   
    return (
        <div>
            <h2>Repository Information</h2>
            <h3>{params.repo}</h3>
            <h4>{params.owner}</h4>
            <ul>
                {languages.map((language)=>(
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <p>{content}</p>
        </div>
    )
}

export default RepoInfo;