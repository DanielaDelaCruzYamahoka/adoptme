
import Mascotas from './Mascotas';
import Mipanel from './Mipanel';
import React, { useState } from 'react';
import FirebaseProvider, { FirebaseContext } from '../Context/FirebaseContext';
import FooterIndex from './FooterIndex';
import Header from './Header';
import Navegacion from './Navegacion';
function PrincipalMascotas(props) {

  return (
    <FirebaseProvider>
      <div>
        <Header
            texto1="Bienvenido"
            texto2="Mi Panel"
        />
        <Navegacion
        etiqueta={<a>Aquí van los links de navegacion</a>} />
        <Mipanel/>
        <Mascotas />
        <FooterIndex/>
      </div>
    </FirebaseProvider>



  );
}

export default PrincipalMascotas;