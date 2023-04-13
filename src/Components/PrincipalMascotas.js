
import Mascotas from './Mascotas';
import Mipanel from './Mipanel';
import React, {useState} from 'react';
import {Button, Card, Dropdown} from 'react-bootstrap/';
import perro1 from '../istock.jpg'
function PrincipalMascotas() {

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

    const {id, nombre, edad, especie, tamaño, raza, descripcion} = mascotas;

    const vacios = (id.length===0 && nombre.length===0 && edad.length===0 && tamaño.length===0 && raza.length===0 && descripcion.length===0) || especie==="seleccione"

    if(!vacios){
        let temporal = lista;
        temporal=temporal.filter(a=> a.id!==id)

        setlista([
            ...temporal, 
            mascotas
        ])
    
        setmascotas({
            id:'',
            nombre: '',
            edad: '',
            especie: '',
            tamaño: '',
            raza: '',
            descripcion: '',
        })
    }



 /*   if(mascotas.id !== lista.id){
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
    }*/
  };
  
  const eliminar =(id)=>{
    const temporal=  lista.filter((a)=>a.id!==id)
    setlista(temporal)


  }

  const modificar =(id)=>{
    const listatemporall = lista.find((a) => a.id === id);
    
    setmascotas({
      id:listatemporall.id,
      nombre: listatemporall.nombre,
      edad: listatemporall.edad,
      especie: listatemporall.especie,
      tamaño: listatemporall.tamaño,
      raza: listatemporall.raza,
      descripcion: listatemporall.descripcion,
    });

  }

  const guardarCambios=(e)=>{
    setmascotas({
        ...mascotas,
        [e.target.name]: e.target.value
    })
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
      guardarCambios={guardarCambios}
      />
      <Mascotas
      lista={lista}
      tarjetasmascotas={tarjetasmascotas}
      selectedOption={selectedOption}

      />
    </div>
    
    
  );
}

export default PrincipalMascotas;