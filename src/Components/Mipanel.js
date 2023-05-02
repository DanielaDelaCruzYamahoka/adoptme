import { Button, Card, Dropdown, InputGroup, Form, Table } from 'react-bootstrap';
//import './Mipanel.css'
import FooterIndex from './FooterIndex';
import Header from './Header';
import Navegacion from './Navegacion';
import perro1 from '../istock.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { useContext } from 'react';
import { FirebaseContext } from '../Context/FirebaseContext';

function Mipanel(props) {
    const { lista, mascotas, manejoenvio, guardarImagen, eliminar, modificar, guardarCambios } = useContext(FirebaseContext);

    return (

        <div>
            <Header
                texto1="Bienvenido"
                texto2="Mi Panel"
            />
            <Navegacion
                etiqueta={<a>Aquí van los links de navegacion</a>} />
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
                                onChange={guardarCambios}
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
                                onChange={guardarCambios}
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Edad</Form.Label>
                            <Form.Select
                                aria-label="Selecciona la edad de la mascota"
                                name="edad"
                                id="edad"
                                value={mascotas.edad}
                                onChange={guardarCambios}>
                                <option value="Seleccione">Seleccione</option>
                                <option value="cachorro">Cachorro</option>
                                <option value="adulto">Adulto</option>
                                <option value="adulto mayor">Adulto Mayor</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Sexo</Form.Label>
                            <Form.Select
                                aria-label="Selecciona el sexo de la mascota"
                                name="sexo"
                                id="sexo"
                                value={mascotas.sexo}
                                onChange={guardarCambios}>
                                <option value="Seleccione">Seleccione</option>
                                <option value="hembra">Hembra</option>
                                <option value="macho">Macho</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Especie</Form.Label>
                            <Form.Select
                                aria-label="Selecciona la especie de la mascota"
                                name="especie"
                                id="especie"
                                value={mascotas.especie}
                                onChange={guardarCambios}>
                                <option value="seleccione">seleccione</option>
                                <option value="perro">Perro</option>
                                <option value="gato">Gato</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Tamaño</Form.Label>
                            <Form.Select
                                aria-label="Ingresa tamaño de la mascota"
                                name="tamaño"
                                id="tamaño"
                                value={mascotas.tamaño}
                                onChange={guardarCambios}>
                                <option value="seleccione">Seleccione</option>
                                <option value="pequeño">Pequeño</option>
                                <option value="mediano">Mediano</option>
                                <option value="grande">Grande</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Raza</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa raza de la mascota"
                                name="raza"
                                id="raza"
                                value={mascotas.raza}
                                onChange={guardarCambios}
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
                                onChange={guardarCambios}
                            />
                        </Form.Group>
                        <div onSubmit={guardarImagen}>
                            <Form.Group>
                                <Form.Label>Imagen</Form.Label>
                                <Form.Control type="file"
                                    name="imagen"
                                    id="imagen"
                                    onChange={guardarImagen}
                                />
                            </Form.Group>
                        </div>

                        <Button variant="primary" type="submit" onClick={manejoenvio}>
                            Enviar
                        </Button>

                    </Form>
                </Card.Body>
            </Card>
            {
                lista.length === 0
                    ? <h6>No ha dado en adopcion</h6>
                    :
                    <div>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Edad</th>
                                    <th>Sexo</th>
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
                                    lista.map((a, index) =>
                                        <tr key={index}>
                                            <td>{a.id}</td>
                                            <td>{a.nombre}</td>
                                            <td>{a.edad}</td>
                                            <td>{a.sexo}</td>
                                            <td>{a.especie}</td>
                                            <td>{a.tamaño}</td>
                                            <td>{a.raza}</td>
                                            <td>{a.descripcion}</td>
                                            <td>{a.imagen}</td>
                                            <td><Button variant="success" onClick={() => modificar(a.id)}>Modificar</Button></td>
                                            <td><Button variant="danger" onClick={() => eliminar(a.id)}>Eliminar</Button></td>
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
