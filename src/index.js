import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App';
import RepoInfo from "./RepoInfo";


const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/repository-info/:owner/:repo', element: <RepoInfo />}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
