import FooterIndex from './FooterIndex';
import HeaderII from './HeaderII';
import Navegacion from './Navegacion';
import AdoptarMascotas from './AdoptarMascotas';
import FirebaseProvider from '../Context/FirebaseContext';
import AdopcionesProvider from '../Context/AdopcionesContext';

function Adoptar(){
    return(
        <FirebaseProvider>
            <AdopcionesProvider>
            <div>
                <HeaderII
                texto1="Bienvenido"
                texto2="Adoptar"
                />
                <Navegacion
                    etiqueta={<a>Aquí van los links de navegacion</a>}
                />
                <br/>
                <AdoptarMascotas/>
            </div>            

            </AdopcionesProvider>
        </FirebaseProvider>

    )
}

export default Adoptar;