
import Mascotas from './Components/Mascotas';
import Mipanel from './Components/Mipanel';
import React, {useState} from 'react';
import {Button, Card, Dropdown} from 'react-bootstrap/';
import perro1 from './istock.jpg'
import Registro from './Components/Registro';
function App() {

  //------------------------------Para ingresar, eliminar y modificar una mascota (Mipanel)

  //states
  const [mascotas,setmascotas]=useState({
    id:"",
    nombre:"",
    edad:"",
    especie:"",
    tamaño:"",
    raza:"",
    descripcion:""
  })

  const [lista, setlista]=useState([]);

  //funciones
  const manejoenvio = (e) => {

    e.preventDefault();

    if(mascotas.id !==lista.id){
      const nuevaMascota = {
        id: document.getElementById('id').value,
        nombre: document.getElementById('nombre').value,
        edad: document.getElementById('edad').value,
        especie: document.getElementById('especie').value,
        tamaño: document.getElementById('tamaño').value,
        raza: document.getElementById('raza').value,
        descripcion: document.getElementById('descripcion').value
      };
      setlista([...lista,nuevaMascota]);
      setmascotas({
        id:'',
        nombre: '',
        edad: '',
        especie: '',
        tamaño: '',
        raza: '',
        descripcion: '',
      });
    }
      
    
  };
  
  const eliminar =(index)=>{
    const mascotaeliminar= lista[index]
    const listatemporal=  lista.filter((a)=>a.nombre!==mascotaeliminar.nombre)
    setlista(listatemporal)
  }

  const modificar =(index)=>{
    const mascotaAModificar = lista[index];
    const listatemporall = lista.filter((a) => a.nombre !== mascotaAModificar.nombre);
    
    // Crear un nuevo objeto temporal con los valores actualizados de la mascota
    const mascotaModificada = {
      id: mascotaAModificar.id,
      nombre: mascotas.nombre,
      edad: mascotas.edad,
      especie: mascotas.especie,
      tamaño: mascotas.tamaño,
      raza: mascotas.raza,
      descripcion: mascotas.descripcion,
    };
    
    // Actualizar la lista con el objeto temporal en lugar de la mascota original
    const nuevaLista = [...listatemporall, mascotaModificada];
    setlista(nuevaLista);
    
  }

  //------------------------------Para mostrar las mascotas (Mascotas)
  const [selectedOption, setSelectedOption] = useState(null);
  
  function tarjetasmascotas(eventKey) {
    const tarjetas = lista
    .filter((mascota) => mascota.especie === eventKey)
    .map((mascota, index) => (
      <Card key={index} className="card" style={{ width: '18rem' }}>
        <Card.Img variant="top" src={perro1} />
        <Card.Body>
          <Card.Title>{mascota.nombre}</Card.Title>
          <Card.Text>{mascota.descripcion}</Card.Text>
          <Button variant="primary">Adoptar</Button>
        </Card.Body>
      </Card>
    ));
    setSelectedOption(tarjetas);
  }

  return (
    <div>
      <Mipanel
      mascotas={mascotas}
      manejoenvio={manejoenvio}
      setmascotas={setmascotas}
      lista={lista}
      eliminar={eliminar}
      modificar={modificar}
      />
      <Mascotas
      lista={lista}
      tarjetasmascotas={tarjetasmascotas}
      selectedOption={selectedOption}

      />
      <Registro></Registro>
    </div>
    
    
  );
}

export default App;
