import Mascotas from './Mascotas';
import Navegacion from './Navegacion';
import React from "react";
import FooterIndex from './FooterIndex';
import Header from './Header';

function Adoptar(props){

    return(
        
        <div>
            <Header
               texto1="Bienvenido"
               texto2="Adoptar"
            />
            <Navegacion
                etiqueta={<a>Aquí van los links de navegacion</a>}/>
            <Mascotas/>
          {/* <FooterIndex/>*/}  

        </div>
    )
}

export default Adoptar;