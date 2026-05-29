import { useNavigate } from 'react-router-dom'
import './Perfil.css'

function Perfil() {
    const navigate = useNavigate()
    const usuario = localStorage.getItem('usuario') || 'Estudiante'

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
                    <h2>{usuario}</h2>
                    <p className="perfil-programa">Desarrollador de Software</p>
                </div>

                {/* Lista de Métricas y Datos del Estudiante */}
                <div className="perfil-info">
                    {/* Ítem: Usuario */}
                    <div className="perfil-item">
                        <div className="item-left">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="item-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span className="perfil-label">ID Usuario</span>
                        </div>
                        <span className="perfil-valor">{usuario.toLowerCase().replace(/\s+/g, '')}</span>
                    </div>

                    {/* Ítem: Ciudad */}
                    <div className="perfil-item">
                        <div className="item-left">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="item-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span className="perfil-label">Ubicación</span>
                        </div>
                        <span className="perfil-valor">Medellín</span>
                    </div>

                    {/* Ítem: Semestre */}
                    <div className="perfil-item">
                        <div className="item-left">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="item-icon"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v5"/></svg>
                            <span className="perfil-label">Nivel / Semestre</span>
                        </div>
                        <span className="perfil-valor badge-semestre">Semestre 3</span>
                    </div>

                    {/* Ítem: Promedio */}
                    <div className="perfil-item">
                        <div className="item-left">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="item-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <span className="perfil-label">Score Promedio</span>
                        </div>
                        <span className="perfil-valor promedio-destacado">4.2 / 5.0</span>
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