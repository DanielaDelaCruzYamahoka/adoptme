import React from 'react';
import './BodyIndex.css'
import perro1 from '../istock.jpg'
import perro2 from '../GoldenRetriever.jpg'
import gato1 from '../Gato.jpg'

function BodyIndex() {
  return (
    <section>
      <section className='Presentacion'>
        <header>
            <h3>Bienvenido a</h3>
            <h1>ADOPTME</h1>
        </header>
        <section>
            <p>No compres la felicidad, adopta</p>
        </section>
    </section>

<main>
          <section className='Testimonios'>
          <h3>Historias</h3>
          <h2>Todos merecen una segunda oportunidad</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          
          <div className='tabla'>
            <div className='izq'>Tobby
            <img src={perro1}></img>
            <p className='tt'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>

            <div className='medio'>Salchicha
            <img src={perro2}></img>
            <p class="tt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>

            <div className='der'>Copo
            <img src={gato1}></img>
            <p class="tt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
          </section>
        </main>
    </section>
    
    
  );
}

export default BodyIndex;