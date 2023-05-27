import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Home from './routes/Home.jsx';
import NewPost  from './routes/NewPost.jsx';
import Edit from './routes/Edit.jsx';
import Delete from './routes/Delete.jsx'
import ErrorPage from './routes/ErrorPage.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/new",
        element: <NewPost />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
      {
        path: "/delete/:id",
        element: <Delete />,
      },

    ,]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router ={router} />
  </React.StrictMode>,
)
