import { useEffect, useRef } from 'react'
import './CertificadoCard.css'

function CertificadoCard(props) {
  const cardRef = useRef(null)

  useEffect(() => {
    // Sincroniza la posición del cursor en tiempo real con variables CSS
    const syncPointer = (e) => {
      if (!cardRef.current) return
      cardRef.current.style.setProperty('--x', e.clientX.toFixed(2))
      cardRef.current.style.setProperty('--y', e.clientY.toFixed(2))
      cardRef.current.style.setProperty('--xp', (e.clientX / window.innerWidth).toFixed(2))
      cardRef.current.style.setProperty('--yp', (e.clientY / window.innerHeight).toFixed(2))
    }

    document.addEventListener('pointermove', syncPointer)
    return () => document.removeEventListener('pointermove', syncPointer)
  }, [])

  return (
    <div ref={cardRef} className="certificado-card" data-glow>
      {/* Parte Superior: Badge de estado y Nombre del Logro */}
      <div className="certificado-header">
        <span className="badge-verificado">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Credencial Verificada
        </span>
        <h2>{props.nombre}</h2>
      </div>

      {/* Parte Central: Institución y Fecha de Expedición */}
      <div className="certificado-body">
        <div className="detalle-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="icon-school"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
          <span className="escuela">{props.escuela}</span>
        </div>

        <div className="detalle-item fecha-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span className="fecha">Expedido: {props.fecha}</span>
        </div>
      </div>

      {/* Parte Inferior: Fila de acciones compacta */}
      <div className="certificado-footer">
        <button className="btn-eliminar-cert" onClick={props.onEliminar} title="Eliminar certificado de mi perfil">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          Remover certificado
        </button>
      </div>
    </div>
  )
}

export default CertificadoCard