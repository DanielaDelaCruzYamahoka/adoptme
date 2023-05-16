import React, { createContext, useState, useEffect } from "react";
import { Button, FormGroup, Modal, Accordion } from 'react-bootstrap';
import firebase from '../Settings/ConfigFirebase.js'
import { uploudFile, deleteFile } from '../Settings/ConfigFirebase.js';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const AdopcionesContext = createContext();


const AdopcionesProvider = (props) => {
    
    const username = cookies.get("username")

    const [mensajes, setmensajes]=useState({
        id:'',
        msg:'',
        adoptante:'',
        dueño:'',
        idmascota:''
    })
    const [notificaciones, setnotificaciones]=useState([])

    const [respuestas, setrespuestas]=useState({
        id:'',
        res:'',
        adoptante:'',
        dueño:'',
        idmascota:''
    })
    const [listarespuestas, setlistarespuestas]=useState([])

    const [lista, setlista]=useState([]);

    useEffect(() => {
        firebase.database().ref('RegistroMascotas').on('value', snapshot => {
            let listaMascotas = [];
            snapshot.forEach(row => {
                listaMascotas.push({
                    id: row.key,
                    nombre: row.val().nombre,
                    edad: row.val().edad,
                    sexo: row.val().sexo,
                    especie: row.val().especie,
                    tamaño: row.val().tamaño,
                    raza: row.val().raza,
                    descripcion: row.val().descripcion,
                    url: row.val().url,
                    usuario: row.val().usuario
                })
            })
            setlista(listaMascotas)
        })
    }, [])

    useEffect(() => {
        firebase.database().ref('Adopciones').on('value', snapshot => {
            let listaAdopciones = [];
            snapshot.forEach(row => {
                listaAdopciones.push({
                    id: row.key,
                    msg: row.val().msg,
                    adoptante: row.val().adoptante,
                    dueño: row.val().dueño,
                    idmascota:row.val().idmascota
                })
            })
            setnotificaciones(listaAdopciones)
        })
    }, [])

    useEffect(() => {
        firebase.database().ref('Respuestas').on('value', snapshot => {
            let listaRespuestas = [];
            snapshot.forEach(row => {
                listaRespuestas.push({
                    id: row.key,
                    res: row.val().res,
                    adoptante: row.val().adoptante,
                    dueño: row.val().dueño,
                    idmascota:row.val().idmascota
                })
            })
            setlistarespuestas(listaRespuestas)
        })
    }, [])

    function guardarmensaje(nombremascota, nombredueño, idmas){
        let cont = notificaciones.length +1
        const mensaje = username+ " quiere adoptar a " + nombremascota
        setmensajes({
            id:cont,
            msg:mensaje,
            adoptante:username,
            dueño: nombredueño,
            idmascota: idmas
          })
    }
    
    function botonadoptar(){
        const {id, msg, adoptante, dueño, idmascota}=mensajes;
        console.log(mensajes)

        let existeadopcion=notificaciones.find(a=>a.adoptante===adoptante && a.idmascota===idmascota)
        console.log(existeadopcion)

        if(!existeadopcion){
            if(dueño!==adoptante){
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                      confirmButton: 'btn btn-success',
                      cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                  })
                  
                  swalWithBootstrapButtons.fire({
                    title: '¿Quieres adoptar a esta mascota?',
                    text: "¡Se enviará una solicitud!",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: '¡Sí, quiero adoptar!',
                    cancelButtonText: 'No, cancelar',
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                      swalWithBootstrapButtons.fire({
                        title:'¡Gracias por darle la oportunidad a un nuevo amigo!',
                        text:'Tu solicitud ha sido enviada.',
                        confirmButtonText: 'Aceptar',
                        
                        
                    }).then((result)=>{
                        firebase.database().ref('Adopciones/'+id).update(mensajes).then(()=>{
                        })  
                        setnotificaciones([
                            ...notificaciones,
                            mensajes
                        ])
                        setmensajes({
                            id:'',
                            msg:'',
                            adoptante:'',
                            dueño:'',
                            idmascota:''
                        })
                      
                    })
                    } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                      swalWithBootstrapButtons.fire(
                        'Cancelado',
                        'Sigue viendo mascotas... :)',
                        'error'
                      )
                    }
                  })
            }else{
                Swal.fire(
                    '¡No puedes adoptar tus mascotas en adopción!',
                    ':)',
                    'error'
                  )
            }
        } else{
            Swal.fire(
                '¡Ya mandaste solicitud!',
                'Espera tu respuesta :)',
                'error'
              )
        }

        
          
    }

    function aceptarsolicitudguardar(adoptantemascota, dueñomascota, idmas){
        let respu=dueñomascota + " aceptó tu solicitud"
        let contador = listarespuestas.length +1
        
        setrespuestas({
            id:contador,
            res:respu,
            adoptante:adoptantemascota,
            dueño: dueñomascota,
            idmascota: idmas
          })
          console.log(respuestas)
    }
    
    function aceptarsolicitud(){
        const {id, res, adoptante, dueño, idmascota}=respuestas;
        
        firebase.database().ref('Respuestas/'+id).update(respuestas).then(()=>{
        })  
        setlistarespuestas([
            ...listarespuestas,
            respuestas
        ])
        setrespuestas({
            id:'',
            res:'',
            adoptante:'',
            dueño:'',
            idmascota:''
        })
        console.log(respuestas)

        setShow(false)
    }

    function eliminarsolicitud(idnoti){
        firebase.database().ref('Adopciones/'+idnoti).set(null).then(()=>{
        })
        const temporal=lista.filter((a)=>a.id!==idnoti)
        setnotificaciones(temporal)
        setShow2(false)
    }
    
        const [show, setShow] = useState(false);
        const [show2, setShow2] = useState(false);

    function vernotificaciones(){
        let filtronoti=notificaciones.filter(a=>a.dueño===username)
        
        const handleClose = () => setShow(false);
        const handleClose2 = () => setShow2(false);
        return(
            <div>
                <Accordion >
                    <Accordion.Header>Solicitudes</Accordion.Header>
                {filtronoti.map((a,index)=>
                
                    <Accordion.Body key={index}>
                        {a.msg}<br/>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                        <Button variant="primary" onClick={()=>{setShow(true); aceptarsolicitudguardar(a.adoptante, a.dueño, a.idmascota)}}>Aceptar</Button> 
                        <Button variant="danger" onClick={()=>{eliminarsolicitud()}}>Elimianr</Button>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>¿Quieres aceptar esta solicitud?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={()=>aceptarsolicitud()}>
                        Confirmar
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                        </Button>
                    </Modal.Footer>
                    </Modal>

                    <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                        <Modal.Title>¿Quieres eliminar esta solicitud?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={()=>eliminarsolicitud(a.id)}>
                        Confirmar
                        </Button>
                        <Button variant="secondary" onClick={handleClose2}>
                        Cancelar
                        </Button>
                    </Modal.Footer>
                    </Modal>
                    </Accordion.Body>
                                   
                
                )  
                }
                </Accordion> 
            </div>

        )

        
        
    }

    function verespuestas(){
        let filtrores=listarespuestas.filter(a=>a.adoptante===username)
        return(
            <div>
                <Accordion >
                <Accordion.Header>Respuestas</Accordion.Header>
                {
                    filtrores.map((a,i)=>
                    
                        <Accordion.Body key={i}>
                            {a.res}
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                            <Button variant="primary">Info</Button> 
                            </div>
                        </Accordion.Body>
                    
                    )
                }
                </Accordion>
            </div>
        )
    }

    return (
        <AdopcionesContext.Provider
            value={{
                botonadoptar,
                vernotificaciones,
                setmensajes,
                mensajes,
                notificaciones,
                guardarmensaje,
                verespuestas
            }}>
            {props.children}

        </AdopcionesContext.Provider>
    );


}

export default AdopcionesProvider;