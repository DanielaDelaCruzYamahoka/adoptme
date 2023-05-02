
import Mascotas from './Mascotas';
import Mipanel from './Mipanel';
import React, { useState } from 'react';
import { Button, Card, Dropdown } from 'react-bootstrap/';
import perro1 from '../istock.jpg'
import Navegacion from './Navegacion';
import { useContext } from 'react';
import FirebaseProvider, { FirebaseContext } from '../Context/FirebaseContext';

function PrincipalMascotas(props) {
  
  //------------------------------Para mostrar las mascotas (Mascotas)
  


  return (
    <FirebaseProvider>
      <div>
        <Mipanel/>
        <Mascotas />
      </div>
    </FirebaseProvider>



  );
}

export default PrincipalMascotas;