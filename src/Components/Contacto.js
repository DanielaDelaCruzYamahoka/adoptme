import FooterIndex from './FooterIndex';
import Header from './Header';
import chihuahua from '../chihuahua.png'
import './EstiloFormularios.css'

function Contacto() {
    return (
      <div>
        <Header
        texto1="Bienvenido"
        texto2="Contacto"
        />

        <main>
            <section className='Formulario'>
                <form>
                    <fieldset>
                        <div>
                            <label for="">Nombre: </label>
                            <input type="text" name="nom" placeholder="Nombre"/>
                        </div>
                        <div>
                            <label for="">Apellido: </label>
                            <input type="text" name="ape" placeholder="Apellido"/>
                        </div>
                        <div>
                            <label for="">Telefono: </label>
                            <input type="tel" name="tele" placeholder="Telefono"/>
                        </div>
                        <div>
                            <label for="">Correo: </label>
                            <input type="email" name="correo" placeholder="mail"/>
                        </div>
                        <div>
                            <label for="">Mensaje</label>
                            <br/>
                            <textarea name="mensaje"  cols="30" rows="10"></textarea>
                        </div>
                        <div>
                        <input type="submit" value="Enviar" class="enviar"/>
                        </div>
                    </fieldset>
                </form>
                <div className="Extra">
                    <p>Teléfono</p>
                    <p>+52 6641947541</p>
                    <p>Sigue nuestras redes sociales</p>
                    <img src={chihuahua}/>
                </div>
            </section>
        </main>

        <FooterIndex></FooterIndex>
      </div>
      
  
    );
  }
  
  export default Contacto;