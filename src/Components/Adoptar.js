import FooterIndex from './FooterIndex';
import Header from './Header';
import Navegacion from './Navegacion';
import AdoptarMascotas from './AdoptarMascotas';
import {Button, Card, Dropdown, InputGroup, Form, Table} from 'react-bootstrap/';
import { useContext } from 'react';
import FirebaseProvider, { FirebaseContext } from '../Context/FirebaseContext';

function Adoptar(){
    return(
        <FirebaseProvider>
        <div>
            <Header
               texto1="Bienvenido"
               texto2="Adoptar"
            />
            <Navegacion
                etiqueta={<a>Aquí van los links de navegacion</a>}
            />
            <br/>
            <AdoptarMascotas/>
        </div>            
        </FirebaseProvider>

    )
}

export default Adoptar;