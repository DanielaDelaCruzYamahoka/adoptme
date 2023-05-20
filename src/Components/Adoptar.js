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
                />
                <br/>
                <AdoptarMascotas/>
                <br/>
                <FooterIndex/>
            </div>            

            </AdopcionesProvider>
        </FirebaseProvider>

    )
}

export default Adoptar;