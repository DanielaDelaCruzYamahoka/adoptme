import { Button, Card, Dropdown, Modal } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import { FirebaseContext } from '../Context/FirebaseContext';
import './AdoptarMascotas.css'



function AdoptarMascotas() {



  const { tarjetasmascotas2, modalShow, setModalShow,
    especieSeleccionada, edadSeleccionada, TamañoSeleccionada,
    SexoSeleccionada, tarjetasmascotasedad2, botonfiltros2,
    tarjetasfinales, tarjetasmascotastamaño2, tarjetasmascotassexo2, mascotaperfil,
    lista,setMascotaPerfil } = useContext(FirebaseContext);
  
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <h2>Encuentra a tu nuevo compañero</h2>
      </div>
      {/* #c59edb morado #8fc9ff azul*/}
      <div className='BotonesFiltros'>
        <Dropdown onSelect={tarjetasmascotas2}>
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
        <Dropdown onSelect={tarjetasmascotasedad2}>
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
        <Dropdown onSelect={tarjetasmascotastamaño2}>
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
        <Dropdown onSelect={tarjetasmascotassexo2}>
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
      <Button variant="primary" className='botondebusc' onClick={() => botonfiltros2()}>Buscar</Button>
      </div>

      

      <div className='contenedortarjetas'>
        
        {tarjetasfinales.length===0?
        (lista.map((mascota, index) => (
            <Card key={index} className='cardt'>
                <Card.Img variant="top" className='cardimg' src={mascota.url} />
                <Card.Body className='cardBody'>
                    <Card.Title >{mascota.nombre}</Card.Title>
                    <Card.Text>
                        Raza: {mascota.raza}
                    </Card.Text>
                    <Button variant="primary" style={{ backgroundColor: '#c59edb',border: 'none' }} onClick={() => { setModalShow(true); setMascotaPerfil(mascota); }}>Perfil</Button>
                </Card.Body>
            </Card>
        ))):tarjetasfinales}
        
        {modalShow ? (
          <div>
            <Modal  show={modalShow} onHide={() => setModalShow(false)}
              size="md"
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
                <p style={{ marginTop: "0",textTransform: 'capitalize' }}>{mascotaperfil.descripcion}</p>
              </Modal.Body>
              <Modal.Footer style={{ backgroundColor: '' }}>
                <Button variant="secondary" style={{ backgroundColor: '#c59edb',border: 'none' }} onClick={() => setModalShow(false)}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ) : null}
      </div>
    </div>

  )
}

export default AdoptarMascotas;