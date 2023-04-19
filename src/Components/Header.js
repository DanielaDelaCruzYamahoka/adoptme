import React from "react";
import "./Header.css";
import logodos from "../logodos.png";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <section>
      <header className="navbar">
        <Link to={"/Index"}>
          <img className="logo" src={logodos} alt="logo" style={{backgroundColor: 'transparent'}}/>
        </Link>

        <nav className="Principal">
          <Link to={"/registro"} className="NavPrimary">
            Registrarme
          </Link>
          <Link to={"/InicioSesion"}>Iniciar sesión</Link>
          <Link to={"/Adoptar"}>Adoptar</Link>
          <Link to={"/Nosotros"}>Sobre nosotros</Link>
          <Link to={"/Contacto"}>Contacto</Link>
          <Link to={"/Mipanel"}>Mi Panel</Link>
        </nav>
      </header>

      <section className="Presentacion">
        <h3>{props.texto1}</h3>
        <br/>
        <h1>{props.texto2}</h1>

        <p>No compres la felicidad, adopta</p>
      </section>
    </section>
  );
}

export default Header;
