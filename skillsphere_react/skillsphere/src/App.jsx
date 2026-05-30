import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Certificados from './views/Certificados'
import Vacantes from './views/Vacantes'
import Login from './views/Login'
import Registro from './views/Registro'
import Perfil from './views/Perfil'
import Estadisticas from './components/Estadisticas'
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        
        {/* Vista secreta de analítica (sin Navbar ni Footer estándar) */}
        <Route path="/estadisticas" element={<Estadisticas />} />

        {/* Rutas con maquetación estándar */}
        <Route path="/certificados" element={<><Navbar /><Certificados /><Footer /></>} />
        <Route path="/vacantes" element={<><Navbar /><Vacantes /><Footer /></>} />
        <Route path="/perfil" element={<><Navbar /><Perfil /><Footer /></>} />
        <Route path="/academicos" element={<><Navbar /><div style={{padding:'48px'}}>Académicos - próximamente</div><Footer /></>} />
      </Routes>
    </div>
  )
}

export default App