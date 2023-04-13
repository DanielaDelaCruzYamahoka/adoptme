import React from "react";
import {Button, Card, Dropdown} from 'react-bootstrap/';
import './Mascotas.css'
import FooterIndex from './FooterIndex';
import perro1 from '../istock.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';


function Mascotas(props) {
  const {tarjetasmascotas, selectedOption}=props
    return(
      <div>
        <Dropdown onSelect={tarjetasmascotas}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Especies
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey={"gato"}>Gato</Dropdown.Item>
            <Dropdown.Item eventKey={"perro"}>Perro</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
  
        {selectedOption}
      </div>
    );
  }
 


export default Mascotas;