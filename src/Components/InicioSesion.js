import React from 'react';
import './EstiloFormularios.css'
import Header from './Header';
import Navegacion from './Navegacion';
import p1 from '../imagenes/p3.png'
import FooterIndex from './FooterIndex';
import { Link } from "react-router-dom";
import {Form, InputGroup, Button} from 'react-bootstrap/';
function InicioSesion(props){
  const { entrar, guardarusuario, guardarpassword} = props;

    return (
        <div>
         <Header
          texto1="Bienvenido"
          texto2="Inicio de Sesión"
          />
          {/* en la sección de navegación se debe poner los liks para regresarse a las paginas anteriores */}
          <Navegacion
          />
    
          <main className='mainRegistro'>
          <br/>
          <br/>
          <h4>Ingresa tus datos</h4>
            <section className='Formulario2'>
              <Form style={{marginTop:"5rem"}} >
              <InputGroup size="lg" className="mb-3">
                    <InputGroup.Text>Usuario</InputGroup.Text>
                    <Form.Control 
                    type="text" 
                    placeholder="Ingresa tu usuario" 
                    name="usuario"
                    id="usuario"
                    onChange={guardarusuario}
                    />
            </InputGroup>
            <InputGroup size="lg" className="mb-3">
                    <InputGroup.Text>Contraseña</InputGroup.Text>
                    <Form.Control 
                    type="password" 
                    placeholder="Ingresa tu contraseña" 
                    name="password"
                    id="password"
                    onChange={guardarpassword}
                    />
            </InputGroup>
            <Button size="lg" variant="primary" type="submit" onClick={entrar}>
                Enviar
                </Button>
                <br/>
                <Link to={"/registro"}>
                  <Form.Label style={{fontSize:"1.2rem"}}>
                  ¿Aún no tienes una cuenta?
                  </Form.Label>
                </Link>


              </Form>
              <div>
                <img style={{	maxWidth: "20rem", height: "20rem"}} src={p1}/>
              </div>
            </section>
          </main>
    
          <FooterIndex/>
        </div>
      );
}

export default InicioSesion;