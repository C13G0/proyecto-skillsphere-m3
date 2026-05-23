import { useNavigate } from 'react-router-dom'
import './Perfil.css'

function Perfil() {
    const navigate = useNavigate()
    const usuario = localStorage.getItem('usuario') || 'Estudiante'

    return (
        <div className="perfil-container">
            <div className="perfil-card">
                <div className="perfil-avatar">👤</div>
                <h2>{usuario}</h2>
                <p className="perfil-programa">Desarrollo de Software</p>
                <div className="perfil-info">
                    <div className="perfil-item">
                        <span className="perfil-label">Usuario</span>
                        <span className="perfil-valor">{usuario}</span>
                    </div>
                    <div className="perfil-item">
                        <span className="perfil-label">Ciudad</span>
                        <span className="perfil-valor">Medellin</span>
                    </div>
                    <div className="perfil-item">
                        <span className="perfil-label">Semestre</span>
                        <span className="perfil-valor">3</span>
                    </div>
                    <div className="perfil-item">
                        <span className="perfil-label">Promedio</span>
                        <span className="perfil-valor">4.2</span>
                    </div>
                </div>
                <button onClick={() => navigate('/certificados')}>
                    Ver mis certificados
                </button>
            </div>
        </div>
    )
}

export default Perfil