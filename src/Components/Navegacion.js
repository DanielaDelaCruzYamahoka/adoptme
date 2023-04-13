import React from 'react';
import './Navegacion.css'
import logo from '../logoadoptme.png'

function Navegacion(props) {
  
  return (
    <div className="navHorizontal">
        {props.etiqueta}
    </div>
    
    

  );
}

export default Navegacion;