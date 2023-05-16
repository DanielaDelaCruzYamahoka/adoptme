import React, { createContext, useState, useEffect } from "react";
import { Button, Card, Dropdown, Modal } from 'react-bootstrap';
import firebase from '../Settings/ConfigFirebase.js'
import { uploudFile, deleteFile } from '../Settings/ConfigFirebase.js';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2/src/sweetalert2.js'
const cookies = new Cookies();

export const FirebaseContext = createContext();


const FirebaseProvider = (props) => {
    const username = cookies.get("username")
    //------------------------------Para ingresar, eliminar y modificar una mascota (Mipanel)

    //states
    const [mascotas, setmascotas] = useState({
        id: "",
        nombre: "",
        edad: "",
        sexo: "",
        especie: "",
        tamaño: "",
        raza: "",
        descripcion: "",
        url: "",
        usuario: ""
    })

    const [lista, setlista] = useState([]);
    const [habilitado, sethabilitado] = useState(false);
    //useState para imagen
    const [file, setFile] = useState(null)
    const [urlimagen, seturlimagen] = useState(null)
    const [imagencargada, setimagencargada] = useState(false);
    //funcion para que me arroje una url de la imagen como resultado
    const handleSubmit = async () => {
        try {
            const result = await uploudFile(file)
            seturlimagen(result)
            

            if (result !== null) {
                setimagencargada(true);
                Swal.fire(
                    'Imagen enviada',
                    'Ahora puedes enviar los demas datos de la mascotas',
                    'success'
                )
            }
        } catch (error) {
            console.log(error)
            Swal.fire(
                'Error al subir la imagen, inténtelo de nuevo.',
                'error'
            )

        }
    }

    //useffect para la bd
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
    //funciones
    const guardarImagen = (e) => {
        setFile(e.target.files[0])
    }

    const manejoenvio = (e) => {

        e.preventDefault();
        
        
        const { id, nombre, edad, sexo, especie, tamaño, raza, descripcion, url, usuario } = mascotas;

        const vacios = (id.length === 0 && nombre.length === 0 && edad === "seleccione" && sexo === "seleccione" && tamaño === "seleccione" && raza.length === 0 && descripcion.length === 0 && url.length === 0) || especie === "seleccione"

        if (!vacios) {
            firebase.database().ref('RegistroMascotas/' + id).update(mascotas).then(() => {
            })
            let temporal = lista;
            temporal = temporal.filter(a => a.id !== id)

            setlista([
                ...temporal,
                {
                    id,
                    nombre,
                    edad,
                    sexo,
                    especie,
                    tamaño,
                    raza,
                    descripcion,
                    url,
                    usuario
                },
            ])

            setmascotas({
                id: '',
                nombre: '',
                edad: '',
                sexo: '',
                especie: '',
                tamaño: '',
                raza: '',
                descripcion: '',
                url: '',
                usuario: ''
            })
            setimagencargada(false);
            seturlimagen(null);
            setFile(undefined)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Mascota registrada',
                showConfirmButton: false,
                timer: 1500
            })
        }
    };


    const eliminar = async (id, url) => {
        try {
            firebase.database().ref('RegistroMascotas/' + id).set(null).then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            const temporal = lista.filter((a) => a.id !== id)
            setlista(temporal)
            await deleteFile(url)//checar error (puede ser por internet lento)
        } catch (error) {
            console.log(error)
            alert('Error al eliminar, inténtelo de nuevo.')
        }
    }

    const modificar = (id) => {
        
        
        let listatemporall = lista.find((a) => a.id === id);

        setmascotas({
            id: listatemporall.id,
            nombre: listatemporall.nombre,
            edad: listatemporall.edad,
            sexo: listatemporall.sexo,
            especie: listatemporall.especie,
            tamaño: listatemporall.tamaño,
            raza: listatemporall.raza,
            descripcion: listatemporall.descripcion,
            url: listatemporall.url,
            usuario: listatemporall.usuario
        });

    }

    const guardarCambios = (e) => {

        setmascotas({
            ...mascotas,
            [e.target.name]: e.target.value,
            url: urlimagen,
            usuario: username
        });

    }

    //------------------------------Para mostrar las mascotas (Mascotas-Mi Panel)


    const [especieSeleccionada, setEspecieSeleccionada] = useState("Especies");
    const [edadSeleccionada, setEdadSeleccionada] = useState("Edad");
    const [TamañoSeleccionada, setTamañoSeleccionada] = useState("Tamaño");
    const [SexoSeleccionada, setSexoSeleccionada] = useState("Sexo");
    //Estado final de las mascotas filtradas utilizadas para matearla y hacer las tarjetas.
    const [mascotasFiltradas, setMascotasFiltradas] = useState([]);
    //Estados para filtros
    const [tarjetasespecie, setarjetasespecie] = useState([]);
    const [tarjetasedad, setarjetasedad] = useState([]);
    const [tarjetastamaño, setarjetastamaño] = useState([]);
    const [tarjetassexo, setarjetassexo] = useState([]);
    //Para guardar las tarjetas
    const [tarjetasfinales, setarjetasfinales] = useState([]);



    function tarjetasmascotas(eventKey, event) {
        let mascotasusuario = lista.filter((a, i) => a.usuario === username)

        if (eventKey === "todas") {
            setMascotasFiltradas(mascotasusuario);
            setarjetasespecie([]);
            setEspecieSeleccionada("Todas");
        } else {
            const especi = eventKey
            const tarespe = mascotasusuario.filter(a => a.especie === especi)
            setarjetasespecie(tarespe)//se utiliza entre las funciones de filtro
            setEspecieSeleccionada(event.target.textContent);// es en el que guardo el que selecciono 
            setMascotasFiltradas(tarespe);//es el que llamo para generar las tarjetas
        }
    }
    function tarjetasmascotasedad(eventKey, event) {
        let mascotasusuario = lista.filter((a, i) => a.usuario === username)
        if (eventKey === "todas") {
            setMascotasFiltradas(mascotasusuario);
            setarjetasedad([]);
            setEdadSeleccionada("Todas");

        } else {
            const ed = eventKey;
            const tarjetasedad = mascotasusuario.filter(a => a.edad === ed);


            let especieconedad = tarjetasedad;
            if (tarjetasespecie.length > 0) {
                especieconedad = tarjetasedad.filter(mascota => {
                    const especieSeleccionada = tarjetasespecie[0].especie;
                    return mascota.especie === especieSeleccionada;
                });
            }

            setMascotasFiltradas(especieconedad);//es el que llamo para generar las tarjetas
            setEdadSeleccionada(event.target.textContent);// es en el que guardo el que selecciono 
            setarjetasedad(especieconedad)//se utiliza entre las funciones de filtro
        }
    }

    function tarjetasmascotastamaño(eventKey, event) {
        let mascotasusuario = lista.filter((a, i) => a.usuario === username)
        if (eventKey === "todas") {
            setMascotasFiltradas(mascotasusuario);
            setarjetastamaño([]);
            setTamañoSeleccionada("Todas");

        } else {
            const tam = eventKey;
            const tarjetastam = mascotasusuario.filter(a => a.tamaño === tam);

            let especiecontam = tarjetastam;
            if (tarjetasespecie.length > 0 || tarjetasedad.length > 0 || (tarjetasedad.length > 0 && tarjetasespecie.length > 0)) {
                especiecontam = tarjetastam.filter(mascota => {
                    const edadSeleccionada = tarjetasedad[0].edad;
                    return mascota.tamaño === tam && mascota.edad === edadSeleccionada;
                });
            }

            setMascotasFiltradas(especiecontam);//es el que llamo para generar las tarjetas
            setTamañoSeleccionada(event.target.textContent);// es en el que guardo el que selecciono 
            setarjetastamaño(especiecontam);//se utiliza entre las funciones de filtro
        }
    }

    function tarjetasmascotassexo(eventKey, event) {
        let mascotasusuario = lista.filter((a, i) => a.usuario === username)
        if (eventKey === "todas") {
            setMascotasFiltradas(mascotasusuario);
            setarjetassexo([]);
            setSexoSeleccionada("Todas");
        } else {
            const sex = eventKey;
            const tarjetasex = mascotasusuario.filter(a => a.sexo === sex);

            let especieconsex = tarjetasex;
            if (tarjetasespecie.length > 0 || tarjetasedad.length > 0 || tarjetastamaño.length > 0) {
                especieconsex = tarjetasex.filter(mascota => {
                    const especieSeleccionada = tarjetasespecie.length > 0 ? tarjetasespecie[0].especie : true;
                    const edadSeleccionada = tarjetasedad.length > 0 ? mascota.edad === tarjetasedad[0].edad : true;
                    const tamañoSeleccionado = tarjetastamaño.length > 0 ? mascota.tamaño === tarjetastamaño[0].tamaño : true;
                    return mascota.sexo === sex && mascota.especie === especieSeleccionada && edadSeleccionada && tamañoSeleccionado;
                });
            }

            setMascotasFiltradas(especieconsex);//es el que llamo para generar las tarjetas
            setSexoSeleccionada(event.target.textContent);// es en el que guardo el que selecciono 
            setarjetassexo(especieconsex);//se utiliza entre las funciones de filtro
        }
    }

    //Para el modal
    const [modalShow, setModalShow] = useState();
    //Perfil de la mascota
    const [mascotaperfil, setMascotaPerfil] = useState([]);

    function botonfiltros() {
        let mascotasusuario = lista.filter((a, i) => a.usuario === username)
        sethabilitado(true)

        setMascotasFiltradas({
            ...mascotasFiltradas
        })

        if (mascotasFiltradas !== 0) {
            // Generar tarjetas
            const tarjetas = mascotasFiltradas.map((mascota, index) => (
                <Card key={index} className="card" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={mascota.url} />
                    <Card.Body>
                        <Card.Title>{mascota.nombre}</Card.Title>
                        <Card.Text>
                            {mascota.especie}<br />
                            {mascota.edad} <br />
                            {mascota.tamaño} <br />
                            {mascota.sexo}
                        </Card.Text>
                        <Button variant="primary" onClick={() => { setModalShow(true); setMascotaPerfil(mascota); }}>Perfil</Button>
                    </Card.Body>
                </Card>
            ));
            setarjetasfinales(tarjetas)
        }
        else {
            const tarjetas = mascotasusuario.map((mascota, index) => (
                <Card key={index} className="card" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={mascota.url} />
                    <Card.Body>
                        <Card.Title>{mascota.nombre}</Card.Title>
                        <Card.Text>
                            {mascota.especie}<br />
                            {mascota.edad} <br />
                            {mascota.tamaño} <br />
                            {mascota.sexo}
                        </Card.Text>
                        <Button variant="primary" onClick={() => { setModalShow(true); setMascotaPerfil(mascota); }}>Perfil</Button>
                    </Card.Body>
                </Card>
            ));
            setarjetasfinales(tarjetas)
        }
        //Todo esto es para que simpien las cosas despues de una busqueda nose si dejar esto

        setMascotasFiltradas(mascotasusuario);
        setarjetasespecie([]);
        setarjetasedad([]);
        setarjetastamaño([]);
        setarjetassexo([]);
        setEspecieSeleccionada("Especie");
        setEdadSeleccionada("Edad");
        setTamañoSeleccionada("Tamaño");
        setSexoSeleccionada("Sexo");
    }


    //------------------------------Para mostrar las mascotas (Adoptar) 
    //Verificar si se puede crear condicional para no repetir código



    function tarjetasmascotas2(eventKey, event) {
        if (eventKey === "todas") {
            setMascotasFiltradas(lista);
            setarjetasespecie([]);
            setEspecieSeleccionada("Todas");
        } else {
            const especi = eventKey
            const tarespe = lista.filter(a => a.especie === especi)
            setarjetasespecie(tarespe)//se utiliza entre las funciones de filtro
            setEspecieSeleccionada(event.target.textContent);// es en el que guardo el que selecciono 
            setMascotasFiltradas(tarespe);//es el que llamo para generar las tarjetas
        }
    }
    function tarjetasmascotasedad2(eventKey, event) {
        if (eventKey === "todas") {
            setMascotasFiltradas(lista);
            setarjetasedad([]);
            setEdadSeleccionada("Todas");

        } else {
            const ed = eventKey;
            const tarjetasedad = lista.filter(a => a.edad === ed);


            let especieconedad = tarjetasedad;
            if (tarjetasespecie.length > 0) {
                especieconedad = tarjetasedad.filter(mascota => {
                    const especieSeleccionada = tarjetasespecie[0].especie;
                    return mascota.especie === especieSeleccionada;
                });
            }

            setMascotasFiltradas(especieconedad);//es el que llamo para generar las tarjetas
            setEdadSeleccionada(event.target.textContent);// es en el que guardo el que selecciono 
            setarjetasedad(especieconedad)//se utiliza entre las funciones de filtro
        }
    }

    function tarjetasmascotastamaño2(eventKey, event) {
        if (eventKey === "todas") {
            setMascotasFiltradas(lista);
            setarjetastamaño([]);
            setTamañoSeleccionada("Todas");

        } else {
            const tam = eventKey;
            const tarjetastam = lista.filter(a => a.tamaño === tam);

            let especiecontam = tarjetastam;
            if (tarjetasespecie.length > 0 || tarjetasedad.length > 0 || (tarjetasedad.length > 0 && tarjetasespecie.length > 0)) {
                especiecontam = tarjetastam.filter(mascota => {
                    const edadSeleccionada = tarjetasedad[0].edad;
                    return mascota.tamaño === tam && mascota.edad === edadSeleccionada;
                });
            }

            setMascotasFiltradas(especiecontam);//es el que llamo para generar las tarjetas
            setTamañoSeleccionada(event.target.textContent);// es en el que guardo el que selecciono 
            setarjetastamaño(especiecontam);//se utiliza entre las funciones de filtro
        }
    }

    function tarjetasmascotassexo2(eventKey, event) {
        if (eventKey === "todas") {
            setMascotasFiltradas(lista);
            setarjetassexo([]);
            setSexoSeleccionada("Todas");
        } else {
            const sex = eventKey;
            const tarjetasex = lista.filter(a => a.sexo === sex);

            let especieconsex = tarjetasex;
            if (tarjetasespecie.length > 0 || tarjetasedad.length > 0 || tarjetastamaño.length > 0) {
                especieconsex = tarjetasex.filter(mascota => {
                    const especieSeleccionada = tarjetasespecie.length > 0 ? tarjetasespecie[0].especie : true;
                    const edadSeleccionada = tarjetasedad.length > 0 ? mascota.edad === tarjetasedad[0].edad : true;
                    const tamañoSeleccionado = tarjetastamaño.length > 0 ? mascota.tamaño === tarjetastamaño[0].tamaño : true;
                    return mascota.sexo === sex && mascota.especie === especieSeleccionada && edadSeleccionada && tamañoSeleccionado;
                });
            }

            setMascotasFiltradas(especieconsex);//es el que llamo para generar las tarjetas
            setSexoSeleccionada(event.target.textContent);// es en el que guardo el que selecciono 
            setarjetassexo(especieconsex);//se utiliza entre las funciones de filtro
        }
    }

    function botonfiltros2() {
        setMascotasFiltradas({
            ...mascotasFiltradas
        })

        if (mascotasFiltradas !== 0) {
            // Generar tarjetas
            const tarjetas = mascotasFiltradas.map((mascota, index) => (

                <Card key={index} className='cardt'>
                    <Card.Img variant="top" className='cardimg' src={mascota.url} />
                    <Card.Body className='cardBody'>
                        <Card.Title>{mascota.nombre}</Card.Title>
                        <Card.Text>
                            Raza: {mascota.raza}
                        </Card.Text>
                        <Button variant="primary" style={{ backgroundColor: '#c59edb', border: 'none' }} onClick={() => { setModalShow(true); setMascotaPerfil(mascota); }}>Perfil</Button>
                    </Card.Body>
                </Card>
            ));
            setarjetasfinales(tarjetas)
        }
        else {
            const tarjetas = lista.map((mascota, index) => (
                <Card key={index} className="card" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={mascota.url} />
                    <Card.Body>
                        <Card.Title>{mascota.nombre}</Card.Title>
                        <Card.Text>
                            {mascota.especie}<br />
                            {mascota.edad} <br />
                            {mascota.tamaño} <br />
                            {mascota.sexo}
                        </Card.Text>
                        <Button variant="primary" onClick={() => { setModalShow(true); setMascotaPerfil(mascota); }}>Perfil</Button>
                    </Card.Body>
                </Card>
            ));
            setarjetasfinales(tarjetas)
        }
        //Todo esto es para que simpien las cosas despues de una busqueda nose si dejar esto

        setMascotasFiltradas(lista);
        setarjetasespecie([]);
        setarjetasedad([]);
        setarjetastamaño([]);
        setarjetassexo([]);
        setEspecieSeleccionada("Especie");
        setEdadSeleccionada("Edad");
        setTamañoSeleccionada("Tamaño");
        setSexoSeleccionada("Sexo");

    }

    return (
        <FirebaseContext.Provider
            value={{
                mascotas,
                lista,
                manejoenvio,
                setmascotas,
                eliminar,
                modificar,
                guardarCambios,
                tarjetasmascotas,
                tarjetasmascotastamaño,
                mascotaperfil,
                modalShow,
                setModalShow,
                setMascotaPerfil,

                tarjetasmascotas2,
                tarjetasmascotastamaño2,
                tarjetasmascotasedad2,
                tarjetasmascotassexo2,
                botonfiltros2,

                mascotasFiltradas,
                setMascotasFiltradas,
                tarjetasmascotasedad,
                botonfiltros,
                tarjetasfinales,
                tarjetasmascotassexo,
                especieSeleccionada,
                edadSeleccionada,
                TamañoSeleccionada,
                SexoSeleccionada,
                guardarImagen,

                handleSubmit,
                urlimagen,
                imagencargada,
                file,

            }}>
            {props.children}

        </FirebaseContext.Provider>
    );


}

export default FirebaseProvider;