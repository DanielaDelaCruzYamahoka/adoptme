import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrincipalMascotas from './Components/PrincipalMascotas'
import Registro from './Components/Registro'
import Index from './Components/Index'
import InicioSesion from './Components/InicioSesion'
import Nosotros from './Components/Nosotros'
import Contacto from './Components/Contacto'
import Adoptar from './Components/Adoptar'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>Error</h1>
  },
  {
    path: '/Index',
    element: <Index />,
    errorElement: <h1>Error</h1>
  },
  {
    path: '/registro',
    element: <Registro />,
    errorElement: <h1>Error</h1>
  },
  {
    path: '/InicioSesion',
    element: <InicioSesion />,
    errorElement: <h1>Error</h1>
  },
  {
    path: '/Nosotros',
    element: <Nosotros />,
    errorElement: <h1>Error</h1>
  },
  {
    path: '/Contacto',
    element: <Contacto />,
    errorElement: <h1>Error</h1>
  },
  {
    path: '/Adoptar',
    element: <Adoptar />,
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
