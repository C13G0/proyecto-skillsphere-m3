import { useState } from 'react'
import './VacanteCard.css'

function VacanteCard(props) {
  const [aplicado, setAplicado] = useState(false)

  return (
    <div className="vacante-card">
      <h2>{props.nombre}</h2>
      <p className="cargo">{props.cargo}</p>
      <p className="empresa">{props.empresa}</p>
      <p className="salario">{props.salario}</p>
      <p className="disponibilidad">{props.disponibilidad}</p>
      <button onClick={() => setAplicado(true)} disabled={aplicado}>
        {aplicado ? "Aplicado" : "Aplicar"}
      </button>
      <button className="btn-eliminar" onClick={props.onEliminar}>Eliminar</button>
    </div>
  )
}

export default VacanteCard