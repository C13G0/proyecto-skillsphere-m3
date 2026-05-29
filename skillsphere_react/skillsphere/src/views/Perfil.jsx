import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Perfil.css'

function Perfil() {
    const navigate = useNavigate()
    const [estudiante, setEstudiante] = useState(null)

    useEffect(() => {
        // Leemos el objeto completo de la sesión
        const sesion = localStorage.getItem('estudiante')
        
        if (!sesion) {
            // Si no está logueado, lo mandamos al login de inmediato
            navigate('/login')
        } else {
            setEstudiante(JSON.parse(sesion))
        }
    }, [navigate])

    // Mientras verifica la sesión o redirige, no renderizamos nada para evitar parpadeos
    if (!estudiante) return null

    return (
        <div className="perfil-container">
            {/* Destellos de luz ambientales en el fondo */}
            <div className="perfil-glow-top"></div>
            
            <div className="perfil-card">
                {/* Cabecera del Perfil: Avatar Tech y Estado */}
                <div className="perfil-header">
                    <div className="avatar-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="avatar-svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="online-indicator"></span>
                    </div>
                    <h2>{estudiante.firstName} {estudiante.lastName}</h2>
                    <p className="perfil-programa">{estudiante.program || 'Programa no asignado'}</p>
                </div>

                {/* Lista de Métricas y Datos del Estudiante */}
                <div className="perfil-info">
                    {/* Ítem: ID de la Base de Datos */}
                    <div className="perfil-item">
                        <div className="item-left">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="item-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span className="perfil-label">ID Estudiante</span>
                        </div>
                        <span className="perfil-valor">#{estudiante.id}</span>
                    </div>

                    {/* Ítem: Correo Electrónico */}
                    <div className="perfil-item">
                        <div className="item-left">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="item-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            <span className="perfil-label">Correo</span>
                        </div>
                        <span className="perfil-valor" style={{ fontSize: '13px' }}>{estudiante.email}</span>
                    </div>

                    {/* Ítem: Celular */}
                    <div className="perfil-item">
                        <div className="item-left">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="item-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            <span className="perfil-label">Celular / PW</span>
                        </div>
                        <span className="perfil-valor badge-semestre">{estudiante.phone}</span>
                    </div>

                    {/* Ítem: Estado en Plataforma */}
                    <div className="perfil-item">
                        <div className="item-left">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="item-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <span className="perfil-label">Estado</span>
                        </div>
                        <span className="perfil-valor promedio-destacado">Sincronizado</span>
                    </div>
                </div>

                {/* Acción Principal */}
                <button className="btn-perfil-action" onClick={() => navigate('/certificados')}>
                    <span>Ver mis certificados</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
            </div>
        </div>
    )
}

export default Perfil