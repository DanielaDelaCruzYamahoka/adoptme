import FooterIndex from './FooterIndex';
import Header from './Header';
import Navegacion from './Navegacion';
import './Nosotros.css';

function Nosotros() {
    return (
      <div>
        <Header
        texto1="Bienvenido"
        texto2="Nosotros"
        />
        <Navegacion
        etiqueta={<a>Aquí van los links de navegacion</a>}/>
        <div className='informacion'>

            <h2>Misión</h2>
            <p>Ayudar a los animales abandonados dándoles un hogar temporal donde se les
            pueda brindar los cuidados necesarios y dándoles un nuevo hogar en una familia
            estable donde les den el cariño y sean responsables de ellos.</p>
                        
            <h2>Vision</h2>
            <p>La empresa se enfoca en disminuir la tasa de abandono animal en la región,
            promover la adopción responsable y luchar contra el abandono y maltrato creando
            conciencia de amor y respeto hacia los animales.</p>

            <h2>Nuestros Valores</h2>
            <p>● Transparencia: De la mano con la honestidad, la transparencia es esencial
            para la empresa, implica una verdadera responsabilidad y sinceridad con los
            clientes.
            <br/>
            ● Pasión: Nos encanta lo que hacemos y queremos transmitir esa motivación a
            los demás.
            <br/>
            ● Compromiso: Trabajar en cada momento para buscar hogares a los
            animales abandonados y reforzar una adopción responsable.
            <br/>
            ● Solidaridad: Se desea cumplir con los objetivos principales al realizar la
            adopción ayudando a animales para que tengan un buen futuro.
            <br/>
            ● Responsabilidad: Este valor es muy representativo de nuestro proyecto ya
            que conlleva un gran peso en base a la vida de los animales así como darles
            una buena calidad de vida con sus futuros adoptantes.</p>

        </div>

        <FooterIndex></FooterIndex>
      </div>
      
  
    );
  }
  
  export default Nosotros;