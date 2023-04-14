import React from 'react';
import './EstiloFormularios.css'
import Header from './Header';
import Navegacion from './Navegacion';
import chihuahua from '../chihuahua.png'
import FooterIndex from './FooterIndex';

function InicioSesion(){
    return (
        <div>
         <Header
          texto1="Bienvenido"
          texto2="Inicio de Sesión"
          />
          {/* en la sección de navegación se debe poner los liks para regresarse a las paginas anteriores */}
          <Navegacion
          etiqueta={<a>Aquí van los links de navegacion</a>}
          />
    
          <main className='mainRegistro'>
            <section className='Formulario'>
              <form >
                <label>Usuario: </label>
                <input
                type="text"
                name="usuario"
                size="25"
                title="Es obligatorio ingresar un nombre"
                required
                />
                <br/><br/>
                <label>Contraseña:</label>
                <input
                type="password"
                name="contraseña"
                onChange="onChange()" 
                size="25" 
                title="Rellene este campo"
                required
                />
                <br/><br/>
                <a href="Registro.html">¿Aún no tienes una cuenta?<br/><br/></a> 
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

export default InicioSesion;