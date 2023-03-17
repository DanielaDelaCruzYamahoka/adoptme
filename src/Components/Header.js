import React from 'react';
import './Header.css'
import logo from '../logoadoptme.png'
function Header() {
  return (
    
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
  );
}

export default Header;