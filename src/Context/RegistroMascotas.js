import React, { useState, useEffect} from 'react';
import firebase, { deleteFile } from '../Settings/ConfigFirebase.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import InicioSesion from '../Components/InicioSesion';

function RegistroMascotas(){
        //states para los usuarios
        const [mascotas,setmascotas]=useState({
            id:"",
            nombre:"",
            edad:"",
            sexo:"",
            especie:"",
            tamano:"",
            raza:"",
            descripcion:"",
            url:""
        })
        const [lista, setlista]=useState([]);
        
        //useState para imagen
        const [file, setFile]= useState(null)
        const [urlimagen, seturlimagen]=useState(null)
        //funcion para que me arroje una url de la imagen como resultado
        const handleSubmit= async () => {
            try {
            const result = await uploudFile(file)
            seturlimagen(result)
            console.log(result)
            } catch (error) {
            console.log(error)
            alert('Error al subir la imagen, inténtelo de nuevo.')
            }
        }

        //useffect para la bd
        useEffect(()=>{
            firebase.database().ref('RegistroMascotas').on('value', snapshot=>{
                let listaMascotas=[];
                snapshot.forEach(row=>{
                    listaMascotas.push({
                        id:row.key,
                        nombre:row.val().nombre,
                        edad:row.val().apellidoP,
                        sexo:row.val().apellidoM,
                        especie:row.val().usuario,
                        tamano:row.val().password,
                        raza:row.val().email,
                        descripcion:row.val().descripcion,
                        url:row.val().url
                    })
                })
                setlista(listaMacotas)
            })
        },[])

        //---------FUNCIONES

        const guardarimagen=(e)=>{
            setFile(e.target.files[0])
        }

        const enviar=(e)=>{
            e.preventDefault();

            const {id, nombre, edad, sexo, especie, tamano, raza, descripcion, url}=mascotas;
            const vacios=(id.length===0, nombre.length===0, edad.length===0, sexo.length===0, especie.length===0, tamano.length===0, raza.length===0, descripcion.length===0, url.length===0)
            if(!vacios){
                firebase.database().ref('RegistroMascotas/'+id).update(usuarios).then(()=>{
                })
                let temporal=lista;
                temporal=temporal.filter(a=>a.id!==id)

                setlista([
                    ...temporal,
                    mascotas
                ])
                
                setmascotas({
                    id:'',
                    nombre:'', 
                    edad:'', 
                    sexo:'', 
                    especie:'', 
                    tamano:'', 
                    raza:'',
                    descripcion:'',
                    url:''
                })
            }
        };

        const eliminar=async(id,url)=>{
            try {
                firebase.database().ref('RegistroMascotas/' + id).set(null).then(()=>{
                    alert('eliminado');
                })
                const temporal=lista.filter((a)=>a.id!==a.id)
                setlista(temporal)
                await deleteFile(url)
            } catch (error) {
                console.log(error)
                alert('Error al eliminar, inténtelo de nuevo.')
            }
        }
        const modificar =(id)=>{
            const listatemporal = lista.find((a) => a.id === id);
            
            setmascotas({
              id:listatemporal.id,
              nombre:listatemporal.nombre,
              edad: listatemporal.edad,
              sexo: listatemporal.sexo,
              especie: listatemporal.especie,
              tamano: listatemporal.tamano,
              raza: listatemporal.raza,
              descripcion:listatemporal.descripcion,
              url: listatemporal.url
            });
        }
        const guardarCambios=(e)=>{
            setmascotas({
                ...mascotas,
                [e.target.name]: e.target.value,
                url:urlimagen
            })
        }
    return(
        <div>
            
        </div>
    )
}
export default RegistroMascotas