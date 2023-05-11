import React, { useState, useEffect} from 'react';
import firebase from '../Settings/ConfigFirebase.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import InicioSesion from '../Components/InicioSesion';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
//los cookies nos ayudan a mandar los atributos del usuario a mi panel

function SesionUsuarios(){
        //states para los usuarios

        const [lista, setlista]=useState([]);
        const [usuariolista, setusuariolista]=useState(null)
        const [passwordlista, setpasswordlista]=useState(null)
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
    
    
    
    const entrar=(e)=>{
        e.preventDefault();
        let buscarusuario=lista.find((a,i)=>a.usuario===usuariolista)
        let buscarpassword=lista.find((a,i)=>a.password===passwordlista)
        if(!buscarusuario){
            Swal.fire(
                '¡No existe este usuario!',
                'Verifica tus datos o registrate',
                'error'
              )
        }else{
            if(!buscarpassword){
                Swal.fire(
                    '¡Contraseña incorrecta!',
                    'Verifica tus datos',
                    'error'
                  )
            }else{
                cookies.set('nombre', buscarusuario.nombre, {path:"/"})
                cookies.set('apellidoP', buscarusuario.apellidoP, {path:"/"})
                cookies.set('apellidoM', buscarusuario.apellidoM, {path:"/"})
                cookies.set('username', buscarusuario.usuario, {path:"/"})
                //hacemos accesible el nombre de usuario en cualquier página después de iniciar sesión
                Swal.fire(
                '¡Bienvenido!',
                ':)',
                'success'
                )
                window.location.href = '/Mipanel';
            }

        }
    }
    const guardarusuario=(e)=>{
        e.preventDefault();
        setusuariolista(e.target.value)
    }
    const guardarpassword=(e)=>{
        e.preventDefault();
        setpasswordlista(e.target.value)
    }
    return(
        <div>
            <InicioSesion
            entrar={entrar}
            usuariolista={usuariolista}
            guardarusuario={guardarusuario}
            guardarpassword={guardarpassword}
            />
        </div>
    )
}
export default SesionUsuarios