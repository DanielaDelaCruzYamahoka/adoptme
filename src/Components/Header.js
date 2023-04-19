import React from "react";
import "./Header.css";
import logo from "../logoadoptme.png";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <section>
      <header className="navbar">
        <Link to={"/"}>
          <img className="logo" src={logo} alt="logo" />
        </Link>

        <nav className="Principal">
          <Link to={"/registro"} className="NavPrimary">
            Registrarme
          </Link>
          <Link to={"/InicioSesion"}>Iniciar sesión</Link>
          <a href="Adoptar.html">Adoptar</a>
          <a href="Nosotros.html">Sobre nosotros</a>
          <a href="Contacto.html">Contacto</a>
          <Link to={"/Mipanel"}>Mi Panel</Link>
        </nav>
      </header>

      <section className="Presentacion">
        <h3>{props.texto1}</h3>
        <h1>{props.texto2}</h1>

        <p>No compres la felicidad, adopta</p>
      </section>
    </section>
  );
}

export default Header;
