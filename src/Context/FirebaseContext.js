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
    const [selectedEspecie, setSelectedEspecie] = useState({});
    const [selectedEdad, setSelectedEdad] = useState([]);
    const [selectedTamaño, setSelectedTamaño] = useState({});
    const [selectedSexo, setSelectedSexo] = useState({});

    const [especieSeleccionada, setEspecieSeleccionada] = useState("Especies");
    const [edadSeleccionada, setEdadSeleccionada] = useState("Edad");
    const [TamañoSeleccionada, setTamañoSeleccionada] = useState("Tamaño");
    const [SexoSeleccionada, setSexoSeleccionada] = useState("Sexo");

    const [listaFiltrada, setlistafiltros] = useState([]);

    const [selectedTarjetas, setSelectedTarjetas] = useState([]);
    const [seleccionado, setSeleccionado] = useState("");

    const [modalShow, setModalShow] = useState(false);
    const [mascotaSeleccionada, setMascotaSeleccionada] = useState([]);

    function tarjetasmascotas(eventKey, event) {

        let tarjetas = lista.filter(mascota => {
            if (eventKey === "perro" || eventKey === "gato") {
                return mascota.especie === eventKey;
            }
        }).map((mascota, index) => (
            <Card key={index} className="card" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={mascota.imagen} />
                <Card.Body>
                    <Card.Title>{mascota.nombre}</Card.Title>
                    <Card.Text>{mascota.especie} {mascota.edad}</Card.Text>
                    <Button variant="primary" onClick={() => { setModalShow(true); setMascotaSeleccionada(mascota); }}>Perfil</Button>
                </Card.Body>
            </Card>
        ));

        if (eventKey === "perro" || eventKey === "gato") {

            setEspecieSeleccionada(event.target.textContent);
        }

        console.log("tarjetas"+tarjetas)
        setSelectedTarjetas(tarjetas)
        
        setSeleccionado(event.target.textContent)

    }

    function tarjetasmascotasedad(eventKey, event) {

        let tarjetas = lista.filter(mascota => {
            if (eventKey === "perro" || eventKey === "gato") {
                if (eventKey === "todas")
                    return lista
            }
            if (eventKey === "cachorro" || eventKey === "adulto" || eventKey === "adulto mayor") {
                return mascota.edad === eventKey;
            }
        }).map((mascota, index) => (
            <Card key={index} className="card" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={mascota.imagen} />
                <Card.Body>
                    <Card.Title>{mascota.nombre}</Card.Title>
                    <Card.Text>{mascota.especie} {mascota.edad}</Card.Text>
                    <Button variant="primary" onClick={() => { setModalShow(true); setMascotaSeleccionada(mascota); }}>Perfil</Button>
                </Card.Body>
            </Card>
        ));


        if (eventKey === "cachorro" || eventKey === "adulto" || eventKey === "adulto mayor") {

            setEdadSeleccionada(event.target.textContent);
        }

        setSelectedEdad(tarjetas)
        setSeleccionado(event.target.textContent)

        

    }


    //-----modal



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
                selectedTarjetas,
                seleccionado,
                modalShow, mascotaSeleccionada, setModalShow,
                tarjetasmascotasedad,
                selectedEdad,
                listaFiltrada,

                especieSeleccionada,
                edadSeleccionada,
                TamañoSeleccionada,
                SexoSeleccionada,
                guardarImagen,

            }}>
            {props.children}

        </FirebaseContext.Provider>
    );

    /* 
    ----------------opcion 1

    function tarjetasmascotas(eventKey, event) {

        if (eventKey === "perro" || eventKey === "gato") {
            const tarjetas = lista
                .filter((mascota) => mascota.especie === eventKey)
                .map((mascota, index) => (
                    <Card key={index} className="card" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={mascota.imagen} />
                        <Card.Body>
                            <Card.Title>{mascota.nombre}</Card.Title>
                            <Card.Text>{mascota.especie} {mascota.edad}</Card.Text>
                            <Button variant="primary">Adoptar</Button>
                        </Card.Body>
                    </Card>
                ));

            setSelectedEspecie(
                tarjetas
            );
            setEspecieSeleccionada(event.target.textContent)
        }
        if (eventKey === "cachorro" || eventKey === "adulto" || eventKey === "adulto mayor") {
            const tarjetasedad = lista
                .filter((mascota) => mascota.edad === eventKey)
                .map((mascota, index) => (
                    <Card key={index} className="card" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={mascota.imagen} />
                        <Card.Body>
                            <Card.Title>{mascota.nombre}</Card.Title>
                            <Card.Text>{mascota.especie} {mascota.edad}</Card.Text>
                            <Button variant="primary">Adoptar</Button>
                        </Card.Body>
                    </Card>
                ));
            setSelectedEdad(
                tarjetasedad
            );
            setEdadSeleccionada(event.target.textContent)
        }
        if (eventKey === "pequeño" || eventKey === "mediano" || eventKey === "grande") {
            const tarjetasTamaño = lista
                .filter((mascota) => mascota.tamaño === eventKey)
                .map((mascota, index) => (
                    <Card key={index} className="card" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={mascota.imagen} />
                        <Card.Body>
                            <Card.Title>{mascota.nombre}</Card.Title>
                            <Card.Text>{mascota.especie} {mascota.edad}</Card.Text>
                            <Button variant="primary">Adoptar</Button>
                        </Card.Body>
                    </Card>
                ));
            setSelectedTamaño(
                tarjetasTamaño
            );
            setTamañoSeleccionada(event.target.textContent)

        }
        if (eventKey === "hembra" || eventKey === "macho") {
            const tarjetasexo = lista
                .filter((mascota) => mascota.sexo === eventKey)
                .map((mascota, index) => (
                    <Card key={index} className="card" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={mascota.imagen} />
                        <Card.Body>
                            <Card.Title>{mascota.nombre}</Card.Title>
                            <Card.Text>{mascota.especie} {mascota.edad}</Card.Text>
                            <Button variant="primary">Adoptar</Button>
                        </Card.Body>
                    </Card>
                ));
            setSelectedSexo(
                tarjetasexo
            );
            setSexoSeleccionada(event.target.textContent)

        }
    }

    ----------------opcion 2

    const [selectedEspecie, setSelectedEspecie] = useState([]);
    const [selectedEdad, setSelectedEdad] = useState([]);
    const [selectedTamaño, setSelectedTamaño] = useState([]);
    const [selectedSexo, setSelectedSexo] = useState([]);

    const [especieSeleccionada, setEspecieSeleccionada] = useState("Especies");
    const [edadSeleccionada, setEdadSeleccionada] = useState("Edad");
    const [TamañoSeleccionada, setTamañoSeleccionada] = useState("Tamaño");
    const [SexoSeleccionada, setSexoSeleccionada] = useState("Sexo");

    const [listaFiltrada, setlistafiltros] = useState([]);

    function tarjetasmascotas(eventKey, event) {

        // Filtro por especie
        let mascotasFiltradas = lista;
        if (eventKey === "perro" || eventKey === "gato") {
            mascotasFiltradas = lista.filter((mascota) => mascota.especie === eventKey);
        }

        // Filtro por edad
        if (eventKey === "cachorro" || eventKey === "adulto" || eventKey === "adulto mayor") {
            mascotasFiltradas = mascotasFiltradas.filter((mascota) => mascota.edad === eventKey);
        }

        // Filtro por tamaño
        if (eventKey === "pequeño" || eventKey === "mediano" || eventKey === "grande") {
            mascotasFiltradas = mascotasFiltradas.filter((mascota) => mascota.tamaño === eventKey);
        }

        // Filtro por sexo
        if (eventKey === "hembra" || eventKey === "macho") {
            mascotasFiltradas = mascotasFiltradas.filter((mascota) => mascota.sexo === eventKey);
        }

        // Generar tarjetas
        const tarjetas = mascotasFiltradas.map((mascota, index) => (
            <Card key={index} className="card" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={mascota.imagen} />
                <Card.Body>
                    <Card.Title>{mascota.nombre}</Card.Title>
                    <Card.Text>{mascota.especie} {mascota.edad}</Card.Text>
                    <Button variant="primary">Adoptar</Button>
                </Card.Body>
            </Card>
        ));
        console.log(tarjetas)
        // Actualizar estado de las tarjetas
        if (eventKey === "perro" || eventKey === "gato") {
            setSelectedEspecie(tarjetas);
            setEspecieSeleccionada(event.target.textContent);
        }
        if (eventKey === "cachorro" || eventKey === "adulto" || eventKey === "adulto mayor") {
            setSelectedEdad(tarjetas);
            setEdadSeleccionada(event.target.textContent);
        }
        if (eventKey === "pequeño" || eventKey === "mediano" || eventKey === "grande") {
            setSelectedTamaño(tarjetas);
            setTamañoSeleccionada(event.target.textContent);
        }
        if (eventKey === "hembra" || eventKey === "macho") {
            setSelectedSexo(tarjetas);
            setSexoSeleccionada(event.target.textContent);
        }
        console.log("especie: "+selectedEspecie);
        console.log("edad: "+selectedEdad);
        console.log("sexo: "+selectedSexo);
        console.log("tamaño: "+selectedTamaño);

        setlistafiltros((prevState) => Array.from(new Set([...prevState, ...selectedEspecie, ...selectedEdad, ...selectedSexo, ...selectedTamaño])))
    }
    
    */


}

export default FirebaseProvider;