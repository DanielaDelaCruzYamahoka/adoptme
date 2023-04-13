import React from "react";
import {Button, Card, Dropdown, InputGroup, Form, Table} from 'react-bootstrap/';
//import './Mipanel.css'
import FooterIndex from './FooterIndex';
import perro1 from '../istock.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';

function Mipanel(props){
    const { manejoenvio , mascotas, setmascotas, lista, eliminar, modificar} = props;

    return(
        
        <div>
            
            <Card>
                <Card.Body>
                    <Card.Title>Ingresar Mascota</Card.Title>
                    <Card.Text>Ingresa los datos de la mascota que deseas poner en adopción</Card.Text>
                    <Form onSubmit={manejoenvio}>
                    <Form.Group >
                            <Form.Label>Id</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Ingresa id de la mascota" 
                            name="id"
                            id="id"
                            value={mascotas.id}
                            onChange={e => setmascotas({...mascotas,id:e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Ingresa nombre de la mascota" 
                            name="nombre"
                            id="nombre"
                            value={mascotas.nombre}
                            onChange={e => setmascotas({...mascotas,nombre:e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Edad</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Ingresa edad de la mascota" 
                            name="edad"
                            id="edad"
                            value={mascotas.edad}
                            onChange={e => setmascotas({...mascotas,edad:e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group >
                        <Form.Label>Especie</Form.Label>
                            <Form.Select 
                            aria-label="Selecciona la especie de la mascota"
                            name="especie"
                            id="especie"
                            value={mascotas.especie}
                            onChange={e => setmascotas({...mascotas,especie:e.target.value})}>
                                <option value="perro">Perro</option>
                                <option value="gato">Gato</option>
                                <option value="reptil">Reptil</option>
                                <option value="roedor">Roedor</option>
                                <option value="acuatico">Acuatico</option>
                                <option value="aves">Aves</option>
                            
                            </Form.Select>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Tamaño</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Ingresa tamaño de la mascota" 
                            name="tamaño"
                            id="tamaño"
                            value={mascotas.tamaño}
                            onChange={e => setmascotas({...mascotas,tamaño:e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Raza</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Ingresa raza de la mascota"
                            name="raza"
                            id="raza"
                            value={mascotas.raza}
                            onChange={e => setmascotas({...mascotas,raza:e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Ingresa Descripcion de la mascota" 
                            name="descripcion"
                            id="descripcion"
                            value={mascotas.descripcion}
                            onChange={e => setmascotas({...mascotas,descripcion:e.target.value})}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={manejoenvio}>
                        Enviar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            {
                lista.length===0
                ? <h6>No ha dado en adopcion</h6>
                :
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Edad</th>
                            <th>Especie</th>
                            <th>Tamaño</th>
                            <th>Raza</th>
                            <th>Descripcion</th>
                            <th></th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lista.map((a,index)=>
                                <tr key={index}>
                                <td>{a.id}</td>
                                <td>{a.nombre}</td>
                                <td>{a.edad}</td>
                                <td>{a.especie}</td>
                                <td>{a.tamaño}</td>
                                <td>{a.raza}</td>
                                <td>{a.descripcion}</td>
                                <td><Button variant="success" onClick={()=> modificar(index)}>Modificar</Button></td>
                                <td><Button variant="danger"onClick={()=> eliminar(index)}>Eliminar</Button></td>
                                </tr>
                                )
                            }
                            
                        </tbody>
                    </Table>
                </div>
            }
        </div>
    )
}

export default Mipanel;
