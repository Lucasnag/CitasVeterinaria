import React, {Fragment, useState} from 'react';
import uuid from 'uuid/v4'

const Formulario = ({crearCita}) => {
    //Crear el State
    const [cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:'',
    });
    //crear + de un state es mas facil de mantener
    const [error, actualizarError] = useState(false);

    const actualizarState = e => {
        actualizarCita ({
        ...cita,
            [e.target.name] : e.target.value
        })
    }
         //extraer los valores
        const { mascota, propietario, fecha, hora, sintomas} = cita;  

        // cuando el usuario presiona agregar cita
        const submitCita = e =>{
            e.preventDefault();
                        
            // Validar
            if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || 
            hora.trim() === '' || sintomas.trim() === ''){
                actualizarError(true);
                return;
            }
            // eliminar el mensaje previo
            actualizarError(false);
            
            // Asignar un ID.
            //Siempre es bueno generar un id unico
            cita.id = uuid();
            
            // Crear la cita
            crearCita(cita);
            // Reiniciar el form
            actualizarCita({
                mascota:'',
                propietario:'',
                fecha:'',
                hora:'',
                sintomas:'',   
            });
        }


    return (  
        <Fragment>
        <h2>Desde Formulario</h2>
        {error ? <p className="alerta-error"> todos los campos son obligarorios</p> 
        : null}

        <form
            onSubmit={submitCita}
        >
            <label>Nombre Mascota</label>
            <input 
                type="text"
                name="mascota"
                className="u-full-width"
                placeholder="Nombre Mascota"
                onChange={actualizarState}
            />
            <label>Nombre Dueño</label>
            <input 
                type="text"
                name="propietario"
                className="u-full-width"
                placeholder="Nombre Propietario"
                onChange={actualizarState}
            />
            <label>Fecha</label>
            <input 
                type="date"
                name="fecha"
                className="u-full-width"
                onChange={actualizarState}
            />
            <label>Hora</label>
            <input 
                type="time"
                name="hora"
                className="u-full-width"
                onChange={actualizarState}
            />
            <label>Sintomas</label>
            <textarea
            className="u-full-width"
            name="sintomas"
            onChange={actualizarState}
            > </textarea>

            <button
            type="submit"
            className="u-full-width button-primary">
                Agregar Citas
            </button>
                

        </form>

        </Fragment>
        );
}


export default Formulario;