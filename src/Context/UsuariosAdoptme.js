import React, { useState, useEffect} from 'react';
import Registro from '../Components/Registro';
import firebase from '../Settings/ConfigFirebase.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function UsuariosAdoptme(){
    //states para los usuarios
    const [usuarios, setusuarios]=useState({
        id:"", 
        nombre:"", 
        apellidoP:"", 
        apellidoM:"", 
        usuario:"", 
        password:"", 
        email:""
    })
    const [lista, setlista]=useState([]);
    //useffect para la bd
    useEffect(()=>{
        firebase.database().ref('RegistroUsuarios').on('value', snapshot=>{
            let listaUsuarios=[];
            snapshot.forEach(row=>{
                listaUsuarios.push({
                    id:row.key,
                    nombre:row.val().nombre,
                    apellidoP:row.val().apellidoP,
                    apellidoM:row.val().apellidoM,
                    usuario:row.val().usuario,
                    password:row.val().password,
                    email:row.val().email
                })
            })
            setlista(listaUsuarios)
        })
    },[])

    //-----------FUNCIONES------------

    const enviar=(e)=>{
        e.preventDefault();
        const {id, nombre, apellidoP, apellidoM, usuario, password, email}=usuarios
        const vacios = (id.length===0 && nombre.length===0 && apellidoP.length===0 && apellidoM.length===0 && usuario.length===0 && password.length===0 && email.length===0)
        let buscar=lista.find((a,i)=>a.usuario===usuario)
        if(!buscar){
            if(!vacios){
                firebase.database().ref('RegistroUsuarios/'+id).update(usuarios).then(()=>{
                    Swal.fire(
                        '¡Registro Completado!',
                        'Ahora inicia sesión',
                        'success'
                    )
                })
                let temporal=lista;
                temporal=temporal.filter(a=>a.id!==id)
                
                setlista([
                    ...temporal,
                    usuarios
                ])

                setusuarios({
                    id:'', 
                    nombre:'', 
                    apellidoP:'', 
                    apellidoM:'', 
                    usuario:'', 
                    password:'', 
                    email:''
                })
            }
        }else{
            Swal.fire(
                '¡Ya existe esta cuenta!',
                'Verifica tus datos o inicia sesión',
                'error'
              )
        }


    };

    const eliminar =(id)=>{
        firebase.database().ref('RegistroUsuarios/'+id).set(null).then(()=>{
            alert('eliminado');
        })
        const temporal=lista.filter((a)=>a.id!==id)
        setlista(temporal)
    };

    const modificar=(id)=>{
        const listatemporal=lista.find((a)=>a.id===id);

        setusuarios({
            id:listatemporal.id,
            nombre:listatemporal.nombre,
            apellidoP: listatemporal.apellidoP,
            apellidoM: listatemporal.apellidoM,
            usuario: listatemporal.usuario,
            password: listatemporal.password,
            email: listatemporal.email,
        })
    };

    const guardarCambios=(e)=>{
        let cont = lista.length +1
        setusuarios({
            ...usuarios,
            [e.target.name]:e.target.value,
            id:cont
        })
    }

    //--------SE ENVÍAN LAS FUNCIONES A LOS COMPONENTES-----------

    return(
        <div>
            <Registro
            usuarios={usuarios}
            setusuarios={setusuarios}
            lista={lista}
            enviar={enviar}
            eliminar={eliminar}
            modificar={modificar}
            guardarCambios={guardarCambios}
            />
        </div>
    )
}
export default UsuariosAdoptme