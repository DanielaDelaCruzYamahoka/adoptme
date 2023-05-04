import React from "react";
import "./Header.css";
import logo from "../logoadoptme.png";
import { Link } from "react-router-dom";
import {Form, Image} from 'react-bootstrap/';

function Header(props) {
  return (
    <section>
      <header className="navbar" >
        
        <Link to={"/Index"}>
          <Image className="logo" src={logo}/>
        </Link>

        <nav className="Principal">
          <Link to={"/registro"} className="NavPrimary">
            <Form.Label >
            Registrarme
            </Form.Label>
          </Link>
          <Link to={"/InicioSesion"}>
          <Form.Label>
            Iniciar Sesión
          </Form.Label>
          </Link>
          <Link to={"/Adoptar"}>
          <Form.Label>
            Adoptar
          </Form.Label> 
          </Link>
          <Link to={"/Nosotros"}>
          <Form.Label>
            Nosotros
          </Form.Label>
          </Link>
          <Link to={"/Contacto"}>
          <Form.Label>
          Contáctanos
          </Form.Label>
          </Link>
          <Link to={"/Mipanel"}>
          <Form.Label>
          Mi panel
          </Form.Label>
          </Link>
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
