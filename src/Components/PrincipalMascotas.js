
import Mascotas from './Mascotas';
import Mipanel from './Mipanel';
import React from 'react';
import FirebaseProvider from '../Context/FirebaseContext';
import FooterIndex from './FooterIndex';
import HeaderII from './HeaderII';
import Navegacion from './Navegacion';
import AdopcionesProvider from '../Context/AdopcionesContext';
function PrincipalMascotas(props) {

  return (
    <FirebaseProvider>
      <AdopcionesProvider>
        <div>
          <HeaderII
              texto1="Bienvenido"
              texto2="Mi Panel"
          />
          <Navegacion/>
          <Mipanel/>
          <Mascotas />
          <FooterIndex/>
        </div>        
      </AdopcionesProvider>

    </FirebaseProvider>



  );
}

export default PrincipalMascotas;