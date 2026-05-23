import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Registro() {
    const [form, setForm] = useState({ nombre: '', usuario: '', contrasena: '' })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        if (!form.nombre || !form.usuario || !form.contrasena) return
        localStorage.setItem('usuario', form.nombre)
        navigate('/perfil')
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>SkillSphere</h1>
                <p className="auth-subtitulo">Crea tu cuenta</p>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre completo"
                        value={form.nombre}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="usuario"
                        placeholder="Usuario"
                        value={form.usuario}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="contrasena"
                        placeholder="Contrasena"
                        value={form.contrasena}
                        onChange={handleChange}
                    />
                    <button type="submit">Registrarse</button>
                </form>
                <p className="auth-link">
                    Ya tienes cuenta?{' '}
                    <span onClick={() => navigate('/login')}>Inicia sesion</span>
                </p>
            </div>
        </div>
    )
}

export default Registro

