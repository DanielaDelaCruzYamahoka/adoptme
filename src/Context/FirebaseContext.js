import React, { createContext, useState } from "react";
import { Button, Card, Dropdown, Modal } from 'react-bootstrap';
import perro1 from '../istock.jpg'

export const FirebaseContext = createContext();

const FirebaseProvider = (props) => {

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
        imagen: null
    })

    const [lista, setlista] = useState([]);

    //funciones
    const manejoenvio = (e) => {

        e.preventDefault();

        const { id, nombre, edad, sexo, especie, tamaño, raza, descripcion, imagen } = mascotas;

        const vacios = (id.length === 0 && nombre.length === 0 && edad === "seleccione" && sexo === "seleccione" && tamaño === "seleccione" && raza.length === 0 && descripcion.length === 0 && !imagen) || especie === "seleccione"

        if (!vacios) {
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
                    imagen,
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
                imagen: null,
            })
        }
    };

    const guardarImagen = (e) => {
        const imagenSeleccionada = e.target.files[0];
        setmascotas({
            ...mascotas,
            imagen: URL.createObjectURL(imagenSeleccionada)  // Actualizar el estado de mascotas con la imagen seleccionada
        });

        const formData = new FormData();
        formData.append('imagen', imagenSeleccionada);


        fetch('/guardar-imagen', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                setmascotas({
                    ...mascotas,
                    imagen: data.url // Actualizar el estado de mascotas con la URL de la imagen
                });
            })
            .catch(error => console.error(error));
    };

    const eliminar = (id) => {
        let temporal = lista.filter((a) => a.id !== id)
        setlista(temporal)

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
            imagen: listatemporall.imagen
        });

    }

    const guardarCambios = (e) => {

        setmascotas({
            ...mascotas,
            [e.target.name]: e.target.value,
        });

    }

    //------------------------------Para mostrar las mascotas (Mascotas)


    const [especieSeleccionada, setEspecieSeleccionada] = useState("Especies");
    const [edadSeleccionada, setEdadSeleccionada] = useState("Edad");
    const [TamañoSeleccionada, setTamañoSeleccionada] = useState("Tamaño");
    const [SexoSeleccionada, setSexoSeleccionada] = useState("Sexo");

    const [mascotasFiltradas, setMascotasFiltradas] = useState([]);
    const [tarjetasespecie, setarjetasespecie] = useState([]);
    const [tarjetasedad, setarjetasedad] = useState([]);
    const [tarjetastamaño, setarjetastamaño] = useState([]);
    const [tarjetassexo, setarjetassexo] = useState([]);
    const [tarjetasfinales, setarjetasfinales] = useState([]);

    function tarjetasmascotas(eventKey, event) {
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
    function tarjetasmascotasedad(eventKey, event) {
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

    function tarjetasmascotastamaño(eventKey, event) {
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

    function tarjetasmascotassexo(eventKey, event) {
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


    function botonfiltros() {
        setMascotasFiltradas({
            ...mascotasFiltradas
        })

        // Generar tarjetas
        const tarjetas = mascotasFiltradas.map((mascota, index) => (
            <Card key={index} className="card" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={mascota.imagen} />
                <Card.Body>
                    <Card.Title>{mascota.nombre}</Card.Title>
                    <Card.Text>{mascota.especie} {mascota.edad} {mascota.tamaño} {mascota.sexo}</Card.Text>
                    <Button variant="primary">Adoptar</Button>
                </Card.Body>
            </Card>
        ));
        setarjetasfinales(tarjetas)

        //Todo esto es para que simpien las cosas despues de una busqueda nose si dejar esto
        setMascotasFiltradas(lista);
        setarjetasespecie([]);
        setarjetasedad([]);
        setarjetastamaño([]);
        setarjetassexo([]);
        setEspecieSeleccionada("Especie");
        setEdadSeleccionada("Sexo");
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

                mascotasFiltradas,
                tarjetasmascotasedad,
                botonfiltros,
                tarjetasfinales,
                tarjetasmascotassexo,

                especieSeleccionada,
                edadSeleccionada,
                TamañoSeleccionada,
                SexoSeleccionada,
                guardarImagen,

            }}>
            {props.children}

        </FirebaseContext.Provider>
    );


}

export default FirebaseProvider;