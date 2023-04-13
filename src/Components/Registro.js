import React from 'react';
import './EstiloFormularios.css'
import Header from './Header';
import Navegacion from './Navegacion';
import chihuahua from '../chihuahua.png'
import FooterIndex from './FooterIndex';

function Registro() {
  
  return (
    <div>
     <Header
      texto1="Únete a la comunidad"
      texto2="Registro"
      />
      {/* en la sección de navegación se debe poner los liks para regresarse a las paginas anteriores */}
      <Navegacion
      etiqueta={<a>Aquí van los links de navegacion</a>}
      />

      <main className='mainRegistro'>
        <section className='Formulario'>
          <form >
            <label>Nombre: </label>
            <input
            type="text"
            name="name"
            size="25"
            title="Es obligatorio ingresar un nombre"
            required
            />
            <br/><br/>
            <label>Apellido paterno: </label>
            <input
            type="text"
            name="apellidoP"
            size="25"
            title="Es obligatorio ingresar el apellido paterno"
            required
            />
            <br/><br/>
            <label>Apellido materno: </label>
            <input
            type="text"
            name="apellidoM"
            size="25"
            title="Es obligatorio ingresar el apellido materno"
            required
            />
            <br/><br/>
            <label>Usuario: </label>
            <input
            type="text"
            name="usuario"
            size="25"
            title="Es obligatorio ingresar un usuario"
            required
            />
            <br/><br/>
            <label>Contraseña:</label>
            <input
            type="password"
            name="contraseña"
            onChange="onChange()" 
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,15}$" 
            size="25" 
            placeholder="8 digitos mínimo, una mayúscula, un símbolo" 
            title="8 digitos mínimo, una mayúscula, un símbolo" 
            required
            />
            <br/><br/>
            <label>Repetir contraseña:</label>
            <input
            type="password"
            name="contraseña2"
            onChange="onChange()" 
            size="25" 
            title="La contraseña debe coincidir" 
            required
            />
            <br/><br/>
            <label> Correo Electrónico: </label>         
            <input 
            type="email" 
            name="correo"  
            size="25" 
            title="Es obligatorio ingresar un correo" 
            required
            /> 
            <br/><br/>
            <a href="InicioSesion.html">¿Ya tienes una cuenta?<br/></a>  
            <input class="enviar" type="submit" value="Enviar"></input>
          </form>
          <div>
            <img src={chihuahua}/>
          </div>
        </section>
      </main>

      <FooterIndex/>
    </div>
  );
}

export default Registro;