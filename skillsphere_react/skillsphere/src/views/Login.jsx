import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
    const [form, setForm] = useState({ usuario: '', contrasena: '' })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        if (!form.usuario || !form.contrasena) return
        localStorage.setItem('usuario', form.usuario)
        navigate('/perfil')
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>SkillSphere</h1>
                <p className="auth-subtitulo">Inicia sesión en tu cuenta</p>
                <form onSubmit={handleLogin}>
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
                        placeholder="Contraseña"
                        value={form.contrasena}
                        onChange={handleChange}
                    />
                    <button type="submit">Iniciar Sesión</button>
                </form>
                <p className="auth-link">
                    ¿No tienes cuenta?{' '}
                    <span onClick={() => navigate('/register')}>Regístrate</span>
                </p>
            </div>
        </div>
    )
}

export default Login