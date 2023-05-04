import React from 'react';
import './EstiloFormularios.css'
import Header from './Header';
import Navegacion from './Navegacion';
import p1 from '../imagenes/p2.png'
import FooterIndex from './FooterIndex';
import {Button, InputGroup, Form, Table} from 'react-bootstrap/';

function Registro(props) {
  const { enviar , usuarios, guardarCambios} = props;
  return (
    <div>
     <Header
      texto1="Únete a la comunidad"
      texto2="Registro"
      />

      <main className='mainRegistro'>
      <br/>
      <h4>Escribe tus datos para registrarte y encontrar a tu futura mascota.</h4>
        <section className='Formulario'>
          
          <Form onSubmit={enviar} >
            <InputGroup className="mb-3">
                    <InputGroup.Text>Nombre</InputGroup.Text>
                    <Form.Control 
                    type="text" 
                    placeholder="Ingresa tu nombre" 
                    name="nombre"
                    id="nombre"
                    value={usuarios.nombre}
                    onChange={guardarCambios}
                    />
            </InputGroup>
            <InputGroup className="mb-3">
                    <InputGroup.Text>Apellido Paterno</InputGroup.Text>
                    <Form.Control 
                    type="text" 
                    placeholder="Ingresa apellido paterno" 
                    name="apellidoP"
                    id="apellidoP"
                    value={usuarios.apellidoP}
                    onChange={guardarCambios}
                    />
            </InputGroup>
            <InputGroup className="mb-3">
                    <InputGroup.Text>Apellido Materno</InputGroup.Text>
                    <Form.Control 
                    type="text" 
                    placeholder="Ingresa apellido materno" 
                    name="apellidoM"
                    id="apellidoM"
                    value={usuarios.apellidoM}
                    onChange={guardarCambios}
                    />
            </InputGroup>
            <InputGroup className="mb-3">
                    <InputGroup.Text>Usuario</InputGroup.Text>
                    <Form.Control 
                    type="text" 
                    placeholder="Ingresa nombre de usuario" 
                    name="usuario"
                    id="usuario"
                    value={usuarios.usuario}
                    onChange={guardarCambios}
                    />
            </InputGroup>
            <InputGroup className="mb-3">
                    <InputGroup.Text>Correo</InputGroup.Text>
                    <Form.Control 
                    type="text" 
                    placeholder="name@example.com"
                    name="email"
                    id="email"
                    value={usuarios.email}
                    onChange={guardarCambios}
                    />
            </InputGroup>
            <InputGroup className="mb-3">
                    <InputGroup.Text>Contraseña</InputGroup.Text>
                    <Form.Control 
                    type="password" 
                    placeholder="Ingresa una contraseña" 
                    name="password"
                    id="password"
                    value={usuarios.password}
                    onChange={guardarCambios}
                    />
            </InputGroup>
            <br/>
            <Button size="lg" variant="primary" type="submit" onClick={enviar}>
                Enviar
            </Button>
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

export default Registro;