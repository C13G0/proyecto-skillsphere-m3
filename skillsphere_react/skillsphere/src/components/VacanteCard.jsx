import { useState } from 'react'
import './VacanteCard.css'

function VacanteCard(props) {
  const [aplicado, setAplicado] = useState(false)

  // Estado para capturar las coordenadas exactas del cursor dentro de la tarjeta
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  // Calcula la posición relativa del ratón respecto a los límites de esta tarjeta
  const manejarMovimientoRaton = (e) => {
    const limites = e.currentTarget.getBoundingClientRect()
    setCoords({
      x: e.clientX - limites.left,
      y: e.clientY - limites.top
    })
  }

  return (
    <div 
      className="vacante-card"
      onMouseMove={manejarMovimientoRaton}
      style={{
        '--mouse-x': `${coords.x}px`,
        '--mouse-y': `${coords.y}px`
      }}
    >
      {/* Parte Superior: Badge de tiempo y títulos */}
      <div className="vacante-header">
        <span className="badge-disponibilidad">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {props.disponibilidad}
        </span>
        <h2>{props.nombre}</h2>
        <p className="cargo">{props.cargo}</p>
      </div>

      {/* Parte Central: Información de la empresa y salario con iconos estilo Tech */}
      <div className="vacante-body">
        <div className="detalle-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-meta"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          <span className="empresa">{props.empresa}</span>
        </div>
        
        <div className="detalle-item salario-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-money"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <span className="salario">{props.salario}</span>
        </div>
      </div>

      {/* Parte Inferior: Fila de botones estilizada */}
      <div className="vacante-footer">
        <button 
          className={`btn-aplicar ${aplicado ? 'estado-aplicado' : ''}`} 
          onClick={() => setAplicado(true)} 
          disabled={aplicado}
        >
          {aplicado ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="icon-check"><polyline points="20 6 9 17 4 12"/></svg>
              Aplicado con éxito
            </>
          ) : "Aplicar a vacante"}
        </button>

        <button className="btn-eliminar" onClick={props.onEliminar} title="Eliminar esta oferta">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        </button>
      </div>
    </div>
  )
}

export default VacanteCard