import React from "react";
import { Button, Card, Dropdown, Modal } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { FirebaseContext } from '../Context/FirebaseContext';

//cambie el color de blanco en negro en FooterIndex porque la descripcion de las tarjetas me las pone como blancas ANALIZAR
function Mascotas() {
  const { tarjetasmascotas, modalShow, setModalShow,
    especieSeleccionada, edadSeleccionada, TamañoSeleccionada, SexoSeleccionada, tarjetasmascotasedad,
    botonfiltros, tarjetasfinales, tarjetasmascotastamaño, tarjetasmascotassexo, mascotaperfil,
    modificar, eliminar, mascotasusu, setMascotaPerfil } = useContext(FirebaseContext);

    
  return (
    <div >
      <br/>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <h2>Mis mascotas</h2>
      </div>
      <div className='BotonesFiltros'>
              <Dropdown onSelect={tarjetasmascotas}>
        <Dropdown.Toggle variant="success" className='botondefiltros' id="dropdown-basic">
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
        <Dropdown.Toggle variant="success" className='botondefiltros' id="dropdown-basic">
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
        <Dropdown.Toggle variant="success" className='botondefiltros' id="dropdown-basic">
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
        <Dropdown.Toggle variant="success" className='botondefiltros' id="dropdown-basic">
          {SexoSeleccionada}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey={"todas"}>Todas</Dropdown.Item>
          <Dropdown.Item eventKey={"hembra"}> Hembra</Dropdown.Item>
          <Dropdown.Item eventKey={"macho"}>Macho</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </div>

      <div className='botoneviar'>
      <Button variant="primary" className='botondebusc' onClick={() => botonfiltros()}>Buscar</Button>
      </div>
      <div className='contenedortarjetas'>
              {tarjetasfinales.length===0?
        (mascotasusu.map((mascota, index) => (
          <Card key={index} className="cardt2" >
          <Card.Img variant="top" className='cardimg' src={mascota.url} />
          <Card.Body className='cardBody'>
              <Card.Title>{mascota.nombre}</Card.Title>
              <Card.Text>
                  Edad: {mascota.edad} <br />
                  Sexo: {mascota.sexo}
              </Card.Text>
              <Button variant="primary" style={{ backgroundColor: '#c59edb', border: 'none' }} onClick={() => { setModalShow(true); setMascotaPerfil(mascota); }}>Perfil</Button>
          </Card.Body>
      </Card>
        ))):tarjetasfinales}
      {modalShow ?(
        <div>
        <Modal show={modalShow} onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered  
        >
              <Modal.Header style={{ backgroundColor: '#c59edb' }} closeButton  >
                <Modal.Title>{mascotaperfil.nombre.toUpperCase()}</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: '' }}>
                <div className="container">
                  <div className="image">
                    <img src={mascotaperfil.url} alt={mascotaperfil.nombre} />
                  </div>
                  <div className="info">
                  <p><strong>Edad:</strong> <span style={{textTransform: 'capitalize'}}>{mascotaperfil.edad}</span></p>
                  <p><strong>Sexo:</strong> <span style={{textTransform: 'capitalize'}}>{mascotaperfil.sexo}</span></p>
                  <p><strong>Tamaño:</strong> <span style={{textTransform: 'capitalize'}}>{mascotaperfil.tamaño}</span></p>
                  <p><strong>Especie:</strong> <span style={{textTransform: 'capitalize'}}>{mascotaperfil.especie}</span></p>
                  <p><strong>Raza:</strong> <span style={{textTransform: 'capitalize'}}>{mascotaperfil.raza}</span></p>
                  </div>
                </div>
                <p style={{ marginBottom: "0.1rem",fontWeight: 'bold' }}>Descripcion: </p>
                <p style={{ marginTop: "0"}}>{mascotaperfil.descripcion}</p>
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