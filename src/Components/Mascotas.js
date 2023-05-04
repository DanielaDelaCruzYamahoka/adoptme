import React from "react";
import { Button, Card, Container, Dropdown, Modal, Row, Col } from 'react-bootstrap/';
import './Mascotas.css'
import FooterIndex from './FooterIndex';
import perro1 from '../istock.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import { FirebaseContext } from '../Context/FirebaseContext';

//cambie el color de blanco en negro en FooterIndex porque la descripcion de las tarjetas me las pone como blancas ANALIZAR
function Mascotas() {
  const { tarjetasmascotas, modalShow, mascotaSeleccionada, setModalShow, selectedTarjetas, seleccionado,
    especieSeleccionada, edadSeleccionada, TamañoSeleccionada, SexoSeleccionada, listaFiltrada, tarjetasmascotasedad,
    selectedEdad, filtros, botonfiltros,tarjetasfinales, tarjetasmascotastamaño,tarjetasmascotassexo} = useContext(FirebaseContext);

  return (
    <div>
      <Dropdown onSelect={tarjetasmascotas}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {especieSeleccionada}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey={"todas"}>Todas</Dropdown.Item>
          <Dropdown.Item eventKey={"gato"}>Gato</Dropdown.Item>
          <Dropdown.Item eventKey={"perro"}>Perro</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <br></br>
      <Dropdown onSelect={tarjetasmascotasedad}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {edadSeleccionada}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey={"todas"}>Todas</Dropdown.Item>
          <Dropdown.Item eventKey={"cachorro"}>Cachorro</Dropdown.Item>
          <Dropdown.Item eventKey={"adulto"}>Adulto</Dropdown.Item>
          <Dropdown.Item eventKey={"adulto mayor"}>Adulto Mayor</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <br></br>
      <Dropdown onSelect={tarjetasmascotastamaño}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {TamañoSeleccionada}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey={"todas"}>Todas</Dropdown.Item>
          <Dropdown.Item eventKey={"pequeño"}>Pequeño</Dropdown.Item>
          <Dropdown.Item eventKey={"mediano"}>Mediano</Dropdown.Item>
          <Dropdown.Item eventKey={"grande"}>Grande</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <br></br>
      <Dropdown onSelect={tarjetasmascotassexo}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {SexoSeleccionada}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey={"todas"}>Todas</Dropdown.Item>
          <Dropdown.Item eventKey={"hembra"}> Hembra</Dropdown.Item>
          <Dropdown.Item eventKey={"macho"}>Macho</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
      <Button variant="primary" onClick={()=> botonfiltros()}>Buscar</Button>

      {tarjetasfinales}
    </div>
  );
}



export default Mascotas;


/* <div style={{ width: '500px', height: '500px' }}>
        <Modal show={modalShow} onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered

        >
          <Modal.Header closeButton  >
            <Modal.Title>{mascotaSeleccionada.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="image">
                <img src={mascotaSeleccionada.imagen} alt={mascotaSeleccionada.nombre} />
              </div>
              <div className="info">
                <p>Edad: {mascotaSeleccionada.edad}</p>
                <p>Tamaño: {mascotaSeleccionada.tamaño}</p>
                <p>Sexo: {mascotaSeleccionada.sexo}</p>
              </div>
            </div>
            <p style={{ marginBottom: "0.1rem" }}>Descripcion: </p>
            <p style={{ marginTop: "0" }}>{mascotaSeleccionada.descripcion}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>*/