import { useParams } from "react-router-dom";
import { Octokit } from 'octokit';
import { useEffect, useState } from 'react';
import './github-markdown-light.css'

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

                //The following block converts the markdown to HTML by GitHub API
                const markdown = await octokit.request('POST /markdown', {
                    text: atob(res.data.content),
                    headers: {
                      'X-GitHub-Api-Version': '2022-11-28'
                    }
                })

                setContent(markdown.data);
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
        <div className="container border mt-4 mb-4">
            <div className="body">
                <h1 className="body-header">Repository Information</h1>
                <h4 className="body-sm-header">Repository name: <span className="notbold">{params.repo}</span></h4>
                <h4 className="body-sm-header">Repository owner: <span className="notbold">{params.owner}</span></h4>
                <ul className="list-group list-group-horizontal">
                    {languages.map((language)=>(
                        <li className='list-group-item' key={language}>{language}</li>
                    ))}
                </ul>
            </div>
            <div className="markdown-body" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}

export default RepoInfo;