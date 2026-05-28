import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuario')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <h2>SkillSphere</h2>
      <div className="navbar-links">
        <Link to="/certificados">Certificados</Link>
        <Link to="/vacantes">Vacantes</Link>
        <Link to="/perfil">Perfil</Link>
        <button onClick={handleCerrarSesion}>Cerrar Sesion</button>
      </div>
    </nav>
  )
}

export default Navbar