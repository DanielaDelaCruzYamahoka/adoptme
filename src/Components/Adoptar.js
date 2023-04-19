import Mascotas from './Mascotas';
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
            
            <Mascotas/>
          {/* <FooterIndex/>*/}  

        </div>
    )
}

export default Adoptar;