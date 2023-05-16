import React from "react";
import { Button, Card, Container, Dropdown, Modal, Row, Col } from 'react-bootstrap/';
import './Mascotas.css'
import FooterIndex from './FooterIndex';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import { FirebaseContext } from '../Context/FirebaseContext';

//cambie el color de blanco en negro en FooterIndex porque la descripcion de las tarjetas me las pone como blancas ANALIZAR
function Mascotas() {
  const { tarjetasmascotas, modalShow, mascotaSeleccionada, setModalShow, selectedTarjetas, seleccionado,
    especieSeleccionada, edadSeleccionada, TamañoSeleccionada, SexoSeleccionada, listaFiltrada, tarjetasmascotasedad,
    selectedEdad, filtros, botonfiltros, tarjetasfinales, tarjetasmascotastamaño, tarjetasmascotassexo, mascotaperfil, modificar, eliminar } = useContext(FirebaseContext);

    
  return (
    <div >
      <div style={{display:"flex", flexDirection:"row"}}>
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
      </div>


      <Button variant="primary" onClick={() => botonfiltros()}>Buscar</Button>
      <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around"}}>
              {tarjetasfinales}
      {modalShow ?(
        <div style={{ width: '500px', height: '500px' }}>
        <Modal show={modalShow} onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered  
        >
          <Modal.Header closeButton  >
            <Modal.Title>{mascotaperfil.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="image">
                <img src={mascotaperfil.url} alt={mascotaperfil.nombre} />
              </div>
              <div className="info">
                <p>Edad: {mascotaperfil.edad}</p>
                <p>Tamaño: {mascotaperfil.tamaño}</p>
                <p>Sexo: {mascotaperfil.sexo}</p>
              </div>
            </div>
            <p style={{ marginBottom: "0.1rem" }}>Descripcion: </p>
            <p style={{ marginTop: "0" }}>{mascotaperfil.descripcion}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => modificar(mascotaperfil.id)}>Modificar</Button>
            <Button variant="danger" onClick={() => eliminar(mascotaperfil.id, mascotaperfil.url)}>Eliminar</Button>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      ):null}
      </div>
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