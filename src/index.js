import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrincipalMascotas from './Components/PrincipalMascotas'
import Registro from './Components/Registro'
import Index from './Components/Index'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <h1>Error</h1>
  },
  {
    path: '/registro',
    element: <Registro />,
    errorElement: <h1>Error</h1>
  },
  {
    path: 'Mipanel',
    element: <PrincipalMascotas />,
    errorElement: <h1>Error</h1>
  }
  
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
