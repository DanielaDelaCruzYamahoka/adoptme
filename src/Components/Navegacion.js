import React from 'react';
import './Navegacion.css'

function Navegacion(props) {
  
  return (
    <div className="navHorizontal">
        {props.etiqueta}
    </div>
    
    

  );
}

export default Navegacion;