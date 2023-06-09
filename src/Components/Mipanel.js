import { Button, Card,InputGroup, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { useContext } from 'react';
import { FirebaseContext } from '../Context/FirebaseContext';
import { AdopcionesContext } from '../Context/AdopcionesContext';
import notinueva from '../imagenes/notinueva.png'
import './Mipanel.css'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const Nav = () => {
    const [open, setOpen] = useState(false);
    const { vernotificaciones, verespuestas}=useContext(AdopcionesContext)
    

    return (
      <nav data-testid="nav" className={open ? "open" : null}>
        <Button variant='light' className='botonoti'
          onClick={() => {
            setOpen(!open);
          }}
          data-testid="hamburger"
        >
          <img
            src={notinueva}
            alt="hamburger"
          />
        </Button>
        <h5>Notificaciones</h5>
        {vernotificaciones()}
        {verespuestas()}
      </nav>
    );
  };

function Mipanel(props) {
    const { mascotas, manejoenvio, guardarImagen, guardarCambios,handleSubmit,imagencargada,file } = useContext(FirebaseContext);
    const nombre=cookies.get("nombre")
    const apellidoP=cookies.get("apellidoP")
    const apellidoM=cookies.get("apellidoM")
    const username=cookies.get("username")
    const cerrarSesion=()=>{
        cookies.remove('username', {path:"/"})
        window.location.href='/Index'
    }

    
    
    return (

        <div>
                <div className='container'>
                <Nav/>
                </div>            
            <div style={{display:"flex",justifyContent:"space-around", flexFlow:"row-wrap", alignItems:"stretch"}}>
                <div style={{display:"flex", flexFlow:"column", alignItems:"center", padding:"15px"}} >
                    <div style={{ color:"#595959"}}>
                        Información personal</div>
                    <h4>{nombre}</h4>
                    <h4>{apellidoP} {apellidoM}</h4>
                    <p>{username}</p>
                    
                    <Button className="mb-2" variant="outline-danger" onClick={()=>cerrarSesion()}>Cerrar Sesión</Button>
                                       
                </div>

                <Card>
                <Card.Body>
                    <Card.Title>Ingresar Mascota</Card.Title>
                    <Card.Text>Ingresa los datos de la mascota que deseas poner en adopción</Card.Text>
                    <div>
                        <Form.Label>Primero envía la imagen</Form.Label>
                        <InputGroup className="mb-3">
                                <Form.Control type="file"
                                name="url"
                                placeholder="Ingresa la imagen"
                                id="url"
                                onChange={guardarImagen}
                                />
                            <Button variant="primary" type="submit" disabled={!file} onClick={handleSubmit}>
                            Enviar imagen
                            </Button>
                        </InputGroup>
                    </div>
                    <Form onSubmit={manejoenvio}>
                        <InputGroup  className="mb-3">
                            <InputGroup.Text>Id</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa id de la mascota"
                                name="id"
                                id="id"
                                value={mascotas.id}
                                onChange={guardarCambios}
                                disabled={!imagencargada}
                            />
                        </InputGroup>

                        <InputGroup  className="mb-3">
                            <InputGroup.Text>Nombre</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa nombre de la mascota"
                                name="nombre"
                                id="nombre"
                                value={mascotas.nombre}
                                onChange={guardarCambios}
                                disabled={!imagencargada}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3" >
                            <InputGroup.Text>Edad</InputGroup.Text>
                            <Form.Select
                                aria-label="Selecciona la edad de la mascota"
                                name="edad"
                                id="edad"
                                value={mascotas.edad}
                                onChange={guardarCambios}
                                disabled={!imagencargada}
                                >
                                <option value="Seleccione">Seleccione</option>
                                <option value="cachorro">Cachorro</option>
                                <option value="adulto">Adulto</option>
                                <option value="adulto mayor">Adulto Mayor</option>
                            </Form.Select>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Sexo</InputGroup.Text>
                            <Form.Select
                                aria-label="Selecciona el sexo de la mascota"
                                name="sexo"
                                id="sexo"
                                value={mascotas.sexo}
                                onChange={guardarCambios}
                                disabled={!imagencargada}
                                >
                                <option value="Seleccione">Seleccione</option>
                                <option value="hembra">Hembra</option>
                                <option value="macho">Macho</option>
                            </Form.Select>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Especie</InputGroup.Text>
                            <Form.Select
                                aria-label="Selecciona la especie de la mascota"
                                name="especie"
                                id="especie"
                                value={mascotas.especie}
                                onChange={guardarCambios}
                                disabled={!imagencargada}
                                >
                                <option value="seleccione">Seleccione</option>
                                <option value="perro">Perro</option>
                                <option value="gato">Gato</option>
                            </Form.Select>
                        </InputGroup>

                        <InputGroup className="mb-3" >
                            <InputGroup.Text>Tamaño</InputGroup.Text>
                            <Form.Select
                                aria-label="Ingresa tamaño de la mascota"
                                name="tamaño"
                                id="tamaño"
                                value={mascotas.tamaño}
                                onChange={guardarCambios}
                                disabled={!imagencargada}
                                >
                                <option value="seleccione">Seleccione</option>
                                <option value="pequeño">Pequeño</option>
                                <option value="mediano">Mediano</option>
                                <option value="grande">Grande</option>
                            </Form.Select>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Raza</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa raza de la mascota"
                                name="raza"
                                id="raza"
                                value={mascotas.raza}
                                onChange={guardarCambios}
                                disabled={!imagencargada}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Descripcion</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa Descripcion de la mascota"
                                name="descripcion"
                                id="descripcion"
                                value={mascotas.descripcion}
                                onChange={guardarCambios}
                                disabled={!imagencargada}
                                
                            />
                        </InputGroup>
                        <br/>
                        <div style={{display:"flex", justifyContent:"center"}}>
                        <Button variant="primary" disabled={!imagencargada} type="submit" onClick={manejoenvio}>
                            Enviar
                        </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            </div> 
            
        </div>
        
    )
}

export default Mipanel;
