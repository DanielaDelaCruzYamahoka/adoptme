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
    const [tarjetasfinales, setarjetasfinales] = useState([]);

    function tarjetasmascotas(eventKey, event) {
        const especi = eventKey
        const tarespe = lista.filter(a => a.especie === especi)
        setarjetasespecie(tarespe)
        setEspecieSeleccionada(event.target.textContent);
        setMascotasFiltradas(tarespe);

    }
    function tarjetasmascotasedad(eventKey, event) {
        const ed = eventKey;
        const tarjetasedad = lista.filter(a => a.edad === ed);


        let especieconedad = tarjetasedad;
        if (tarjetasespecie.length > 0) {
            especieconedad = tarjetasedad.filter(mascota => {
                const especieSeleccionada = tarjetasespecie[0].especie;
                return mascota.especie === especieSeleccionada;
            });
        }

        setMascotasFiltradas(especieconedad);
        setEdadSeleccionada(event.target.textContent);
        setarjetasedad(especieconedad)
        console.log(mascotasFiltradas)
    }

    function tarjetasmascotastamaño(eventKey, event) {
        const tam = eventKey;
        const tarjetastam = lista.filter(a => a.tamaño === tam);
        
        let especiecontam = tarjetastam;
        if (tarjetasespecie.length > 0 || tarjetasedad.length > 0 || (tarjetasedad.length > 0 && tarjetasespecie.length > 0)) {
            especiecontam = tarjetastam.filter(mascota => {
                const edadSeleccionada = tarjetasedad[0].edad;
                return mascota.tamaño === tam && mascota.edad === edadSeleccionada;
            });
        }
        
        setMascotasFiltradas(especiecontam);
        setTamañoSeleccionada(event.target.textContent);
        console.log(especiecontam)
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
                    <Card.Text>{mascota.especie} {mascota.edad} {mascota.tamaño}</Card.Text>
                    <Button variant="primary">Adoptar</Button>
                </Card.Body>
            </Card>
        ));
        setarjetasfinales(tarjetas)
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