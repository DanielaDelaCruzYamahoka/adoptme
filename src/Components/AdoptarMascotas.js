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

      <div className='BotonesFiltros'>
        <Dropdown onSelect={tarjetasmascotas2}>
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
        <Dropdown onSelect={tarjetasmascotasedad2}>
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
        <Dropdown onSelect={tarjetasmascotastamaño2}>
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
        <Dropdown onSelect={tarjetasmascotassexo2}>
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
      <div className='botoneviar'>
      <Button variant="primary" onClick={() => botonfiltros2()}>Buscar</Button>
      </div>

      

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
        
        {tarjetasfinales.length===0?
        (lista.map((mascota, index) => (
            <Card key={index} className="card" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={mascota.url} />
                <Card.Body>
                    <Card.Title>{mascota.nombre}</Card.Title>
                    <Card.Text>
                        {mascota.especie}<br />
                        {mascota.edad} <br />
                        {mascota.tamaño} <br />
                        {mascota.sexo}
                    </Card.Text>
                    <Button variant="primary" onClick={() => { setModalShow(true); setMascotaPerfil(mascota); }}>Perfil</Button>
                </Card.Body>
            </Card>
        ))):tarjetasfinales}
        
        {modalShow ? (
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
                <Button variant="secondary" onClick={() => setModalShow(false)}>
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