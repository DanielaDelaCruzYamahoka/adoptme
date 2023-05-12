import React, {useRef} from 'react';
import FooterIndex from './FooterIndex';
import HeaderII from './HeaderII';
import Navegacion from './Navegacion';
import perroscontacto from '../perroscontacto.png'
import './EstiloFormularios.css'
import { Button, Card, Dropdown, InputGroup, Form, Table, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Contacto.css';
import emailjs from '@emailjs/browser';

function Contacto() {

    const refForm =useRef();

    const handleSubmit = (event) =>{
        event.preventDefault();

        const serviceId="service_qq9jjgs";
        const templateId= "template_fxd83hs";

        const apikey="uBitAKN8y8TYrdpBV";
        emailjs.sendForm(serviceId,templateId,refForm.current,apikey)
        .then(result=> {console.log(result.text); refForm.current.reset()})
        .catch(error=> console.log(error))
    }

    return (
        <div >
            <HeaderII
                texto1="Bienvenido"
                texto2="Contacto"
            />
            <Navegacion
                etiqueta={<a>Aquí van los links de navegacion</a>} />
            <div className='componen'>
                <Card >
                    <Card.Body>
                        <Card.Title>Contactenos</Card.Title>
                        <Card.Text>Mandenos un mensaje por este medio y atenderemos su duda.</Card.Text>
                        <Form ref={refForm} onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Nombre</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre"
                                    name="nombre"
                                    id="nombre"
                                    required
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text>Apellido</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Apellido"
                                    name="apellido"
                                    id="apellido"
                                    required
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text>Telefono</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Telefono"
                                    name="telefono"
                                    id="telefono"
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text>Correo</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Correo"
                                    name="correo"
                                    id="correo"
                                    required
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Mensaje</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa el mensaje que nos deseas transmitir"
                                    name="mensaje"
                                    id="mensaje"
                                    required
                                    style={{ height: "200px", width: "100%" }}
                                />
                            </InputGroup>
                            <br />
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Button variant="primary" type="submit" >
                                    Enviar
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>

                <div className='extra'>
                    <p>Teléfono</p>
                    <p>+52 6641947541</p>
                    <p>Sigue nuestras redes sociales</p>
                    <img style={{	maxWidth: "35rem", height: "25rem"}}src={perroscontacto} />
                </div>
            </div>




            <FooterIndex></FooterIndex>
        </div>



    );
}

export default Contacto;