import React from 'react';
import './BodyIndex.css'
import perro1 from '../istock.jpg'
import perro2 from '../GoldenRetriever.jpg'
import gato1 from '../Gato.jpg'
import {Button, Card, Dropdown, InputGroup, Form, Table} from 'react-bootstrap/';
function BodyIndex() {
  return (
    <section>
        <main>
          <section >
            <h3>Historias</h3>
            <br/>
            <h2>Todos merecen una segunda oportunidad</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>                                                                                                                                                                                                                                                                                                               
          </section>
        </main>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginLeft:"10%", marginRight:"10%", marginTop:"5%", marginBottom:"5%", textAlign:"center"}}>
            <Card style={{ width: '18rem', backgroundColor:"#BDE0FE"}}>
                <Card.Img variant="top" src={perro1} />
                <Card.Body>
                    <Card.Title style={{fontSize:"25px", backgroundColor:"#8fc9ff", color:"white"}}>Tobby</Card.Title>
                    <Card.Text style={{fontSize:"18px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ width: '18rem', backgroundColor:"#BDE0FE"}}>
                <Card.Img variant="top" src={gato1} />
                <Card.Body>
                    <Card.Title style={{fontSize:"25px", backgroundColor:"#8fc9ff", color:"white"}}>Copo</Card.Title>
                    <Card.Text style={{fontSize:"18px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ width: '18rem', backgroundColor:"#BDE0FE"}}>
                <Card.Img variant="top" src={perro2} />
                <Card.Body>
                    <Card.Title style={{fontSize:"25px", backgroundColor:"#8fc9ff", color:"white"}}>Salchicha</Card.Title>
                    <Card.Text style={{fontSize:"18px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Card.Text>
                </Card.Body>
              </Card>
        </div>
    </section>
    
    
  );
}

export default BodyIndex;