import FirebaseProvider from '../Context/FirebaseContext';
import './AdoptarMascotas.css'
import MascotasNAM from './MascotasNAM';
import Header from './Header';
import Navegacion from './Navegacion';
import FooterIndex from './FooterIndex';

function MascotasNA() {
  return (
    <FirebaseProvider>
        <div>
        <Header
              texto1="Bienvenido"
              texto2="Mascotas"
          />
          <Navegacion/>
          <MascotasNAM />
          <FooterIndex/>
        </div>      
    </FirebaseProvider>

  )
}

export default MascotasNA;
