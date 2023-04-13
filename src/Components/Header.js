import React from 'react';
import './Header.css'
import logo from '../logoadoptme.png'
//se instaló react-router-dom y se importan componentes del paquete
/* 
import { BrowserRouter as Router, Switch, Route, Redirect,} from "react-router-dom";

BrowserRouter: utiliza la API de historial de HTML5 para mantener la interfaz de usuario sincronizada con la URL.
Ruta : su responsabilidad es representar la interfaz de usuario, cuando su ruta coincide con la URL actual.
Cambiar : representa la primera ruta secundaria o redirección que coincide con la ubicación.
Redirigir : representa la nueva ubicación independientemente de la ubicación actual en la pila de historial
 */
import { Link} from "react-router-dom";




function Header(props) {
  
  return (
    <section>
      <section className='navbar'>
        
        {/* logo de adoptme */}
        <img src={logo} className="logo"></img>
        {/* Menú de navegación */}
        <nav className="Principal">
              <a href="Registro.html" className="NavPrimary">Registrarme</a>
              <a href="InicioSesion.html">Iniciar sesion</a>
              <a href="Adoptar.html">Adoptar</a>
              <a href="Nosotros.html">Sobre nosotros</a>
              <a href="Contacto.html">Contacto</a>
              <a href="PanelNoUsuario.html">Mi panel</a>
          </nav>
      </section>

      <section className='Presentacion'>
            <header>
              <h3>{props.texto1}</h3>
              <h1>{props.texto2}</h1>
            </header>
            <section>
              <p>No compres la felicidad, adopta</p>
            </section>
        </section>
    </section>
    

  );
}

export default Header;