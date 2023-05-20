import React, { createContext, useState, useEffect } from "react";
import { Button,  Modal, Accordion } from 'react-bootstrap';
import firebase from '../Settings/ConfigFirebase.js'
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const AdopcionesContext = createContext();


const AdopcionesProvider = (props) => {
    
    const username = cookies.get("username")
    const [listausuarios, setlistausuarios]=useState([]);
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
            setlistausuarios(listaUsuarios)
        })
    },[])

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
        const {id, adoptante, dueño, idmascota}=mensajes;
        
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
    }
    
    function aceptarsolicitud(){
        const {id}=respuestas;
        
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
        
        Swal.fire({
            title: '¿Quieres eliminnar esta solicitud?',
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            denyButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isDenied) {
                firebase.database().ref('Adopciones/'+idnoti).set(null).then(()=>{
                })
                const temporal=notificaciones.filter((a)=>a.id!==idnoti)
                setnotificaciones(temporal)
               
            }
          })
        
    }
    
        const [show, setShow] = useState(false);
        const [mascotanombre, setmascotanombre]=useState()
        const [mascotaurl, setmascotaurl]=useState()
        const [adoptantenombre, setadoptantenombre]=useState()

    function filtrarmascotas(idm, idn){
        let bmid=lista.filter((a,i)=>a.id===idm)
        let bnotid= notificaciones.filter((a,i)=>a.id===idn)
        let nombrem, url, nombrea;
        bmid.map((a)=>(
            nombrem=a.nombre,
            url=a.url
        ))
        bnotid.map((a)=>
            nombrea=a.adoptante
        )
        setmascotanombre(nombrem)
        setmascotaurl(url)
        setadoptantenombre(nombrea)
    } 
    function vernotificaciones(){
        let filtronoti=notificaciones.filter(a=>a.dueño===username)
        
        const handleClose = () => setShow(false);
        return(
            <div>
                <Accordion >
                    <Accordion.Header>Solicitudes</Accordion.Header>
                {filtronoti.map((a,index)=>
                
                    <Accordion.Body key={index}>
                        {a.msg}<br/>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                        <Button variant="primary" onClick={()=>{
                            setShow(true); 
                            aceptarsolicitudguardar(a.adoptante, a.dueño, a.idmascota);
                            filtrarmascotas(a.idmascota, a.id);
                            }}>Aceptar</Button> 
                        <Button variant="danger" onClick={()=>{eliminarsolicitud(a.id)}}>Eliminar</Button>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>¿Quieres aceptar esta solicitud?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                        <div>
                            <h5>{mascotanombre}</h5>
                            <img style={{maxWidth:'200px', maxHeight:'200px'}} src={mascotaurl}></img>                            
                        </div>
                        <div>
                            <h5>Adoptante: {adoptantenombre}</h5>
                        </div>
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
                    </Accordion.Body>
                                   
                
                )  
                }
                </Accordion> 
            </div>

        )
    }

    const [show3, setShow3] = useState(false);
    const [emaildueño, setemaildueño]=useState()
    function filtrardueño(nombreusuario){
        let bdueño=listausuarios.filter((a,i)=>a.usuario===nombreusuario)
        let email;
        bdueño.map((a,i)=>(
            email=a.email
        ))
        setemaildueño(email)
    }
    function verespuestas(){
        let filtrores=listarespuestas.filter(a=>a.adoptante===username)
        const handleClose3 = () => setShow3(false);
        return(
            <div>
                <Accordion >
                <Accordion.Header>Respuestas</Accordion.Header>
                {
                    filtrores.map((a,i)=>
                    
                        <Accordion.Body key={i}>
                            {a.res}
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                            <Button variant="primary" onClick={()=>{setShow3(true);filtrarmascotas(a.idmascota);filtrardueño(a.dueño)}}>Info</Button> 
                            </div>

                            <Modal show={show3} onHide={handleClose3} size="lg" centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Información para ponerte en contacto</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <div>
                                    <h5>{mascotanombre}</h5>
                                    <img style={{maxWidth:'200px', maxHeight:'200px'}} src={mascotaurl}></img>                            
                                </div>
                                <div>
                                    <h6>Nombre del encargado: {a.dueño}</h6>
                                    <h6>Contacto: {emaildueño}</h6>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose3}>
                                Aceptar
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